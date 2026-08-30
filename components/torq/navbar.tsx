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

  const [scrolled, setScrolled] =
    useState(false)

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [visible, setVisible] =
    useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      const scroll =
        window.scrollY

      const viewport =
        window.innerHeight

      /*
       * The navbar begins appearing while
       * the large hero TOR'Q logo is leaving.
       *
       * It reaches full visibility before
       * the hero content starts moving.
       */
      const fadeStart =
        viewport * 0.08

      const fadeEnd =
        viewport * 0.32

      const progress =
        Math.min(
          1,
          Math.max(
            0,
            (scroll - fadeStart) /
              (fadeEnd - fadeStart),
          ),
        )

      setVisible(progress)

      /*
       * Once we're properly into the page,
       * give the navbar its premium glass
       * treatment.
       */
      setScrolled(
        scroll > viewport * 0.08,
      )
    }

    const onScroll = () => {
      if (!frame) {
        frame =
          window.requestAnimationFrame(
            update,
          )
      }
    }

    update()

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      update,
    )

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
        window.cancelAnimationFrame(
          frame,
        )
      }
    }
  }, [])

  /*
   * Close the mobile menu if the user
   * returns to the very top of the page.
   */
  useEffect(() => {
    if (visible < 0.05) {
      setMenuOpen(false)
    }
  }, [visible])

  return (
    <header
      className={cn(
        `
          fixed
          inset-x-0
          top-0
          z-50
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
        `,
        scrolled
          ? `
            border-b
            border-white/10
            bg-black/75
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
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

        transform:
          `translate3d(0, ${
            (1 - visible) * -14
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
            items-center
          "
        >
          <img
            src="/images/torq-logo.png"
            alt="TOR'Q"
            className="
              h-9
              w-auto
              object-contain
              transition-transform
              duration-500
              group-hover:scale-105
              sm:h-10
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
            gap-7
            md:flex
            lg:gap-8
          "
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                relative
                py-2
                text-sm
                font-medium
                tracking-wide
                text-white/55
                transition-colors
                duration-300
                hover:text-white
              "
            >
              {link.label}

              {/* subtle hover line */}

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-0
                  bg-red-500
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </div>

        {/* ====================================================
            ACTIONS
            ==================================================== */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          {/* REGISTER */}

          <Button
            size="lg"
            className="
              hidden
              sm:inline-flex
            "
            onClick={open}
          >
            Register Now
          </Button>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="
              flex
              size-11
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black/40
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-red-500/60
              hover:bg-white/10
              md:hidden
            "
            aria-label={
              menuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(
                (open) => !open,
              )
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

      {/* ======================================================
          MOBILE MENU
          ====================================================== */}

      <div
        className={cn(
          `
            overflow-hidden
            border-t
            border-white/10
            bg-black/95
            backdrop-blur-xl
            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:hidden
          `,
          menuOpen
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 border-t-transparent opacity-0',
        )}
      >
        <div
          className="
            flex
            flex-col
            gap-1
            px-4
            py-4
          "
        >

          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                rounded-md
                px-3
                py-3
                text-sm
                font-medium
                text-white/60
                transition-all
                duration-300
                hover:bg-white/5
                hover:pl-4
                hover:text-white
              "
            >
              {link.label}
            </a>
          ))}

          <Button
            size="lg"
            className="
              mt-2
              w-full
            "
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
