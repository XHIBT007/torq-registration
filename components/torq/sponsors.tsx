'use client'

import { ArrowUpRight, Handshake } from 'lucide-react'

import { Reveal } from './reveal'
import { SPONSORS } from '@/lib/torq-data'

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        bg-black
        py-24
        text-white
        sm:py-32
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
          bg-red-600/[0.035]
          blur-[140px]
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
          <div
            className="
              max-w-4xl
            "
          >

            <p
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.4em]
                text-red-500
              "
            >
              Our Partners
            </p>

            <h2
              className="
                text-4xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                sm:text-5xl
                md:text-7xl
              "
            >
              Built with
              <br />

              <span className="text-red-500">
                great brands.
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-2xl
                text-base
                leading-7
                text-white/45
                md:text-lg
              "
            >
              TOR&apos;Q brings together brands,
              communities and creators that believe
              in the power of extraordinary
              experiences.
            </p>

          </div>
        </Reveal>

        {/* ========================================================
            PARTNER AREA
            ======================================================== */}

        <div
          className="
            mt-16
            md:mt-20
          "
        >

          {SPONSORS.length > 0 ? (

            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {SPONSORS.map(
                (sponsor, index) => (
                  <SponsorCard
                    key={
                      sponsor.name ??
                      index
                    }
                    sponsor={sponsor}
                    index={index}
                  />
                ),
              )}

            </div>

          ) : (

            /* ======================================================
               PARTNERSHIP PLACEHOLDER

               This is intentionally subtle while the partner
               roster is being finalised.
               ====================================================== */

            <Reveal delay={150}>
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.015]
                  p-8
                  transition-all
                  duration-700
                  hover:border-white/20
                  sm:p-10
                  md:p-12
                "
              >

                {/* Decorative glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-64
                    w-64
                    rounded-full
                    bg-red-600/[0.06]
                    blur-[100px]
                    transition-opacity
                    duration-700
                    group-hover:bg-red-600/[0.10]
                  "
                />

                <div
                  className="
                    relative
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >

                  <div>

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.03]
                        transition-all
                        duration-500
                        group-hover:border-red-500/40
                        group-hover:bg-red-500/10
                      "
                    >
                      <Handshake
                        className="
                          h-5
                          w-5
                          text-white/60
                          transition-colors
                          duration-500
                          group-hover:text-red-500
                        "
                      />
                    </div>

                    <p
                      className="
                        mt-6
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.3em]
                        text-white/30
                      "
                    >
                      Become part of TOR&apos;Q
                    </p>

                    <h3
                      className="
                        mt-3
                        max-w-2xl
                        text-2xl
                        font-black
                        uppercase
                        leading-tight
                        sm:text-3xl
                      "
                    >
                      Put your brand
                      <br />
                      inside the experience.
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-xl
                        text-sm
                        leading-6
                        text-white/40
                      "
                    >
                      From brand experiences and content
                      partnerships to hospitality and
                      audience engagement, TOR&apos;Q creates
                      meaningful spaces for brands to connect
                      with culture.
                    </p>

                  </div>

                  <a
                    href="#contact"
                    className="
                      group/link
                      inline-flex
                      w-fit
                      shrink-0
                      items-center
                      gap-3
                      rounded-full
                      border
                      border-white/15
                      bg-white/[0.03]
                      px-6
                      py-3
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/70
                      transition-all
                      duration-500
                      hover:border-red-500
                      hover:bg-red-500
                      hover:text-white
                    "
                  >

                    Partner with us

                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover/link:-translate-y-0.5
                        group-hover/link:translate-x-0.5
                      "
                    />

                  </a>

                </div>

              </div>
            </Reveal>

          )}

        </div>

      </div>

    </section>
  )
}

/* ================================================================
   SPONSOR CARD
   ================================================================ */

function SponsorCard({
  sponsor,
  index,
}: {
  sponsor: (typeof SPONSORS)[number]
  index: number
}) {
  return (
    <Reveal delay={index * 80}>

      <div
        className="
          group
          relative
          flex
          min-h-[220px]
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.015]
          p-8
          transition-all
          duration-700
          hover:-translate-y-1
          hover:border-white/20
          hover:bg-white/[0.03]
        "
      >

        {/* Hover atmosphere */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-radial
            from-red-500/[0.06]
            to-transparent
            opacity-0
            transition-opacity
            duration-700
            group-hover:opacity-100
          "
        />

        <div className="relative flex items-center justify-center">

          {sponsor.logo ? (

            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="
                max-h-20
                max-w-[220px]
                object-contain
                opacity-70
                grayscale
                transition-all
                duration-500
                group-hover:opacity-100
                group-hover:grayscale-0
              "
            />

          ) : (

            <span
              className="
                text-center
                text-lg
                font-black
                uppercase
                tracking-wide
                text-white/60
                transition-colors
                duration-500
                group-hover:text-white
              "
            >
              {sponsor.name}
            </span>

          )}

        </div>

        {/* Corner */}

        <ArrowUpRight
          className="
            absolute
            bottom-5
            right-5
            h-4
            w-4
            text-white/20
            transition-all
            duration-500
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
            group-hover:text-red-500
          "
        />

      </div>

    </Reveal>
  )
}
