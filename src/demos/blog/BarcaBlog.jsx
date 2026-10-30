import { useEffect, useMemo, useState } from 'react'
import { articles, flickEra, seasonStats } from './barcaArticles'
import season2425 from './season-2024-25.json'
import season2526 from './season-2025-26.json'
import preseason2627 from './season-2026-preseason.json'
import './barca-blog.css'

const filters = ['TODOS', 'LALIGA', 'CHAMPIONS', 'COPA DEL REY', 'SUPERCOPA', 'AMISTOSO', 'JOAN GAMPER']
const resultLabel = { W: 'VICTORIA', D: 'EMPATE', L: 'DERROTA' }

const monthTranslations = {
  January: 'enero', February: 'febrero', March: 'marzo', April: 'abril', May: 'mayo', June: 'junio',
  July: 'julio', August: 'agosto', September: 'septiembre', October: 'octubre', November: 'noviembre', December: 'diciembre',
}
const competitionNames = {
  CHAMPIONS: 'Liga de Campeones', LALIGA: 'LaLiga', 'COPA DEL REY': 'Copa del Rey',
  SUPERCOPA: 'Supercopa de España', AMISTOSO: 'amistoso', 'JOAN GAMPER': 'Trofeo Joan Gamper',
}

const formatDateEs = (value) => {
  if (!value) return ''
  const isoDate = /^\d{4}-\d{2}-\d{2}$/.test(value)
  if (isoDate) return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))
  return Object.entries(monthTranslations).reduce((date, [english, spanish]) => date.replace(english, `de ${spanish} de`), String(value))
}

const formatRoundEs = (value) => String(value || '')
  .replace(/<br>/g, ' · ')
  .replace(/Matchday\s+(\d+)/gi, 'Jornada $1')
  .replace(/Round of 32/gi, 'Ronda de 32')
  .replace(/Round of 16/gi, 'Octavos de final')
  .replace(/Quarter-finals?/gi, 'Cuartos de final')
  .replace(/Semi-finals?/gi, 'Semifinales')
  .replace(/First leg/gi, 'Ida')
  .replace(/Second leg/gi, 'Vuelta')
  .replace(/Friendly/gi, 'Amistoso')
  .replace(/Preseason/gi, 'Pretemporada')

const competitionName = (value) => competitionNames[value] || value
const slugify = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const historicalArticle = (match, season, index) => {
  const opponent = match.home === 'Barcelona' ? match.away : match.home
  const round = formatRoundEs(match.round)
  const date = formatDateEs(match.date)
  const competition = competitionName(match.competition)
  const slug = `${season.replace('/', '-')}-${slugify(match.date)}-${slugify(opponent)}`
  return {
    ...match, slug, season, round, opponent, historical: true,
    source: match.report,
    title: `${match.home} ${match.score} ${match.away}: la ficha del partido`,
    dek: `${resultLabel[match.result]} azulgrana en ${competition}, correspondiente a ${round || 'la temporada regular'}.`,
    goals: 'Consulta la ficha enlazada para el detalle de goleadores.',
    body: [
      `El archivo de la era Flick registra el ${match.home} ${match.score} ${match.away}, disputado el ${date}. El encuentro correspondió a ${competition} y terminó con ${resultLabel[match.result].toLowerCase()} para el FC Barcelona.`,
      `La cita se jugó en ${match.stadium || 'el estadio del equipo local'}. Esta ficha permite recorrer el calendario completo sin reducir la historia del ciclo únicamente a las finales o a los partidos más recordados.`,
      `El resultado ocupa el lugar ${index + 1} dentro del archivo de la temporada ${season}. Para alineaciones, goleadores e incidencias se conserva el acceso a la ficha de la competición utilizada como referencia.`,
    ],
  }
}

