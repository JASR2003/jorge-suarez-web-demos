import { ArrowDownRight, ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import './restaurante.css'

const menu = [
  { name: 'Tostada de masa madre', detail: 'Tomate confitado, ricotta y albahaca', price: '$8' },
  { name: 'Huevos al fuego', detail: 'Papas crujientes, ají dulce y hierbas', price: '$11' },
  { name: 'Pollo de corral', detail: 'Puré ahumado y vegetales de temporada', price: '$17' },
  { name: 'Tarta de cacao', detail: 'Chocolate oscuro, sal marina y café', price: '$7' },
]

export default function RestauranteDemo() {
  return (
    <div className="restaurant-site">
      <a className="demo-skip" href="#restaurant-main">Saltar al contenido</a>
      <header className="restaurant-header">
        <a className="restaurant-logo" href="#inicio">BRASA<span>®</span></a>
        <nav aria-label="Navegación del restaurante"><a href="#menu">Menú</a><a href="#historia">Historia</a><a href="#visitanos">Visítanos</a></nav>
        <a className="restaurant-book" href="#visitanos">Reservar mesa <ArrowUpRight aria-hidden="true" /></a>
      </header>

      <main id="restaurant-main">
        <section className="restaurant-hero" id="inicio">
          <div className="restaurant-hero-copy">
            <p>Restaurante de temporada · Caracas</p>
            <h1>Fuego lento.<br/><em>Sabor directo.</em></h1>
            <div><p>Ingredientes cercanos, platos honestos y una cocina abierta que cambia con cada estación.</p><a href="#menu">Ver el menú <ArrowDownRight aria-hidden="true" /></a></div>
          </div>
          <div className="restaurant-plate" aria-label="Plato destacado: pollo de corral con vegetales">
            <div className="plate-food"><i/><i/><i/></div>
            <span>PLATO 04</span><strong>Pollo de corral</strong><small>vegetales · hierbas · fuego</small>
          </div>
        </section>

        <section className="restaurant-menu" id="menu">
          <div className="restaurant-heading"><span>01 / Menú</span><h2>Lo que servimos hoy.</h2><p>Una carta corta que respeta el producto y deja espacio para volver.</p></div>
          <div className="menu-list">{menu.map((item) => <article key={item.name}><div><h3>{item.name}</h3><p>{item.detail}</p></div><strong>{item.price}</strong></article>)}</div>
          <p className="menu-note">Pregunta por opciones vegetarianas y alérgenos. Precios de demostración.</p>
        </section>

        <section className="restaurant-story" id="historia">
          <div className="story-mark">B</div>
          <div><span>02 / Nuestra mesa</span><h2>Cocinar también es cuidar el ritmo.</h2><p>Brasa nació alrededor de una mesa compartida. Compramos poco, cocinamos a diario y trabajamos con productores que conocemos por su nombre.</p></div>
          <blockquote>“Menos artificio.<br/>Más producto.”</blockquote>
        </section>

        <section className="restaurant-visit" id="visitanos">
          <div><p>Ven a Brasa</p><h2>Tu mesa está casi lista.</h2><a href="tel:+580000000000">Reservar por teléfono <ArrowUpRight aria-hidden="true" /></a></div>
          <div className="visit-details"><p><MapPin aria-hidden="true"/><span>Av. Principal, Caracas<br/>Venezuela</span></p><p><Clock3 aria-hidden="true"/><span>Mar–Dom<br/>12:00–23:00</span></p></div>
        </section>
      </main>

      <footer className="restaurant-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>BRASA / CONCEPTO DEMO</span><span>© 2026</span></footer>
    </div>
  )
}
