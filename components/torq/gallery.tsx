'use client'

import {
  ArrowUpRight,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { GALLERY } from '@/lib/torq-data'
import { Reveal } from './reveal'

export function Gallery() {
  const sectionRef =
    useRef<HTMLElement>(null)

  const trackRef =
    useRef<HTMLDivElement>(null)

  const [progress, setProgress] =
    useState(0)

  const [distance, setDistance] =
    useState(0)

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let frame = 0

    const measure = () => {
      const track =
        trackRef.current

      if (!track) return

      const horizontalDistance =
        Math.max(
          0,
          track.scrollWidth -
            window.innerWidth +
            window.innerWidth * 0.08,
        )

      setDistance(
        horizontalDistance,
      )
    }

    const update = () => {
      frame = 0

      const section =
        sectionRef.current

      if (!section) return

      const rect =
        section.getBoundingClientRect()

      const sectionHeight =
        section.offsetHeight

      const viewportHeight =
        window.innerHeight

      const scrollable =
        sectionHeight -
        viewportHeight

      if (scrollable <= 0) {
        setProgress(0)
        return
      }

      const travelled =
        Math.max(
          0,
          Math.min(
            scrollable,
            -rect.top,
          ),
        )

      setProgress(
        travelled / scrollable,
      )
    }

    const handleScroll = () => {
      if (!frame) {
        frame =
          window.requestAnimationFrame(
            update,
          )
      }
    }

    const handleResize = () => {
      measure()
      update()
    }

    measure()
    update()

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'resize',
      handleResize,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )

      window.removeEventListener(
        'resize',
        handleResize,
      )

      if (frame) {
        window.cancelAnimationFrame(
          frame,
        )
      }
    }
  }, [])

  /* ============================================================
     CONTINUOUS HORIZONTAL MOVEMENT
     ============================================================ */

  const translateX =
    progress * distance

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="
        relative
        overflow-hidden
        bg-black
        py-24
        text-white
        md:py-32
      "
    >

      {/* ========================================================
          ATMOSPHERE
          ======================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.06]
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-red-600/[0.04]
          blur-[120px]
        "
      />

      {/* ========================================================
          INTRO
          ======================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          md:px-10
        "
      >
        <Reveal>
          <div className="max-w-5xl">

            <p
              className="
                mb-5
                text-sm
                font-bold
                uppercase
                tracking-[0.35em]
                text-red-500
              "
            >
              The Gallery
            </p>

            <h2
              className="
                text-5xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                md:text-7xl
                lg:text-8xl
              "
            >
              The Machines.
              <br />

              <span className="text-red-500">
                The Moments.
              </span>

              <br />

              The Culture.
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                leading-8
                text-white/45
                md:text-xl
              "
            >
              A visual archive of speed,
              engineering, adrenaline and
              the people who make TOR&apos;Q
              more than just a motorsport event.
            </p>

          </div>
        </Reveal>
      </div>

      {/* ========================================================
          HORIZONTAL GALLERY
          ======================================================== */}

      <div
        className="
          relative
          mt-16
          overflow-hidden
          md:mt-20
        "
      >

        {/* ======================================================
            DESKTOP TRACK
            ====================================================== */}

        <div
          ref={trackRef}
          className="
            hidden
            md:block
          "
          style={{
            transform:
              `translate3d(${-translateX}px, 0, 0)`,
          }}
        >
          <div
            className="
              flex
              items-stretch
              gap-5
              pl-[8vw]
              pr-[8vw]
            "
          >

            {GALLERY.map(
              (img, index) => {
                const featured =
                  index === 0 ||
                  index === 3 ||
                  index === 6

                return (
                  <GalleryCard
                    key={img.src}
                    img={img}
                    index={index}
                    featured={featured}
                  />
                )
              },
            )}

          </div>
        </div>

        {/* ======================================================
            MOBILE TRACK
            ====================================================== */}

        <div
          className="
            flex
            gap-4
            overflow-x-auto
            px-6
            pb-4
            md:hidden
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          {GALLERY.map(
            (img, index) => (
              <div
                key={img.src}
                className="
                  group
                  relative
                  h-[420px]
                  w-[82vw]
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-neutral-950
                "
              >

                <img
                  src={
                    img.src ||
                    '/placeholder.svg'
                  }
                  alt={img.alt}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-1000
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/10
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    left-5
                    top-5
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    border
                    border-white/20
                    bg-black/50
                    text-xs
                    font-bold
                    text-white
                    backdrop-blur-sm
                  "
                >
                  {String(
                    index + 1,
                  ).padStart(2, '0')}
                </div>

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    flex
                    items-end
                    justify-between
                    p-6
                  "
                >

                  <div>
                    <p
                      className="
                        mb-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.3em]
                        text-red-500
                      "
                    >
                      TOR&apos;Q
                    </p>

                    <p
                      className="
                        text-sm
                        font-bold
                        uppercase
                        tracking-wide
                        text-white
                      "
                    >
                      {img.alt}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/30
                      text-white
                    "
                  >
                    <ArrowUpRight
                      size={17}
                    />
                  </div>

                </div>

              </div>
            ),
          )}

        </div>

      </div>

      {/* ========================================================
          SCROLL INDICATOR
          ======================================================== */}

      <div
        className="
          mx-auto
          mt-8
          flex
          max-w-7xl
          items-center
          gap-4
          px-6
          md:px-10
        "
      >

        <div
          className="
            h-px
            flex-1
            bg-white/10
          "
        />

        <p
          className="
            shrink-0
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.35em]
            text-white/25
          "
        >
          Scroll to explore
        </p>

        <div
          className="
            h-px
            flex-1
            bg-white/10
          "
        />

      </div>

      {/* ========================================================
          CLOSING STATEMENT
          ======================================================== */}

      <Reveal
        delay={150}
        className="
          mx-auto
          mt-20
          max-w-7xl
          border-t
          border-white/10
          px-6
          pt-10
          md:mt-28
          md:px-10
        "
      >
        <div
          className="
            flex
            flex-col
            gap-8
            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          <div>

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.35em]
                text-white/30
              "
            >
              Artistry in Motorsport
            </p>

            <h3
              className="
                mt-4
                max-w-2xl
                text-3xl
                font-black
                uppercase
                leading-tight
                md:text-5xl
              "
            >
              Every machine
              <br />
              has a story.

              <br />

              <span className="text-red-500">
                TOR&apos;Q tells it.
              </span>
            </h3>

          </div>

          <p
            className="
              max-w-sm
              text-sm
              leading-6
              text-white/35
            "
          >
            From the roar of the engine
            to the details in the build,
            this is where performance
            becomes culture.
          </p>

        </div>
      </Reveal>

    </section>
  )
}

