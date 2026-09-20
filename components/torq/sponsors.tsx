'use client'

import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Play,
  Sparkles,
} from 'lucide-react'

import { Reveal } from './reveal'

const PARTNERSHIP_PILLARS = [
  {
    number: '01',
    title: 'Brand Experience',
    description:
      'Own a physical moment at TOR’Q through immersive activations, hospitality and branded experiences.',
  },
  {
    number: '02',
    title: 'Content & Media',
    description:
      'Turn TOR’Q into a content platform through film, social storytelling, branded content and media production.',
  },
  {
    number: '03',
    title: 'Audience & Culture',
    description:
      'Connect your brand with the automotive, lifestyle and creative communities that make TOR’Q move.',
  },
]

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
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[520px]
          w-[760px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.035]
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-white/[0.015]
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* ========================================================
            INTRO
            ======================================================== */}

        <Reveal>
          <div className="max-w-4xl">

            <p
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.34em]
                text-red-500
                sm:text-sm
              "
            >
              Partnerships
            </p>

            <h2
              className="
                text-5xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.045em]
                sm:text-6xl
                md:text-7xl
              "
            >
              Built for brands
              <br />

              <span className="text-red-500">
                that move.
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
              TOR’Q creates a physical, cultural and media
              platform where brands can become part of the
              experience — not simply appear beside it.
            </p>

          </div>
        </Reveal>

        {/* ========================================================
            PARTNERSHIP PLATFORM
            ======================================================== */}

        <Reveal delay={100}>
          <div
            className="
              relative
              mt-14
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.018]
              md:mt-20
            "
          >

            {/* Background grid */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.035]
                [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
                [background-size:56px_56px]
              "
            />

            {/* Red atmosphere */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-[420px]
                w-[420px]
                rounded-full
                bg-red-600/[0.08]
                blur-[120px]
              "
            />

            <div
              className="
                relative
                grid
                lg:grid-cols-[1.05fr_0.95fr]
              "
            >

              {/* ==================================================
                  PRIMARY MESSAGE
                  ================================================== */}

              <div
                className="
                  border-b
                  border-white/10
                  p-7
                  sm:p-10
                  lg:border-b-0
                  lg:border-r
                  lg:p-14
                  xl:p-16
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.035]
                    text-red-500
                  "
                >
                  <Handshake className="h-5 w-5" />
                </div>

                <p
                  className="
                    mt-8
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-white/30
                  "
                >
                  Become part of TOR’Q
                </p>

                <h3
                  className="
                    mt-3
                    max-w-xl
                    text-3xl
                    font-black
                    uppercase
                    leading-[0.92]
                    tracking-[-0.03em]
                    sm:text-4xl
                    md:text-5xl
                  "
                >
                  Your brand.
                  <br />

                  <span className="text-red-500">
                    Inside the experience.
                  </span>
                </h3>

                <p
                  className="
                    mt-6
                    max-w-xl
                    text-sm
                    leading-6
                    text-white/40
                    md:text-base
                    md:leading-7
                  "
                >
                  From immersive activations and hospitality
                  to content partnerships and audience
                  engagement, TOR’Q offers brands multiple
                  ways to participate in one of Nigeria&apos;s
                  most distinctive automotive experiences.
                </p>

                <a
                  href="#contact"
                  className="
                    group
                    mt-8
                    inline-flex
                    h-12
                    w-fit
                    items-center
                    gap-3
                    rounded-lg
                    bg-red-500
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_8px_28px_rgba(239,68,68,0.16)]
                    transition-[background-color,transform,box-shadow]
                    duration-200
                    hover:bg-red-400
                    hover:shadow-[0_10px_32px_rgba(239,68,68,0.22)]
                    active:translate-y-px
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-red-500
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-black
                  "
                >
                  Discuss a partnership

                  <ArrowUpRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-200
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>

              </div>

              {/* ==================================================
                  PARTNERSHIP PILLARS
                  ================================================== */}

              <div className="p-7 sm:p-10 lg:p-14 xl:p-16">

                <div
                  className="
                    mb-8
                    flex
                    items-center
                    gap-3
                  "
                >
                  <Sparkles className="h-4 w-4 text-red-500" />

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-white/35
                    "
                  >
                    Partnership platform
                  </p>
                </div>

                <div className="divide-y divide-white/10">

                  {PARTNERSHIP_PILLARS.map(
                    (pillar) => (
                      <div
                        key={pillar.number}
                        className="
                          group
                          py-6
                          first:pt-0
                          last:pb-0
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            gap-5
                          "
                        >

                          <span
                            className="
                              pt-1
                              text-[10px]
                              font-bold
                              tabular-nums
                              tracking-[0.15em]
                              text-red-500/70
                            "
                          >
                            {pillar.number}
                          </span>

                          <div className="min-w-0">

                            <h4
                              className="
                                text-base
                                font-bold
                                uppercase
                                tracking-[0.01em]
                                text-white
                                transition-colors
                                duration-200
                                group-hover:text-red-400
                                sm:text-lg
                              "
                            >
                              {pillar.title}
                            </h4>

                            <p
                              className="
                                mt-2
                                max-w-lg
                                text-sm
                                leading-6
                                text-white/35
                              "
                            >
                              {pillar.description}
                            </p>

                          </div>

                        </div>

                      </div>
                    ),
                  )}

                </div>

              </div>

            </div>
          </div>
        </Reveal>

        {/* ========================================================
            PARTNERSHIP SIGNAL
            ======================================================== */}

        <Reveal delay={180}>
          <div
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-3
            "
          >

            <PartnershipSignal
              icon="01"
              title="Experiences"
              text="Physical brand presence"
            />

            <PartnershipSignal
              icon="02"
              title="Content"
              text="Stories built for distribution"
            />

            <PartnershipSignal
              icon="03"
              title="Community"
              text="Culture beyond the event"
            />

          </div>
        </Reveal>

        {/* ========================================================
            FOOTER CTA
            ======================================================== */}

        <Reveal delay={240}>
          <div
            className="
              mt-14
              flex
              flex-col
              gap-5
              border-t
              border-white/10
              pt-6
              sm:flex-row
              sm:items-center
              sm:justify-between
              md:mt-16
              md:pt-7
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-white/30
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

              TOR’Q 2026

              <span className="text-white/15">
                /
              </span>

              Lagos, Nigeria
            </div>

            <a
              href="#contact"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-white/55
                transition-colors
                duration-200
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
              "
            >
              Start a conversation

              <ArrowRight
                className="
                  h-3.5
                  w-3.5
                  text-red-500
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </a>

          </div>
        </Reveal>

      </div>
    </section>
  )
}

/* ================================================================
   PARTNERSHIP SIGNAL
   ================================================================ */

function PartnershipSignal({
  icon,
  title,
  text,
}: {
  icon: string
  title: string
  text: string
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-xl
        border
        border-white/10
        bg-white/[0.012]
        px-5
        py-4
      "
    >
      <span
        className="
          text-[9px]
          font-bold
          tabular-nums
          tracking-[0.15em]
          text-red-500/70
        "
      >
        {icon}
      </span>

      <div className="min-w-0">

        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-white/70
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-[11px]
            text-white/30
          "
        >
          {text}
        </p>

      </div>
    </div>
  )
}
