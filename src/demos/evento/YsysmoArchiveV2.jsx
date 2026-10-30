import { ArrowDown, ArrowRight, Check, ChevronDown, ExternalLink, MapPin, Music2, Play, Users } from 'lucide-react'
import albumCover from '../../assets/evento/ysysmo-cover.jpg'
import concertPhoto from '../../assets/evento/ysya-huracan-modo-diablo.jpg'
import finalPhoto from '../../assets/evento/ysya-huracan-final.jpg'
import stadiumPhoto from '../../assets/evento/estadio-duco.jpg'
import { trackLinks } from './ysysmoTracks'
import './concert.css'

const chapters = [
  ['01', 'EL AFTER DEL AFTER', 'Rave trapera, techno y el disco de 2023', '21:00'],
  ['02', 'RAÍCES + TU DÚO FAVORITO', 'Clásicos, invitados y el proyecto con Bhavi', '21:40'],
  ['03', 'TANGO Y YSYSMO', 'Identidad porteña y el álbum de 2022', '22:25'],
  ['04', 'MODO DIABLO', 'Duki · YSY A · Neo Pistea', '23:15'],
  ['05', 'BLOQUE FINAL', 'Hidro · Full Ice · Tamo Loco', '23:50'],
]

const guests = [
  ['DUKI', 'No da más · Modo Diablo'], ['NEO PISTEA', 'Modo Diablo'],
  ['BHAVI', 'Tu Dúo Favorito · Mi Ciudad'], ['JERE KLEIN', '24/7 6.5'],
  ['LARA91K', 'Loco x tu cuerpo'], ['XINA MORA', 'Asesino'],
  ['SIXTO YEGROS', 'Está que quema'], ['CUCUZA CASTIELLO', 'Bloque de tango'],
]

const setlist = [
  ['EL AFTER DEL AFTER', [
    'El after del after', 'Toda la vida', 'Lugares que llego', '+ Que la droga', 'No da más',
    'Copenhague', '24/7 6.5', 'Nunca entendemo', 'No negocio con mi alma', 'Loco x tu cuerpo', 'Asesino', 'Ganas',
  ]],
  ['RAÍCES + TU DÚO FAVORITO', [
    'Desfilar mis penas', 'Salgo a cazar', 'Linaje', 'Está que quema', 'Casi un G',
    'Quieren más', 'Tuuuyo', 'Flechazo en el centro', 'Mi ciudad',
  ]],
  ['TANGO + YSYSMO', [
    'Traje unos tangos', 'Cuál?', 'Un tango pal YSY', 'No para', 'Pastel con Nutella', 'El amanecer',
    'Vamo a darle', '¿Cuánto vale hacer el amor?', '¿Cuántos términos?', 'A por todo', 'Un piso más', 'Cómo chilla ella',
  ]],
  ['MODO DIABLO + ENCORE', [
    'Uh!', "Trap N' Export", 'Quavo', 'Vuelta a la luna (remix)', 'Hidro', 'Full Ice', 'Tamo Loco',
  ]],
]

const totalBefore = (blockIndex) => setlist.slice(0, blockIndex).reduce((sum, block) => sum + block[1].length, 0)
const marqueeText = 'YSYSMO ✦ HURACÁN ✦ SPONSOR DIOS ✦ MODO DIABLO ✦ 19.12.2023 ✦ PARQUE PATRICIOS ✦ YSYSMO ✦ HURACÁN ✦ SPONSOR DIOS ✦ MODO DIABLO ✦ 19.12.2023 ✦ PARQUE PATRICIOS ✦'

function PlatformLink({ href, label, song, children }) {
  if (!href) return <span className="ys-link-unavailable" aria-label={`${label} no disponible para ${song}`}>{label}<small>—</small></span>
  return <a href={href} target="_blank" rel="noreferrer" aria-label={`Abrir ${song} directamente en ${label}`}>{label}{children}</a>
}

