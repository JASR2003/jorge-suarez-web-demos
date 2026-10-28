import { ArrowUpRight, BedDouble, Heart, MapPin, Search, Square } from 'lucide-react'
import './inmobiliaria.css'

const properties = [
  { name: 'Casa Los Naranjos', place: 'La Lagunita', price: '$320,000', beds: '4', area: '280 m²', tone: 'sand' },
  { name: 'Apartamento Altura', place: 'Campo Alegre', price: '$185,000', beds: '3', area: '145 m²', tone: 'blue' },
  { name: 'Villa Horizonte', place: 'El Hatillo', price: '$410,000', beds: '5', area: '360 m²', tone: 'green' },
]

export default function InmobiliariaDemo() {
  return (
    <div className="realestate-site">
      <a className="demo-skip" href="#realestate-main">Saltar al contenido</a>
      <header className="realestate-header"><a className="realestate-logo" href="#inicio">NORTE<span>REALTY</span></a><nav aria-label="Navegación inmobiliaria"><a href="#propiedades">Propiedades</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a></nav><a className="realestate-contact" href="#contacto">Hablar con un asesor</a></header>

      <main id="realestate-main">
        <section className="realestate-hero" id="inicio"><div className="realestate-hero-image" aria-hidden="true"><span>N</span><i/><i/></div><div className="realestate-hero-copy"><p>PROPIEDADES SELECCIONADAS · CARACAS</p><h1>El lugar correcto cambia <em>todo.</em></h1><p>Encontramos espacios con carácter para personas que buscan algo más que metros cuadrados.</p></div><form className="property-search"><label><span>Operación</span><select><option>Comprar</option><option>Alquilar</option></select></label><label><span>Zona</span><select><option>Todas las zonas</option><option>El Hatillo</option><option>Chacao</option></select></label><label><span>Tipo</span><select><option>Casa o apartamento</option></select></label><button type="button" aria-label="Buscar propiedades"><Search/></button></form></section>

        <section className="property-section" id="propiedades"><div className="realestate-heading"><span>01 / Selección</span><h2>Propiedades que vale la pena visitar.</h2><a href="#propiedades">Ver todas <ArrowUpRight/></a></div><div className="property-grid">{properties.map((property) => <article key={property.name}><div className={`property-image ${property.tone}`}><button type="button" aria-label={`Guardar ${property.name}`}><Heart/></button><span>EN VENTA</span></div><div className="property-copy"><p><MapPin/> {property.place}</p><h3>{property.name}</h3><strong>{property.price}</strong><div><span><BedDouble/> {property.beds} hab.</span><span><Square/> {property.area}</span></div></div></article>)}</div></section>

        <section className="realestate-about" id="nosotros"><div><span>02 / Norte</span><h2>Menos propiedades.<br/>Mejor elegidas.</h2></div><p>Visitamos, verificamos y seleccionamos cada propiedad antes de mostrarla. Nuestro trabajo empieza mucho antes de la primera visita.</p><div className="realestate-stats"><div><strong>12</strong><span>años en el mercado</span></div><div><strong>96%</strong><span>clientes referidos</span></div></div></section>

        <section className="realestate-cta" id="contacto"><p>¿Buscas algo específico?</p><h2>Cuéntanos cómo quieres vivir.</h2><a href="mailto:hola@example.com">Contactar a Norte <ArrowUpRight/></a></section>
      </main>

      <footer className="realestate-footer"><a className="catalog-return" href="../">← Todas las demos</a><span>NORTE REALTY · DEMO</span><span>CARACAS / 2026</span></footer>
    </div>
  )
}
