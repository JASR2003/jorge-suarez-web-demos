import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { DemoCard } from './components/DemoCard.jsx'
import { demoFilters, demoIdeas } from './data/demos.js'

const principles = [
  {
    number: '01',
    title: 'Una necesidad real',
    description: 'Cada demo parte de una decisión comercial concreta: reservar, vender, explicar, comparar o contactar.',
  },
  {
    number: '02',
    title: 'Una identidad propia',
    description: 'La estructura, el contenido y el lenguaje visual cambian con el negocio. No son variaciones de una sola plantilla.',
  },
  {
    number: '03',
    title: 'Calidad de producción',
    description: 'Responsive, accesibilidad, rendimiento y SEO forman parte del concepto desde el primer componente.',
  },
]

const process = [
  ['Entender', 'Objetivo, público y acción principal.'],
  ['Dirigir', 'Contenido, estructura y sistema visual.'],
  ['Construir', 'Interfaz responsive e interacciones útiles.'],
  ['Validar', 'Accesibilidad, rendimiento y claridad.'],
]

function App() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleDemos = activeFilter === 'all'
    ? demoIdeas
    : demoIdeas.filter((demo) => demo.focus === activeFilter)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Jorge Suárez Web Demos, ir al inicio">
          <span>JS</span>
          <span>Web Demos</span>
        </a>

        <nav aria-label="Navegación principal">
          <a href="#catalogo">Demos</a>
          <a href="#criterios">Criterios</a>
          <a href="#proceso">Proceso</a>
        </nav>

        <a
          className="header-link"
          href="https://github.com/JASR2003/jorge-suarez-web-demos"
          rel="noreferrer"
          target="_blank"
        >
          Repositorio <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles aria-hidden="true" /> Archivo digital · 10 proyectos</p>
            <h1 id="hero-title">Sitios hechos para <em>mundos distintos.</em></h1>
            <p className="hero-lead">
              Una selección de experiencias completas para industrias reales. Entra a cada proyecto, recorre sus páginas y descubre una dirección visual diferente.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#catalogo">Explorar demos <ArrowDownRight aria-hidden="true" /></a>
              <a className="text-action" href="#criterios">Conocer el criterio</a>
            </div>
          </div>

          <div className="hero-board" aria-label="Principios de la colección">
            <div className="board-index">EDICIÓN / 2026</div>
            <div className="board-word board-word-one">10</div>
            <div className="board-word board-word-two">PROYECTOS</div>
            <div className="board-word board-word-three">ABIERTOS</div>
            <div className="board-seal" aria-hidden="true"><span>JS</span><small>WEB LAB</small></div>
            <p>Una colección para recorrer, comparar y entender cómo cambia una experiencia cuando cambia el negocio.</p>
          </div>
        </section>

        <section className="quality-strip" aria-label="Características de las demostraciones">
          {['Diseño específico', 'Responsive real', 'Accesibilidad', 'Rendimiento', 'SEO técnico'].map((item) => (
            <span key={item}><Check aria-hidden="true" /> {item}</span>
          ))}
        </section>

        <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
          <div className="section-intro">
            <p className="section-number">01 / Galería de proyectos</p>
            <div>
              <h2 id="catalog-title">Diez proyectos, diez identidades reconocibles.</h2>
              <p>Explora cada sitio desde una miniatura construida con su propio lenguaje visual. No son temas intercambiables: cada proyecto responde a una industria, una acción comercial y una estructura diferente.</p>
            </div>
          </div>

          <div className="catalog-toolbar">
            <div className="filter-list" aria-label="Filtrar demostraciones">
              {demoFilters.map((filter) => (
                <button
                  aria-pressed={activeFilter === filter.id}
                  className={activeFilter === filter.id ? 'is-active' : ''}
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  type="button"
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <p aria-live="polite">{visibleDemos.length} conceptos</p>
          </div>

          <div className="demo-grid">
            {visibleDemos.map((demo) => <DemoCard demo={demo} key={demo.slug} />)}
          </div>
        </section>

        <section className="principles-section" id="criterios" aria-labelledby="principles-title">
          <div className="section-intro section-intro-light">
            <p className="section-number">02 / Criterio</p>
            <div>
              <h2 id="principles-title">Una demo debe parecer una decisión, no un ejercicio.</h2>
              <p>La colección solo tendrá piezas capaces de explicar cómo pienso el diseño y cómo lo convierto en una experiencia funcional.</p>
            </div>
          </div>

          <div className="principles-grid">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="proceso" aria-labelledby="process-title">
          <div className="process-heading">
            <p className="section-number">03 / Método</p>
            <h2 id="process-title">De una industria a una experiencia propia.</h2>
          </div>

          <ol className="process-list">
            {process.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="closing-section">
          <p>Fin del índice / Inicio del recorrido</p>
          <h2>Elige un proyecto y entra en su mundo.</h2>
          <a href="#catalogo">Volver a las demos <ArrowUpRight aria-hidden="true" /></a>
        </section>
      </main>

      <footer>
        <div><strong>JS / WEB DEMOS</strong><span>Conceptos digitales para problemas reales.</span></div>
        <span>© {new Date().getFullYear()} Jorge Suárez</span>
        <a href="https://github.com/JASR2003" rel="noreferrer" target="_blank">GitHub <ArrowUpRight aria-hidden="true" /></a>
      </footer>
    </div>
  )
}

export default App