const historicalArticles = [
  ...season2425.matches.map((match, index) => historicalArticle(match, '2024/25', index)),
  ...season2526.matches.map((match, index) => historicalArticle(match, '2025/26', index)),
]
const preseasonArticles2627 = preseason2627.matches.map((match, index) => historicalArticle(match, '2026/27', index))
const allArticles = [...articles, ...preseasonArticles2627, ...historicalArticles]
const byNewest = (first, second) => new Date(second.iso || second.date) - new Date(first.iso || first.date)
const seasonRoutes = {
  '2026/27': '/blog/temporada-2026-27/',
  '2025/26': '/blog/temporada-2025-26/',
  '2024/25': '/blog/temporada-2024-25/',
}

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
      <div className={`barca-match-card__poster result-${String(article.result).toLowerCase()}`}><span>{article.season || '2026/27'}</span><strong>{article.score}</strong><small>{competitionName(article.competition)}</small></div>
      <div className="barca-match-card__body">
        <p className="barca-eyebrow">{formatDateEs(article.date)} · {formatRoundEs(article.round)}</p>
        <div className="barca-scoreline" aria-label={`${article.home} ${homeGoals}, ${article.away} ${awayGoals}`}>
          <span>{article.home}</span><strong>{homeGoals}</strong>
          <span>{article.away}</span><strong>{awayGoals}</strong>
        </div>
        {!compact && <><h3>{article.title}</h3><p>{article.dek}</p></>}
        <span className="barca-read">Ver ficha del partido <b aria-hidden="true">→</b></span>
      </div>
    </a>
  )
}

