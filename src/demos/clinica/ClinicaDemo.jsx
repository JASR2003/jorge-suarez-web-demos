import { ArrowRight, CalendarDays, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react'
import './clinica.css'

const services = [
  { icon: Stethoscope, title: 'Medicina general', text: 'Evaluación integral y seguimiento para cuidar tu salud cotidiana.' },
  { icon: HeartPulse, title: 'Cardiología', text: 'Prevención, diagnóstico y acompañamiento cardiovascular.' },
  { icon: ShieldCheck, title: 'Chequeos preventivos', text: 'Planes claros según tu edad, historial y objetivos personales.' },
]

export default function ClinicaDemo() {
  return (
    <div className="clinic-site">
      <a className="demo-skip" href="#clinic-main">Saltar al contenido</a>
      <header className="clinic-header"><a className="clinic-logo" href="#inicio"><span>+</span> clara salud</a><nav aria-label="Navegación de la clínica"><a href="#servicios">Servicios</a><a href="#equipo">Especialistas</a><a href="#contacto">Contacto</a></nav><a className="clinic-appointment" href="#contacto"><CalendarDays aria-hidden="true"/> Solicitar cita</a></header>

      <main id="clinic-main">
        <section className="clinic-hero" id="inicio">
          <div className="clinic-copy"><p className="clinic-kicker"><span/> Atención cercana y coordinada</p><h1>Tu salud merece<br/><em>tiempo y claridad.</em></h1><p>Un equipo médico que escucha, explica y acompaña cada decisión con una mirada integral.</p><div><a href="#contacto">Solicitar una cita <ArrowRight aria-hidden="true"/></a><a href="#servicios">Conocer servicios</a></div></div>
          <div className="clinic-visual" aria-label="Representación del equipo de Clara Salud"><div className="clinic-portrait"><span>CS</span></div><div className="clinic-card"><small>Próxima disponibilidad</small><strong>Hoy · 3:30 PM</strong><span>Medicina general</span></div><div className="clinic-badge"><HeartPulse/><span>Atención<br/>integral</span></div></div>
        </section>

        <section className="clinic-services" id="servicios"><div className="clinic-heading"><span>01 / Especialidades</span><h2>Cuidado que se entiende.</h2><p>Información directa, tiempos claros y especialistas conectados alrededor de ti.</p></div><div className="service-grid">{services.map(({icon: Icon,title,text}) => <article key={title}><Icon aria-hidden="true"/><h3>{title}</h3><p>{text}</p><a href="#contacto">Más información <ArrowRight aria-hidden="true"/></a></article>)}</div></section>

        <section className="clinic-team" id="equipo"><div><span>02 / Equipo</span><h2>Profesionales que primero escuchan.</h2></div><div className="doctor-list"><article><div>AM</div><h3>Dra. Ana Méndez</h3><p>Medicina interna · 12 años de experiencia</p></article><article><div>CR</div><h3>Dr. Carlos Rivas</h3><p>Cardiología · Prevención cardiovascular</p></article></div></section>

        <section className="clinic-contact" id="contacto"><div><p>¿Necesitas orientación?</p><h2>Agenda una primera conversación.</h2></div><form><label>Nombre<input type="text" placeholder="Tu nombre"/></label><label>Especialidad<select defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Medicina general</option><option>Cardiología</option><option>Chequeo preventivo</option></select></label><button type="button">Consultar disponibilidad <ArrowRight/></button></form></section>
      </main>

      <footer className="clinic-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>Clara Salud · Concepto demostrativo</span><span>Lun–Sáb · 8:00–18:00</span></footer>
    </div>
  )
}
