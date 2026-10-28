import { ArrowRight, Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import './tienda.css'

const products = [
  { name: 'Lámpara Nube', category: 'Iluminación', price: '$64', code: 'LN', color: 'peach' },
  { name: 'Silla Uno', category: 'Mobiliario', price: '$128', code: 'S1', color: 'lilac' },
  { name: 'Jarrón Forma', category: 'Objetos', price: '$36', code: 'JF', color: 'mint' },
  { name: 'Mesa Baja', category: 'Mobiliario', price: '$210', code: 'MB', color: 'yellow' },
]

export default function TiendaDemo() {
  return (
    <div className="store-site">
      <a className="demo-skip" href="#store-main">Saltar al contenido</a>
      <header className="store-header"><button aria-label="Abrir menú" type="button"><Menu/></button><a className="store-logo" href="#inicio">FORMA</a><div><button aria-label="Buscar" type="button"><Search/></button><button aria-label="Bolsa de compra" type="button"><ShoppingBag/><span>0</span></button></div></header>

      <main id="store-main">
        <section className="store-hero" id="inicio"><div className="store-hero-copy"><p>NUEVA COLECCIÓN / 2026</p><h1>Objetos para una casa <em>más tuya.</em></h1><p>Diseño cotidiano, materiales honestos y piezas que hacen espacio para tu manera de vivir.</p><a href="#productos">Ver colección <ArrowRight/></a></div><div className="store-hero-object" aria-label="Lámpara Nube, producto destacado"><div className="lamp"><i/><span/></div><p><span>01</span><strong>Lámpara Nube</strong><small>$64</small></p></div></section>

        <section className="store-products" id="productos"><div className="store-heading"><span>01 / Selección</span><h2>Nuevas formas de habitar.</h2><div><button type="button">Todo</button><button type="button">Mobiliario</button><button type="button">Objetos</button></div></div><div className="product-grid">{products.map((product) => <article key={product.name}><div className={`product-object ${product.color}`}><span>{product.code}</span><button aria-label={`Guardar ${product.name}`} type="button"><Heart/></button></div><div><p>{product.category}</p><h3>{product.name}</h3><strong>{product.price}</strong></div></article>)}</div></section>

        <section className="store-manifest"><span>02 / FORMA</span><h2>Compramos menos.<br/>Elegimos mejor.</h2><p>Una colección pequeña de piezas funcionales producidas en series limitadas por talleres locales.</p><div><span>Materiales duraderos</span><span>Producción local</span><span>Envíos nacionales</span></div></section>

        <section className="store-newsletter"><p>Ideas para vivir mejor, sin llenar tu bandeja.</p><form><label className="sr-only" htmlFor="store-email">Correo electrónico</label><input id="store-email" type="email" placeholder="tu@email.com"/><button type="button">Suscribirme <ArrowRight/></button></form></section>
      </main>

      <footer className="store-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>FORMA — TIENDA DEMO</span><span>CATÁLOGO ESTÁTICO</span></footer>
    </div>
  )
}