function SiteHeader({ onSearch, activeSeason }) {
  return <>
    <div className="barca-ticker"><span>ARCHIVO ERA FLICK</span><span>144 PARTIDOS DOCUMENTADOS</span><span>ACTUALIZADO 30 OCT 2026</span></div>
    <header className="barca-header">
      <a className="barca-brand" href="/blog/" aria-label="La Grada, portada"><span>LA</span> GRADA</a>
      <nav aria-label="Navegación principal">
        <a href="/blog/">Portada</a>{Object.entries(seasonRoutes).map(([season, href]) => <a className={activeSeason === season ? 'active' : ''} href={href} key={season}>{season}</a>)}<a href="/blog/#era-flick">Era Flick</a>
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
  const [season, setSeason] = useState('2026/27')
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
  const seasonArticles = (season === '2026/27' ? [...articles, ...preseasonArticles2627] : historicalArticles.filter((article) => article.season === season)).sort(byNewest)
  const filtered = useMemo(() => seasonArticles.filter((article) => {
    const matchesFilter = filter === 'TODOS' || article.competition.includes(filter)
    const haystack = `${article.title} ${article.home} ${article.away} ${article.competition}`.toLowerCase()
    return matchesFilter && haystack.includes(query.toLowerCase().trim())
  }), [filter, query, season])

  return <div className="barca-site">
    <SiteHeader onSearch={() => setSearchOpen(true)} />
    <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} query={query} setQuery={setQuery} />
    <main>
      <section className="barca-hero" aria-labelledby="latest-title">
        <a href={articleUrl(featured.slug)} className="barca-hero__scoreboard" aria-label={`Abrir la ficha de ${featured.home} contra ${featured.away}`}><span>{featured.competition}</span><div><b>{featured.home}</b><strong>{featured.score}</strong><b>{featured.away}</b></div><small>{formatDateEs(featured.date)} · {featured.venue}</small></a>
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

      <section className="barca-desk" aria-labelledby="desk-title">
        <div className="barca-desk__lead"><p>LA REDACCIÓN</p><h2 id="desk-title">Más que resultados.</h2><a href={articleUrl(articles[3].slug)}><div className="barca-desk__score"><span>{articles[3].home}</span><strong>{articles[3].score}</strong><span>{articles[3].away}</span></div><span>Europa</span><h3>Cómo se compite cuando el estadio juega en contra</h3><p>Lecturas tácticas, contexto y las historias que quedan detrás del marcador.</p></a></div>
        <div className="barca-desk__column"><p className="barca-desk__label">SECCIONES</p><a href="#archivo"><span>01</span><div><b>Crónicas</b><p>Todos los partidos oficiales y de pretemporada.</p></div></a><a href="#era-flick"><span>02</span><div><b>Era Flick</b><p>Dos Ligas, cinco títulos y un ciclo en cifras.</p></div></a><a href="#temporadas"><span>03</span><div><b>Hemeroteca</b><p>Los 144 encuentros disputados desde julio de 2024.</p></div></a></div>
        <aside className="barca-desk__brief"><p>EL DATO</p><strong>369</strong><h3>goles oficiales</h3><p>174 en 2024/25, 144 en 2025/26 y 51 en los primeros 13 partidos del nuevo curso.</p><small>La cifra del curso actual se actualiza con cada partido.</small></aside>
      </section>

      <section className="flick-era" id="era-flick">
        <div className="flick-era__intro"><p>DESDE EL 29 DE MAYO DE 2024</p><h2>La era Flick,<br />en cifras.</h2><p>La temporada actual es el foco diario. Debajo vive el contexto completo del ciclo: sus campañas, sus cifras y los hitos que explican cómo llegó el Barça hasta aquí.</p></div>
        <div className="flick-era__numbers" aria-label="Balance oficial de la era Flick hasta el 25 de octubre de 2026"><div><strong>{flickEra.stats.matches}</strong><span>partidos oficiales</span></div><div><strong>{flickEra.stats.wins}</strong><span>victorias</span></div><div><strong>{flickEra.stats.trophies}</strong><span>títulos</span></div><div><strong>2</strong><span>Ligas seguidas</span></div></div>
        <div className="flick-seasons">{flickEra.seasons.map((season) => <article key={season.season}><div><span>{season.label}</span><strong>{season.season}</strong></div><h3>{season.title}</h3><b>{season.record}</b><p>{season.text}</p><a href={season.source} target="_blank" rel="noreferrer">Consultar historia y datos ↗</a></article>)}</div>
        <div className="flick-milestones">{flickEra.milestones.map((item) => <div key={item.title}><strong>{item.value}</strong><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
        <p className="flick-era__note">Balance acumulado: 130 PJ · 99 V · 10 E · 21 D. Incluye los 117 encuentros de las dos primeras campañas y los 13 partidos oficiales documentados de 2026/27.</p>
      </section>

      <section className="barca-section" id="archivo">
        <div className="barca-season-switcher" id="temporadas"><span>VER TEMPORADA EN SU PROPIA PÁGINA</span><div>{Object.entries(seasonRoutes).map(([item, href]) => <a key={item} className={season === item ? 'active' : ''} href={href}>{item}</a>)}</div></div>
        <div className="barca-archive-heading"><div><p>{season === '2026/27' ? 'CRÓNICA A CRÓNICA' : 'HEMEROTECA COMPLETA'}</p><h2>Archivo {season}</h2><span>{seasonArticles.length} partidos oficiales</span></div><div className="barca-filters" aria-label="Filtrar artículos">{filters.filter((item) => item === 'TODOS' || seasonArticles.some((article) => article.competition === item)).map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div>
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

function SeasonPage({ season }) {
  const [filter, setFilter] = useState('TODOS')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const seasonArticles = (season === '2026/27' ? [...articles, ...preseasonArticles2627] : historicalArticles.filter((article) => article.season === season)).sort(byNewest)
  const filtered = useMemo(() => seasonArticles.filter((article) => {
    const matchesFilter = filter === 'TODOS' || article.competition === filter
    return matchesFilter && `${article.title} ${article.home} ${article.away}`.toLowerCase().includes(query.toLowerCase().trim())
  }), [filter, query, season])
  const stats = seasonArticles.reduce((summary, article) => {
    const [home, away] = scoreParts(article.score).map(Number)
    const barcaHome = article.home.includes('BARCELONA') || article.home === 'Barcelona'
    summary.goalsFor += barcaHome ? home : away
    summary.goalsAgainst += barcaHome ? away : home
    const result = resultLabel[article.result] || article.result
    summary[result] = (summary[result] || 0) + 1
    return summary
  }, { goalsFor: 0, goalsAgainst: 0 })
  const title = season === '2024/25' ? 'El año del triplete nacional.' : season === '2025/26' ? 'La confirmación del proyecto.' : 'El presente, partido a partido.'
  const subtitle = season === '2024/25' ? '65 partidos · desde la gira de verano hasta San Mamés' : season === '2025/26' ? '61 partidos · pretemporada, Liga, Copa, Supercopa y Champions' : '18 partidos · pretemporada y competición oficial'

  return <div className="barca-site">
    <SiteHeader activeSeason={season} onSearch={() => setSearchOpen(true)} />
    <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} query={query} setQuery={setQuery} />
    <main>
      <header className={`season-masthead season-${season.replace('/', '-')}`}><div><p>HEMEROTECA · {season}</p><h1>{title}</h1><span>{subtitle}</span></div><strong>{season}</strong></header>
      <section className="barca-stats" aria-label={`Balance ${season}`}><div><strong>{seasonArticles.length}</strong><span>Partidos</span></div><div><strong>{stats.VICTORIA || 0}</strong><span>Victorias</span></div><div><strong>{stats.goalsFor}</strong><span>Goles a favor</span></div><div><strong>{stats.goalsAgainst}</strong><span>Goles en contra</span></div></section>
      <section className="barca-section" id="archivo">
        <div className="barca-season-breadcrumb"><a href="/blog/">Portada</a><span>→</span><b>Temporada {season}</b></div>
        <div className="barca-archive-heading"><div><p>CALENDARIO COMPLETO</p><h2>Todos los partidos</h2><span>{filtered.length} resultados</span></div><div className="barca-filters">{filters.filter((item) => item === 'TODOS' || seasonArticles.some((article) => article.competition === item)).map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div>
        {query && <p className="barca-query">Resultados para “{query}” · <button onClick={() => setQuery('')}>Limpiar</button></p>}
        <div className="barca-archive-grid">{filtered.map((article) => <MatchCard key={article.slug} article={article} />)}</div>
      </section>
    </main>
    <Footer />
  </div>
}

function SquadList({ title, players }) {
  return <section className="match-squad"><h3>{title}</h3>{players?.length ? <ol>{players.map((player) => <li key={`${player.number || ''}-${player.name}`}><span>{player.number || '—'}</span><b>{player.name}</b><small>{player.position || ''}</small></li>)}</ol> : <p className="match-data-empty">El acta enlazada no ofrece todavía un once verificable para esta ficha.</p>}</section>
}

function MatchCentre({ article }) {
  const details = article.details || {}
  const goalEvents = details.events || (!article.goals?.startsWith('Consulta') ? article.goals.split(' · ').filter(Boolean).map((label) => ({ type: 'goal', label })) : [])
  const substitutions = details.substitutions || []
  const cards = details.cards || []
  return <section className="match-centre" aria-labelledby="match-centre-title">
    <div className="match-centre__heading"><p>ACTA Y DESARROLLO</p><h2 id="match-centre-title">El partido, dato a dato</h2><span>La información solo se publica cuando puede contrastarse con la fuente enlazada.</span></div>
    <div className="match-centre__lineups">
      <SquadList title={`Once de ${article.home}`} players={details.homeLineup} />
      <div className="match-centre__formation"><span>FORMACIONES</span><strong>{details.homeFormation || '—'}</strong><i>contra</i><strong>{details.awayFormation || '—'}</strong></div>
      <SquadList title={`Once de ${article.away}`} players={details.awayLineup} />
    </div>
    <div className="match-centre__records">
      <section><h3>Goles e incidencias</h3>{goalEvents.length ? <ol className="match-timeline">{goalEvents.map((event, index) => <li key={`${event.minute || ''}-${event.label}-${index}`}><time>{event.minute || 'GOL'}</time><div><b>{event.label}</b>{event.assist && <span>Asistencia: {event.assist}</span>}</div></li>)}</ol> : <p className="match-data-empty">La fuente consultada no detalla los goleadores de este encuentro.</p>}</section>
      <section><h3>Cambios</h3>{substitutions.length ? <ol className="match-substitutions">{substitutions.map((change, index) => <li key={`${change.minute}-${index}`}><time>{change.minute}</time><div><b>Entra {change.in}</b><span>Sale {change.out} · {change.team}</span></div></li>)}</ol> : <p className="match-data-empty">Los cambios todavía no están disponibles en el acta de esta ficha.</p>}</section>
      <section><h3>Tarjetas</h3>{cards.length ? <ol className="match-cards">{cards.map((card, index) => <li key={`${card.minute}-${card.player}-${index}`}><span className={`card card-${card.color || 'yellow'}`} aria-hidden="true" /><div><b>{card.player}</b><small>{card.minute} · {card.team}</small></div></li>)}</ol> : <p className="match-data-empty">No hay tarjetas verificadas cargadas para este partido.</p>}</section>
    </div>
    <a className="match-centre__source" href={article.source} target="_blank" rel="noreferrer">Consultar el acta o crónica de origen <span>↗</span></a>
  </section>
}

function ArticlePage({ article }) {
  const [subscribed, setSubscribed] = useState(false)
  const related = allArticles.filter((item) => item.slug !== article.slug && item.competition === article.competition && (item.season || '2026/27') === (article.season || '2026/27')).slice(0, 3)
  const [homeGoals, awayGoals] = scoreParts(article.score)
  return <div className="barca-site">
    <SiteHeader activeSeason={article.season || '2026/27'} onSearch={() => { window.location.hash = '#archivo' }} />
    <main className="barca-article">
      <div className="barca-article__top"><a href="#portada">← Volver a portada</a><span>{competitionName(article.competition)} · {formatRoundEs(article.round)}</span></div>
      <header className="barca-article__header">
        <p className="barca-kicker">CRÓNICA · {formatDateEs(article.date)}</p><h1>{article.title}</h1><p>{article.dek}</p>
      </header>
      <div className="barca-article__poster"><span>{article.season || '2026/27'} · {competitionName(article.competition)}</span><div><b>{article.home}</b><strong>{article.score}</strong><b>{article.away}</b></div><small>{formatDateEs(article.date)} · {article.venue || article.stadium}</small></div>
      <div className="barca-article__layout">
        <aside className="barca-match-sheet"><p>FICHA DEL PARTIDO</p><div className="barca-match-sheet__score"><span>{article.home}<b>{homeGoals}</b></span><i>FINAL</i><span>{article.away}<b>{awayGoals}</b></span></div><dl><div><dt>Fecha</dt><dd>{formatDateEs(article.date)}</dd></div><div><dt>Estadio</dt><dd>{article.venue || article.stadium}</dd></div><div><dt>Competición</dt><dd>{competitionName(article.competition)}</dd></div><div><dt>Goles</dt><dd>{article.goals}</dd></div></dl></aside>
        <article className="barca-article__body">{article.body.map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}<div className="barca-source"><span>Fuente de datos y referencia</span><a href={article.source} target="_blank" rel="noreferrer">Leer la crónica oficial ↗</a></div></article>
      </div>
      <MatchCentre article={article} />
      <section className="barca-related"><div className="barca-section-heading"><p>SIGUE LEYENDO</p><h2>Más de {competitionName(article.competition)}</h2></div><div>{related.map((item) => <MatchCard key={item.slug} article={item} compact />)}</div></section>
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
  const article = slug ? allArticles.find((item) => item.slug === slug) : null
  const path = window.location.pathname
  const pageSeason = Object.entries(seasonRoutes).find(([, href]) => path.startsWith(href))?.[0]
  if (article) return <ArticlePage article={article} />
  if (pageSeason) return <SeasonPage season={pageSeason} />
  return <HomePage />
}
