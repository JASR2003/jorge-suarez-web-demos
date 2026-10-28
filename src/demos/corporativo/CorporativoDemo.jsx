import { ArrowDownRight, ArrowRight, ArrowUpRight, Factory, Globe2, ShieldCheck } from 'lucide-react'
import './corporativo.css'

const capabilities = [
  { icon: Factory, title: 'Ingeniería y ejecución', text: 'Proyectos industriales coordinados desde la planificación hasta la puesta en marcha.' },
  { icon: Globe2, title: 'Operación regional', text: 'Equipos y proveedores conectados en tres países de Latinoamérica.' },
  { icon: ShieldCheck, title: 'Seguridad verificable', text: 'Procesos documentados, indicadores claros y mejora continua.' },
]

export default function CorporativoDemo() {
  return (
    <div className="corporate-site">
      <a className="demo-skip" href="#corporate-main">Saltar al contenido</a>
      <header className="corporate-header"><a className="corporate-logo" href="#inicio"><span>A</span> ARISTA</a><nav aria-label="Navegación corporativa"><a href="#capacidades">Capacidades</a><a href="#sectores">Sectores</a><a href="#caso">Proyectos</a></nav><a href="#contacto">Contactar <ArrowUpRight/></a></header>

      <main id="corporate-main">
        <section className="corporate-hero" id="inicio"><div className="corporate-copy"><p>INFRAESTRUCTURA · INDUSTRIA · ENERGÍA</p><h1>Convertimos complejidad en <span>avance.</span></h1><p>Diseñamos y ejecutamos soluciones industriales con equipos técnicos, procesos transparentes y responsabilidad de principio a fin.</p><a href="#capacidades">Conocer capacidades <ArrowDownRight/></a></div><div className="corporate-visual" aria-hidden="true"><div className="blueprint"><i/><i/><i/><span>ARISTA<br/>SYSTEM 04</span></div></div><div className="corporate-stats"><div><strong>18</strong><span>años de experiencia</span></div><div><strong>74</strong><span>proyectos entregados</span></div><div><strong>3</strong><span>países</span></div></div></section>

        <section className="corporate-capabilities" id="capacidades"><div className="corporate-heading"><span>01 / CAPACIDADES</span><h2>Una estructura preparada para ejecutar.</h2><p>Integramos estrategia, ingeniería y operación para reducir fricción en proyectos que no admiten improvisación.</p></div><div className="capability-grid">{capabilities.map(({icon:Icon,title,text},index) => <article key={title}><span>0{index + 1}</span><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></section>

        <section className="corporate-sectors" id="sectores"><div><span>02 / SECTORES</span><h2>Experiencia donde el contexto importa.</h2></div><div>{['Manufactura','Energía','Logística','Infraestructura'].map((sector,index) => <p key={sector}><span>0{index + 1}</span><strong>{sector}</strong><ArrowRight/></p>)}</div></section>

        <section className="corporate-case" id="caso"><div className="case-visual"><span>CASE / 024</span></div><div><span>03 / CASO DESTACADO</span><h2>20% menos tiempo de parada.</h2><p>Rediseño y ejecución de una línea crítica de producción sin interrumpir la operación completa de planta.</p><a href="#caso">Ver caso completo <ArrowUpRight/></a></div></section>

        <section className="corporate-contact" id="contacto"><p>¿Tiene un proyecto complejo?</p><h2>Hablemos con claridad desde el inicio.</h2><a href="mailto:proyectos@example.com">proyectos@arista.demo <ArrowUpRight/></a></section>
      </main>

      <footer className="corporate-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>ARISTA INDUSTRIAL · DEMO</span><span>© 2026</span></footer>
    </div>
  )
}
