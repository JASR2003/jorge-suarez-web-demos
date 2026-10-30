import { chromium } from 'playwright-core'
import { mkdir, writeFile } from 'node:fs/promises'

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:5173'
const browserPath = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const outputDirectory = '.tmp/responsive-audit'

const allRoutes = [
  '/',
  '/restaurante/',
  '/fitness/', '/fitness/instalaciones/', '/fitness/clases/', '/fitness/horarios/', '/fitness/entrenadores/', '/fitness/eventos/',
  '/clinica/', '/clinica/especialidades/', '/clinica/medicos/', '/clinica/diagnostico/', '/clinica/pacientes/', '/clinica/citas/', '/clinica/ubicacion/',
  '/inmobiliaria/', '/inmobiliaria/propiedades/', '/inmobiliaria/propiedad/', '/inmobiliaria/zonas/', '/inmobiliaria/asesores/', '/inmobiliaria/vender/',
  '/tienda/', '/tienda/catalogo/', '/tienda/producto/', '/tienda/bolsa/', '/tienda/favoritos/', '/tienda/cuenta/', '/tienda/checkout/', '/tienda/pedido/', '/tienda/envios/',
  '/producto/',
  '/despacho/', '/despacho/firma/', '/despacho/areas/', '/despacho/area/', '/despacho/equipo/', '/despacho/abogado/', '/despacho/experiencia/', '/despacho/recursos/', '/despacho/contacto/',
  '/evento/',
  '/blog/', '/blog/temporada-2024-25/', '/blog/temporada-2025-26/', '/blog/temporada-2026-27/',
  '/corporativo/', '/corporativo/hogar/', '/corporativo/empresas/', '/corporativo/cobertura/', '/corporativo/entretenimiento/', '/corporativo/soporte/',
]

const requestedRoutes = process.env.AUDIT_ROUTES?.split(',').map((route) => route.trim()).filter(Boolean)
const routes = requestedRoutes?.length ? allRoutes.filter((route) => requestedRoutes.includes(route)) : allRoutes

const viewports = [
  { name: 'mobile-320', width: 320, height: 568 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-landscape-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
]

await mkdir(outputDirectory, { recursive: true })
const browser = await chromium.launch({ executablePath: browserPath, headless: true })
const results = []

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
  const page = await context.newPage()

  for (const route of routes) {
    const runtimeErrors = []
    const consoleErrors = []
    const onPageError = (error) => runtimeErrors.push(error.message)
    const onConsole = (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    }
    page.on('pageerror', onPageError)
    page.on('console', onConsole)

    let status = null
    let metrics = null
    let navigationError = null

    try {
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle', timeout: 30000 })
      status = response?.status() ?? null
      await page.evaluate(() => document.fonts.ready)
      metrics = await page.evaluate(() => {
        const root = document.documentElement
        const body = document.body
        const viewportWidth = window.innerWidth
        const visible = (element, style, rect) => style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 1 && rect.height > 1
        const selector = (element) => {
          const id = element.id ? `#${element.id}` : ''
          const classes = [...element.classList].slice(0, 3).map((name) => `.${name}`).join('')
          return `${element.tagName.toLowerCase()}${id}${classes}`
        }
        const overflowElements = []
        const tinyText = []
        const undersizedControls = []

        for (const element of document.querySelectorAll('body *')) {
          const style = getComputedStyle(element)
          const rect = element.getBoundingClientRect()
          if (!visible(element, style, rect)) continue
          const isIntentionallyOffCanvas = style.position === 'fixed' && (rect.right <= 0 || rect.left >= viewportWidth)
          if (!isIntentionallyOffCanvas && (rect.left < -2 || rect.right > viewportWidth + 2)) {
            overflowElements.push({ selector: selector(element), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) })
          }
          const text = element.children.length === 0 ? element.textContent.trim() : ''
          const fontSize = Number.parseFloat(style.fontSize)
          if (text && fontSize < 11 && rect.width > 10) tinyText.push({ selector: selector(element), fontSize, text: text.slice(0, 50) })
          if (viewportWidth <= 480 && element.matches('a,button,input,select,textarea')) {
            if (rect.width < 40 || rect.height < 40) undersizedControls.push({ selector: selector(element), width: Math.round(rect.width), height: Math.round(rect.height) })
          }
        }

        return {
          title: document.title,
          viewportWidth,
          documentWidth: Math.max(root.scrollWidth, body.scrollWidth),
          horizontalOverflow: Math.max(root.scrollWidth, body.scrollWidth) - viewportWidth,
          overflowElements: overflowElements.slice(0, 20),
          tinyText: tinyText.slice(0, 20),
          undersizedControls: undersizedControls.slice(0, 20),
          imagesWithoutAlt: [...document.images].filter((image) => !image.hasAttribute('alt')).length,
        }
      })

      if (viewport.name === 'mobile-390' && process.env.AUDIT_SCREENSHOTS !== 'false') {
        const slug = route === '/' ? 'catalogo' : route.replace(/^\/+|\/+$/g, '').replaceAll('/', '--')
        await page.screenshot({ path: `${outputDirectory}/${slug}.png`, fullPage: true })
      }
    } catch (error) {
      navigationError = error.message
    }

    results.push({ route, viewport: viewport.name, status, navigationError, runtimeErrors, consoleErrors, metrics })
    page.off('pageerror', onPageError)
    page.off('console', onConsole)
  }

  await context.close()
}

await browser.close()
await writeFile(`${outputDirectory}/report.json`, JSON.stringify(results, null, 2))

const failures = results.filter((result) => result.navigationError || result.runtimeErrors.length || result.consoleErrors.length || result.status !== 200 || (result.metrics?.horizontalOverflow ?? 0) > 2)
const summary = {
  routes: routes.length,
  viewports: viewports.length,
  checks: results.length,
  failures: failures.length,
  overflowFailures: failures.filter((result) => (result.metrics?.horizontalOverflow ?? 0) > 2).length,
  runtimeFailures: failures.filter((result) => result.runtimeErrors.length || result.consoleErrors.length).length,
  affectedRoutes: [...new Set(failures.map((result) => result.route))],
}

console.log(JSON.stringify(summary, null, 2))
if (failures.length) console.log(JSON.stringify(failures, null, 2))
