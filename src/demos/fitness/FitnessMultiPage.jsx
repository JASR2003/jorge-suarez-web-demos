import '@fontsource-variable/instrument-sans'
import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Clock3, Dumbbell, MapPin, Menu, ShieldCheck, Users, Zap } from 'lucide-react'
import heroImage from '../../assets/fitness/fitness-hero.jpg'
import zonesImage from '../../assets/fitness/fitness-zones.jpg'
import spinningImage from '../../assets/fitness/fitness-spinning.jpg'
import './fitness-full.css'
import './fitness-pages.css'

const base = '/fitness'
const nav = [['Instalaciones', 'instalaciones'], ['Clases', 'clases'], ['Entrenadores', 'entrenadores'], ['Eventos', 'eventos'], ['Horarios', 'horarios']]

const equipment = [
  { icon: 'A', title: 'Peso libre', count: '184 piezas', items: [['Mancuernas hexagonales', '4 pares por peso · 2,5 a 70 kg'], ['Barras olímpicas', '12 de 20 kg · 6 de 15 kg'], ['Discos bumper', '2.400 kg totales · 5 a 25 kg'], ['Power racks', '12 estaciones'], ['Bancos regulables', '18 unidades'], ['Plataformas de peso muerto', '6 unidades']] },
  { icon: 'B', title: 'Máquinas de fuerza', count: '43 estaciones', items: [['Poleas duales regulables', '8 estaciones'], ['Prensa de piernas 45°', '3 unidades'], ['Hack squat', '2 unidades'], ['Extensión y curl femoral', '3 + 3 unidades'], ['Pecho y remo convergente', '4 + 4 unidades'], ['Smith machine', '5 unidades'], ['Máquinas selectorizadas', '14 estaciones']] },
  { icon: 'C', title: 'Cardio', count: '58 equipos', items: [['Cintas de correr', '18 unidades'], ['Bicicletas verticales', '12 unidades'], ['Elípticas', '10 unidades'], ['Escaladoras', '6 unidades'], ['Remos', '6 unidades'], ['Air bikes', '4 unidades'], ['Ski erg', '2 unidades']] },
  { icon: 'D', title: 'Funcional y movilidad', count: '900 m²', items: [['Césped funcional', '25 metros'], ['Trineos de empuje', '6 unidades'], ['Kettlebells', '8 a 40 kg'], ['Cajones pliométricos', '12 unidades'], ['Estaciones TRX', '10 puntos'], ['Zona de movilidad', '20 puestos'], ['Sacos de boxeo', '8 unidades']] },
]

const classTypes = [
  { name: 'Spinning', code: 'SPN', description: 'Resistencia cardiovascular, potencia y ritmo sobre bicicleta.', room: 'Studio Ride', capacity: 28, color: '#e52b20' },
  { name: 'Cross training', code: 'CRO', description: 'Fuerza y acondicionamiento mediante bloques escalables.', room: 'Arena funcional', capacity: 18, color: '#f08a24' },
  { name: 'Bailoterapia', code: 'BAI', description: 'Cardio coreografiado con ritmos latinos y trabajo coordinativo.', room: 'Studio Motion', capacity: 32, color: '#c93578' },
]

const weeklyClasses = [
  ['Lun', '06:00', 'Spinning', 'Andrea', '45 min'], ['Lun', '18:00', 'Cross training', 'Luis', '50 min'], ['Lun', '19:15', 'Bailoterapia', 'Mariana', '55 min'],
  ['Mar', '07:00', 'Cross training', 'Valentina', '50 min'], ['Mar', '17:30', 'Bailoterapia', 'Mariana', '55 min'], ['Mar', '19:00', 'Spinning', 'Andrea', '45 min'],
  ['Mié', '06:00', 'Spinning', 'Andrea', '45 min'], ['Mié', '18:00', 'Cross training', 'Luis', '50 min'], ['Mié', '19:15', 'Bailoterapia', 'Mariana', '55 min'],
  ['Jue', '07:00', 'Cross training', 'Valentina', '50 min'], ['Jue', '17:30', 'Bailoterapia', 'Mariana', '55 min'], ['Jue', '19:00', 'Spinning', 'Andrea', '45 min'],
  ['Vie', '06:30', 'Spinning', 'Andrea', '50 min'], ['Vie', '18:00', 'Cross training', 'Luis', '50 min'], ['Vie', '19:15', 'Bailoterapia', 'Mariana', '60 min'],
  ['Sáb', '09:00', 'Cross training', 'Valentina', '55 min'], ['Sáb', '10:30', 'Spinning', 'Andrea', '50 min'], ['Sáb', '12:00', 'Bailoterapia', 'Mariana', '60 min'],
]

