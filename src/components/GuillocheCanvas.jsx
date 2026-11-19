import { useEffect, useRef, useState } from 'react'
import Seal from './Seal.jsx'

// Live guilloche rosette: two families of closed polar curves rendered as
// anti-aliased fine lines, one solid brand ink per band. One full-screen triangle, one
// fragment shader, no libraries. Pauses off-screen and in background tabs,
// renders a single still frame for reduced motion, and falls back to SVG.

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uScale;
uniform float uTime;
uniform float uReveal;
uniform vec2 uMouse;
uniform float uMouseAmt;
uniform float uDpr;
uniform vec2 uFade;

const float TAU = 6.28318530718;

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 q = frag - uCenter;
  float r = length(q);
  float t = atan(q.y, q.x);

  // pointer lens: nudges the phase of nearby lines
  float md = length(frag - uMouse) / uScale;
  float lens = uMouseAmt * exp(-md * md * 9.0) * 0.9;

  float sweep = (t + 3.14159265) / TAU;
  float lw = 0.5 * uDpr;
  float aa = 0.85 * uDpr;
  float invR2 = 1.0 / max(r * r, 1.0);

  // Two solid inks, one per band, as in security printing: the outer band in the
  // logo's green (prepared), the inner band in blue (matched). No hue sweep.
  vec3 inkOuter = vec3(0.027, 0.565, 0.345);
  vec3 inkInner = vec3(0.184, 0.357, 0.918);

  // premultiplied, front-to-back "over" accumulation
  vec3 acc = vec3(0.0);
  float alpha = 0.0;
  float drift = uTime * 0.04;

  // Each band is N curves r_i = R + A sin(k1 t + ph_i) + B sin(k2 t - ph_i / 2), ph_i = i·TAU/N + p0.
  // Instead of 4 trig calls per curve, rotate (sin, cos) pairs by a fixed step: angle addition.
  // Low amplitude, high frequency and many curves give a tight engraved lattice, not a ribbon.

  // outer band: R .78, A .05, B .02, k1 13, k2 24, 34 curves
  float R1 = uScale * 0.78;
  if (abs(r - R1) < uScale * 0.085) {
    float A = uScale * 0.05;
    float B = uScale * 0.02;
    float p0 = drift + lens;
    float a0 = 13.0 * t + p0;
    float b0 = 24.0 * t - p0 * 0.5;
    float sa = sin(a0), ca = cos(a0), sb = sin(b0), cb = cos(b0);
    float D = TAU / 34.0;
    float cD = cos(D), sD = sin(D), cE = cos(-D * 0.5), sE = sin(-D * 0.5);
    for (int i = 0; i < 34; i++) {
      float fi = float(i);
      float f = R1 + A * sa + B * sb;
      float df = A * 13.0 * ca + B * 24.0 * cb;
      float d = abs(r - f) * inversesqrt(1.0 + df * df * invR2);
      float gate = smoothstep(0.0, 0.08, uReveal * 1.35 - sweep * 0.9 - fi / 34.0 * 0.35);
      float a = (1.0 - smoothstep(lw, lw + aa, d)) * gate * 0.5;
      acc += inkOuter * a * (1.0 - alpha);
      alpha += a * (1.0 - alpha);
      float ns = sa * cD + ca * sD; ca = ca * cD - sa * sD; sa = ns;
      float nb = sb * cE + cb * sE; cb = cb * cE - sb * sE; sb = nb;
    }
  }

  // inner band: R .5, A .042, B .017, k1 10, k2 18, 26 curves
  float R2 = uScale * 0.5;
  if (abs(r - R2) < uScale * 0.072) {
    float A = uScale * 0.042;
    float B = uScale * 0.017;
    float p0 = -drift * 1.4 - lens * 0.7;
    float a0 = 10.0 * t + p0;
    float b0 = 18.0 * t - p0 * 0.5;
    float sa = sin(a0), ca = cos(a0), sb = sin(b0), cb = cos(b0);
    float D = TAU / 26.0;
    float cD = cos(D), sD = sin(D), cE = cos(-D * 0.5), sE = sin(-D * 0.5);
    for (int i = 0; i < 26; i++) {
      float fi = float(i);
      float f = R2 + A * sa + B * sb;
      float df = A * 10.0 * ca + B * 18.0 * cb;
      float d = abs(r - f) * inversesqrt(1.0 + df * df * invR2);
      float gate = smoothstep(0.0, 0.08, uReveal * 1.35 - sweep * 0.9 - 0.18 - fi / 26.0 * 0.3);
      float a = (1.0 - smoothstep(lw, lw + aa, d)) * gate * 0.46;
      acc += inkInner * a * (1.0 - alpha);
      alpha += a * (1.0 - alpha);
      float ns = sa * cD + ca * sD; ca = ca * cD - sa * sD; sa = ns;
      float nb = sb * cE + cb * sE; cb = cb * cE - sb * sE; sb = nb;
    }
  }

  // hairline rings framing the rosette like an engraved seal
  float ring1 = 1.0 - smoothstep(lw * 0.6, lw * 0.6 + aa, abs(r - uScale * 0.95));
  float ring2 = 1.0 - smoothstep(lw * 0.6, lw * 0.6 + aa, abs(r - uScale * 0.985));
  float ringGate = smoothstep(0.0, 0.1, uReveal * 1.2 - sweep);
  float ra = max(ring1, ring2) * 0.3 * ringGate;
  acc += vec3(0.08, 0.11, 0.18) * ra * (1.0 - alpha);
  alpha += ra * (1.0 - alpha);

  // quieter where it passes behind the headline
  float fade = 1.0;
  if (uFade.y > uFade.x) fade = mix(0.25, 1.0, smoothstep(uFade.x, uFade.y, frag.x));

  gl_FragColor = vec4(acc * fade, alpha * fade);
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s)
    return null
  }
  return s
}

