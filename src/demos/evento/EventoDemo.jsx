import { ArrowRight, CalendarPlus, MapPin } from 'lucide-react'
import './evento.css'

const talks = [
  ['09:00', 'Diseñar para un mundo que cambia', 'Lucía Torres'],
  ['10:30', 'Productos que la gente recuerda', 'Mateo Silva'],
  ['14:00', 'IA, cultura y nuevas interfaces', 'Sara Kim'],
  ['16:30', 'Construir sin perder el criterio', 'Panel abierto'],
]

export default function EventoDemo() {
  return (
    <div className="event-site">
      <a className="demo-skip" href="#event-main">Saltar al contenido</a>
      <header className="event-header"><a href="#inicio" className="event-logo">FUTURA<span>26</span></a><nav aria-label="Navegación del evento"><a href="#agenda">Agenda</a><a href="#ponentes">Ponentes</a><a href="#entradas">Entradas</a></nav><a href="#entradas">Comprar entrada <ArrowRight/></a></header>

      <main id="event-main">
        <section className="event-hero" id="inicio"><div className="event-meta"><p>CONFERENCIA DE DISEÑO + TECNOLOGÍA</p><p><MapPin/> CARACAS · 18 OCT 2026</p></div><h1>IDEAS PARA<br/><span>LO QUE SIGUE.</span></h1><div className="event-hero-bottom"><p>Un día para explorar cómo el diseño, la tecnología y la cultura están cambiando la manera de construir.</p><a href="#entradas">Reserva tu lugar <ArrowRight/></a><div className="event-count"><span><strong>01</strong>DÍAS</span><span><strong>08</strong>HORAS</span><span><strong>42</strong>MIN</span></div></div><div className="event-star" aria-hidden="true">✦</div></section>

        <section className="event-agenda" id="agenda"><div className="event-heading"><span>01 / AGENDA</span><h2>UNA JORNADA.<br/>CUATRO CONVERSACIONES.</h2><a href="#agenda"><CalendarPlus/> Añadir al calendario</a></div><div className="talk-list">{talks.map(([time,title,speaker]) => <article key={time}><time>{time}</time><h3>{title}</h3><p>{speaker}</p><ArrowRight/></article>)}</div></section>

        <section className="event-speakers" id="ponentes"><div><span>02 / PERSONAS</span><h2>VOCES QUE MUEVEN LA CONVERSACIÓN.</h2></div><div className="speaker-grid">{[['LT','Lucía Torres','Diseño estratégico'],['MS','Mateo Silva','Producto digital'],['SK','Sara Kim','Investigación + IA']].map(([initials,name,role]) => <article key={name}><div>{initials}</div><h3>{name}</h3><p>{role}</p></article>)}</div></section>

        <section className="event-tickets" id="entradas"><div><p>ENTRADA GENERAL</p><strong>$45</strong><span>Acceso completo · Café · Material digital</span></div><h2>Nos vemos<br/>en Futura.</h2><button type="button">Comprar entrada <ArrowRight/></button></section>
      </main>

      <footer className="event-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>FUTURA 26 · EVENT DEMO</span><span>18 OCT / CARACAS</span></footer>
    </div>
  )
}
