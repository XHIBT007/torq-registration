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
   TOR'Q LOGO COMPONENTS

   IMPORTANT:
   Every component is rendered on the SAME master canvas.

   At scrollProgress = 0:

   T
   TURBINE
   26
   R
   R LOWER
   PISTON
   Q
   Q BASE

   collectively form the TOR'Q logo.

   There is NO intact-logo transition.
   ================================================================ */

const LOGO_ASPECT = 1981 / 793

/* ================================================================
   TYPES
   ================================================================ */

type PieceMotion = {
  x: number
  y: number
  z: number
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
  blur: number
}

/* ================================================================
   HERO
   ================================================================ */

export function Hero() {
  const { open } = useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const [scrollProgress, setScrollProgress] =
    useState(0)

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0

      const section =
        sectionRef.current

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

    const handleScroll = () => {
      if (!raf) {
        raf =
          window.requestAnimationFrame(
            update,
          )
      }
    }

    update()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      update,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
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
      Math.max(
        0,
        value,
      ),
    )

  const easeIn = (value: number) => {
    const t = clamp(value)

    return t * t * t
  }

  const easeOut = (value: number) => {
    const t = clamp(value)

    return (
      1 -
      Math.pow(
        1 - t,
        3,
      )
    )
  }

  const easeInOut = (
    value: number,
  ) => {
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
     INTRO COPY
     ============================================================ */

  const welcomeOpacity =
    1 -
    easeOut(
      scrollProgress / 0.13,
    )

  const scrollHintOpacity =
    1 -
    easeOut(
      scrollProgress / 0.13,
    )

  /* ============================================================
     LOGO TIMELINE

     0 → 12%
       Completely assembled.

     12 → 30%
       Mechanical release.

     30 → 100%
       Continuous flight.

     82 → 100%
       Fade while already travelling away.
     ============================================================ */

  const release =
    easeInOut(
      (scrollProgress - 0.12) /
        0.18,
    )

  const launch =
    easeIn(
      (scrollProgress - 0.20) /
        0.38,
    )

  const flight =
    easeIn(
      (scrollProgress - 0.28) /
        0.72,
    )

  const fade =
    1 -
    easeInOut(
      (flight - 0.80) /
        0.20,
    )

  /* ============================================================
     BACKGROUND REVEAL
     ============================================================ */

  const backgroundOpacity =
    easeOut(
      (scrollProgress - 0.38) /
        0.48,
    )

  const heroOpacity =
    easeInOut(
      (scrollProgress - 0.53) /
        0.28,
    )

  /* ============================================================
     CAMERA

     Small camera push gives the impression that the pieces
     are moving toward the viewer rather than simply sliding
     around a flat plane.
     ============================================================ */

  const cameraPush =
    easeOut(
      (scrollProgress - 0.34) /
        0.20,
    )

  /* ============================================================
     PIECE MOTION

     IMPORTANT:

     These values are OFFSETS from the original logo position.

     At release = 0 and flight = 0:

       x = 0
       y = 0
       z = 0
       rotation = 0
       scale = 1

     Therefore the actual assets are the logo.
     ============================================================ */

  const pieces: Record<
    string,
    PieceMotion
  > = {
    /* ==========================================================
       T
       ========================================================== */

    t: {
      x:
        -8 * release -
        38 * launch -
        190 * flight,

      y:
        -3 * release -
        24 * launch -
        155 * flight,

      z:
        0 +
        400 * launch +
        3800 * flight,

      rotateX:
        -4 * release -
        20 * launch -
        80 * flight,

      rotateY:
        -5 * release -
        35 * launch -
        110 * flight,

      rotateZ:
        -3 * release -
        38 * launch -
        135 * flight,

      scale:
        1 +
        0.06 * launch +
        2.4 * flight,

      blur:
        0 +
        1 * launch +
        10 * flight,
    },

    /* ==========================================================
       TURBINE
       ========================================================== */

    turbine: {
      x:
        -3 * release -
        24 * launch -
        140 * flight,

      y:
        4 * release +
        34 * launch +
        190 * flight,

      z:
        0 +
        500 * launch +
        4200 * flight,

      rotateX:
        5 * release +
        32 * launch +
        95 * flight,

      rotateY:
        -7 * release -
        50 * launch -
        140 * flight,

      rotateZ:
        -10 * release -
        80 * launch -
        260 * flight,

      scale:
        1 +
        0.06 * launch +
        2.8 * flight,

      blur:
        0 +
        1 * launch +
        12 * flight,
    },

    /* ==========================================================
       26

       The 26 starts EXACTLY inside the turbine.

       It then separates independently.
       ========================================================== */

    number26: {
      x:
        -1 * release -
        8 * launch +
        90 * flight,

      y:
        -1 * release -
        10 * launch -
        135 * flight,

      z:
        0 +
        650 * launch +
        4700 * flight,

      rotateX:
        -7 * release -
        30 * launch -
        105 * flight,

      rotateY:
        6 * release +
        40 * launch +
        135 * flight,

      rotateZ:
        -3 * release -
        55 * launch -
        155 * flight,

      scale:
        1 +
        0.08 * launch +
        3.2 * flight,

      blur:
        0 +
        1 * launch +
        14 * flight,
    },

    /* ==========================================================
       R MAIN
       ========================================================== */

    r: {
      x:
        5 * release +
        58 * launch +
        185 * flight,

      y:
        -5 * release -
        42 * launch -
        155 * flight,

      z:
        0 +
        500 * launch +
        4100 * flight,

      rotateX:
        -5 * release -
        24 * launch -
        80 * flight,

      rotateY:
        7 * release +
        48 * launch +
        125 * flight,

      rotateZ:
        5 * release +
        55 * launch +
        145 * flight,

      scale:
        1 +
        0.06 * launch +
        2.5 * flight,

      blur:
        0 +
        1 * launch +
        11 * flight,
    },

    /* ==========================================================
       R LOWER
       ========================================================== */

    rLower: {
      x:
        -8 * release -
        60 * launch -
        170 * flight,

      y:
        7 * release +
        60 * launch +
        175 * flight,

      z:
        0 +
        550 * launch +
        3900 * flight,

      rotateX:
        8 * release +
        38 * launch +
        95 * flight,

      rotateY:
        -8 * release -
        48 * launch -
        120 * flight,

      rotateZ:
        10 * release +
        75 * launch +
        170 * flight,

      scale:
        1 +
        0.07 * launch +
        2.6 * flight,

      blur:
        0 +
        1 * launch +
        11 * flight,
    },

    /* ==========================================================
       PISTON
       ========================================================== */

    piston: {
      x:
        8 * release +
        90 * launch +
        220 * flight,

      y:
        -9 * release -
        72 * launch -
        210 * flight,

      z:
        0 +
        750 * launch +
        5000 * flight,

      rotateX:
        15 * release +
        65 * launch +
        135 * flight,

      rotateY:
        18 * release +
        90 * launch +
        185 * flight,

      rotateZ:
        25 * release +
        125 * launch +
        275 * flight,

      scale:
        1 +
        0.10 * launch +
        3.5 * flight,

      blur:
        0 +
        2 * launch +
        16 * flight,
    },

    /* ==========================================================
       Q MAIN
       ========================================================== */

    q: {
      x:
        7 * release +
        72 * launch +
        185 * flight,

      y:
        5 * release +
        48 * launch +
        175 * flight,

      z:
        0 +
        650 * launch +
        4500 * flight,

      rotateX:
        -5 * release -
        28 * launch -
        85 * flight,

      rotateY:
        10 * release +
        60 * launch +
        135 * flight,

      rotateZ:
        -8 * release -
        78 * launch -
        190 * flight,

      scale:
        1 +
        0.08 * launch +
        3.0 * flight,

      blur:
        0 +
        1 * launch +
        13 * flight,
    },

    /* ==========================================================
       Q BASE
       ========================================================== */

    qBase: {
      x:
        12 * release +
        105 * launch +
        240 * flight,

      y:
        12 * release +
        85 * launch +
        190 * flight,

      z:
        0 +
        850 * launch +
        5200 * flight,

      rotateX:
        20 * release +
        70 * launch +
        135 * flight,

      rotateY:
        -15 * release -
        65 * launch -
        120 * flight,

      rotateZ:
        30 * release +
        135 * launch +
        240 * flight,

      scale:
        1 +
        0.10 * launch +
        3.6 * flight,

      blur:
        0 +
        2 * launch +
        17 * flight,
    },
  }

  /* ============================================================
     RENDER
     ============================================================ */

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
          STICKY STAGE
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
            TOR'Q LOGO

            THIS IS THE REAL LOGO.

            No intact image.
            No fade from one image to another.

            The component layers are the logo.
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
                MASTER LOGO CANVAS

                All assets occupy exactly this same canvas.
                ================================================== */}

            <div
              className="
                relative
                w-full
                max-w-[790px]
              "
              style={{
                aspectRatio:
                  LOGO_ASPECT,

                perspective:
                  '1800px',

                transformStyle:
                  'preserve-3d',

                transform:
                  `
                    translate3d(
                      0,
                      0,
                      ${cameraPush * -35}px
                    )
                  `,
              }}
            >
              {/* T */}
              <LogoPiece
                src="/images/torq-components/t_section.png"
                opacity={fade}
                motion={pieces.t}
              />

              {/* TURBINE */}
              <LogoPiece
                src="/images/torq-components/turbine.png"
                opacity={fade}
                motion={pieces.turbine}
              />

              {/* 26 */}
              <LogoPiece
                src="/images/torq-components/torq-26-transparent.png"
                opacity={fade}
                motion={pieces.number26}
              />

              {/* R MAIN */}
              <LogoPiece
                src="/images/torq-components/r_section.png"
                opacity={fade}
                motion={pieces.r}
              />

              {/* R LOWER */}
              <LogoPiece
                src="/images/torq-components/r_lower.png"
                opacity={fade}
                motion={pieces.rLower}
              />

              {/* PISTON */}
              <LogoPiece
                src="/images/torq-components/piston.png"
                opacity={fade}
                motion={pieces.piston}
              />

              {/* Q MAIN */}
              <LogoPiece
                src="/images/torq-components/q_section.png"
                opacity={fade}
                motion={pieces.q}
              />

              {/* Q BASE */}
              <LogoPiece
                src="/images/torq-components/q_base.png"
                opacity={fade}
                motion={pieces.qBase}
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

   All component PNGs share the same master canvas.

   Therefore:

       inset: 0
       width: 100%
       height: 100%

   At the first frame:

       x = 0
       y = 0
       z = 0
       rotation = 0
       scale = 1

   The layers therefore reconstruct the original logo.
   ================================================================ */

function LogoPiece({
  src,
  opacity,
  motion,
}: {
  src: string
  opacity: number
  motion: PieceMotion
}) {
  const {
    x,
    y,
    z,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    blur,
  } = motion

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
