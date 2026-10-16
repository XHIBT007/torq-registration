import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'

export function Partners() {
  return (
    <section id="partners" className="relative overflow-hidden border-y border-white/10 bg-[#0d0d0d] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-[42%] bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.025)_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-black italic leading-none tracking-[-0.1em] text-white/[0.025] text-[16rem] sm:text-[22rem]">01</div>

      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-16 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 sm:text-[11px]">
                <span className="h-px w-8 bg-red-500" /> TOR’Q 2026 <span className="text-white/25">/</span> PARTNER 01
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-black uppercase leading-[0.93] tracking-[-0.045em] sm:text-5xl md:text-[3.6rem]">
                Good company.<br /><span className="text-white/45">Full-throttle energy.</span>
              </h2>
              <a href="#sponsors" className="group mt-7 inline-flex items-center gap-3 border-b border-white/25 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 transition hover:border-red-500 hover:text-white">
                Join the partner line-up <ArrowUpRight className="h-4 w-4 text-red-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <article className="group relative mx-auto flex w-full max-w-[470px] items-center gap-5 overflow-hidden border border-white/10 bg-[#141414] p-4 sm:gap-7 sm:p-5">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-red-600 transition-colors group-hover:bg-red-500" />
              <div className="flex h-[132px] w-[118px] shrink-0 items-center justify-center overflow-hidden bg-black sm:h-[150px] sm:w-[134px]">
                <img src="/images/partners-fearless-energy-drink.webp" alt="Fearless Energy Drink" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="min-w-0 py-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-red-500">On the TOR’Q grid</p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-[0.95] tracking-tight sm:text-3xl">Fearless</h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">Energy Drink</p>
                <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Ibadan · 2026
                </div>
              </div>
              <span aria-hidden="true" className="absolute right-4 top-3 font-mono text-[9px] tracking-[0.2em] text-white/20">TOR’Q / 26</span>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
