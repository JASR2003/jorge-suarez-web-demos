import { ArrowRight, Check, Play } from 'lucide-react'
import './fitness.css'

const sessions = [
  ['FUERZA', '45 MIN', 'Construye una base sólida con movimientos esenciales.'],
  ['MOVE', '30 MIN', 'Movilidad, control y recuperación para todos los niveles.'],
  ['ENGINE', '40 MIN', 'Condicionamiento completo, ritmo y resistencia.'],
]

export default function FitnessDemo() {
  return (
    <div className="fitness-site">
      <a className="demo-skip" href="#fitness-main">Saltar al contenido</a>
      <header className="fitness-header"><a href="#inicio" className="fitness-logo">PULSO<span>/45</span></a><nav aria-label="Navegación fitness"><a href="#programas">Programas</a><a href="#planes">Planes</a><a href="#horarios">Horarios</a></nav><a className="fitness-join" href="#planes">Empieza hoy <ArrowRight aria-hidden="true"/></a></header>

      <main id="fitness-main">
        <section className="fitness-hero" id="inicio">
          <div className="fitness-tag">ENTRENAMIENTO FUNCIONAL · TODOS LOS NIVELES</div>
          <h1>ENTRENA<br/>CON <span>INTENCIÓN.</span></h1>
          <div className="fitness-hero-bottom"><p>Sesiones cortas, progreso medible y una comunidad que te ayuda a mantener el ritmo.</p><a href="#programas"><Play aria-hidden="true"/> Ver programas</a><div><strong>45</strong><span>minutos para<br/>cambiar el día</span></div></div>
          <div className="fitness-orbit" aria-hidden="true"><span>MOVE</span><span>BUILD</span><span>REPEAT</span></div>
        </section>

        <section className="fitness-programs" id="programas">
          <div className="fitness-section-title"><span>01</span><h2>ELIGE TU<br/>PRÓXIMO RETO</h2></div>
          <div className="session-grid">{sessions.map(([name, time, text], index) => <article key={name}><div><span>0{index + 1}</span><span>{time}</span></div><h3>{name}</h3><p>{text}</p><a href="#horarios">Ver horario <ArrowRight aria-hidden="true"/></a></article>)}</div>
        </section>

        <section className="fitness-plan" id="planes">
          <div><span>02 / PLAN DESTACADO</span><h2>TODO EL GIMNASIO.<br/>SIN EXCUSAS.</h2><p>Acceso ilimitado, evaluación inicial y seguimiento mensual.</p></div>
          <div className="plan-card"><p>PLAN PULSO</p><strong>$39<small>/mes</small></strong><ul><li><Check/>Sesiones ilimitadas</li><li><Check/>Evaluación de movimiento</li><li><Check/>Rutinas complementarias</li></ul><button type="button">Quiero empezar</button></div>
        </section>

        <section className="fitness-schedule" id="horarios"><div><span>03 / HORARIOS</span><h2>ENCUENTRA<br/>TU MOMENTO.</h2></div><div className="schedule-table">{['06:00 — Fuerza','08:00 — Move','17:30 — Engine','19:00 — Fuerza'].map((time) => <p key={time}><span>LUN–VIE</span><strong>{time}</strong></p>)}</div></section>
      </main>

      <footer className="fitness-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>PULSO/45 — DEMO FITNESS</span><span>CARACAS · 2026</span></footer>
    </div>
  )
}
