import { ArrowRight, ArrowUpRight, Search } from 'lucide-react'
import './blog.css'

const articles = [
  ['CIUDAD', 'La sombra también diseña la ciudad', '8 min'],
  ['CULTURA', 'Lo artesanal después del algoritmo', '6 min'],
  ['TECNOLOGÍA', 'Interfaces que saben cuándo callar', '10 min'],
  ['IDEAS', 'El valor de hacer una pregunta mejor', '5 min'],
]

export default function BlogDemo() {
  return (
    <div className="blog-site">
      <a className="demo-skip" href="#blog-main">Saltar al contenido</a>
      <header className="blog-header"><button type="button" aria-label="Buscar artículos"><Search/></button><a className="blog-logo" href="#inicio">TRAMA</a><a href="#newsletter">Newsletter</a></header>
      <nav className="blog-categories" aria-label="Categorías"><a href="#articulos">Ideas</a><a href="#articulos">Ciudad</a><a href="#articulos">Cultura</a><a href="#articulos">Tecnología</a><a href="#articulos">Conversaciones</a></nav>

      <main id="blog-main">
        <section className="blog-hero" id="inicio"><div className="blog-cover"><span>EDICIÓN 08</span><div className="cover-shape" aria-hidden="true"><i/><i/></div><small>OCTUBRE / 2026</small></div><article><p>ENSAYO / DISEÑO</p><h1>Las cosas que construimos también nos construyen.</h1><p>Una conversación sobre objetos, tecnología y las decisiones invisibles que terminan dando forma a nuestra vida cotidiana.</p><div><span>Por Elisa Moreno · 12 min</span><a href="#articulos">Leer artículo <ArrowRight/></a></div></article></section>

        <section className="blog-latest" id="articulos"><div className="blog-section-heading"><span>01 / ÚLTIMAS HISTORIAS</span><h2>Para leer sin prisa.</h2></div><div className="article-grid">{articles.map(([category,title,time],index) => <article key={title}><div className={`article-art art-${index + 1}`}><span>0{index + 1}</span></div><p>{category}</p><h3>{title}</h3><div><span>{time} de lectura</span><ArrowUpRight/></div></article>)}</div></section>

        <section className="blog-quote"><span>02 / NOTA DEL EDITOR</span><blockquote>“Publicamos menos para mirar mejor.”</blockquote><p>Trama es una revista ficticia sobre diseño, cultura y tecnología. Una demostración editorial pensada para priorizar lectura, jerarquía y ritmo.</p></section>

        <section className="blog-newsletter" id="newsletter"><div><p>UNA CARTA CADA DOS SEMANAS</p><h2>Ideas que vale la pena guardar.</h2></div><form><label htmlFor="blog-email">Tu correo electrónico</label><div><input id="blog-email" type="email" placeholder="nombre@email.com"/><button type="button">Suscribirme <ArrowRight/></button></div></form></section>
      </main>

      <footer className="blog-footer"><a className="catalog-return" href="../">← Todas las demos</a><strong>TRAMA / REVISTA DEMO</strong><span>© 2026</span></footer>
    </div>
  )
}
