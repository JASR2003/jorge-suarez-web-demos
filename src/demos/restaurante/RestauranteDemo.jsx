import '@fontsource-variable/bodoni-moda'
import '@fontsource-variable/instrument-sans'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Flame,
  Leaf,
  MapPin,
  Users,
  Wine,
} from 'lucide-react'
import heroImage from '../../assets/restaurante/brasa-hero.jpg'
import roomImage from '../../assets/restaurante/brasa-room.jpg'
import dishImage from '../../assets/restaurante/brasa-dish.jpg'
import './restaurante.css'
import '../responsive-audit.css'

const menuSections = [
  {
    id: 'comenzar',
    title: 'Para comenzar',
    items: [
      { name: 'Pan de masa madre', detail: 'mantequilla ahumada · sal de Coche', price: '5' },
      { name: 'Arepa de maíz morado', detail: 'queso de cabra · ají dulce · hojas tiernas', price: '9' },
      { name: 'Tostada de pesca curada', detail: 'aguacate · limón fermentado · cilantro', price: '12' },
      { name: 'Mollejas crujientes', detail: 'papelón · mostaza antigua · encurtidos', price: '13' },
    ],
  },
  {
    id: 'huerta',
    title: 'Huerta y temporada',
    items: [
      { name: 'Calabaza a la brasa', detail: 'crema ácida · semillas tostadas · salvia', price: '14' },
      { name: 'Berenjena quemada', detail: 'merey · hierbabuena · aceite de ají', price: '13' },
      { name: 'Palmito fresco', detail: 'cítricos · coco · pimienta verde', price: '15' },
      { name: 'Tomates de verano', detail: 'suero · albahaca morada · pan tostado', price: '14' },
    ],
  },
  {
    id: 'mar',
    title: 'Del mar',
    items: [
      { name: 'Pescado del día', detail: 'mantequilla ahumada · limón · vegetales', price: '24' },
      { name: 'Pulpo sobre carbón', detail: 'caraotas blancas · pimentón · perejil', price: '22' },
      { name: 'Langostinos enteros', detail: 'ajo negro · mantequilla de coral · yuca', price: '27' },
    ],
  },
  {
    id: 'fuego',
    title: 'Fuego y brasas',
    items: [
      { name: 'Pollo de corral', detail: 'mole de cacao · vegetales encurtidos', price: '25' },
      { name: 'Costilla cocida lento', detail: 'tamarindo · tubérculos · cebolla quemada', price: '29' },
      { name: 'Punta trasera para compartir', detail: 'papas al rescoldo · ensalada amarga', price: '58' },
      { name: 'Arroz de cerdo y humo', detail: 'chorizo de la casa · sofrito · limón', price: '31' },
    ],
  },
  {
    id: 'acompanar',
    title: 'Para acompañar',
    items: [
      { name: 'Papas al rescoldo', detail: 'nata cultivada · cebollín', price: '8' },
      { name: 'Ensalada de hojas amargas', detail: 'vinagreta de miel · semillas', price: '8' },
      { name: 'Yuca dorada', detail: 'alioli de ajo confitado', price: '7' },
    ],
  },
  {
    id: 'dulce',
    title: 'Algo dulce',
    items: [
      { name: 'Cacao, café y sal', detail: 'chocolate 70% · café frío · caramelo', price: '11' },
      { name: 'Piña quemada', detail: 'ron · coco · helado de vainilla', price: '10' },
      { name: 'Queso de cabra', detail: 'miel ahumada · frutas de temporada', price: '12' },
    ],
  },
]

const tastingCourses = [
  'Maíz morado y queso de cabra',
  'Pesca curada y limón fermentado',
  'Calabaza, semillas y salvia',
  'Langostino, ajo negro y yuca',
  'Pescado, humo y mantequilla',
  'Costilla, tamarindo y tubérculos',
  'Piña quemada, ron y coco',
  'Cacao, café y sal',
]

const weekdayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const formatDateId = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0'),
].join('-')

const getNextAvailableDate = () => {
  const date = new Date()
  date.setHours(12, 0, 0, 0)
  date.setDate(date.getDate() + 1)
  while (date.getDay() === 1) date.setDate(date.getDate() + 1)
  return formatDateId(date)
}

