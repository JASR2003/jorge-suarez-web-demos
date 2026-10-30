import { useEffect, useMemo, useState } from 'react'
import { articles, flickEra, seasonStats } from './barcaArticles'
import './barca-blog.css'

const filters = ['TODOS', 'LALIGA', 'CHAMPIONS']

function articleUrl(slug) {
  return `#articulo/${slug}`
}

function scoreParts(score) {
  return score.split(/[–—-]/)
}

function MatchCard({ article, compact = false }) {
  const [homeGoals, awayGoals] = scoreParts(article.score)
  return (
    <a className={`barca-match-card ${compact ? 'is-compact' : ''}`} href={articleUrl(article.slug)}>
      <div className="barca-match-card__image">
        <img src={article.image} alt="" loading="lazy" />
        <span>{article.competition}</span>
      </div>
      <div className="barca-match-card__body">
        <p className="barca-eyebrow">{article.date} · {article.round}</p>
        <div className="barca-scoreline" aria-label={`${article.home} ${homeGoals}, ${article.away} ${awayGoals}`}>
          <span>{article.home}</span><strong>{homeGoals}</strong>
          <span>{article.away}</span><strong>{awayGoals}</strong>
        </div>
        {!compact && <><h3>{article.title}</h3><p>{article.dek}</p></>}
        <span className="barca-read">Leer crónica <b aria-hidden="true">→</b></span>
      </div>
    </a>
  )
}

function SiteHeader({ onSearch }) {
  return <>
    <div className="barca-ticker"><span>TEMPORADA 26/27</span><span>13 PARTIDOS DOCUMENTADOS</span><span>ACTUALIZADO 30 OCT 2026</span></div>
    <header className="barca-header">
      <a className="barca-brand" href="#portada" aria-label="La Grada, portada"><span>LA</span> GRADA<small>BARCELONA · ARCHIVO DE TEMPORADA</small></a>
      <nav aria-label="Navegación principal">
        <a href="#portada">Portada</a><a href="#era-flick">Era Flick</a><a href="#laliga">LaLiga</a><a href="#champions">Champions</a><a href="#archivo">Archivo</a>
      </nav>
      <button className="barca-search-button" onClick={onSearch} aria-label="Abrir buscador">Buscar <span aria-hidden="true">⌕</span></button>
    </header>
  </>
}

function SearchPanel({ open, onClose, query, setQuery }) {
  if (!open) return null
  return <div className="barca-search-panel" role="dialog" aria-modal="true" aria-label="Buscar artículos">
    <div>
      <button onClick={onClose} aria-label="Cerrar buscador">×</button>
      <label htmlFor="barca-search">Buscar por rival, competición o titular</label>
      <input id="barca-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ej. Real Madrid" />
      <a href="#archivo" onClick={onClose}>Ver resultados en el archivo →</a>
    </div>
  </div>
}

