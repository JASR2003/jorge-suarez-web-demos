import { ArrowUpRight } from 'lucide-react'

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-14">
        <div className="flex items-center justify-between gap-6 text-sm text-slate-400">
          <span>Jorge Suárez</span>
          <span>Web Demos</span>
        </div>

        <div className="max-w-3xl py-20">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Catálogo en construcción
          </p>
          <h1 className="text-5xl font-semibold tracking-[-0.06em] text-balance md:text-8xl">
            Sitios pensados para objetivos comerciales reales.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Próximamente encontrarás demostraciones independientes para restaurantes, clínicas,
            productos digitales, inmobiliarias y tiendas.
          </p>
        </div>

        <a
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
          href="https://github.com/JASR2003"
          rel="noreferrer"
          target="_blank"
        >
          Ver GitHub <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </section>
    </main>
  )
}

export default App