const getServiceHours = (dateId) => {
  const day = new Date(`${dateId}T12:00:00`).getDay()
  if (day === 0) return { opens: '12:30', closes: '17:00', label: 'Almuerzo · 12:30 PM–5:00 PM' }
  if (day >= 2 && day <= 4) return { opens: '18:00', closes: '23:00', label: 'Cena · 6:00 PM–11:00 PM' }
  if (day === 5 || day === 6) return { opens: '12:30', closes: '23:30', label: 'Almuerzo y cena · 12:30 PM–11:30 PM' }
  return null
}

const buildReservationTimes = (dateId) => {
  const service = getServiceHours(dateId)
  if (!service) return []

  const [openHour, openMinute] = service.opens.split(':').map(Number)
  const [closeHour, closeMinute] = service.closes.split(':').map(Number)
  const start = openHour * 60 + openMinute
  const end = closeHour * 60 + closeMinute

  return Array.from({ length: Math.floor((end - start) / 30) + 1 }, (_, index) => {
    const totalMinutes = start + index * 30
    const hour = Math.floor(totalMinutes / 60)
    const minute = totalMinutes % 60
    const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    const label = `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`
    return { value, label }
  })
}

export default function RestauranteDemo() {
  const [guests, setGuests] = useState(2)
  const [selectedDate, setSelectedDate] = useState(getNextAvailableDate)
  const [calendarOffset, setCalendarOffset] = useState(0)
  const [selectedTime, setSelectedTime] = useState('')
  const [bookingStep, setBookingStep] = useState(1)
  const [reservationComplete, setReservationComplete] = useState(false)

  const calendarMonth = useMemo(() => {
    const month = new Date()
    month.setHours(12, 0, 0, 0)
    month.setDate(1)
    month.setMonth(month.getMonth() + calendarOffset)
    return month
  }, [calendarOffset])
  const calendarDays = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const year = calendarMonth.getFullYear()
    const month = calendarMonth.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const leadingSpaces = (new Date(year, month, 1).getDay() + 6) % 7
    const blanks = Array.from({ length: leadingSpaces }, (_, index) => ({ blank: true, id: `blank-${index}` }))
    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1, 12)
      return {
        id: formatDateId(date),
        number: index + 1,
        disabled: date < today || date.getDay() === 1,
        closed: date.getDay() === 1,
      }
    })
    return [...blanks, ...days]
  }, [calendarMonth])
  const reservationTimes = useMemo(() => buildReservationTimes(selectedDate), [selectedDate])
  const selectedDateObject = new Date(`${selectedDate}T12:00:00`)
  const selectedDateLabel = selectedDateObject.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })
  const selectedTimeLabel = reservationTimes.find((time) => time.value === selectedTime)?.label
  const serviceHours = getServiceHours(selectedDate)
  const calendarMonthLabel = calendarMonth.toLocaleDateString('es-VE', { month: 'long', year: 'numeric' })

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView()
    })
  }, [])

  const handleReservation = (event) => {
    event.preventDefault()
    if (!selectedTime) return
    setReservationComplete(true)
  }

  const resetReservation = () => {
    setGuests(2)
    setSelectedDate(getNextAvailableDate())
    setCalendarOffset(0)
    setSelectedTime('')
    setBookingStep(1)
    setReservationComplete(false)
  }

  const updateGuests = (amount) => {
    const normalizedAmount = Math.min(12, Math.max(1, Number(amount) || 1))
    setGuests(normalizedAmount)
  }

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
          <a href="#experiencia">Experiencia</a>
          <a href="#visita">Visita</a>
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
            <div><dt>21</dt><dd>platos en una carta estacional</dd></div>
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
            <h2 id="menu-title">La carta<br /><em>completa</em></h2>
            <nav className="restaurant-menu-index" aria-label="Categorías de la carta">
              {menuSections.map((section) => <a href={`#menu-${section.id}`} key={section.id}>{section.title}</a>)}
            </nav>
            <div className="restaurant-menu-list">
              {menuSections.map((section) => (
                <section className="restaurant-menu-group" id={`menu-${section.id}`} key={section.id} aria-labelledby={`menu-title-${section.id}`}>
                  <h3 id={`menu-title-${section.id}`}>{section.title}</h3>
                  {section.items.map((item) => (
                    <article key={item.name}>
                      <div><h4>{item.name}</h4><p>{item.detail}</p></div>
                      <strong>${item.price}</strong>
                    </article>
                  ))}
                </section>
              ))}
            </div>
            <p className="restaurant-menu-note">Carta y precios ilustrativos. La disponibilidad cambia con la temporada y el mercado.</p>
          </div>
        </section>

        <section className="restaurant-tasting" id="experiencia" aria-labelledby="tasting-title">
          <div className="restaurant-tasting-heading">
            <p className="restaurant-overline">Experiencia Brasa</p>
            <h2 id="tasting-title">Ocho momentos.<br /><em>Un solo fuego.</em></h2>
            <p>Un recorrido por la carta y los productos del día. Se sirve a mesa completa y requiere aproximadamente dos horas y media.</p>
          </div>
          <ol className="restaurant-course-list">
            {tastingCourses.map((course, index) => <li key={course}><span>{String(index + 1).padStart(2, '0')}</span>{course}</li>)}
          </ol>
          <div className="restaurant-tasting-prices">
            <article><span>Menú de 8 pases</span><strong>$78</strong><small>por persona</small></article>
            <article><Wine aria-hidden="true" /><span>Maridaje de vinos</span><strong>+$38</strong><small>5 copas</small></article>
            <article><Leaf aria-hidden="true" /><span>Maridaje sin alcohol</span><strong>+$22</strong><small>fermentos e infusiones</small></article>
          </div>
          <p className="restaurant-tasting-note">Podemos adaptar la experiencia a dietas vegetarianas y algunas alergias con 48 horas de anticipación.</p>
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

        <section className="restaurant-visit-info" id="visita" aria-labelledby="visit-title">
          <div className="restaurant-visit-heading">
            <p className="restaurant-overline">Antes de venir</p>
            <h2 id="visit-title">Todo lo necesario<br />para llegar a <em>la mesa.</em></h2>
          </div>
          <div className="restaurant-info-grid">
            <article>
              <Clock3 aria-hidden="true" />
              <h3>Horarios</h3>
              <p>Martes–jueves · 6:00 PM–11:00 PM</p>
              <p>Viernes–sábado · 12:30 PM–11:30 PM</p>
              <p>Domingo · 12:30 PM–5:00 PM</p>
            </article>
            <article>
              <MapPin aria-hidden="true" />
              <h3>Ubicación</h3>
              <p>Av. Principal de La Castellana</p>
              <p>Caracas, Venezuela</p>
              <a href="https://www.google.com/maps/search/?api=1&query=La+Castellana+Caracas" rel="noreferrer" target="_blank">Ver indicaciones <ArrowRight aria-hidden="true" /></a>
            </article>
            <article>
              <Leaf aria-hidden="true" />
              <h3>Dietas y alergias</h3>
              <p>Contamos con opciones vegetarianas. Comunica alergias o restricciones al reservar para que la cocina pueda prepararse.</p>
            </article>
            <article>
              <Users aria-hidden="true" />
              <h3>Grupos y eventos</h3>
              <p>Las mesas de 7 a 12 personas pueden reservar un menú compartido en línea. Para 13 a 18 personas preparamos una propuesta privada.</p>
              <a href="mailto:eventos@brasa.demo">Consultar evento <ArrowRight aria-hidden="true" /></a>
            </article>
          </div>
          <div className="restaurant-faq">
            <p className="restaurant-overline">Preguntas frecuentes</p>
            <div>
              <details><summary>¿Cuánto dura la experiencia?</summary><p>La carta se disfruta sin un tiempo mínimo. Para el menú de ocho pases recomendamos reservar entre dos horas y media y tres horas.</p></details>
              <details><summary>¿Aceptan niños?</summary><p>Recibimos familias. El menú degustación se recomienda desde los 12 años; para niños menores podemos ofrecer una selección corta.</p></details>
              <details><summary>¿Cuál es la política de cancelación?</summary><p>Puedes modificar o cancelar hasta 24 horas antes. Esta demo no procesa pagos ni aplica cargos reales.</p></details>
              <details><summary>¿El espacio es accesible?</summary><p>El acceso principal, el salón y un baño están planteados sin escalones. El equipo puede ayudar con necesidades específicas.</p></details>
            </div>
          </div>
        </section>

        <section className="restaurant-reservation" id="reservas" aria-labelledby="reservation-title">
          <div className="restaurant-reservation-heading">
            <p className="restaurant-overline">Reservas</p>
            <h2 id="reservation-title">Nos vemos<br /><em>alrededor del fuego.</em></h2>
            <ul>
              <li>Reservas disponibles para 1–12 personas</li>
              <li>Las mesas se mantienen durante 15 minutos</li>
              <li>Grupos de 13 o más se coordinan por correo</li>
            </ul>
          </div>
          <div className="restaurant-booking-panel">
            {reservationComplete ? (
              <div className="restaurant-confirmation" aria-live="polite">
                <span><Check aria-hidden="true" /></span>
                <p>Solicitud simulada</p>
                <h3>Tu mesa está preparada en esta demostración.</h3>
                <dl>
                  <div><dt>Fecha</dt><dd>{selectedDateLabel}</dd></div>
                  <div><dt>Hora</dt><dd>{selectedTimeLabel}</dd></div>
                  <div><dt>Mesa</dt><dd>{guests} {guests === 1 ? 'persona' : 'personas'}</dd></div>
                </dl>
                <p>No se envió ni almacenó ninguna información. En un proyecto real, este paso se conectaría con el sistema de reservas del restaurante.</p>
                <button type="button" onClick={resetReservation}>Hacer otra simulación</button>
              </div>
            ) : (
              <form className="restaurant-booking-form" onSubmit={handleReservation}>
                <div className="restaurant-booking-progress">
                  <p>Paso {bookingStep} de 4</p>
                  <ol aria-label="Progreso de la reserva">
                    {['Personas', 'Fecha', 'Hora', 'Contacto'].map((label, index) => (
                      <li className={bookingStep === index + 1 ? 'is-current' : bookingStep > index + 1 ? 'is-complete' : ''} key={label}>
                        <span>{bookingStep > index + 1 ? <Check aria-hidden="true" /> : index + 1}</span>{label}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="restaurant-booking-summary" aria-label="Resumen de la reserva">
                  <span><Users aria-hidden="true" />{guests} {guests === 1 ? 'persona' : 'personas'}</span>
                  <span><CalendarDays aria-hidden="true" />{selectedDateLabel}</span>
                  <span><Clock3 aria-hidden="true" />{selectedTimeLabel || 'Hora pendiente'}</span>
                </div>

                {bookingStep === 1 && (
                  <fieldset className="restaurant-booking-step">
                    <legend><span>01</span><strong>¿Cuántas personas serán en total?</strong><small>Inclúyete en la cantidad. Tú + 7 amigos son 8 personas.</small></legend>
                    <div className="restaurant-guest-picker">
                      <button aria-label="Restar una persona" disabled={guests === 1} onClick={() => updateGuests(guests - 1)} type="button">−</button>
                      <label>
                        <span>Total de comensales</span>
                        <input
                          aria-describedby="guest-guidance"
                          inputMode="numeric"
                          max="12"
                          min="1"
                          onChange={(event) => updateGuests(event.target.value)}
                          type="number"
                          value={guests}
                        />
                        <small>{guests === 1 ? 'persona' : 'personas'}</small>
                      </label>
                      <button aria-label="Sumar una persona" disabled={guests === 12} onClick={() => updateGuests(guests + 1)} type="button">+</button>
                    </div>
                    <div className="restaurant-guest-presets" aria-label="Cantidades frecuentes">
                      {[2, 4, 6, 8, 10, 12].map((amount) => (
                        <button aria-pressed={guests === amount} key={amount} onClick={() => updateGuests(amount)} type="button">{amount}</button>
                      ))}
                    </div>
                    <p className={`restaurant-group-guidance${guests >= 7 ? ' is-group' : ''}`} id="guest-guidance" aria-live="polite">
                      {guests >= 7
                        ? `Mesa para ${guests}: te mostraremos la disponibilidad para grupos y el menú compartido.`
                        : 'Puedes escribir la cantidad o ajustarla con los controles.'}
                    </p>
                  </fieldset>
                )}

                {bookingStep === 2 && (
                  <fieldset className="restaurant-booking-step">
                    <legend><span>02</span><strong>¿Qué día vienes?</strong><small>Consulta el mes completo. Los lunes permanecemos cerrados.</small></legend>
                    <div className="restaurant-calendar">
                      <div className="restaurant-calendar-header">
                        <button aria-label="Ver mes anterior" disabled={calendarOffset === 0} onClick={() => setCalendarOffset((offset) => offset - 1)} type="button">←</button>
                        <strong>{calendarMonthLabel}</strong>
                        <button aria-label="Ver mes siguiente" disabled={calendarOffset === 5} onClick={() => setCalendarOffset((offset) => offset + 1)} type="button">→</button>
                      </div>
                      <div className="restaurant-calendar-weekdays" aria-hidden="true">
                        {weekdayLabels.map((day) => <span key={day}>{day}</span>)}
                      </div>
                      <div className="restaurant-calendar-days">
                        {calendarDays.map((date) => date.blank ? <span key={date.id} /> : (
                          <button
                            aria-label={`${date.number} de ${calendarMonthLabel}${date.closed ? ', cerrado' : ''}`}
                            aria-pressed={selectedDate === date.id}
                            disabled={date.disabled}
                            key={date.id}
                            onClick={() => { setSelectedDate(date.id); setSelectedTime('') }}
                            type="button"
                          >
                            {date.number}{date.closed && <small>Cerrado</small>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                )}

                {bookingStep === 3 && (
                  <fieldset className="restaurant-booking-step">
                    <legend><span>03</span><strong>Elige una hora</strong><small>Mostramos el servicio completo desde la apertura hasta el cierre.</small></legend>
                    <p className="restaurant-service-window"><Clock3 aria-hidden="true" />{serviceHours?.label}</p>
                    <div className="restaurant-time-options">
                      {reservationTimes.map((time) => (
                        <button
                          aria-pressed={selectedTime === time.value}
                          key={time.value}
                          onClick={() => setSelectedTime(time.value)}
                          type="button"
                        >
                          {time.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {bookingStep === 4 && (
                  <fieldset className="restaurant-booking-step">
                    <legend><span>04</span><strong>¿A nombre de quién?</strong><small>Completa los datos para simular la confirmación.</small></legend>
                    <div className="restaurant-contact-fields">
                      <label>Nombre<input autoComplete="name" name="name" placeholder="Tu nombre" required /></label>
                      <label>Correo<input autoComplete="email" name="email" placeholder="correo@ejemplo.com" required type="email" /></label>
                      <label className="restaurant-wide-field">Nota opcional<textarea name="note" placeholder="Alergias, celebración o información útil" rows="3" /></label>
                    </div>
                  </fieldset>
                )}

                <div className="restaurant-booking-actions">
                  {bookingStep > 1 && <button className="restaurant-back" onClick={() => setBookingStep((step) => step - 1)} type="button">Volver</button>}
                  {bookingStep < 4 ? (
                    <button className="restaurant-next" disabled={bookingStep === 3 && !selectedTime} onClick={() => setBookingStep((step) => step + 1)} type="button">
                      Continuar <ArrowRight aria-hidden="true" />
                    </button>
                  ) : (
                    <button className="restaurant-next" type="submit">Confirmar simulación <ArrowRight aria-hidden="true" /></button>
                  )}
                </div>
                <p className="restaurant-reservation-note">Demostración interactiva: los datos no salen de tu navegador y no se almacenan.</p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="restaurant-footer">
        <a className="restaurant-logo" href="#inicio">Brasa<span>Caracas</span></a>
        <div><p>Av. Principal de La Castellana</p><p>Caracas, Venezuela</p></div>
        <div><a href="tel:+580000000000">+58 000 000 0000</a><a href="mailto:hola@brasa.demo">hola@brasa.demo</a><a href="mailto:eventos@brasa.demo">Eventos privados</a></div>
        <a className="catalog-return" href="../">← Todas las demos</a>
      </footer>
    </div>
  )
}
