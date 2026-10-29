import '@fontsource-variable/instrument-sans'
import { useState } from 'react'
import { ArrowRight, CalendarDays, Clock3, Dumbbell, MapPin, Menu, ShieldCheck, Users, Zap } from 'lucide-react'
import heroImage from '../../assets/fitness/fitness-hero.jpg'
import zonesImage from '../../assets/fitness/fitness-zones.jpg'
import spinningImage from '../../assets/fitness/fitness-spinning.jpg'
import './fitness-full.css'

const zones = [
  ['01', 'Fuerza libre', '12 racks, plataformas olímpicas, mancuernas hasta 50 kg y bancos regulables.', 'Nivel 01'],
  ['02', 'Máquinas', 'Circuito guiado para tren superior e inferior, poleas dobles y equipos convergentes.', 'Nivel 01'],
  ['03', 'Cardio', 'Cintas, bicicletas, remos y escaladoras con seguimiento de rendimiento.', 'Nivel 02'],
  ['04', 'Zona funcional', 'Césped de 25 metros, trineos, kettlebells, cuerdas y espacio para movilidad.', 'Nivel 02'],
]

const trainers = [
  ['VR', 'Valentina Rojas', 'Fuerza y movilidad', '8 años', 'NSCA · FMS', 'Lun / Mié / Vie'],
  ['DM', 'Diego Méndez', 'Hipertrofia y técnica', '10 años', 'ISSA · Powerlifting', 'Mar / Jue / Sáb'],
  ['AC', 'Andrea Castillo', 'Cycling y resistencia', '6 años', 'Spinning® · RCP', 'Lun a Jue'],
  ['LM', 'Luis Marcano', 'Boxeo y acondicionamiento', '9 años', 'FEVEB · TRX', 'Mié a Dom'],
]

const classSchedule = {
  Lunes: [['06:00', 'Pulso Ride', 'Andrea', 'Cycling', '45 min'], ['07:15', 'Fuerza Base', 'Valentina', 'Fuerza', '50 min'], ['12:30', 'Core Express', 'Diego', 'Core', '30 min'], ['17:30', 'Box Lab', 'Luis', 'Boxeo', '45 min'], ['19:00', 'Ride After Dark', 'Andrea', 'Cycling', '50 min']],
  Martes: [['06:30', 'Engine', 'Luis', 'HIIT', '45 min'], ['08:00', 'Move Better', 'Valentina', 'Movilidad', '40 min'], ['17:00', 'Glúteos + Piernas', 'Diego', 'Fuerza', '50 min'], ['18:15', 'Pulso Ride', 'Andrea', 'Cycling', '45 min'], ['19:30', 'Yoga Reset', 'Camila', 'Movilidad', '55 min']],
  Miércoles: [['06:00', 'Fuerza Base', 'Valentina', 'Fuerza', '50 min'], ['07:15', 'Pulso Ride', 'Andrea', 'Cycling', '45 min'], ['12:30', 'Core Express', 'Diego', 'Core', '30 min'], ['18:00', 'Box Lab', 'Luis', 'Boxeo', '45 min'], ['19:15', 'Metcon 45', 'Valentina', 'HIIT', '45 min']],
  Jueves: [['06:30', 'Ride & Climb', 'Andrea', 'Cycling', '50 min'], ['08:00', 'Move Better', 'Valentina', 'Movilidad', '40 min'], ['17:00', 'Tren Superior', 'Diego', 'Fuerza', '50 min'], ['18:15', 'Engine', 'Luis', 'HIIT', '45 min'], ['19:30', 'Yoga Reset', 'Camila', 'Movilidad', '55 min']],
  Viernes: [['06:00', 'Full Body', 'Valentina', 'Fuerza', '50 min'], ['07:15', 'Pulso Ride', 'Andrea', 'Cycling', '45 min'], ['12:30', 'Core Express', 'Diego', 'Core', '30 min'], ['17:30', 'Box Lab', 'Luis', 'Boxeo', '45 min'], ['18:45', 'Friday Ride', 'Andrea', 'Cycling', '55 min']],
  Sábado: [['08:00', 'Run Club', 'Luis', 'Cardio', '60 min'], ['09:30', 'Fuerza Base', 'Diego', 'Fuerza', '50 min'], ['11:00', 'Ride Weekend', 'Andrea', 'Cycling', '50 min'], ['12:15', 'Mobility Lab', 'Valentina', 'Movilidad', '45 min']],
  Domingo: [['09:00', 'Yoga Flow', 'Camila', 'Movilidad', '60 min'], ['10:30', 'Community Ride', 'Andrea', 'Cycling', '50 min'], ['12:00', 'Open Box', 'Luis', 'Boxeo', '45 min']],
}

const events = [
  ['08 NOV', 'Night Ride: edición neón rojo', 'Spinning', '7:30 PM', '12 cupos'],
  ['15 NOV', 'Taller de técnica: peso muerto', 'Fuerza', '10:00 AM', '8 cupos'],
  ['29 NOV', 'Pulso Challenge por equipos', 'Comunidad', '9:00 AM', '24 cupos'],
]

