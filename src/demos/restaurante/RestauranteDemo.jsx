import '@fontsource-variable/cormorant-garamond'
import '@fontsource-variable/manrope'
import { useEffect } from 'react'
import { ArrowDown, ArrowRight, CalendarDays, Clock3, Flame, MapPin, Users } from 'lucide-react'
import heroImage from '../../assets/restaurante/brasa-hero.jpg'
import roomImage from '../../assets/restaurante/brasa-room.jpg'
import dishImage from '../../assets/restaurante/brasa-dish.jpg'
import './restaurante.css'

const menu = [
  { course: 'Para empezar', name: 'Arepa de maíz morado', detail: 'queso de cabra · ají dulce · hojas tiernas', price: '9' },
  { course: 'De la huerta', name: 'Calabaza a la brasa', detail: 'crema ácida · semillas tostadas · salvia', price: '14' },
  { course: 'Del fuego', name: 'Pescado del día', detail: 'mantequilla ahumada · limón · vegetales', price: '23' },
  { course: 'Del fuego', name: 'Costilla cocida lento', detail: 'tamarindo · tubérculos · cebolla quemada', price: '28' },
  { course: 'Algo dulce', name: 'Cacao, café y sal', detail: 'chocolate 70% · café frío · caramelo', price: '10' },
]

export default function RestauranteDemo() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView()
    })
  }, [])

  return (
    <div className="restaurant-site">
      <a className="demo-skip" href="#restaurant-main">Saltar al contenido</a>

      <header className="restaurant-header">
        <a className="restaurant-logo" href="#inicio" aria-label="Brasa, ir al inicio">
          Brasa<span>Caracas</span>
        </a>
        <p><MapPin aria-hidden="true" /> La Castellana · CCS</p>
        <nav aria-label="Navegación del restaurante">
          <a href="#propuesta">Propuesta</a>
          <a href="#menu">Carta</a>
          <a href="#espacio">El espacio</a>
        </nav>
        <a className="restaurant-book" href="#reservas">Reservar</a>
      </header>

      <main id="restaurant-main">
        <section className="restaurant-hero" id="inicio" aria-labelledby="restaurant-title">
          <img
            alt="Chef terminando un plato junto al fuego de la cocina de Brasa"
            fetchPriority="high"
            height="1402"
            src={heroImage}
            width="1122"
          />
          <div className="restaurant-hero-shade" />
          <div className="restaurant-hero-copy">
            <p><Flame aria-hidden="true" /> Producto local · cocina de fuego</p>
            <h1 id="restaurant-title">El fuego<br />también tiene<br /><em>memoria.</em></h1>
          </div>
          <a className="restaurant-scroll" href="#propuesta">
            Descubrir Brasa <ArrowDown aria-hidden="true" />
          </a>
          <p className="restaurant-service">Servicio de martes a domingo<br />Almuerzo · Cena</p>
        </section>

        <section className="restaurant-intro" id="propuesta" aria-labelledby="proposal-title">
          <p className="restaurant-overline">Nuestra propuesta</p>
          <div className="restaurant-intro-copy">
            <h2 id="proposal-title">Cocinamos cerca,<br />pensamos en <em>temporadas.</em></h2>
            <div>
              <p>Brasa es una cocina abierta al paisaje venezolano. Elegimos ingredientes que cuentan de dónde vienen y los acercamos al fuego con paciencia, sin esconder su carácter.</p>
              <p>La carta cambia con la cosecha, la pesca y las conversaciones diarias con quienes producen.</p>
            </div>
          </div>
          <dl className="restaurant-values">
            <div><dt>12</dt><dd>platos en una carta breve</dd></div>
            <div><dt>80%</dt><dd>producto de origen local</dd></div>
            <div><dt>01</dt><dd>fuego encendido cada día</dd></div>
          </dl>
        </section>

        <section className="restaurant-menu" id="menu" aria-labelledby="menu-title">
          <div className="restaurant-dish">
            <img alt="Calabaza a la brasa con hierbas y semillas tostadas" height="1024" loading="lazy" src={dishImage} width="1536" />
            <p><span>Plato de temporada</span>Calabaza · crema ácida · salvia</p>
          </div>
          <div className="restaurant-menu-copy">
            <p className="restaurant-overline">Carta de temporada</p>
            <h2 id="menu-title">Hoy en<br />la mesa</h2>
            <div className="restaurant-menu-list">
              {menu.map((item) => (
                <article key={item.name}>
                  <span>{item.course}</span>
                  <div><h3>{item.name}</h3><p>{item.detail}</p></div>
                  <strong>${item.price}</strong>
                </article>
              ))}
            </div>
            <p className="restaurant-menu-note">Carta ilustrativa · pregunta por alérgenos y opciones vegetarianas.</p>
          </div>
        </section>

        <section className="restaurant-room" id="espacio" aria-labelledby="room-title">
          <img alt="Salón cálido de Brasa preparado antes del servicio" height="936" loading="lazy" src={roomImage} width="1664" />
          <div>
            <p className="restaurant-overline">El espacio</p>
            <h2 id="room-title">Una cocina que se ve.<br />Una mesa que se comparte.</h2>
            <p>El salón rodea la cocina abierta. Desde cualquier mesa se escuchan las brasas, se percibe el movimiento del equipo y se entiende de dónde llega cada plato.</p>
            <a href="#reservas">Encontrar una mesa <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <section className="restaurant-reservation" id="reservas" aria-labelledby="reservation-title">
          <div>
            <p className="restaurant-overline">Reservas</p>
            <h2 id="reservation-title">Nos vemos<br /><em>alrededor del fuego.</em></h2>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label><CalendarDays aria-hidden="true" /><span>Fecha<small>18 de noviembre</small></span><button type="button" aria-label="Cambiar fecha">Cambiar</button></label>
            <label><Clock3 aria-hidden="true" /><span>Hora<small>8:30 PM</small></span><button type="button" aria-label="Cambiar hora">Cambiar</button></label>
            <label><Users aria-hidden="true" /><span>Personas<small>2 comensales</small></span><button type="button" aria-label="Cambiar número de personas">Cambiar</button></label>
            <button className="restaurant-submit" type="submit">Buscar disponibilidad <ArrowRight aria-hidden="true" /></button>
          </form>
          <p className="restaurant-reservation-note">Esta reserva es una interacción demostrativa. No se envían datos.</p>
        </section>
      </main>

      <footer className="restaurant-footer">
        <a className="restaurant-logo" href="#inicio">Brasa<span>Caracas</span></a>
        <div><p>Av. Principal de La Castellana</p><p>Caracas, Venezuela</p></div>
        <div><a href="tel:+580000000000">+58 000 000 0000</a><a href="mailto:hola@brasa.demo">hola@brasa.demo</a></div>
        <a className="catalog-return" href="../">← Todas las demos</a>
      </footer>
    </div>
  )
}