const coaches = [
  { slug: 'valentina-rojas', initials: 'VR', name: 'Valentina Rojas', role: 'Fuerza y movimiento', years: 8, credentials: ['NSCA-CPT', 'FMS Nivel 2', 'Primeros auxilios'], focus: ['Fuerza inicial', 'Técnica de levantamientos', 'Movilidad'], bio: 'Ayuda a personas que comienzan a entrenar con pesas a construir una base segura, medible y sostenible.', schedule: 'Lun, mié y vie · 6:00 AM–2:00 PM' },
  { slug: 'diego-mendez', initials: 'DM', name: 'Diego Méndez', role: 'Hipertrofia y powerlifting', years: 10, credentials: ['ISSA', 'Powerlifting Coach', 'Nutrición deportiva'], focus: ['Ganancia muscular', 'Sentadilla', 'Press de banca'], bio: 'Diseña programas de hipertrofia y fuerza máxima con seguimiento de volumen, recuperación y técnica.', schedule: 'Mar, jue y sáb · 2:00 PM–9:00 PM' },
  { slug: 'andrea-castillo', initials: 'AC', name: 'Andrea Castillo', role: 'Spinning y resistencia', years: 6, credentials: ['Spinning® Instructor', 'RCP', 'Indoor Cycling Power'], focus: ['Potencia aeróbica', 'Resistencia', 'Cycling'], bio: 'Dirige sesiones de bicicleta basadas en ritmo, zonas de esfuerzo y progresión cardiovascular.', schedule: 'Lun a vie · 5:30 AM–10:00 AM / 5:00 PM–8:00 PM' },
  { slug: 'luis-marcano', initials: 'LM', name: 'Luis Marcano', role: 'Cross training y boxeo', years: 9, credentials: ['Cross Training L2', 'FEVEB', 'TRX'], focus: ['Acondicionamiento', 'Boxeo', 'Trabajo funcional'], bio: 'Combina fuerza, coordinación y resistencia con adaptaciones claras para diferentes niveles.', schedule: 'Mié a dom · 3:00 PM–9:00 PM' },
  { slug: 'mariana-salcedo', initials: 'MS', name: 'Mariana Salcedo', role: 'Bailoterapia', years: 7, credentials: ['Zumba®', 'Ritmos latinos', 'RCP'], focus: ['Cardio', 'Coordinación', 'Danza'], bio: 'Crea clases accesibles y enérgicas que mezclan salsa, merengue, urbano y entrenamiento cardiovascular.', schedule: 'Lun a sáb · 4:00 PM–8:30 PM' },
  { slug: 'camila-ortega', initials: 'CO', name: 'Camila Ortega', role: 'Movilidad y recuperación', years: 5, credentials: ['Yoga 300h', 'Mobility Specialist', 'Pilates Mat'], focus: ['Movilidad', 'Respiración', 'Recuperación'], bio: 'Trabaja movilidad activa, control corporal y recuperación para complementar el entrenamiento de fuerza.', schedule: 'Mar, jue y dom · 7:00 AM–1:00 PM' },
  { slug: 'samuel-perez', initials: 'SP', name: 'Samuel Pérez', role: 'Rendimiento deportivo', years: 11, credentials: ['CSCS', 'Velocidad y agilidad', 'Biomecánica'], focus: ['Atletas', 'Velocidad', 'Prevención'], bio: 'Programa fuerza y acondicionamiento para corredores, jugadores y deportistas recreativos.', schedule: 'Lun a vie · previa cita' },
]

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="fitness-header"><a href={`${base}/`} className="fitness-logo"><span>P</span>PULSO CLUB</a><button className="fitness-menu-button" aria-expanded={open} aria-label="Abrir navegación" onClick={() => setOpen(!open)} type="button"><Menu /></button><nav className={open ? 'is-open' : ''}>{nav.map(([label, route]) => <a href={`${base}/${route}/`} key={route}>{label}</a>)}</nav><a className="fitness-visit-link" href={`${base}/horarios/#visita`}>Agenda una visita <ArrowRight /></a></header>
}