export default function FitnessFullDemo() {
  const [activeDay, setActiveDay] = useState('Lunes')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="fitness-site">
      <a className="demo-skip" href="#fitness-main">Saltar al contenido</a>
      <header className="fitness-header">
        <a href="#inicio" className="fitness-logo" aria-label="Pulso Club, ir al inicio"><span>P</span>PULSO CLUB</a>
        <button className="fitness-menu-button" aria-expanded={menuOpen} aria-label="Abrir navegación" onClick={() => setMenuOpen((open) => !open)} type="button"><Menu aria-hidden="true" /></button>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Navegación del gimnasio">
          {['club', 'zonas', 'clases', 'entrenadores', 'eventos', 'horarios'].map((item) => <a href={`#${item}`} key={item} onClick={() => setMenuOpen(false)}>{item === 'club' ? 'El club' : item}</a>)}
        </nav>
        <a className="fitness-visit-link" href="#visita">Agenda una visita <ArrowRight aria-hidden="true" /></a>
      </header>

      <main id="fitness-main">
        <section className="fitness-hero" id="inicio" aria-labelledby="fitness-title">
          <img alt="Atleta entrenando peso muerto en las instalaciones de Pulso Club" fetchPriority="high" height="888" src={heroImage} width="1776" />
          <div className="fitness-hero-overlay" />
          <div className="fitness-hero-copy"><p><span /> Gimnasio integral · La Castellana</p><h1 id="fitness-title">TU RITMO.<br /><em>TU FUERZA.</em></h1><div><p>Entrena con libertad, recibe orientación real y encuentra una clase que encaje con tu semana.</p><a href="#clases">Ver clases <ArrowRight aria-hidden="true" /></a></div></div>
          <aside className="fitness-today" aria-label="Información de apertura"><span>Hoy</span><strong>5:30 AM — 11:00 PM</strong><small><i /> Abierto ahora</small></aside>
        </section>

        <section className="fitness-quick-info" aria-label="Datos principales del gimnasio">
          <div><Clock3 aria-hidden="true" /><span>Horario extendido</span><strong>7 días</strong></div><div><Dumbbell aria-hidden="true" /><span>Equipos y estaciones</span><strong>120+</strong></div><div><CalendarDays aria-hidden="true" /><span>Clases cada semana</span><strong>35</strong></div><div><Users aria-hidden="true" /><span>Entrenadores</span><strong>12</strong></div>
        </section>

        <section className="fitness-intro" id="club" aria-labelledby="club-title"><div className="fitness-kicker"><span>01</span> El club</div><div><h2 id="club-title">UN GIMNASIO PARA<br /><em>ENTRENAR DE VERDAD.</em></h2><div className="fitness-intro-copy"><p>Pulso reúne fuerza, cardio, entrenamiento funcional y clases colectivas en un mismo espacio. Puedes entrenar por tu cuenta o construir un plan con nuestro equipo.</p><p>La primera visita incluye un recorrido, orientación sobre equipos y una evaluación básica de movimiento sin costo.</p></div></div></section>

        <section className="fitness-zones" id="zonas" aria-labelledby="zones-title">
          <div className="fitness-zones-image"><img alt="Vista de las zonas de máquinas, peso libre, cardio y entrenamiento funcional" height="888" loading="lazy" src={zonesImage} width="1776" /><span>2.400 M² DE ENTRENAMIENTO</span></div>
          <div className="fitness-zones-content"><div className="fitness-kicker"><span>02</span> Instalaciones</div><h2 id="zones-title">ENCUENTRA<br />TU ZONA.</h2><div className="fitness-zone-list">{zones.map(([number, name, detail, tag]) => <article key={number}><span>{number}</span><div><h3>{name}</h3><p>{detail}</p></div><small>{tag}</small></article>)}</div></div>
        </section>

        <section className="fitness-classes" id="clases" aria-labelledby="classes-title">
          <div className="fitness-classes-heading"><div className="fitness-kicker"><span>03</span> Horario semanal</div><h2 id="classes-title">CLASES PARA<br /><em>MOVERTE MEJOR.</em></h2><p>Las clases están incluidas en la membresía. Filtra por día, revisa el entrenador y conoce la duración antes de reservar.</p></div>
          <div className="fitness-day-tabs" role="tablist" aria-label="Días de la semana">{Object.keys(classSchedule).map((day) => <button aria-selected={activeDay === day} key={day} onClick={() => setActiveDay(day)} role="tab" type="button">{day.slice(0, 3)}<span>{classSchedule[day].length}</span></button>)}</div>
          <div className="fitness-class-list" role="tabpanel"><div className="fitness-class-table-head"><span>Hora</span><span>Clase</span><span>Coach</span><span>Disciplina</span><span>Duración</span></div>{classSchedule[activeDay].map(([time, name, coach, type, duration]) => <article key={`${time}-${name}`}><strong>{time}</strong><h3>{name}</h3><span>{coach}</span><span className="fitness-class-type">{type}</span><span>{duration}</span><button aria-label={`Consultar ${name}`} type="button"><ArrowRight aria-hidden="true" /></button></article>)}</div>
          <p className="fitness-schedule-note">Horario demostrativo sujeto a cambios. Las reservas se habilitan 48 horas antes de cada clase.</p>
        </section>

        <section className="fitness-trainers" id="entrenadores" aria-labelledby="trainers-title">
          <div className="fitness-trainers-heading"><div className="fitness-kicker"><span>04</span> Entrenadores</div><h2 id="trainers-title">CONOCE A QUIEN<br />GUÍA TU PROCESO.</h2><p>Especialistas con enfoques distintos para ayudarte a entrenar con técnica, seguridad y un plan que puedas sostener.</p></div>
          <div className="fitness-trainer-grid">{trainers.map(([initials, name, role, experience, credentials, availability], index) => <article key={name}><div className="fitness-trainer-number">0{index + 1}</div><div className="fitness-trainer-avatar" aria-hidden="true">{initials}</div><h3>{name}</h3><p>{role}</p><dl><div><dt>Experiencia</dt><dd>{experience}</dd></div><div><dt>Certificaciones</dt><dd>{credentials}</dd></div><div><dt>Disponibilidad</dt><dd>{availability}</dd></div></dl><button type="button">Ver perfil <ArrowRight aria-hidden="true" /></button></article>)}</div>
        </section>

        <section className="fitness-events" id="eventos" aria-labelledby="events-title">
          <div className="fitness-event-feature"><img alt="Clase especial de spinning dirigida por una entrenadora" height="888" loading="lazy" src={spinningImage} width="1776" /><div><span>Evento destacado · 08 NOV</span><h2 id="events-title">NIGHT<br />RIDE.</h2><p>Una sesión especial de 60 minutos con música en vivo, bloques de potencia y cierre de recuperación.</p><button type="button">Reservar cupo <ArrowRight aria-hidden="true" /></button></div></div>
          <div className="fitness-event-list"><div className="fitness-kicker"><span>05</span> Próximos eventos</div>{events.map(([date, name, type, time, spots]) => <article key={name}><time>{date}</time><div><span>{type}</span><h3>{name}</h3></div><div><span>{time}</span><small>{spots}</small></div><button aria-label={`Consultar ${name}`} type="button"><ArrowRight aria-hidden="true" /></button></article>)}</div>
        </section>

        <section className="fitness-hours" id="horarios" aria-labelledby="hours-title">
          <div><div className="fitness-kicker"><span>06</span> Información práctica</div><h2 id="hours-title">VEN CUANDO<br />TE FUNCIONE.</h2></div>
          <div className="fitness-hours-grid"><article><Clock3 aria-hidden="true" /><h3>Horario del gimnasio</h3><dl><div><dt>Lunes a jueves</dt><dd>5:30 AM–11:00 PM</dd></div><div><dt>Viernes</dt><dd>5:30 AM–10:00 PM</dd></div><div><dt>Sábado</dt><dd>7:00 AM–9:00 PM</dd></div><div><dt>Domingo</dt><dd>8:00 AM–6:00 PM</dd></div></dl></article><article><MapPin aria-hidden="true" /><h3>Ubicación</h3><p>Av. Principal de La Castellana<br />Caracas, Venezuela</p><p>Estacionamiento validado · Bicicletero · Acceso sin escalones</p><a href="https://www.google.com/maps/search/?api=1&query=La+Castellana+Caracas" rel="noreferrer" target="_blank">Cómo llegar <ArrowRight aria-hidden="true" /></a></article><article><ShieldCheck aria-hidden="true" /><h3>Antes de entrenar</h3><p>Trae una identificación y ropa deportiva. Contamos con lockers, duchas, bebederos y estaciones de limpieza.</p><p>Los menores de 16 años deben asistir con representante.</p></article></div>
        </section>

        <section className="fitness-visit" id="visita"><div><Zap aria-hidden="true" /><span>¿Primera vez?</span><h2>CONOCE EL CLUB<br />ANTES DE INSCRIBIRTE.</h2></div><div><p>Agenda un recorrido de 20 minutos. Te mostramos las zonas, resolvemos dudas y recomendamos el mejor horario según tu rutina.</p><button type="button">Agendar visita <ArrowRight aria-hidden="true" /></button><small>Esta es una demostración. No se enviará ninguna información.</small></div></section>
      </main>

      <footer className="fitness-footer"><a href="#inicio" className="fitness-logo"><span>P</span>PULSO CLUB</a><div><strong>Entrena con intención.</strong><span>La Castellana · Caracas</span></div><div><a href="#clases">Clases</a><a href="#entrenadores">Entrenadores</a><a href="#horarios">Horarios</a></div><a className="catalog-return" href="../">← Todas las demos</a></footer>
    </div>
  )
}
