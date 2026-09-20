'use client'

import {
  ArrowRight,
  ArrowUpRight,
  Play,
} from 'lucide-react'

const REELS = [
  {
    id: 'Dcq_kQcsCMB',
    href: 'https://www.instagram.com/reel/Dcq_kQcsCMB/',
    label: 'TOR’Q Reel',
  },
  {
    id: 'Daw8--TMDQ6',
    href: 'https://www.instagram.com/reel/Daw8--TMDQ6/',
    label: 'TOR’Q Reel',
  },
  {
    id: 'DFiDqjECUz8',
    href: 'https://www.instagram.com/reel/DFiDqjECUz8/',
    label: 'TOR’Q Reel',
  },
  {
    id: 'C14Tx1koOG8',
    href: 'https://www.instagram.com/reel/C14Tx1koOG8/',
    label: 'TOR’Q Reel',
  },
]

const INSTAGRAM_URL = 'https://www.instagram.com/torq.ng/'

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="12"
        r="4.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="17.4"
        cy="6.7"
        r="1.1"
        fill="currentColor"
      />
    </svg>
  )
}

export function TorqInMotion() {
  return (
    <section
      id="in-motion"
      className="
        relative
        overflow-hidden
        bg-black
        py-24
        text-white
        md:py-32
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[620px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.04]
          blur-[130px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
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
              TOR’Q In Motion
            </p>

            <h2
              className="
                text-5xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                sm:text-6xl
                md:text-7xl
              "
            >
              The Action.
              <br />

              <span className="text-red-500">
                The Sound.
              </span>

              <br />

              The Culture.
            </h2>

            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-white/45
                md:text-lg
              "
            >
              Experience TOR’Q through the moments
              that live beyond the event. Watch selected
              highlights from the TOR’Q archive on
              Instagram.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="
              group
              inline-flex
              h-11
              w-fit
              items-center
              gap-3
              rounded-full
              border
              border-white/15
              bg-white/[0.04]
              px-5
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/75
              backdrop-blur-md
              transition-[background-color,border-color,color]
              duration-200
              hover:border-white/30
              hover:bg-white/[0.08]
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
            "
          >
            <InstagramIcon className="h-4 w-4" />

            Follow @torq.ng

            <ArrowUpRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-200
                group-hover:rotate-45
              "
            />
          </a>
        </div>
      </div>

      <div className="relative mt-14 md:mt-20">
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
            overscroll-y-none
            px-6
            pb-5
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            md:px-[8vw]
          "
        >
          <div className="flex w-max snap-x snap-mandatory gap-4 sm:gap-5 md:gap-6">
            {REELS.map((reel, index) => (
              <a
                key={reel.id}
                href={reel.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Watch TOR’Q Instagram Reel ${index + 1}`}
                className="
                  group
                  relative
                  block
                  h-[430px]
                  w-[82vw]
                  max-w-[380px]
                  shrink-0
                  snap-start
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-neutral-950
                  outline-none
                  transition-[border-color,transform]
                  duration-300
                  hover:border-white/25
                  focus-visible:border-red-500
                  focus-visible:ring-2
                  focus-visible:ring-red-500
                  sm:h-[470px]
                  sm:w-[62vw]
                  sm:max-w-[440px]
                  md:h-[520px]
                  md:w-[34vw]
                  md:max-w-[520px]
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-neutral-900
                    via-black
                    to-neutral-950
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-white/[0.07]
                      text-white
                      backdrop-blur-md
                      transition-[transform,background-color,border-color]
                      duration-300
                      group-hover:scale-105
                      group-hover:border-white/35
                      group-hover:bg-red-500
                    "
                  >
                    <Play className="ml-1 h-7 w-7 fill-current" />
                  </div>
                </div>

                <div
                  className="
                    absolute
                    inset-x-0
                    top-0
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
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <InstagramIcon className="h-5 w-5 text-white/50" />
                </div>

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-gradient-to-t
                    from-black
                    via-black/70
                    to-transparent
                    p-5
                    pt-24
                    sm:p-6
                    sm:pt-28
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-red-500
                    "
                  >
                    Instagram Archive
                  </p>

                  <h3
                    className="
                      mt-2
                      text-lg
                      font-bold
                      uppercase
                      tracking-[0.02em]
                      text-white
                      sm:text-xl
                    "
                  >
                    {reel.label}
                  </h3>

                  <div
                    className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/50
                      transition-colors
                      duration-200
                      group-hover:text-white/80
                    "
                  >
                    Watch Reel

                    <ArrowUpRight
                      className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-200
                        group-hover:rotate-45
                      "
                    />
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-red-500
                    transition-[width]
                    duration-300
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </div>
        </div>
      </div>

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

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="
            flex
            shrink-0
            items-center
            gap-3
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-white/35
            transition-colors
            duration-200
            hover:text-white/70
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
          "
        >
          More on Instagram

          <ArrowRight className="h-3.5 w-3.5 text-red-500" />
        </a>

        <div className="h-px flex-1 bg-white/10" />
      </div>
    </section>
  )
}
