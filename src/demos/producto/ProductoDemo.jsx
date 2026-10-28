import { ArrowRight, Check, Menu, Play, Sparkles, Zap } from 'lucide-react'
import './producto.css'

const features = [
  ['Organiza sin fricción', 'Proyectos, notas y decisiones viven en el mismo lugar.'],
  ['Automatiza lo repetitivo', 'Convierte procesos frecuentes en flujos claros y reutilizables.'],
  ['Entiende el progreso', 'Métricas simples para saber qué avanza y qué necesita atención.'],
]

export default function ProductoDemo() {
  return (
    <div className="product-site">
      <a className="demo-skip" href="#product-main">Saltar al contenido</a>
      <header className="product-header"><a className="product-logo" href="#inicio"><span><Zap/></span> orbit</a><nav aria-label="Navegación del producto"><a href="#producto">Producto</a><a href="#funciones">Funciones</a><a href="#precio">Precio</a></nav><div><a href="#precio">Iniciar sesión</a><a href="#precio">Probar gratis <ArrowRight/></a></div><button type="button" aria-label="Abrir menú"><Menu/></button></header>

      <main id="product-main">
        <section className="product-hero" id="inicio"><div className="product-pill"><Sparkles/> Ahora con automatizaciones inteligentes</div><h1>Menos trabajo sobre el trabajo.</h1><p>Orbit reúne proyectos, decisiones y automatizaciones para que tu equipo pueda concentrarse en avanzar.</p><div className="product-actions"><a href="#precio">Empieza gratis <ArrowRight/></a><button type="button"><Play/> Ver demo de 90 segundos</button></div><div className="dashboard" id="producto"><aside><div className="dash-logo">O</div>{['Inicio','Proyectos','Automatizaciones','Reportes'].map((item,index) => <span className={index === 1 ? 'active' : ''} key={item}>{item}</span>)}</aside><div className="dash-main"><div className="dash-top"><p><small>PROYECTO</small>Lanzamiento Q4</p><span>+ Nueva tarea</span></div><div className="dash-columns"><div><strong>POR HACER</strong><article><span>ESTRATEGIA</span><h3>Definir propuesta de valor</h3><p>Hoy · Ana</p></article><article><span>DISEÑO</span><h3>Validar nuevo flujo</h3><p>Miércoles · Luis</p></article></div><div><strong>EN PROGRESO</strong><article><span>PRODUCTO</span><h3>Preparar onboarding</h3><p>Viernes · Marta</p></article></div><div><strong>LISTO</strong><article><span>RESEARCH</span><h3>Entrevistas iniciales</h3><p>Completado</p></article></div></div></div></div></section>

        <section className="product-features" id="funciones"><div><span>01 / FUNCIONES</span><h2>Todo lo necesario.<br/>Nada que estorbe.</h2></div><div className="feature-list">{features.map(([title,text],index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

        <section className="product-pricing" id="precio"><div><span>02 / PRECIO SIMPLE</span><h2>Empieza pequeño.<br/>Crece sin cambiar de herramienta.</h2></div><div className="pricing-card"><p>ORBIT PRO</p><strong>$12<small>por usuario / mes</small></strong><ul><li><Check/>Proyectos ilimitados</li><li><Check/>Automatizaciones</li><li><Check/>Reportes y permisos</li></ul><button type="button">Probar durante 14 días <ArrowRight/></button><small>Sin tarjeta de crédito</small></div></section>
      </main>

      <footer className="product-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>ORBIT — PRODUCT LANDING DEMO</span><span>© 2026</span></footer>
    </div>
  )
}