/* ================================================================
   GALLERY CARD
   ================================================================ */

function GalleryCard({
  img,
  index,
  featured,
}: {
  img: (typeof GALLERY)[number]
  index: number
  featured: boolean
}) {
  return (
    <article
      className={`
        group
        relative
        shrink-0
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-neutral-950

        ${
          featured
            ? `
              h-[520px]
              w-[62vw]
              max-w-[900px]
            `
            : `
              h-[420px]
              w-[38vw]
              max-w-[560px]
            `
        }
      `}
    >

      {/* IMAGE */}

      <img
        src={
          img.src ||
          '/placeholder.svg'
        }
        alt={img.alt}
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1400ms]
          ease-out
          group-hover:scale-105
        "
      />

      {/* DARK GRADIENT */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/10
          to-transparent
          transition-opacity
          duration-700
          group-hover:from-black
        "
      />

      {/* CINEMATIC RED SWEEP */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          -left-1/2
          w-1/3
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-red-500/[0.08]
          to-transparent
          transition-transform
          duration-[1200ms]
          group-hover:translate-x-[500%]
        "
      />

      {/* NUMBER */}

      <div
        className="
          absolute
          left-5
          top-5
          flex
          h-10
          w-10
          items-center
          justify-center
          border
          border-white/20
          bg-black/50
          text-xs
          font-bold
          text-white
          backdrop-blur-sm
          transition-all
          duration-500
          group-hover:border-red-500/70
          group-hover:bg-red-500/20
        "
      >
        {String(
          index + 1,
        ).padStart(2, '0')}
      </div>

      {/* CONTENT */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          flex
          items-end
          justify-between
          p-6
          md:p-8
        "
      >

        <div
          className="
            transition-transform
            duration-500
            group-hover:-translate-y-1
          "
        >

          <p
            className="
              mb-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-red-500
            "
          >
            TOR&apos;Q
          </p>

          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-white
              md:text-base
            "
          >
            {img.alt}
          </p>

        </div>

        {/* ARROW */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            text-white
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:border-red-500
            group-hover:bg-red-500
          "
        >
          <ArrowUpRight
            size={17}
            className="
              transition-transform
              duration-500
              group-hover:rotate-45
            "
          />
        </div>

      </div>

      {/* BOTTOM ACCENT */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-full
          bg-red-500
          opacity-70
        "
      />

    </article>
  )
}
