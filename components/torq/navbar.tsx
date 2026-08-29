'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRegistration } from './registration'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { open } = useRegistration()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const scroll = window.scrollY

      setScrolled(scroll > 40)

      /*
       * Navbar starts appearing almost immediately,
       * but reaches full visibility as the hero logo disappears.
       */
      const progress = Math.min(
  1,
  Math.max(
    0,
    (scroll - window.innerHeight * 0.08) /
      (window.innerHeight * 0.25),
  ),
)

setVisible(progress)

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    update()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-700',
        scrolled
  ? 'border-b border-white/10 bg-black/90 backdrop-blur-xl'
  : 'border-b border-transparent bg-black/20 backdrop-blur-sm',
      )}
      style={{
  opacity: visible,
  transform: `translateY(${(1 - visible) * -12}px)`,
  pointerEvents: visible > 0.05 ? 'auto' : 'none',
}}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <a
          href="#top"
          className="flex items-center"
          aria-label="TOR'Q home"
        >
          <img
            src="/images/torq-logo.png"
            alt="TOR'Q"
            className="h-9 w-auto object-contain sm:h-10"
          />
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/60 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            className="hidden sm:inline-flex"
            onClick={open}
          >
            Register Now
          </Button>

          <button
            className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
          >
            {menuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="animate-fade-in border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <Button
              size="lg"
              className="mt-2"
              onClick={() => {
                setMenuOpen(false)
                open()
              }}
            >
              Register Now
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
