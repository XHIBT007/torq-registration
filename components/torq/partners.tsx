import { ArrowUpRight } from 'lucide-react'

const PARTNERS = [
  {
    name: 'Fearless Energy Drink',
    logo: '/images/partners-fearless-energy-drink.webp',
    logoClass: 'h-[92px] w-[92px] object-contain mix-blend-screen sm:h-[154px] sm:w-[138px]',
  },
  {
    name: 'BSA',
    logo: '/images/partners/bsa.png',
    logoClass: 'h-[92px] w-[92px] object-contain sm:h-[154px] sm:w-[154px]',
  },
  {
    name: 'Tulcan Energy',
    logo: '/images/partners/tulcan-energy.png',
    logoClass: 'h-[74px] w-[136px] object-contain sm:h-[124px] sm:w-[190px]',
  },
  {
    name: 'ASTA',
    logo: '/images/partners/asta-white.png',
    logoClass: 'h-[60px] w-[136px] object-contain mix-blend-screen sm:h-[88px] sm:w-[190px]',
  },
  {
    name: 'Partner logo',
    logo: '/images/partners/new-partner-logo.webp',
    logoClass: 'h-[92px] w-[92px] object-contain sm:h-[154px] sm:w-[154px]',
  },
]

export function Partners() {
  return (
    <section id="partners" className="border-y border-white/[0.06] bg-[#19191f] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <h2 className="font-display text-3xl font-black uppercase leading-none tracking-[-0.035em] sm:text-4xl">Our partners</h2>
          <a href="#sponsors" className="group inline-flex shrink-0 items-center gap-2 text-xs font-bold text-white/75 transition-colors hover:text-white sm:text-sm">
            Become a partner <ArrowUpRight className="h-4 w-4 text-red-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/[0.06] bg-[#25252d]">
        <div className="mx-auto grid grid-cols-2 items-center justify-items-center gap-x-2 gap-y-1 px-3 py-4 sm:min-h-[196px] sm:max-w-7xl sm:grid-cols-[repeat(auto-fit,minmax(150px,180px))] sm:gap-x-12 sm:px-10 sm:py-5">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="flex h-24 w-full items-center justify-center transition duration-300 hover:brightness-125 sm:h-[164px]">
              <img src={partner.logo} alt={partner.name} className={partner.logoClass} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
