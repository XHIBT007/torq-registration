import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'

export function Partners() {
  return (
    <section id="partners" className="relative overflow-hidden border-y border-white/10 bg-[#111] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-8 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-red-500 sm:text-xs">
                <span className="h-2 w-2 bg-red-500" /> TOR’Q 2026 · PARTNERS
              </p>
              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                The brands<br /><span className="text-white/35">in our corner.</span>
              </h2>
            </div>
            <a href="#sponsors" className="group inline-flex w-fit items-center gap-3 border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-red-500 hover:bg-red-500">
              Join the line-up <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <article className="group flex min-h-64 flex-col items-center justify-center bg-[#0b0b0b] p-6 transition-colors hover:bg-[#171717]">
              <img src="/images/partners-fearless-energy-drink.jpg" alt="Fearless Energy Drink" className="h-[240px] w-full max-w-[240px] object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Fearless Energy Drink</p>
            </article>
          </Reveal>
          <div className="flex min-h-64 flex-col justify-between bg-[#151515] p-6 sm:col-span-2 lg:col-span-2 sm:p-8">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-red-500">TOR’Q 2026 / IBADAN</span>
              <h3 className="mt-6 max-w-sm text-2xl font-black uppercase leading-tight sm:text-3xl">Put your brand in the fast lane.</h3>
            </div>
            <a href="#sponsors" className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-red-400">
              Explore partnership opportunities <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">December 6, 2026 · Ibadan, Nigeria</p>
      </div>
    </section>
  )
}
