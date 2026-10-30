import restauranteThumb from '../assets/restaurante/brasa-hero.jpg'
import fitnessThumb from '../assets/fitness/fitness-hero.jpg'
import clinicaThumb from '../assets/clinica/clinica-hero.jpg'
import inmobiliariaThumb from '../assets/inmobiliaria/hero.jpg'
import tiendaThumb from '../assets/tienda/forma-hero.jpg'
import productoThumb from '../assets/producto/orbit-cover.jpg'
import eventoThumb from '../assets/evento/ysya-huracan-final.jpg'
import corporativoThumb from '../assets/corporativo/nodo-hogar.jpg'

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
    monogram: 'R', accent: '#9f3b24', soft: '#e7d6c4', thumbnail: restauranteThumb, previewTitle: 'BRASA', previewMeta: 'Cocina de fuego · Reservas',
  },
  {
    number: '02', slug: 'fitness', href: '/fitness/', title: 'Fitness y entrenamiento',
    label: 'Motivar · entrenar · reservar', sector: 'Bienestar', focus: 'booking',
    objective: 'Presentar programas, horarios y planes con energía suficiente para convertir interés en una primera sesión.',
    monogram: 'F', accent: '#e62b25', soft: '#111111', thumbnail: fitnessThumb, previewTitle: 'PULSO', previewMeta: 'Entrena sin excusas',
  },
  {
    number: '03', slug: 'clinica', href: '/clinica/', title: 'Clínica o consultorio',
    label: 'Confiar · entender · agendar', sector: 'Salud', focus: 'booking',
    objective: 'Comunicar especialidades y equipo médico con claridad, confianza y un flujo sencillo para solicitar citas.',
    monogram: 'C', accent: '#3971c6', soft: '#eaf4ff', thumbnail: clinicaThumb, previewTitle: 'CLARA SALUD', previewMeta: 'Atención conectada',
  },
  {
    number: '04', slug: 'inmobiliaria', href: '/inmobiliaria/', title: 'Inmobiliaria',
    label: 'Buscar · comparar · contactar', sector: 'Propiedades', focus: 'catalog',
    objective: 'Ayudar a encontrar propiedades mediante filtros útiles, fichas completas y contacto directo con un agente.',
    monogram: 'I', accent: '#c45e2c', soft: '#12281f', thumbnail: inmobiliariaThumb, previewTitle: 'NORTE', previewMeta: 'Espacios con criterio',
  },
  {
    number: '05', slug: 'tienda', href: '/tienda/', title: 'Tienda o catálogo',
    label: 'Explorar · elegir · comprar', sector: 'Comercio', focus: 'catalog',
    objective: 'Organizar productos, variantes y decisiones de compra en una experiencia visual rápida y convincente.',
    monogram: 'T', accent: '#db5b35', soft: '#eee7dc', thumbnail: tiendaThumb, previewTitle: 'FORMA', previewMeta: 'Objetos para habitar',
  },
  {
    number: '06', slug: 'producto-digital', href: '/producto/', title: 'Producto digital',
    label: 'Explicar · demostrar · convertir', sector: 'Tecnología', focus: 'conversion',
    objective: 'Hacer comprensible un producto, demostrar su valor y conducir a una prueba, registro o contratación.',
    monogram: 'P', accent: '#6b56e8', soft: '#161232', thumbnail: productoThumb, previewTitle: 'ORBIT', previewMeta: 'Tu sistema de lanzamiento',
  },
  {
    number: '07', slug: 'despacho-profesional', href: '/despacho/', title: 'Despacho profesional',
    label: 'Acreditar · orientar · consultar', sector: 'Servicios', focus: 'conversion',
    objective: 'Transformar experiencia y especialización en confianza suficiente para iniciar una consulta profesional.',
    monogram: 'D', accent: '#aa8a55', soft: '#171c24', previewTitle: 'VARELA / RÍOS', previewMeta: 'Abogados · Caracas', previewType: 'legal',
  },
  {
    number: '08', slug: 'evento', href: '/evento/', title: 'Evento o conferencia',
    label: 'Descubrir · planificar · asistir', sector: 'Eventos', focus: 'conversion',
    objective: 'Comunicar programa, participantes y entradas con el ritmo y la urgencia propios de una fecha concreta.',
    monogram: 'E', accent: '#00d9d4', soft: '#ec007a', thumbnail: eventoThumb, previewTitle: 'YSYSMO', previewMeta: 'El archivo del concierto',
  },
  {
    number: '09', slug: 'medio-editorial', href: '/blog/', title: 'Blog o medio editorial',
    label: 'Descubrir · leer · suscribirse', sector: 'Contenido', focus: 'content',
    objective: 'Dar jerarquía a una biblioteca de contenidos y crear una experiencia cómoda para leer y volver.',
    monogram: 'M', accent: '#8b1238', soft: '#f2efe7', previewTitle: 'LA GRADA', previewMeta: 'Barcelona · Archivo de temporada', previewType: 'editorial',
  },
  {
    number: '10', slug: 'corporativo', href: '/corporativo/', title: 'Sitio corporativo',
    label: 'Posicionar · explicar · contactar', sector: 'Empresa', focus: 'content',
    objective: 'Organizar servicios, capacidades y evidencia para que una empresa comunique solidez sin perder claridad.',
    monogram: 'N', accent: '#0667f9', soft: '#caff3d', thumbnail: corporativoThumb, previewTitle: 'NODO', previewMeta: 'Fibra viva',
  },
]
