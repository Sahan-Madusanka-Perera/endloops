import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/azeret-mono/index.css'
import './index.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'

const page = (load) => () => load().then((m) => ({ Component: m.default }))

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'solutions', lazy: page(() => import('./pages/Solutions.jsx')) },
      { path: 'tools', lazy: page(() => import('./pages/Tools.jsx')) },
      { path: 'about', lazy: page(() => import('./pages/About.jsx')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact.jsx')) },
      { path: '*', lazy: page(() => import('./pages/NotFound.jsx')) },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
