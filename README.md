# Endloops website

Marketing site for Endloops, finance automation built inside Alkazim, an accounting and audit firm in Dubai.
It has five pages: Home, Solutions, Tools, About and Contact, plus a 404 page.

The design idea is **the audit file on security paper**. Endloops prepares the file and the professional signs it off.
Divider tabs A–E are the navigation. Every section carries a reference code, as a working paper would. Tick marks have
fixed meanings, and a live guilloche pattern (the fine-line engraving used on cheques and certificates) frames a
prepared schedule that is waiting for review.

## Stack

- Vite 8, React 19, React Router 7. Home loads first; the other pages are split out and load on demand.
- Tailwind CSS 4. Design tokens live in `src/index.css` under `@theme`.
- Motion 12 for in-view reveals, tab indicators and the demo's transitions. The hero entrance uses CSS keyframes
  instead, so it stays smooth while the shader compiles.
- A raw WebGL 1 fragment shader for the hero guilloche (`src/components/GuillocheCanvas.jsx`), with no 3D library.
- Self-hosted variable fonts via Fontsource: Archivo with its width axis, and Azeret Mono.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Node 20 or newer is recommended.

## Deploy to Vercel

`vercel.json` already rewrites every route to `index.html`, so deep links such as `/tools#matrix` work.

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. Vercel detects Vite automatically. The build
   command is `npm run build` and the output directory is `dist`.

Or deploy from the command line:

```bash
npx vercel        # preview deployment
npx vercel --prod # production deployment
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/pages/` | One file per route |
| `src/components/GuillocheCanvas.jsx` | WebGL hero shader, with an SVG fallback |
| `src/components/VouchingDemo.jsx` | Interactive five-station vouching run (Home, section A3) |
| `src/components/Seal.jsx` | SVG guilloche rosettes and bands, built from `src/lib/guilloche.js` |
| `src/components/Marks.jsx` | Hand-authored icon set: tick, cast, flag, sign and interface glyphs |
| `src/data/products.js` | Solutions B1–B5, tools C1–C6, and the five shared capabilities |
| `src/data/demo.js` | Sample ledger used by the vouching demo |
| `public/endloops-logo.jpg` | The logo exactly as supplied |
| `PRODUCT.md`, `DESIGN.md` | Product context and the recorded design system |

## Notes

- **The contact form is front-end only.** Validation, the error summary, focus handling and the success state all
  work, but the submit is simulated. To connect it, replace the timeout in `onSubmit` in `src/pages/Contact.jsx`
  with a request to your form endpoint.
- **Replacing the logo.** Swap `public/endloops-logo.jpg` for the final file, ideally a transparent SVG, and keep its
  name or update `src/components/Logo.jsx`. The supplied JPG has a white background, so the logo is only placed on
  white surfaces.
- **Sample data.** Every figure, supplier and document in the demos is invented and labelled as sample data. The site
  makes no claims about customers or results.
- **Accessibility.** The site targets WCAG 2.2 AA. It has a skip link, visible focus, keyboard-operable tabs and
  filters, live regions in the demo, and labelled form errors. `prefers-reduced-motion` is honoured: the shader renders
  a single still frame and animations are reduced to instant changes.
- **Performance.** The shader pauses when it is off-screen or the tab is hidden, caps its pixel ratio and lowers it on
  slow devices, and falls back to SVG when WebGL is unavailable.
