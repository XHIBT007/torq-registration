'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { GALLERY } from '@/lib/torq-data'
import { Reveal } from './reveal'
import { Lightbox } from './lightbox'

export function Gallery() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null)

  return (
    <section
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

      {/* ==========================================================
          ATMOSPHERE
          ========================================================== */}

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
          bg-red-600/[0.05]
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
          bg-red-600/[0.03]
          blur-[120px]
        "
      />

      {/* ==========================================================
          INTRO
          ========================================================== */}

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
              A visual archive of performance,
              engineering, adrenaline and the people
              who make TOR&apos;Q more than just a
              motorsport event.
            </p>

          </div>
        </Reveal>
      </div>

      {/* ==========================================================
          HORIZONTAL GALLERY
          ========================================================== */}

      <div
        className="
          relative
          mt-16
          md:mt-20
        "
      >

        {/* Edge fades */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-12
            bg-gradient-to-r
            from-black
            to-transparent
            md:w-28
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-12
            bg-gradient-to-l
            from-black
            to-transparent
            md:w-28
          "
        />

        {/* ========================================================
            SCROLLABLE RAIL

            IMPORTANT:
            This is an independently scrollable horizontal area.
            Vertical page scrolling is not hijacked.
            ======================================================== */}

        <div
          className="
            overflow-x-auto
            overscroll-x-contain
            overscroll-y-none
            px-6
            pb-5
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            md:px-[8vw]
          "
        >
          <div
            className="
              flex
              w-max
              items-stretch
              gap-5
            "
          >

            {GALLERY.map(
              (img, index) => (
                <GalleryCard
                  key={`${img.src}-${index}`}
                  img={img}
                  index={index}
                  onOpen={() =>
                    setActiveIndex(index)
                  }
                />
              ),
            )}

          </div>
        </div>
      </div>

      {/* ==========================================================
          SCROLL CUE
          ========================================================== */}

      <div
        className="
          mx-auto
          mt-7
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

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
          "
        >
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white/25
            "
          >
            Explore the moments
          </span>

          <ArrowUpRight
            size={13}
            className="
              rotate-45
              text-red-500
            "
          />
        </div>

        <div
          className="
            h-px
            flex-1
            bg-white/10
          "
        />

      </div>

      {/* ==========================================================
          CLOSING STATEMENT
          ========================================================== */}

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
            From the roar of the engine to the
            details in the build, this is where
            performance becomes culture.
          </p>

        </div>
      </Reveal>

      {/* ==========================================================
          LIGHTBOX
          ========================================================== */}

      {activeIndex !== null && (
        <Lightbox
          images={GALLERY}
          activeIndex={activeIndex}
          onClose={() =>
            setActiveIndex(null)
          }
          onNavigate={setActiveIndex}
        />
      )}

    </section>
  )
}

/* ================================================================
   GALLERY CARD
   ================================================================ */

function GalleryCard({
  img,
  index,
  onOpen,
}: {
  img: (typeof GALLERY)[number]
  index: number
  onOpen: () => void
}) {
  const featured =
    index === 0 ||
    index === 3 ||
    index === 6

  return (
    <article
      onClick={onOpen}
      className={`
        group
        relative
        shrink-0
        cursor-pointer
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-neutral-950

        ${
          featured
            ? 'h-[500px] w-[58vw] max-w-[860px]'
            : 'h-[500px] w-[38vw] max-w-[560px]'
        }

        sm:h-[520px]

        transition-all
        duration-700
        hover:border-white/20
      `}
    >

      {/* ==========================================================
          IMAGE
          ========================================================== */}

      <img
        src={
          img.src ||
          '/placeholder.svg'
        }
        alt={img.alt}
        draggable={false}
        className="
          h-full
          w-full
          select-none
          object-cover
          transition-transform
          duration-[1400ms]
          ease-out
          group-hover:scale-[1.035]
        "
      />

      {/* ==========================================================
          CINEMATIC OVERLAY
          ========================================================== */}

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

      {/* ==========================================================
          CARD NUMBER
          ========================================================== */}

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
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* ==========================================================
          CONTENT
          ========================================================== */}

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
            max-w-[75%]
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

        {/* ========================================================
            OPEN BUTTON
            ======================================================== */}

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

      {/* ==========================================================
          ACTIVE EDGE
          ========================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-full
          bg-red-500
        "
      />

    </article>
  )
}
