'use client'

import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { GALLERY } from '@/lib/torq-data'
import { Reveal } from './reveal'
import { Lightbox } from './lightbox'

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-black py-24 text-white md:py-32"
    >
      {/* ==========================================================
          ATMOSPHERE
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[460px]
          w-[680px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.045]
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-[360px]
          w-[360px]
          rounded-full
          bg-red-600/[0.025]
          blur-[110px]
        "
      />

      {/* ==========================================================
          INTRO
          ========================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="max-w-5xl">
            <p
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.32em]
                text-red-500
                sm:text-sm
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
                text-base
                leading-7
                text-white/45
                sm:text-lg
                sm:leading-8
                md:text-xl
              "
            >
              A visual archive of performance, engineering,
              adrenaline and the people who make TOR&apos;Q
              more than just an event.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ==========================================================
          GALLERY RAIL
          ========================================================== */}

      <div className="relative mt-14 md:mt-20">
        {/* DESKTOP EDGE FADES */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            hidden
            h-full
            w-24
            bg-gradient-to-r
            from-black
            to-transparent
            md:block
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            hidden
            h-full
            w-24
            bg-gradient-to-l
            from-black
            to-transparent
            md:block
          "
        />

        <div
          className="
            torq-scroll-rail
            overflow-x-auto
            overscroll-x-contain
            px-6
            pb-5
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            md:px-[8vw]
          "
        >
          <div className="flex w-max snap-x snap-mandatory gap-4 sm:gap-5 md:gap-6">
            {GALLERY.map((img, index) => (
              <GalleryCard
                key={`${img.src}-${index}`}
                img={img}
                index={index}
                total={GALLERY.length}
                onOpen={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================================
          MOVEMENT CUE
          ========================================================== */}

      <div
        className="
          mx-auto
          mt-5
          flex
          max-w-7xl
          items-center
          gap-4
          px-6
          md:mt-7
          md:px-10
        "
      >
        <div className="h-px flex-1 bg-white/10" />

        <div className="flex shrink-0 items-center gap-3">
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-white/30
              sm:text-[10px]
            "
          >
            Swipe to explore
          </span>

          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 text-red-500"
          />
        </div>

        <div className="h-px flex-1 bg-white/10" />
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
                tracking-[0.32em]
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
                leading-[0.95]
                tracking-[-0.025em]
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
            From the roar of the engine to the details in the
            build, this is where performance becomes culture.
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
          onClose={() => setActiveIndex(null)}
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
  total,
  onOpen,
}: {
  img: (typeof GALLERY)[number]
  index: number
  total: number
  onOpen: () => void
}) {
  const number = String(index + 1).padStart(2, '0')
  const totalNumber = String(total).padStart(2, '0')

  return (
    <article
      className="
        group
        relative
        h-[430px]
        w-[82vw]
        max-w-[360px]
        shrink-0
        snap-start
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-neutral-950
        sm:h-[470px]
        sm:w-[62vw]
        sm:max-w-[420px]
        md:h-[520px]
        md:w-[38vw]
        md:max-w-[500px]
        lg:w-[34vw]
        lg:max-w-[520px]
      "
    >
      <button
        type="button"
        onClick={onOpen}
        className="
          absolute
          inset-0
          z-20
          cursor-pointer
          rounded-2xl
          text-left
          outline-none
          focus-visible:ring-2
          focus-visible:ring-red-500
          focus-visible:ring-inset
        "
        aria-label={`Open image ${index + 1} of ${total}: ${img.alt}`}
      >
        <span className="sr-only">
          Open {img.alt}
        </span>
      </button>

      {/* ==========================================================
          IMAGE
          ========================================================== */}

      <img
        src={img.src || '/placeholder.svg'}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading={index < 2 ? 'eager' : 'lazy'}
        className="
          h-full
          w-full
          select-none
          object-cover
          transition-transform
          duration-500
          ease-out
          motion-reduce:transition-none
          group-hover:scale-[1.025]
        "
      />

      {/* ==========================================================
          CINEMATIC OVERLAY
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/95
          via-black/15
          to-black/5
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/0
          transition-colors
          duration-300
          motion-reduce:transition-none
          group-hover:bg-black/10
        "
      />

      {/* ==========================================================
          TOP METADATA
          ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-10
          flex
          items-start
          justify-between
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            h-10
            min-w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/40
            px-3
            text-[10px]
            font-bold
            tabular-nums
            tracking-[0.12em]
            text-white/85
            backdrop-blur-md
          "
        >
          {number}
        </div>

        <div
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-white/45
          "
        >
          {number} / {totalNumber}
        </div>
      </div>

      {/* ==========================================================
          CONTENT
          ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          flex
          items-end
          justify-between
          gap-5
          p-5
          sm:p-6
          md:p-7
        "
      >
        <div className="min-w-0 max-w-[78%]">
          <p
            className="
              mb-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-red-500
            "
          >
            TOR&apos;Q Archive
          </p>

          <p
            className="
              line-clamp-2
              text-sm
              font-bold
              uppercase
              leading-snug
              tracking-[0.04em]
              text-white
              sm:text-base
            "
          >
            {img.alt}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/[0.06]
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            motion-reduce:transition-none
            group-hover:border-white/35
            group-hover:bg-white/[0.14]
          "
        >
          <ArrowUpRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              motion-reduce:transition-none
              group-hover:rotate-45
            "
          />
        </div>
      </div>

      {/* ==========================================================
          TOR'Q ACCENT
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-10
          h-[2px]
          w-full
          origin-left
          scale-x-0
          bg-red-500
          transition-transform
          duration-300
          motion-reduce:transition-none
          group-hover:scale-x-100
        "
      />
    </article>
  )
}