export default function GuillocheCanvas({ className = '', layout = () => ({ x: 0.7, y: 0.5, scale: 0.42 }) }) {
  const canvasRef = useRef(null)
  const layoutRef = useRef(layout)
  const [failed, setFailed] = useState(false)
  layoutRef.current = layout

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true })
    if (!gl || gl.isContextLost()) {
      setFailed(true)
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) {
      setFailed(true)
      return
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true)
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {}
    for (const name of ['uRes', 'uCenter', 'uScale', 'uTime', 'uReveal', 'uMouse', 'uMouseAmt', 'uDpr', 'uFade']) {
      u[name] = gl.getUniformLocation(prog, name)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Fine lines want retina, but never more than 1.5x; slow GPUs drop to 1x after the first second.
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let scale = 0
    let fade0 = 0
    let fade1 = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      const l = layoutRef.current(rect.width, rect.height)
      cx = l.x * width
      cy = (1 - l.y) * height
      scale = l.scale * Math.min(width, height * 1.6)
      fade0 = (l.fade?.[0] ?? 0) * dpr
      fade1 = (l.fade?.[1] ?? 0) * dpr
      if (!running) draw(performance.now())
    }

    // pointer, damped
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, amt: 0, tAmt: 0 }
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - rect.left) * dpr
      mouse.ty = (rect.height - (e.clientY - rect.top)) * dpr
      if (mouse.x < -999) {
        mouse.x = mouse.tx
        mouse.y = mouse.ty
      }
      mouse.tAmt = 1
    }
    const onLeave = () => {
      mouse.tAmt = 0
    }

    const start = performance.now()
    let reveal = reduced ? 1 : 0
    let raf = 0
    let running = false
    let visible = true

    function draw(now) {
      const time = reduced ? 8 : (now - start) / 1000
      if (!reduced) reveal = Math.min(1, (now - start) / 2400)
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      mouse.amt += (mouse.tAmt - mouse.amt) * 0.05

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(u.uRes, width, height)
      gl.uniform2f(u.uCenter, cx, cy)
      gl.uniform1f(u.uScale, scale)
      gl.uniform1f(u.uTime, time)
      gl.uniform1f(u.uReveal, easeOut(reveal))
      gl.uniform2f(u.uMouse, mouse.x, mouse.y)
      gl.uniform1f(u.uMouseAmt, reduced ? 0 : mouse.amt)
      gl.uniform1f(u.uDpr, dpr)
      gl.uniform2f(u.uFade, fade0, fade1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // Full frame rate while the rosette draws in or follows the pointer; the slow idle drift
    // only needs ~30fps. A one-off speed check halves the pixel load on slow GPUs. It times
    // only frames that were really delivered: it starts after half a second of running, and any
    // stall over 100ms (background or occluded tab, paused loop) restarts it, so a page opened
    // in a background tab is never mistaken for a slow device.
    let lastDraw = 0
    let lastTick = 0
    let probeStart = 0
    let probeFrames = 0
    let checked = false
    function probe(now) {
      if (checked) return
      if (!lastTick || now - lastTick > 100) {
        probeStart = now + 500
        probeFrames = 0
      } else if (now >= probeStart) {
        probeFrames++
        const span = now - probeStart
        if (span > 1500) {
          checked = true
          if (span / probeFrames > 40 && dpr > 1) {
            dpr = 1
            resize()
          }
        }
      }
      lastTick = now
    }
    function loop(now) {
      const busy = now - start < 2600 || mouse.tAmt > 0 || mouse.amt > 0.02
      if (busy || now - lastDraw > 30) {
        draw(now)
        lastDraw = now
      }
      probe(now)
      raf = requestAnimationFrame(loop)
    }

    const play = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const pause = () => {
      running = false
      lastTick = 0
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        visible ? play() : pause()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVis = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVis)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const host = canvas.parentElement
    host?.addEventListener('pointermove', onMove)
    host?.addEventListener('pointerleave', onLeave)

    if (reduced) draw(performance.now())
    else play()

    return () => {
      pause()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      host?.removeEventListener('pointermove', onMove)
      host?.removeEventListener('pointerleave', onLeave)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  if (failed) {
    return (
      <div className={className} aria-hidden="true">
        <Seal className="absolute right-[-8%] top-1/2 w-[70%] -translate-y-1/2 text-green-ink opacity-60" count={20} />
      </div>
    )
  }

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

function easeOut(x) {
  return 1 - Math.pow(1 - x, 3)
}
