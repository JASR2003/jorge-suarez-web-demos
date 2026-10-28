export const demoFilters = [
  { id: 'all', label: 'Todas' },
  { id: 'booking', label: 'Reservas' },
  { id: 'conversion', label: 'Conversión' },
  { id: 'catalog', label: 'Catálogo' },
  { id: 'content', label: 'Contenido' },
]

export const demoIdeas = [
  {
    number: '01', slug: 'restaurante', href: '/restaurante/', title: 'Restaurante o cafetería',
    label: 'Reservar · descubrir · visitar', sector: 'Hospitalidad', focus: 'booking',
    objective: 'Presentar una experiencia gastronómica, facilitar la consulta del menú y convertir interés en reservas.',
    monogram: 'R', accent: '#ff5d3b', soft: '#ffd8bf',
  },
  {
    number: '02', slug: 'fitness', href: '/fitness/', title: 'Fitness y entrenamiento',
    label: 'Motivar · entrenar · reservar', sector: 'Bienestar', focus: 'booking',
    objective: 'Presentar programas, horarios y planes con energía suficiente para convertir interés en una primera sesión.',
    monogram: 'F', accent: '#617500', soft: '#e3ff3f',
  },
  {
    number: '03', slug: 'clinica', href: '/clinica/', title: 'Clínica o consultorio',
    label: 'Confiar · entender · agendar', sector: 'Salud', focus: 'booking',
    objective: 'Comunicar especialidades y equipo médico con claridad, confianza y un flujo sencillo para solicitar citas.',
    monogram: 'C', accent: '#167d70', soft: '#ccece1',
  },
  {
    number: '04', slug: 'inmobiliaria', href: '/inmobiliaria/', title: 'Inmobiliaria',
    label: 'Buscar · comparar · contactar', sector: 'Propiedades', focus: 'catalog',
    objective: 'Ayudar a encontrar propiedades mediante filtros útiles, fichas completas y contacto directo con un agente.',
    monogram: 'I', accent: '#2446b8', soft: '#ced8ff',
  },
  {
    number: '05', slug: 'tienda', href: '/tienda/', title: 'Tienda o catálogo',
    label: 'Explorar · elegir · comprar', sector: 'Comercio', focus: 'catalog',
    objective: 'Organizar productos, variantes y decisiones de compra en una experiencia visual rápida y convincente.',
    monogram: 'T', accent: '#8c3fc7', soft: '#ead5f8',
  },
  {
    number: '06', slug: 'producto-digital', href: '/producto/', title: 'Producto digital',
    label: 'Explicar · demostrar · convertir', sector: 'Tecnología', focus: 'conversion',
    objective: 'Hacer comprensible un producto, demostrar su valor y conducir a una prueba, registro o contratación.',
    monogram: 'P', accent: '#006bff', soft: '#c9ddff',
  },
  {
    number: '07', slug: 'despacho-profesional', href: '/despacho/', title: 'Despacho profesional',
    label: 'Acreditar · orientar · consultar', sector: 'Servicios', focus: 'conversion',
    objective: 'Transformar experiencia y especialización en confianza suficiente para iniciar una consulta profesional.',
    monogram: 'D', accent: '#9b5b26', soft: '#f1ddc2',
  },
  {
    number: '08', slug: 'evento', href: '/evento/', title: 'Evento o conferencia',
    label: 'Descubrir · planificar · asistir', sector: 'Eventos', focus: 'conversion',
    objective: 'Comunicar programa, participantes y entradas con el ritmo y la urgencia propios de una fecha concreta.',
    monogram: 'E', accent: '#dc3d2d', soft: '#ffd2c9',
  },
  {
    number: '09', slug: 'medio-editorial', href: '/blog/', title: 'Blog o medio editorial',
    label: 'Descubrir · leer · suscribirse', sector: 'Contenido', focus: 'content',
    objective: 'Dar jerarquía a una biblioteca de contenidos y crear una experiencia cómoda para leer y volver.',
    monogram: 'M', accent: '#12646f', soft: '#cae8e8',
  },
  {
    number: '10', slug: 'corporativo', href: '/corporativo/', title: 'Sitio corporativo',
    label: 'Posicionar · explicar · contactar', sector: 'Empresa', focus: 'content',
    objective: 'Organizar servicios, capacidades y evidencia para que una empresa comunique solidez sin perder claridad.',
    monogram: 'B', accent: '#556317', soft: '#e3e9bd',
  },
]
