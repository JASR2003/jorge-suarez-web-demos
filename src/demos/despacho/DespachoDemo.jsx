import { ArrowDown, ArrowUpRight, Scale } from 'lucide-react'
import './despacho.css'

const practices = [
  ['Derecho corporativo', 'Estructuras, contratos y decisiones empresariales con visión de largo plazo.'],
  ['Resolución de conflictos', 'Estrategias rigurosas para negociar, mediar y representar.'],
  ['Patrimonio y sucesiones', 'Planificación clara para proteger lo que has construido.'],
]

export default function DespachoDemo() {
  return (
    <div className="law-site">
      <a className="demo-skip" href="#law-main">Saltar al contenido</a>
      <header className="law-header"><a className="law-logo" href="#inicio"><Scale/><span>VARELA<br/><small>& ASOCIADOS</small></span></a><nav aria-label="Navegación del despacho"><a href="#areas">Áreas</a><a href="#firma">La firma</a><a href="#consulta">Consulta</a></nav><a href="#consulta" className="law-header-contact">Solicitar consulta</a></header>

      <main id="law-main">
        <section className="law-hero" id="inicio"><div className="law-hero-number">01</div><div className="law-hero-copy"><p>ESTRATEGIA LEGAL · CRITERIO EMPRESARIAL</p><h1>Claridad para decisiones que <em>importan.</em></h1><p>Acompañamos a empresas, familias y profesionales en asuntos complejos que exigen rigor, discreción y perspectiva.</p><a href="#areas">Conocer la firma <ArrowDown/></a></div><div className="law-monogram" aria-hidden="true"><span>V</span><i/></div></section>

        <section className="law-practices" id="areas"><div className="law-heading"><span>02 / ÁREAS DE PRÁCTICA</span><h2>Experiencia aplicada al contexto.</h2></div><div className="practice-list">{practices.map(([title,text],index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight aria-hidden="true"/></article>)}</div></section>

        <section className="law-firm" id="firma"><div className="law-portrait"><span>AV</span></div><div><span>03 / LA FIRMA</span><blockquote>“El mejor consejo legal no complica una decisión. La vuelve posible.”</blockquote><p>Durante más de quince años hemos unido análisis jurídico, entendimiento del negocio y comunicación directa.</p><strong>Adriana Varela</strong><small>Socia directora</small></div></section>

        <section className="law-consult" id="consulta"><div><p>CONVERSEMOS</p><h2>Cuéntenos qué necesita resolver.</h2></div><a href="mailto:consulta@example.com">Solicitar consulta confidencial <ArrowUpRight/></a></section>
      </main>

      <footer className="law-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>VARELA & ASOCIADOS · DEMO</span><span>CARACAS / MADRID</span></footer>
    </div>
  )
}
