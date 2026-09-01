'use client'

import {
  ChevronDown,
  MapPin,
  Ticket,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

/* ================================================================
   TOR'Q LOGO COMPONENT SYSTEM

   ALL OF THESE FILES MUST HAVE THE SAME CANVAS SIZE.

   They are intentionally rendered at EXACTLY the same position.

   This means:

        T
        TURBINE
        26
        R
        PISTON
        Q
        DETAILS

   collectively form ONE logo.

   There is NO intact-logo image underneath them.
   ================================================================ */

const LOGO_COMPONENTS = [
  {
    src: '/images/torq-components/logo-t.png',
    name: 'T',
  },
  {
    src: '/images/torq-components/logo-turbine.png',
    name: 'Turbine',
  },
  {
    src: '/images/torq-components/logo-r.png',
    name: 'R',
  },
  {
    src: '/images/torq-components/logo-piston.png',
    name: 'Piston',
  },
  {
    src: '/images/torq-components/logo-q.png',
    name: 'Q',
  },
  {
    src: '/images/torq-components/logo-26.png',
    name: '26',
  },
  {
    src: '/images/torq-components/logo-mechanical-details.png',
    name: 'Mechanical details',
  },
]

export function Hero() {
  const { open } = useRegistration()

  const sectionRef = useRef<HTMLElement>(null)

  const [scrollProgress, setScrollProgress] =
    useState(0)

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0

      const section = sectionRef.current

      if (!section) return

      const distance =
        section.offsetHeight -
        window.innerHeight

      if (distance <= 0) return

      const rect =
        section.getBoundingClientRect()

      const progress = Math.min(
        1,
        Math.max(
          0,
          -rect.top / distance,
        ),
      )

      setScrollProgress(progress)
    }

    const onScroll = () => {
      if (!raf) {
        raf =
          window.requestAnimationFrame(update)
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

      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])

  /* ============================================================
     EASING
     ============================================================ */

  const clamp = (value: number) =>
    Math.min(
      1,
      Math.max(0, value),
    )

  const easeIn = (value: number) => {
    const t = clamp(value)

    return t * t * t
  }

  const easeOut = (value: number) => {
    const t = clamp(value)

    return 1 -
      Math.pow(
        1 - t,
        3,
      )
  }

  const easeInOut = (value: number) => {
    const t = clamp(value)

    return t < 0.5
      ? 4 * t * t * t
      : 1 -
          Math.pow(
            -2 * t + 2,
            3,
          ) /
            2
  }

  /* ============================================================
     OPENING COPY
     ============================================================ */

  const welcomeOpacity =
    1 -
    easeOut(
      scrollProgress / 0.15,
    )

  const scrollHintOpacity =
    1 -
    easeOut(
      scrollProgress / 0.14,
    )

  /* ============================================================
     LOGO TIMELINE
     ============================================================ */

  /*
   * 0.00 → 0.12
   *
   * PERFECTLY ASSEMBLED LOGO.
   *
   * Nothing moves.
   */

  const release =
    easeInOut(
      (scrollProgress -
        0.12) /
        0.18,
    )

  /*
   * 0.20 → 0.60
   *
   * Components begin accelerating away.
   */

  const launch =
    easeIn(
      (scrollProgress -
        0.20) /
        0.40,
    )

  /*
   * 0.30 → 1.00
   *
   * Long continuous 3D flight.
   */

  const flight =
    easeIn(
      (scrollProgress -
        0.30) /
        0.70,
    )

  /*
   * Fade happens ONLY near the end.
   *
   * The pieces have already travelled
   * significantly beyond the logo.
   */

  const componentOpacity =
    1 -
    easeInOut(
      (flight -
        0.82) /
        0.18,
    )

  /* ============================================================
     BACKGROUND / HERO REVEAL
     ============================================================ */

  const backgroundOpacity =
    easeOut(
      (scrollProgress -
        0.42) /
        0.48,
    )

  const heroOpacity =
    easeInOut(
      (scrollProgress -
        0.54) /
        0.30,
    )

  /* ============================================================
     CINEMATIC CAMERA RESPONSE
     ============================================================ */

  const cameraPush =
    easeOut(
      (scrollProgress -
        0.34) /
        0.18,
    )

  /* ============================================================
     PIECE MOTION

     Because every source image uses the SAME 1981 × 793
     coordinate system, every piece begins at EXACTLY
     the position it occupies in the original logo.

     There is no registration transition.

     The values below are purely the movement AFTER
     the logo starts coming apart.
     ============================================================ */

  const pieces = {

    /* ==========================================================
       T
       ========================================================== */

    t: {
      x:
        -10 * release -
        45 * launch -
        150 * flight,

      y:
        -4 * release -
        30 * launch -
        130 * flight,

      z:
        0 +
        450 * launch +
        3200 * flight,

      rotateX:
        -5 * release -
        22 * launch -
        70 * flight,

      rotateY:
        -4 * release -
        35 * launch -
        100 * flight,

      rotateZ:
        -3 * release -
        40 * launch -
        120 * flight,

      scale:
        1 +
        0.08 * launch +
        2.25 * flight,

      blur:
        0 +
        1 * launch +
        9 * flight,
    },

    /* ==========================================================
       TURBINE
       ========================================================== */

    turbine: {
      x:
        -4 * release -
        25 * launch -
        120 * flight,

      y:
        5 * release +
        40 * launch +
        170 * flight,

      z:
        0 +
        500 * launch +
        3600 * flight,

      rotateX:
        6 * release +
        35 * launch +
        90 * flight,

      rotateY:
        -8 * release -
        55 * launch -
        130 * flight,

      rotateZ:
        -12 * release -
        85 * launch -
        240 * flight,

      scale:
        1 +
        0.08 * launch +
        2.70 * flight,

      blur:
        0 +
        1 * launch +
        11 * flight,
    },

    /* ==========================================================
       26

       The 26 now physically leaves the turbine.
       ========================================================== */

    number26: {
      x:
        -2 * release -
        15 * launch +
        75 * flight,

      y:
        -2 * release -
        15 * launch -
        115 * flight,

      z:
        0 +
        600 * launch +
        4100 * flight,

      rotateX:
        -8 * release -
        35 * launch -
        100 * flight,

      rotateY:
        8 * release +
        45 * launch +
        120 * flight,

      rotateZ:
        -4 * release -
        65 * launch -
        145 * flight,

      scale:
        1 +
        0.12 * launch +
        3.00 * flight,

      blur:
        0 +
        1 * launch +
        13 * flight,
    },

    /* ==========================================================
       R
       ========================================================== */

    r: {
      x:
        5 * release +
        60 * launch +
        155 * flight,

      y:
        -6 * release -
        45 * launch -
        140 * flight,

      z:
        0 +
        500 * launch +
        3500 * flight,

      rotateX:
        -5 * release -
        25 * launch -
        75 * flight,

      rotateY:
        8 * release +
        50 * launch +
        115 * flight,

      rotateZ:
        5 * release +
        55 * launch +
        135 * flight,

      scale:
        1 +
        0.08 * launch +
        2.45 * flight,

      blur:
        0 +
        1 * launch +
        10 * flight,
    },

    /* ==========================================================
       PISTON
       ========================================================== */

    piston: {
      x:
        8 * release +
        90 * launch +
        175 * flight,

      y:
        -10 * release -
        70 * launch -
        190 * flight,

      z:
        0 +
        700 * launch +
        4300 * flight,

      rotateX:
        15 * release +
        65 * launch +
        130 * flight,

      rotateY:
        18 * release +
        90 * launch +
        175 * flight,

      rotateZ:
        25 * release +
        125 * launch +
        260 * flight,

      scale:
        1 +
        0.12 * launch +
        3.40 * flight,

      blur:
        0 +
        2 * launch +
        15 * flight,
    },

    /* ==========================================================
       Q
       ========================================================== */

    q: {
      x:
        8 * release +
        70 * launch +
        160 * flight,

      y:
        5 * release +
        45 * launch +
        150 * flight,

      z:
        0 +
        600 * launch +
        3900 * flight,

      rotateX:
        -5 * release -
        30 * launch -
        80 * flight,

      rotateY:
        10 * release +
        60 * launch +
        125 * flight,

      rotateZ:
        -8 * release -
        75 * launch -
        175 * flight,

      scale:
        1 +
        0.10 * launch +
        2.90 * flight,

      blur:
        0 +
        1 * launch +
        12 * flight,
    },

    /* ==========================================================
       MECHANICAL DETAILS
       ========================================================== */

    details: {
      x:
        15 * release +
        100 * launch +
        210 * flight,

      y:
        10 * release -
        40 * launch -
        130 * flight,

      z:
        0 +
        900 * launch +
        5000 * flight,

      rotateX:
        25 * release +
        90 * launch +
        180 * flight,

      rotateY:
        -20 * release -
        70 * launch -
        160 * flight,

      rotateZ:
        35 * release +
        160 * launch +
        300 * flight,

      scale:
        1 +
        0.15 * launch +
        4.00 * flight,

      blur:
        0 +
        2 * launch +
        17 * flight,
    },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        h-[155vh]
        bg-black
      "
    >

      {/* ========================================================
          STICKY CINEMATIC STAGE
          ======================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          bg-black
        "
        style={{
          perspective:
            '1800px',
        }}
      >

        {/* ======================================================
            BACKGROUND
            ====================================================== */}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            opacity:
              backgroundOpacity,
          }}
        >

          <img
            src="/images/hero-drift-red-mustang.webp"
            alt=""
            aria-hidden="true"
            className="
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-black/65
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black
              via-black/65
              to-transparent
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/15
              to-black/40
            "
          />

        </div>

        {/* ======================================================
            HERO CONTENT
            ====================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
          "
          style={{
            opacity:
              heroOpacity,
          }}
        >

          <div
            className="
              mx-auto
              flex
              h-full
              w-full
              max-w-7xl
              items-start
              px-6
              pb-6
              pt-[88px]
              sm:px-8
              sm:pt-28
              lg:items-center
              lg:px-10
              lg:pt-0
            "
          >

            <div
              className="
                w-full
                max-w-5xl
              "
            >

              <h1
                className="
                  max-w-5xl
                  font-black
                  uppercase
                  leading-[0.86]
                  tracking-[-0.045em]
                  text-white
                  text-[3rem]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[6.5rem]
                "
              >

                <span className="block">
                  AFRICA&apos;S BIGGEST
                </span>

                <span className="block text-red-500">
                  MOTORSPORT
                </span>

                <span className="block">
                  SPECTACLE
                </span>

              </h1>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-[14px]
                  leading-[1.55]
                  text-white/70
                  sm:mt-7
                  sm:text-lg
                  sm:leading-8
                  md:text-xl
                "
              >
                A cinematic celebration of
                performance, sound and precision
                where drifting legends, stunt riders,
                performance cars and motorsport
                culture come together for one
                unforgettable experience.
              </p>

              <div
                className="
                  mt-6
                  flex
                  flex-col
                  gap-4
                  sm:mt-8
                  sm:flex-row
                  sm:items-center
                "
              >

                <Button
                  size="lg"
                  onClick={open}
                  className="
                    h-12
                    w-full
                    rounded-full
                    bg-red-600
                    px-7
                    text-sm
                    font-bold
                    text-white
                    hover:bg-red-500
                    sm:h-14
                    sm:w-auto
                    sm:px-8
                    sm:text-base
                  "
                >

                  <Ticket
                    className="
                      mr-2
                      h-5
                      w-5
                    "
                  />

                  REGISTER NOW

                </Button>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-white/70
                    sm:text-base
                  "
                >

                  <MapPin
                    className="
                      h-5
                      w-5
                      text-red-500
                    "
                  />

                  {EVENT.location}

                </div>

              </div>

              <div
                className="
                  mt-7
                  grid
                  grid-cols-4
                  gap-3
                  border-t
                  border-white/10
                  pt-6
                  sm:mt-9
                  sm:gap-6
                  sm:pt-7
                "
              >

                <HeroStat
                  value="100+"
                  label="Performance Cars"
                />

                <HeroStat
                  value="50+"
                  label="Drivers & Riders"
                />

                <HeroStat
                  value="3"
                  label="Days of Action"
                />

                <HeroStat
                  value="1"
                  label="Epic Experience"
                />

              </div>

              <div
                className="
                  mt-6
                  sm:mt-9
                "
              >

                <p
                  className="
                    mb-3
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-white/40
                    sm:mb-4
                    sm:text-[10px]
                  "
                >
                  The Experience Begins In
                </p>

                <Countdown
                  date={EVENT.date}
                />

              </div>

            </div>

          </div>

        </div>

        {/* ======================================================
            TOR'Q LOGO ASSEMBLY

            THIS IS THE IMPORTANT PART.

            There is no second logo.

            These layers ARE the logo.
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            px-5
            sm:px-8
          "
          style={{
            perspective:
              '1800px',
          }}
        >

          <div
            className="
              flex
              w-full
              max-w-[820px]
              -translate-y-[2vh]
              flex-col
              items-center
            "
          >

            {/* ==================================================
                WELCOME
                ================================================== */}

            <p
              className="
                mb-5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.48em]
                text-white/50
                sm:mb-6
                sm:text-xs
                sm:tracking-[0.55em]
              "
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

            {/* ==================================================
                MASTER COMPONENT CANVAS

                Every image is 1981 × 793.

                Therefore every layer occupies the EXACT same
                rectangle.

                No manual positioning.
                No manual sizing.
                No crossfade.
                ================================================== */}

            <div
              className="
                relative
                aspect-[1981/793]
                w-full
                max-w-[790px]
              "
              style={{
                transformStyle:
                  'preserve-3d',

                perspective:
                  '1800px',

                transform:
                  `
                    translate3d(
                      0,
                      0,
                      ${cameraPush * -40}px
                    )
                  `,
              }}
            >

              {/* =================================================
                  T
                  ================================================= */}

              <LogoPiece
                src="/images/torq-components/logo-t.png"
                opacity={
                  componentOpacity
                }
                {...pieces.t}
              />

              {/* =================================================
                  TURBINE
                  ================================================= */}

              <LogoPiece
                src="/images/torq-components/logo-turbine.png"
                opacity={
                  componentOpacity
                }
                {...pieces.turbine}
              />

              {/* =================================================
                  R
                  ================================================= */}

              <LogoPiece
                src="/images/torq-components/logo-r.png"
                opacity={
                  componentOpacity
                }
                {...pieces.r}
              />

              {/* =================================================
                  PISTON
                  ================================================= */}

              <LogoPiece
                src="/images/torq-components/logo-piston.png"
                opacity={
                  componentOpacity
                }
                {...pieces.piston}
              />

              {/* =================================================
                  Q
                  ================================================= */}

              <LogoPiece
                src="/images/torq-components/logo-q.png"
                opacity={
                  componentOpacity
                }
                {...pieces.q}
              />

              {/* =================================================
                  26

                  This sits directly over the original 26
                  at scroll position 0.
                  ================================================= */}

              <LogoPiece
                src="/images/torq-components/logo-26.png"
                opacity={
                  componentOpacity
                }
                {...pieces.number26}
              />

              {/* =================================================
                  MICRO MECHANICAL DETAILS
                  ================================================= */}

              <LogoPiece
                src="/images/torq-components/logo-mechanical-details.png"
                opacity={
                  componentOpacity
                }
                {...pieces.details}
              />

            </div>

            {/* ==================================================
                SCROLL CUE
                ================================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                gap-2
                sm:mt-10
                lg:mt-12
              "
              style={{
                opacity:
                  scrollHintOpacity,
              }}
            >

              <span
                className="
                  whitespace-nowrap
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white/45
                  sm:text-[10px]
                  sm:tracking-[0.35em]
                "
              >
                Scroll down to experience TOR&apos;Q
              </span>

              <div
                className="
                  flex
                  flex-col
                  items-center
                "
              >

                <div
                  className="
                    h-7
                    w-px
                    bg-gradient-to-b
                    from-white/50
                    to-transparent
                  "
                />

                <ChevronDown
                  className="
                    mt-1
                    h-4
                    w-4
                    animate-bounce
                    text-white/50
                  "
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

/* ================================================================
   LOGO PIECE

   Every source image is the same 1981 × 793 canvas.

   Therefore every piece is simply:

       inset: 0
       width: 100%
       height: 100%

   At zero progress:

       translate3d(0,0,0)
       rotateX(0)
       rotateY(0)
       rotateZ(0)
       scale(1)

   They literally form the original logo.
   ================================================================ */

function LogoPiece({
  src,
  opacity,
  x,
  y,
  z,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  blur,
}: {
  src: string
  opacity: number
  x: number
  y: number
  z: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
  blur: number
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="
        pointer-events-none
        absolute
        inset-0
        h-full
        w-full
        select-none
        object-contain
      "
      style={{
        opacity,

        transformOrigin:
          'center center',

        transformStyle:
          'preserve-3d',

        backfaceVisibility:
          'visible',

        filter:
          blur > 0
            ? `blur(${blur}px)`
            : 'none',

        transform:
          `
            translate3d(
              ${x}%,
              ${y}%,
              ${z}px
            )
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(${rotateZ}deg)
            scale(${scale})
          `,

        willChange:
          'transform, opacity, filter',
      }}
    />
  )
}

/* ================================================================
   HERO STAT
   ================================================================ */

function HeroStat({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="min-w-0">

      <p
        className="
          text-2xl
          font-black
          leading-none
          text-white
          sm:text-4xl
        "
      >
        {value}
      </p>

      <p
        className="
          mt-2
          max-w-[120px]
          text-[7px]
          uppercase
          tracking-[0.18em]
          text-white/45
          sm:text-[10px]
          sm:tracking-[0.2em]
        "
      >
        {label}
      </p>

    </div>
  )
}