function Footer() {
  return <footer className="fitness-footer"><a href={`${base}/`} className="fitness-logo"><span>P</span>PULSO CLUB</a><div><strong>Entrena con intención.</strong><span>La Castellana · Caracas</span></div><div>{nav.slice(0, 3).map(([label, route]) => <a href={`${base}/${route}/`} key={route}>{label}</a>)}</div><a className="catalog-return" href="../../">← Todas las demos</a></footer>
}

function PageHero({ eyebrow, title, text, action }) {
  return <section className="fitness-page-hero"><div><p>{eyebrow}</p><h1>{title}</h1><span>{text}</span></div>{action}</section>
}

function Home() {
  return <>
    <section className="fitness-home-hero"><img alt="Atleta entrenando peso muerto en Pulso Club" src={heroImage}/><div className="fitness-home-shade"/><div className="fitness-home-copy"><p>Gimnasio integral · La Castellana</p><h1>ENTRENA<br/><em>A TU MANERA.</em></h1><span>Información real para decidir cómo, cuándo y con quién entrenar.</span></div><a className="fitness-open-card" href={`${base}/horarios/`}><span>Hoy · Abierto</span><strong>5:30 AM–11:00 PM</strong><small>Ver todos los horarios <ArrowRight/></small></a></section>
    <section className="fitness-home-dashboard"><header><span>Explora el club</span><h2>TODO LO QUE NECESITAS,<br/>POR CATEGORÍA.</h2></header><div className="fitness-category-grid">
      <a className="category-card category-image" href={`${base}/instalaciones/`}><img alt="Zona de máquinas de Pulso Club" src={zonesImage}/><span>01</span><h3>Instalaciones y máquinas</h3><p>Inventario detallado, cantidades, pesos y servicios.</p><ArrowRight/></a>
      <a className="category-card" href={`${base}/clases/`}><CalendarDays/><span>02</span><h3>Clases y horario semanal</h3><p>Spinning, cross training y bailoterapia organizados por día.</p><strong>18 clases publicadas</strong><ArrowRight/></a>
      <a className="category-card" href={`${base}/entrenadores/`}><Users/><span>03</span><h3>Equipo de entrenadores</h3><p>Siete perfiles con experiencia, enfoque y disponibilidad.</p><strong>7 especialistas</strong><ArrowRight/></a>
      <a className="category-card category-red" href={`${base}/eventos/`}><Zap/><span>04</span><h3>Eventos del mes</h3><p>Retos, talleres y sesiones especiales para la comunidad.</p><strong>Próximo · Night Ride</strong><ArrowRight/></a>
      <a className="category-card category-wide" href={`${base}/horarios/`}><Clock3/><span>05</span><h3>Horarios, ubicación y visita</h3><p>Consulta apertura, horas con menor afluencia, cómo llegar y servicios disponibles.</p><ArrowRight/></a>
    </div></section>
  </>
}

