import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared.css'

const demoLoaders = {
  restaurante: () => import('./restaurante/RestauranteDemo.jsx'),
  fitness: () => import('./fitness/FitnessMultiPage.jsx'),
  clinica: () => import('./clinica/ClinicMultiPage.jsx'),
  inmobiliaria: () => import('./inmobiliaria/RealEstateMultiPage.jsx'),
  tienda: () => import('./tienda/TiendaDemo.jsx'),
  producto: () => import('./producto/ProductoDemo.jsx'),
  despacho: () => import('./despacho/DespachoDemo.jsx'),
  evento: () => import('./evento/EventoDemo.jsx'),
  blog: () => import('./blog/BlogDemo.jsx'),
  corporativo: () => import('./corporativo/CorporativoDemo.jsx'),
}

const demoName = document.body.dataset.demo
const loader = demoLoaders[demoName]

if (!loader) {
  throw new Error(`Demo desconocida: ${demoName}`)
}

const { default: Demo } = await loader()
document.documentElement.dataset.demo = demoName

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
)
