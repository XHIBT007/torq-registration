'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X, ArrowUpRight } from 'lucide-react'
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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? 'hidden'
      : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/10 bg-black/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8',
          'transition-all duration-500',
          scrolled
            ? 'h-16'
            : 'h-[72px]',
        )}
      >
        {/* ====================================================== */}
        {/* LOGO                                                     */}
        {/* ====================================================== */}

        <a
          href="#top"
          className="group flex items-center"
          aria-label="TOR'Q home"
        >
          <div
  className="h-10 w-[120px]"
  aria-hidden="true"
/>
        </a>

        {/* ====================================================== */}
        {/* DESKTOP NAV                                              */}
        {/* ====================================================== */}

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                group relative py-2
                text-xs font-semibold uppercase
                tracking-[0.18em]
                text-white/55
                transition-colors duration-300
                hover:text-white
              "
            >
              {link.label}

              {/* Hover underline */}
              <span
                className="
                  absolute bottom-0 left-0 h-px w-0
                  bg-red-500
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </div>

        {/* ====================================================== */}
        {/* ACTIONS                                                  */}
        {/* ====================================================== */}

        <div className="flex items-center gap-3">
          <Button
            size="lg"
            onClick={open}
            className="
              hidden rounded-full
              bg-red-600 px-6
              text-xs font-bold uppercase
              tracking-[0.12em]
              text-white
              transition-all duration-300
              hover:scale-105
              hover:bg-red-500
              hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]
              sm:inline-flex
            "
          >
            Register Now

            <ArrowUpRight
              className="
                ml-1 size-4
                transition-transform duration-300
                group-hover:-translate-y-0.5
              "
            />
          </Button>

          {/* Mobile menu button */}
          <button
            className="
              flex size-10 items-center justify-center
              rounded-full
              border border-white/10
              bg-white/[0.04]
              text-white
              transition-all duration-300
              hover:border-red-500/50
              hover:bg-red-500/10
              md:hidden
            "
            aria-label={
              menuOpen
                ? 'Close menu'
                : 'Open menu'
            }
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

      {/* ======================================================== */}
      {/* MOBILE MENU                                               */}
      {/* ======================================================== */}

      <div
        className={cn(
          'overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden',
          'transition-all duration-500 ease-out',
          menuOpen
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-5 pb-6 pt-4">
          <div className="flex flex-col">
            {LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  flex items-center justify-between
                  border-b border-white/5
                  py-4
                  text-sm font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/60
                  transition-colors
                  hover:text-white
                "
                style={{
                  transitionDelay: menuOpen
                    ? `${index * 40}ms`
                    : '0ms',
                }}
              >
                {link.label}

                <ArrowUpRight className="size-4 text-red-500" />
              </a>
            ))}

            <Button
              size="lg"
              onClick={() => {
                setMenuOpen(false)
                open()
              }}
              className="
                mt-5 h-13 w-full
                rounded-full
                bg-red-600
                text-sm font-bold uppercase
                tracking-[0.15em]
                text-white
                transition-all duration-300
                hover:bg-red-500
              "
            >
              <span>Register Now</span>
              <ArrowUpRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
