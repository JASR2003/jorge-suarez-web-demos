import { ArrowUpRight } from 'lucide-react'

export function DemoCard({ demo }) {
  return (
    <article
      className="demo-card"
      style={{ '--card-accent': demo.accent, '--card-soft': demo.soft }}
    >
      <div className="demo-card-top">
        <span>{demo.number}</span>
        <span>{demo.sector}</span>
      </div>

      <div className="demo-visual" aria-hidden="true">
        <span>{demo.monogram}</span>
        <i className="shape shape-one" />
        <i className="shape shape-two" />
      </div>

      <div className="demo-card-copy">
        <p>{demo.label}</p>
        <h3>{demo.title}</h3>
        <p>{demo.objective}</p>
      </div>

      <div className="demo-card-footer">
        <span>Concepto candidato</span>
        <ArrowUpRight aria-hidden="true" />
      </div>
    </article>
  )
}
