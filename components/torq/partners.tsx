import { ArrowUpRight } from 'lucide-react'

const PARTNERS = [
  { name: 'Fearless Energy Drink', logo: '/images/partners-fearless-energy-drink.webp' },
]

export function Partners() {
  return (
    <section id="partners" className="border-y border-white/[0.06] bg-[#19191f] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14">
        <div className="flex items-center justify-between gap-6">
          <h2 className="font-display text-3xl font-black uppercase leading-none tracking-[-0.035em] sm:text-4xl">Our partners</h2>
          <a href="#sponsors" className="group inline-flex shrink-0 items-center gap-2 text-xs font-bold text-white/75 transition-colors hover:text-white sm:text-sm">
            Become a partner <ArrowUpRight className="h-4 w-4 text-red-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/[0.06] bg-[#25252d]">
        <div className="mx-auto grid min-h-[176px] max-w-7xl grid-cols-[repeat(auto-fit,minmax(150px,180px))] items-center justify-center gap-x-8 px-6 py-5 sm:min-h-[196px] sm:gap-x-12 sm:px-10">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="flex h-[148px] items-center justify-center transition duration-300 hover:brightness-125 sm:h-[164px]">
              <img src={partner.logo} alt={partner.name} className="h-[138px] w-[124px] object-contain mix-blend-screen sm:h-[154px] sm:w-[138px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