function Facilities() {
  return <><PageHero eyebrow="Instalaciones / Inventario" title="SABES EXACTAMENTE QUÉ ENCONTRARÁS." text="Equipamiento organizado por zona, con cantidades reales de esta demostración." action={<img src={zonesImage} alt="Equipos y zonas de entrenamiento"/>}/><section className="equipment-summary"><div><strong>2.400</strong><span>m² totales</span></div><div><strong>285</strong><span>equipos y piezas</span></div><div><strong>04</strong><span>zonas principales</span></div><div><strong>02</strong><span>niveles</span></div></section><section className="equipment-catalog">{equipment.map((group) => <article key={group.title}><header><span>{group.icon}</span><div><h2>{group.title}</h2><p>{group.count}</p></div></header><ul>{group.items.map(([name, detail]) => <li key={name}><strong>{name}</strong><span>{detail}</span></li>)}</ul></article>)}</section><section className="amenities"><h2>SERVICIOS DEL CLUB</h2><div>{['Lockers de uso diario','Duchas con agua caliente','Bebederos filtrados','Wi-Fi para miembros','Estacionamiento validado','Acceso sin escalones','Zona de estiramiento','Evaluación inicial'].map((item) => <span key={item}><ShieldCheck/>{item}</span>)}</div></section></>
}

function Classes() {
  const [filter, setFilter] = useState('Todas')
  const visible = useMemo(() => filter === 'Todas' ? weeklyClasses : weeklyClasses.filter((item) => item[2] === filter), [filter])
  return <><PageHero eyebrow="Clases / Semana activa" title="TRES DISCIPLINAS. UNA SEMANA COMPLETA." text="Consulta horas, coach, duración y sala antes de elegir tu clase."/><section className="class-types">{classTypes.map((type) => <article key={type.name} style={{'--class-color':type.color}}><span>{type.code}</span><h2>{type.name}</h2><p>{type.description}</p><dl><div><dt>Sala</dt><dd>{type.room}</dd></div><div><dt>Cupos</dt><dd>{type.capacity}</dd></div></dl></article>)}</section><section className="weekly-board"><header><div><span>Horario semanal</span><h2>ELIGE TU CLASE</h2></div><div className="class-filters">{['Todas',...classTypes.map(x=>x.name)].map((name)=><button aria-pressed={filter===name} key={name} onClick={()=>setFilter(name)}>{name}</button>)}</div></header><div className="weekly-table"><div className="weekly-head"><span>Día</span><span>Hora</span><span>Clase</span><span>Coach</span><span>Duración</span></div>{visible.map(([day,time,name,coach,duration],index)=><article key={`${day}-${time}-${index}`}><strong>{day}</strong><time>{time}</time><h3>{name}</h3><span>{coach}</span><span>{duration}</span><button>Ver detalle <ArrowRight/></button></article>)}</div></section></>
}

function Trainers() {
  const [selected, setSelected] = useState(coaches[0])
  return <><PageHero eyebrow="Entrenadores / Equipo" title="SIETE FORMAS DE ACOMPAÑAR TU PROCESO." text="Selecciona un perfil para conocer experiencia, certificaciones y disponibilidad."/><section className="trainer-directory"><nav aria-label="Lista de entrenadores">{coaches.map((coach)=><button className={selected.slug===coach.slug?'active':''} key={coach.slug} onClick={()=>setSelected(coach)}><span>{coach.initials}</span><div><strong>{coach.name}</strong><small>{coach.role}</small></div><ArrowRight/></button>)}</nav><article className="trainer-profile" key={selected.slug}><div className="profile-monogram">{selected.initials}</div><span>{selected.role}</span><h2>{selected.name}</h2><p>{selected.bio}</p><div className="profile-stats"><div><strong>{selected.years}</strong><small>Años de experiencia</small></div><div><strong>{selected.focus.length}</strong><small>Áreas principales</small></div></div><section><h3>Especialidades</h3><div>{selected.focus.map(x=><span key={x}>{x}</span>)}</div></section><section><h3>Certificaciones</h3><ul>{selected.credentials.map(x=><li key={x}><ShieldCheck/>{x}</li>)}</ul></section><section><h3>Disponibilidad</h3><p>{selected.schedule}</p></section><button>Solicitar evaluación <ArrowRight/></button></article></section></>
}