function HomePage() {
  const [filter, setFilter] = useState('TODOS')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  useEffect(() => {
    const syncCompetition = () => {
      if (window.location.hash === '#laliga') setFilter('LALIGA')
      if (window.location.hash === '#champions') setFilter('CHAMPIONS')
      if (window.location.hash === '#portada') setFilter('TODOS')
    }
    syncCompetition()
    window.addEventListener('hashchange', syncCompetition)
    return () => window.removeEventListener('hashchange', syncCompetition)
  }, [])
  const featured = articles[0]
  const filtered = useMemo(() => articles.filter((article) => {
    const matchesFilter = filter === 'TODOS' || article.competition.includes(filter)
    const haystack = `${article.title} ${article.home} ${article.away} ${article.competition}`.toLowerCase()
    return matchesFilter && haystack.includes(query.toLowerCase().trim())
  }), [filter, query])

  return <div className="barca-site">
    <SiteHeader onSearch={() => setSearchOpen(true)} />
    <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} query={query} setQuery={setQuery} />
    <main>
      <section className="barca-hero" aria-labelledby="latest-title">
        <a href={articleUrl(featured.slug)} className="barca-hero__image"><img src={featured.image} alt="FC Barcelona contra Real Madrid en el partido destacado" /></a>
        <div className="barca-hero__story">
          <p className="barca-kicker">ÚLTIMA HORA · {featured.competition}</p>
          <h1 id="latest-title"><a href={articleUrl(featured.slug)}>{featured.title}</a></h1>
          <p>{featured.dek}</p>
          <div className="barca-hero__result"><span>{featured.home}</span><strong>{featured.score}</strong><span>{featured.away}</span></div>
          <a className="barca-primary-link" href={articleUrl(featured.slug)}>Leer la crónica completa <span>→</span></a>
        </div>
      </section>

      <section className="barca-stats" aria-label="Balance de temporada">
        <div><strong>{seasonStats.played}</strong><span>Partidos</span></div><div><strong>{seasonStats.wins}</strong><span>Victorias</span></div><div><strong>{seasonStats.goalsFor}</strong><span>Goles a favor</span></div><div><strong>{seasonStats.goalsAgainst}</strong><span>Goles en contra</span></div>
      </section>

      <section className="barca-section barca-recent">
        <div className="barca-section-heading"><p>EL PULSO DEL EQUIPO</p><h2>Los últimos resultados</h2><a href="#archivo">Ver temporada completa →</a></div>
        <div className="barca-recent__grid">{articles.slice(1, 4).map((article) => <MatchCard key={article.slug} article={article} compact />)}</div>
      </section>

      <section className="flick-era" id="era-flick">
        <div className="flick-era__intro"><p>DESDE EL 29 DE MAYO DE 2024</p><h2>La era Flick,<br />en cifras.</h2><p>La temporada actual es el foco diario. Debajo vive el contexto completo del ciclo: sus campañas, sus cifras y los hitos que explican cómo llegó el Barça hasta aquí.</p></div>
        <div className="flick-era__numbers" aria-label="Balance oficial de la era Flick hasta el 25 de octubre de 2026"><div><strong>{flickEra.stats.matches}</strong><span>partidos oficiales</span></div><div><strong>{flickEra.stats.wins}</strong><span>victorias</span></div><div><strong>{flickEra.stats.trophies}</strong><span>títulos</span></div><div><strong>2</strong><span>Ligas seguidas</span></div></div>
        <div className="flick-seasons">{flickEra.seasons.map((season) => <article key={season.season}><div><span>{season.label}</span><strong>{season.season}</strong></div><h3>{season.title}</h3><b>{season.record}</b><p>{season.text}</p><a href={season.source} target="_blank" rel="noreferrer">Consultar historia y datos ↗</a></article>)}</div>
        <div className="flick-milestones">{flickEra.milestones.map((item) => <div key={item.title}><strong>{item.value}</strong><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
        <p className="flick-era__note">Balance acumulado: 129 PJ · 99 V · 10 E · 20 D. Incluye los 116 encuentros de las dos primeras campañas y los 13 partidos oficiales documentados de 2026/27.</p>
      </section>

      <section className="barca-section" id="archivo">
        <div className="barca-archive-heading"><div><p>CRÓNICA A CRÓNICA</p><h2>Archivo 2026/27</h2></div><div className="barca-filters" aria-label="Filtrar artículos">{filters.map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div>
        {query && <p className="barca-query">Resultados para “{query}” · <button onClick={() => setQuery('')}>Limpiar</button></p>}
        <div className="barca-archive-grid">{filtered.map((article) => <MatchCard key={article.slug} article={article} />)}</div>
        {!filtered.length && <div className="barca-empty"><strong>No encontramos partidos.</strong><button onClick={() => { setQuery(''); setFilter('TODOS') }}>Mostrar todo el archivo</button></div>}
      </section>

      <section className="barca-newsletter">
        <div><p>EL PARTIDO, EN TU BANDEJA</p><h2>Una crónica después de cada fecha.</h2></div>
        {subscribed ? <p className="barca-success">¡Listo! Esta demo registró tu suscripción localmente.</p> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}><label className="sr-only" htmlFor="news-email">Correo electrónico</label><input id="news-email" type="email" required placeholder="tu@email.com" /><button>Quiero recibirla →</button></form>}
      </section>
    </main>
    <Footer />
  </div>
}

function ArticlePage({ article }) {
  const [subscribed, setSubscribed] = useState(false)
  const related = articles.filter((item) => item.slug !== article.slug && item.competition === article.competition).slice(0, 3)
  const [homeGoals, awayGoals] = scoreParts(article.score)
  return <div className="barca-site">
    <SiteHeader onSearch={() => { window.location.hash = '#archivo' }} />
    <main className="barca-article">
      <div className="barca-article__top"><a href="#portada">← Volver a portada</a><span>{article.competition} · {article.round}</span></div>
      <header className="barca-article__header">
        <p className="barca-kicker">CRÓNICA · {article.date}</p><h1>{article.title}</h1><p>{article.dek}</p>
      </header>
      <figure className="barca-article__figure"><img src={article.image} alt={`Imagen del partido ${article.home} contra ${article.away}`} /><figcaption>Imagen de la crónica oficial del FC Barcelona.</figcaption></figure>
      <div className="barca-article__layout">
        <aside className="barca-match-sheet"><p>FICHA DEL PARTIDO</p><div className="barca-match-sheet__score"><span>{article.home}<b>{homeGoals}</b></span><i>FINAL</i><span>{article.away}<b>{awayGoals}</b></span></div><dl><div><dt>Fecha</dt><dd>{article.date}</dd></div><div><dt>Estadio</dt><dd>{article.venue}</dd></div><div><dt>Competición</dt><dd>{article.competition}</dd></div><div><dt>Goles</dt><dd>{article.goals}</dd></div></dl></aside>
        <article className="barca-article__body">{article.body.map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}<div className="barca-source"><span>Fuente de datos y referencia</span><a href={article.source} target="_blank" rel="noreferrer">Leer la crónica oficial ↗</a></div></article>
      </div>
      <section className="barca-related"><div className="barca-section-heading"><p>SIGUE LEYENDO</p><h2>Más de {article.competition.toLowerCase()}</h2></div><div>{related.map((item) => <MatchCard key={item.slug} article={item} compact />)}</div></section>
      <section className="barca-newsletter"><div><p>ARCHIVO 26/27</p><h2>Todos los partidos, un solo relato.</h2></div>{subscribed ? <p className="barca-success">Suscripción registrada en esta demo.</p> : <button className="barca-newsletter__standalone" onClick={() => setSubscribed(true)}>Seguir la temporada →</button>}</section>
    </main>
    <Footer />
  </div>
}

function Footer() {
  return <footer className="barca-footer"><a className="barca-brand" href="#portada"><span>LA</span> GRADA</a><p>Demo editorial no oficial. No afiliada al FC Barcelona, LaLiga o UEFA.</p><a href="/">Volver a todas las demos ↗</a></footer>
}

export default function BarcaBlog() {
  const [route, setRoute] = useState(window.location.hash || '#portada')
  useEffect(() => {
    const handleHash = () => { setRoute(window.location.hash || '#portada'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])
  const slug = route.startsWith('#articulo/') ? route.replace('#articulo/', '') : null
  const article = slug ? articles.find((item) => item.slug === slug) : null
  return article ? <ArticlePage article={article} /> : <HomePage />
}
