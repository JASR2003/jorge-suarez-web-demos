import { ArrowUpRight } from 'lucide-react'

export function DemoCard({ demo }) {
  return (
    <a
      className="demo-card"
      href={demo.href}
      style={{ '--card-accent': demo.accent, '--card-soft': demo.soft }}
      aria-label={`Abrir demo básica: ${demo.title}`}
    >
      <div className="demo-card-top">
        <span>{demo.number}</span>
        <span>{demo.sector}</span>
      </div>

      <div className={`demo-thumbnail preview-${demo.slug} ${demo.previewType ? `preview-${demo.previewType}` : ''}`} aria-hidden="true">
        <div className="thumbnail-browser"><i/><i/><i/><span>{demo.href}</span></div>
        {demo.thumbnail && <img src={demo.thumbnail} alt="" loading="lazy" />}
        <div className="thumbnail-overlay">
          <small>{demo.previewMeta}</small>
          <strong>{demo.previewTitle}</strong>
          <span>Explorar proyecto ↗</span>
        </div>
        {demo.previewType === 'legal' && <div className="legal-lines"><i/><i/><i/></div>}
        {demo.previewType === 'editorial' && <div className="editorial-score"><b>4</b><span>—</span><b>0</b></div>}
      </div>

      <div className="demo-card-copy">
        <p>{demo.label}</p>
        <h3>{demo.title}</h3>
        <p>{demo.objective}</p>
      </div>

      <div className="demo-card-footer">
        <span>Abrir proyecto</span>
        <ArrowUpRight aria-hidden="true" />
      </div>
    </a>
  )
}