function Events() {
  const events = [['08 NOV','Night Ride','Spinning','Sesión de 60 minutos con música en vivo y bloques de potencia.','7:30 PM','12 cupos'],['15 NOV','Técnica de peso muerto','Taller','Práctica guiada de postura, agarre y progresión de cargas.','10:00 AM','8 cupos'],['22 NOV','Baila por una causa','Bailoterapia','Clase abierta cuya inscripción apoya una organización local.','5:00 PM','32 cupos'],['29 NOV','Pulso Challenge','Comunidad','Reto por equipos con estaciones adaptables a cada nivel.','9:00 AM','24 cupos']]
  return <><PageHero eyebrow="Eventos / Noviembre" title="EL CLUB TAMBIÉN SE VIVE EN COMUNIDAD." text="Talleres, retos y sesiones especiales fuera del horario habitual." action={<img src={spinningImage} alt="Evento de spinning en Pulso Club"/>}/><section className="events-board">{events.map(([date,name,type,desc,time,spots],i)=><article className={i===0?'featured':''} key={name}><time>{date}</time><span>{type}</span><h2>{name}</h2><p>{desc}</p><footer><strong>{time}</strong><small>{spots}</small><button>Consultar <ArrowRight/></button></footer></article>)}</section></>
}

function Hours() {
  return <><PageHero eyebrow="Horarios / Visita" title="VEN CUANDO TE FUNCIONE." text="Horario general, momentos de menor afluencia, ubicación y servicios."/><section className="hours-layout"><article className="opening-hours"><h2>Horario del gimnasio</h2>{[['Lunes a jueves','5:30 AM–11:00 PM'],['Viernes','5:30 AM–10:00 PM'],['Sábado','7:00 AM–9:00 PM'],['Domingo','8:00 AM–6:00 PM']].map(([day,hours])=><div key={day}><span>{day}</span><strong>{hours}</strong></div>)}<p>Las zonas de entrenamiento cierran 15 minutos antes del cierre general.</p></article><article className="traffic"><h2>Afluencia estimada</h2><p>Una referencia para elegir el momento que mejor se ajuste a tu entrenamiento.</p>{[['6–8 AM','Media','55%'],['9 AM–12 PM','Baja','28%'],['12–3 PM','Media','46%'],['4–8 PM','Alta','88%'],['8–11 PM','Baja','35%']].map(([time,level,width])=><div key={time}><span>{time}</span><i><b style={{width}}/></i><strong>{level}</strong></div>)}</article><article className="location-card"><MapPin/><h2>La Castellana</h2><p>Av. Principal de La Castellana<br/>Caracas, Venezuela</p><ul><li>Estacionamiento validado</li><li>Bicicletero</li><li>Acceso sin escalones</li></ul><a href="https://www.google.com/maps/search/?api=1&query=La+Castellana+Caracas" target="_blank" rel="noreferrer">Abrir indicaciones <ArrowRight/></a></article></section><section className="visit-form" id="visita"><div><span>Visita guiada</span><h2>CONOCE EL CLUB EN 20 MINUTOS.</h2><p>Selecciona un día y un bloque horario para simular una solicitud. No se enviarán datos.</p></div><form onSubmit={(event)=>event.preventDefault()}><label>Nombre<input required placeholder="Tu nombre"/></label><label>Correo<input required type="email" placeholder="correo@ejemplo.com"/></label><label>Día<select><option>Lunes</option><option>Martes</option><option>Miércoles</option><option>Jueves</option><option>Viernes</option><option>Sábado</option></select></label><label>Horario<select><option>8:00 AM–12:00 PM</option><option>12:00 PM–4:00 PM</option><option>4:00 PM–8:00 PM</option></select></label><button>Simular solicitud <ArrowRight/></button></form></section></>
}

export default function FitnessMultiPage() {
  const route = window.location.pathname.split('/').filter(Boolean)[1] || 'inicio'
  const pages = {inicio:<Home/>, instalaciones:<Facilities/>, clases:<Classes/>, entrenadores:<Trainers/>, eventos:<Events/>, horarios:<Hours/>}
  return <div className="fitness-site fitness-multipage"><a className="demo-skip" href="#fitness-main">Saltar al contenido</a><Header/><main id="fitness-main">{pages[route] || <Home/>}</main><Footer/></div>
}
