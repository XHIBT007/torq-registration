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
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      const scroll = window.scrollY
      const viewport = window.innerHeight

      const fadeStart = viewport * 0.08
      const fadeEnd = viewport * 0.32

      const progress = Math.min(
        1,
        Math.max(
          0,
          (scroll - fadeStart) /
            (fadeEnd - fadeStart),
        ),
      )

      setVisible(progress)
      setScrolled(scroll > viewport * 0.08)
    }

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll,
      )

      window.removeEventListener(
        'resize',
        update,
      )

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  useEffect(() => {
    if (visible < 0.05) {
      setMenuOpen(false)
    }
  }, [visible])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener(
        'keydown',
        onKeyDown,
      )
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow =
        previousOverflow
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        `
          fixed
          inset-x-0
          top-0
          z-50
          transition-[background-color,border-color,box-shadow,backdrop-filter,opacity,transform]
          duration-300
          ease-out
          motion-reduce:transition-none
        `,
        scrolled
          ? `
            border-b
            border-white/10
            bg-black/80
            shadow-[0_8px_32px_rgba(0,0,0,0.24)]
            backdrop-blur-xl
          `
          : `
            border-b
            border-transparent
            bg-black/20
            backdrop-blur-sm
          `,
      )}
      style={{
        opacity: visible,
        transform: `translate3d(0, ${
          (1 - visible) * -10
        }px, 0)`,
        pointerEvents:
          visible > 0.05
            ? 'auto'
            : 'none',
      }}
    >
      <nav
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ====================================================
            LOGO
            ==================================================== */}

        <a
          href="#top"
          aria-label="TOR'Q home"
          className="
            group
            flex
            h-10
            items-center
            rounded-md
            outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-2
            focus-visible:ring-offset-black
          "
        >
          <img
            src="/images/torq-logo.png"
            alt="TOR'Q"
            className="
              h-8
              w-auto
              object-contain
              transition-transform
              duration-200
              motion-reduce:transition-none
              group-hover:scale-[1.02]
              sm:h-9
            "
          />
        </a>

        {/* ====================================================
            DESKTOP NAVIGATION
            ==================================================== */}

        <div
          className="
            hidden
            items-center
            gap-6
            md:flex
            lg:gap-8
          "
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                group
                relative
                rounded-sm
                px-1
                py-2
                text-sm
                font-medium
                tracking-wide
                text-white/55
                outline-none
                transition-colors
                duration-200
                hover:text-white
                focus-visible:text-white
                focus-visible:ring-2
                focus-visible:ring-red-500
              "
            >
              {link.label}

              <span
                aria-hidden="true"
                className="
                  absolute
                  bottom-0
                  left-1
                  h-px
                  w-0
                  bg-red-500
                  transition-[width]
                  duration-200
                  ease-out
                  motion-reduce:transition-none
                  group-hover:w-[calc(100%-0.5rem)]
                  group-focus-visible:w-[calc(100%-0.5rem)]
                "
              />
            </a>
          ))}
        </div>

        {/* ====================================================
            ACTIONS
            ==================================================== */}

        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={open}
            className="hidden sm:inline-flex"
          >
            Register Now
          </Button>

          {/* MOBILE MENU */}

          <button
            type="button"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black/40
              text-white
              backdrop-blur-md
              outline-none
              transition-[background-color,border-color,transform]
              duration-200
              hover:border-white/30
              hover:bg-white/[0.08]
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black
              active:scale-[0.97]
              md:hidden
            "
            aria-label={
              menuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={menuOpen}
            aria-controls="torq-mobile-menu"
            onClick={() =>
              setMenuOpen((open) => !open)
            }
          >
            {menuOpen ? (
              <X
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            ) : (
              <Menu
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            )}
          </button>
        </div>
      </nav>

      {/* ======================================================
          MOBILE MENU
          ====================================================== */}

      <div
        id="torq-mobile-menu"
        className={cn(
          `
            overflow-hidden
            border-t
            border-white/10
            bg-black/95
            backdrop-blur-xl
            transition-[max-height,opacity]
            duration-300
            ease-out
            motion-reduce:transition-none
            md:hidden
          `,
          menuOpen
            ? 'max-h-[520px] opacity-100'
            : 'max-h-0 border-t-transparent opacity-0',
        )}
      >
        <div className="px-4 pb-5 pt-3 sm:px-6">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  rounded-lg
                  px-3
                  py-3.5
                  text-sm
                  font-medium
                  text-white/60
                  outline-none
                  transition-[background-color,color]
                  duration-200
                  hover:bg-white/[0.06]
                  hover:text-white
                  focus-visible:bg-white/[0.06]
                  focus-visible:text-white
                  focus-visible:ring-2
                  focus-visible:ring-red-500
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-3 w-full"
            onClick={() => {
              setMenuOpen(false)
              open()
            }}
          >
            Register Now
          </Button>
        </div>
      </div>
    </header>
  )
}