export default function YsysmoArchiveV2() {
  return <div className="cv-site ysysmo-site">
    <a className="demo-skip" href="#concert-main">Saltar al contenido</a>
    <header className="cv-header">
      <a className="cv-logo" href="#inicio">YSY<span>SMO</span></a>
      <nav><a href="#historia">Historia</a><a href="#galeria">Imágenes</a><a href="#setlist">Setlist</a><a href="#estadio">Huracán</a></nav>
      <a className="cv-buy" href="#archivo">Ver archivo <Play /></a>
    </header>

    <main id="concert-main">
      <section className="cv-hero" id="inicio">
        <div className="cv-date"><span>MARTES</span><b>19</b><span>DIC · 2023</span></div>
        <div className="cv-hero-main">
          <p>YSY A · PRIMER ESTADIO DE FÚTBOL</p>
          <h1>EL TRAP<br />HIZO <em>TEMBLAR</em><br />HURACÁN.</h1>
          <div><span><MapPin /> TOMÁS ADOLFO DUCÓ · BUENOS AIRES</span><span><Users /> 45–50 MIL PERSONAS</span></div>
        </div>
        <aside><img src={albumCover} alt="Portada del álbum YSYSMO de YSY A" /><p>ARCHIVO / 19.12.23</p><span>EL HOMBRE SISMO</span><a href="#historia">Entrar al archivo <ArrowRight /></a></aside>
        <a href="#historia" className="cv-scroll">BAJÁ AL EPICENTRO <ArrowDown /></a>
      </section>

      <section className="cv-marquee" aria-label="YSYSMO, Huracán, Sponsor Dios, Modo Diablo, 19 de diciembre de 2023, Parque Patricios">
        <div className="cv-marquee-track"><span>{marqueeText}</span><span aria-hidden="true">{marqueeText}</span></div>
      </section>

      <section className="cv-lineup y-history" id="historia">
        <header><p>01 / ANTES DEL SISMO</p><h2>DEL QUINTO ESCALÓN<br />A UNA CANCHA LLENA.</h2></header>
        <div className="ys-story"><p>El concierto fue la primera presentación de YSY A en un estadio de fútbol: el artista que organizaba batallas en Parque Rivadavia llevó su universo independiente al Palacio Ducó.</p><p>La fecha original era el domingo <strong>17 de diciembre</strong>. El temporal obligó a suspenderla y el show se realizó el martes <strong>19</strong>, manteniendo válidas todas las entradas.</p><p>Alrededor de las 21 comenzó una puesta de dos horas y media con tres pantallas LED, visuales lisérgicas, coreografía, electrónica, tango y cuarenta canciones documentadas.</p></div>
        <div className="ys-facts"><span><b>01</b>primer estadio</span><span><b>40</b>canciones</span><span><b>2:30</b>horas</span><span><b>8+</b>invitados</span></div>
      </section>

      <section className="ys-gallery" id="galeria">
        <header><p>02 / ARCHIVO VISUAL</p><h2>EL DUCÓ<br />BAJO OTRA LUZ.</h2><span>Portada oficial, registros del concierto y el estadio que alojó la noche.</span></header>
        <div>
          <figure className="ys-gallery-main"><img src={concertPhoto} alt="YSY A, Duki y Neo Pistea durante el reencuentro de Modo Diablo en Huracán" /><figcaption><b>01</b><span>MODO DIABLO EN HURACÁN<br /><small>Foto: cobertura de Revista FlipAr</small></span></figcaption></figure>
          <figure><img src={finalPhoto} alt="YSY A frente al público durante el bloque final del concierto en Huracán" /><figcaption><b>02</b><span>EL BLOQUE FINAL<br /><small>Fuente: video oficial de YSY A</small></span></figcaption></figure>
          <figure><img src={stadiumPhoto} alt="Vista interior del Estadio Tomás Adolfo Ducó" /><figcaption><b>03</b><span>PALACIO TOMÁS ADOLFO DUCÓ<br /><small>Vista documental del estadio</small></span></figcaption></figure>
          <figure className="ys-album-figure"><img src={albumCover} alt="Portada oficial de YSYSMO" /><figcaption><b>04</b><span>YSYSMO · 2022<br /><small>Portada publicada por YSY A</small></span></figcaption></figure>
        </div>
      </section>

      <section className="cv-schedule" id="show"><header><p>03 / ARQUITECTURA DEL SHOW</p><h2>CINCO BLOQUES.<br />UNA HISTORIA COMPLETA.</h2><span>Horarios aproximados con fines editoriales</span></header><div>{chapters.map(x => <article key={x[0]}><time>{x[3]}</time><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>

      <section className="cv-experience ys-guests" id="invitados"><div><p>04 / INVITADOS</p><h2>LA ESCENA<br />EN EL MISMO ESCENARIO.</h2></div><div>{guests.map((x, i) => <article key={x[0]}><span>{String(i + 1).padStart(2, '0')}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

      <section className="ys-setlist" id="setlist">
        <header><p>05 / SETLIST EN ORDEN</p><h2>CUARENTA TEMAS.<br />DE PRINCIPIO A FIN.</h2><span>Orden reconstruido con Setlist.fm y crónicas del show. Cada botón disponible abre directamente la pista o el video correspondiente.</span></header>
        <div>{setlist.map((block, blockIndex) => <article key={block[0]}><span>BLOQUE {String(blockIndex + 1).padStart(2, '0')}</span><h3>{block[0]}</h3><ol>{block[1].map((song, songIndex) => {
          const links = trackLinks[song] || {}
          const number = totalBefore(blockIndex) + songIndex + 1
          return <li key={song}><b>{String(number).padStart(2, '0')}</b><span>{song}</span><div className="ys-song-links"><PlatformLink href={links.youtube} label="YT" song={song}><Play /></PlatformLink><PlatformLink href={links.spotify} label="Spotify" song={song}><Music2 /></PlatformLink><PlatformLink href={links.apple} label="Apple" song={song}><ExternalLink /></PlatformLink></div></li>
        })}</ol></article>)}</div>
      </section>

      <section className="cv-venue" id="estadio"><div className="cv-map ys-stadium"><img src={stadiumPhoto} alt="Gradas y campo del Estadio Tomás Adolfo Ducó" /><span>PARQUE PATRICIOS<br />BUENOS AIRES</span><b>EL DUCÓ</b></div><div><p>06 / EL EPICENTRO</p><h2>ESTADIO TOMÁS<br />ADOLFO DUCÓ.</h2><p>El campo y las tribunas de Huracán se convirtieron en una rave, un concierto de trap y una celebración porteña. Los pogos provocaron reportes de vibraciones en viviendas cercanas.</p><dl><div><dt>FECHA REAL</dt><dd>Martes 19 de diciembre de 2023</dd></div><div><dt>INICIO</dt><dd>Aproximadamente 21:00</dd></div><div><dt>PÚBLICO</dt><dd>Entre 45.000 y 50.000 personas</dd></div><div><dt>PUESTA</dt><dd>Tres pantallas LED y visuales lisérgicas</dd></div></dl></div></section>

      <section className="cv-tickets ys-archive" id="archivo"><header><p>07 / ÚNICO BLOQUE OFICIAL PUBLICADO</p><h2>EL FINAL QUEDÓ<br />GRABADO.</h2></header><div className="ys-official-video"><iframe src="https://www.youtube-nocookie.com/embed/U4BCd4pz9Vc" title="YSY A — Bloque final en el Estadio de Huracán" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><div><span>VIDEO OFICIAL · YSY A</span><h3>BLOQUE FINAL — ESTADIO DE HURACÁN</h3><p>Producción ejecutiva de Sponsor Dios. Publicado en el canal oficial de YSY A el 3 de junio de 2024.</p><a href="https://www.youtube.com/watch?v=U4BCd4pz9Vc" target="_blank" rel="noreferrer">Abrir en YouTube <ArrowRight /></a></div></div><div>{[['HIDRO', 'Apertura del encore', '00:00', '0'], ['FULL ICE', 'Segundo impacto', '03:28', '208'], ['TAMO LOCO', 'El último pogo', '07:42', '462']].map((x, i) => <article key={x[0]}><span>BLOQUE FINAL · 0{i + 1}</span><h3>{x[0]}</h3><p>{x[1]}</p><strong>{x[2]}</strong><ul><li><Check />Registro oficial</li><li><Check />Estadio de Huracán</li></ul><a href={`https://www.youtube.com/watch?v=U4BCd4pz9Vc&t=${x[3]}s`} target="_blank" rel="noreferrer">Reproducir desde aquí <Play /></a></article>)}</div></section>

      <section className="cv-faq" id="datos"><header><p>08 / DATOS</p><h2>LO QUE HIZO<br />HISTÓRICA LA NOCHE.</h2></header><div>{[['¿Cuándo se realizó realmente?', 'El martes 19 de diciembre de 2023. La fecha del domingo 17 fue reprogramada por el temporal.'], ['¿Por qué se habla de YSYSMO?', 'El término quedó asociado a la energía y los movimientos provocados por los pogos. También es el álbum publicado el 11 de noviembre de 2022.'], ['¿Cómo se construyó el setlist?', 'Se ordenaron las cuarenta canciones documentadas por Setlist.fm y se contrastaron los bloques con crónicas publicadas después del concierto.'], ['¿Esta es la web oficial?', 'No. Es una demostración editorial no oficial, sin venta de entradas y sin representación del artista o Sponsor Dios.']].map(x => <details key={x[0]}><summary>{x[0]}<ChevronDown /></summary><p>{x[1]}</p></details>)}</div></section>
    </main>

    <footer className="cv-footer"><div><a className="cv-logo" href="#inicio">YSY<span>SMO</span></a><p>19 DIC 2023 · HURACÁN · BUENOS AIRES</p></div><div><a href="#historia">Historia</a><a href="#galeria">Imágenes</a><a href="#setlist">Setlist</a></div><div><a href="#estadio">Estadio</a><a href="#archivo">Archivo</a><a href="/">← Todas las demos</a></div><span>HOMENAJE EDITORIAL NO OFICIAL</span></footer>
  </div>
}
