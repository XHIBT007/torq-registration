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
   These pieces are now the logo itself.

   There is NO intact-logo image underneath them.

   At scrollProgress = 0 every piece is:
   - at its assembled position
   - scale 1
   - rotation 0
   - depth 0
   - opacity 1

   The logo therefore exists as one assembled object from
   the very first frame.
   ================================================================ */

const LOGO_STAGE = {
  width: 720,
  height: 290,
}

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

    return Math.pow(t, 3)
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
     OPENING TEXT
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
     LOGO ANIMATION TIMELINE
     ============================================================ */

  /*
   * 0.00 → 0.12
   *
   * Logo remains completely assembled.
   *
   * This is important:
   * the visitor sees the actual TOR'Q logo before
   * anything begins to move.
   */

  const release =
    easeInOut(
      (scrollProgress -
        0.12) /
        0.20,
    )

  /*
   * 0.20 → 0.62
   *
   * Components accelerate away from their
   * original positions.
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
   * Long flight through the camera.
   */

  const flight =
    easeIn(
      (scrollProgress -
        0.30) /
        0.70,
    )

  /*
   * Fade only during the final portion of the
   * flight.
   */

  const componentOpacity =
  1 -
  easeInOut(
    (flight -
      0.82) /
      0.18,
  )

  /* ============================================================
     CAMERA RESPONSE
     ============================================================ */

  const cameraImpact =
    easeOut(
      (scrollProgress -
        0.40) /
        0.12,
    ) *
    (
      1 -
      easeOut(
        (scrollProgress -
          0.55) /
          0.15,
      )
    )

  /* ============================================================
     COMPONENT MOTION
     ============================================================ */

  /*
   * IMPORTANT:
   *
   * The first values are deliberately based ONLY on release.
   *
   * There is no separate logo transition.
   *
   * The components physically leave their assembled positions.
   */

  const pieces = {

    /* ==========================================================
       T
       ========================================================== */

    t: {
      x:
        -17 * release -
        80 * launch -
        130 * flight,

      y:
        -5 * release -
        48 * launch -
        115 * flight,

      z:
        0 +
        500 * launch +
        2550 * flight,

      rotateX:
        -8 * release -
        30 * launch -
        52 * flight,

      rotateY:
        -7 * release -
        45 * launch -
        78 * flight,

      rotateZ:
        -5 * release -
        58 * launch -
        125 * flight,

      scale:
        1 +
        0.10 * launch +
        2.20 * flight,

      blur:
        0 +
        2 * launch +
        8 * flight,
    },

    /* ==========================================================
       TURBINE
       ========================================================== */

    turbine: {
      x:
        -5 * release -
        48 * launch -
        115 * flight,

      y:
        8 * release +
        68 * launch +
        165 * flight,

      z:
        0 +
        550 * launch +
        2900 * flight,

      rotateX:
        8 * release +
        45 * launch +
        78 * flight,

      rotateY:
        -15 * release -
        65 * launch -
        125 * flight,

      rotateZ:
        -20 * release -
        125 * launch -
        230 * flight,

      scale:
        1 +
        0.10 * launch +
        2.70 * flight,

      blur:
        0 +
        2 * launch +
        11 * flight,
    },

    /* ==========================================================
       R
       ========================================================== */

    r: {
      x:
        7 * release +
        82 * launch +
        130 * flight,

      y:
        -9 * release -
        62 * launch -
        130 * flight,

      z:
        0 +
        550 * launch +
        2700 * flight,

      rotateX:
        -9 * release -
        36 * launch -
        65 * flight,

      rotateY:
        14 * release +
        62 * launch +
        112 * flight,

      rotateZ:
        8 * release +
        80 * launch +
        140 * flight,

      scale:
        1 +
        0.10 * launch +
        2.40 * flight,

      blur:
        0 +
        2 * launch +
        10 * flight,
    },

    /* ==========================================================
       LOWER R
       ========================================================== */

    rLower: {
      x:
        -9 * release -
        92 * launch -
        135 * flight,

      y:
        12 * release +
        95 * launch +
        160 * flight,

      z:
        0 +
        500 * launch +
        2450 * flight,

      rotateX:
        12 * release +
        48 * launch +
        82 * flight,

      rotateY:
        -10 * release -
        52 * launch -
        88 * flight,

      rotateZ:
        15 * release +
        110 * launch +
        175 * flight,

      scale:
        1 +
        0.10 * launch +
        2.15 * flight,

      blur:
        0 +
        2 * launch +
        9 * flight,
    },

    /* ==========================================================
       PISTON
       ========================================================== */

    piston: {
      x:
        14 * release +
        120 * launch +
        170 * flight,

      y:
        -18 * release -
        112 * launch -
        175 * flight,

      z:
        0 +
        750 * launch +
        3700 * flight,

      rotateX:
        20 * release +
        72 * launch +
        125 * flight,

      rotateY:
        28 * release +
        98 * launch +
        175 * flight,

      rotateZ:
        35 * release +
        155 * launch +
        250 * flight,

      scale:
        1 +
        0.12 * launch +
        3.50 * flight,

      blur:
        0 +
        3 * launch +
        15 * flight,
    },

    /* ==========================================================
       Q
       ========================================================== */

    q: {
      x:
        12 * release +
        98 * launch +
        145 * flight,

      y:
        6 * release +
        70 * launch +
        125 * flight,

      z:
        0 +
        650 * launch +
        3150 * flight,

      rotateX:
        -9 * release -
        38 * launch -
        68 * flight,

      rotateY:
        17 * release +
        72 * launch +
        120 * flight,

      rotateZ:
        -15 * release -
        95 * launch -
        165 * flight,

      scale:
        1 +
        0.10 * launch +
        2.90 * flight,

      blur:
        0 +
        2 * launch +
        12 * flight,
    },

    /* ==========================================================
       Q BASE
       ========================================================== */

    qBase: {
      x:
        20 * release +
        135 * launch +
        185 * flight,

      y:
        18 * release +
        102 * launch +
        155 * flight,

      z:
        0 +
        750 * launch +
        3450 * flight,

      rotateX:
        22 * release +
        68 * launch +
        115 * flight,

      rotateY:
        -18 * release -
        62 * launch -
        105 * flight,

      rotateZ:
        28 * release +
        135 * launch +
        210 * flight,

      scale:
        1 +
        0.12 * launch +
        3.15 * flight,

      blur:
        0 +
        3 * launch +
        14 * flight,
    },
  }

  /* ============================================================
     HERO REVEAL
     ============================================================ */

  const backgroundOpacity =
    easeOut(
      (scrollProgress -
        0.45) /
        0.45,
    )

  const heroOpacity =
    easeInOut(
      (scrollProgress -
        0.55) /
        0.30,
    )

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        h-[150vh]
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
            TOR'Q ASSEMBLY

            THIS IS NOW THE ACTUAL LOGO.

            No intact image exists here.
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
              relative
              flex
              w-full
              max-w-[760px]
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
                MASTER LOGO STAGE

                Every component lives inside this exact
                coordinate system.
                ================================================== */}

            <div
              className="
                relative
                aspect-[720/290]
                w-[82vw]
                max-w-[720px]
                sm:w-[76vw]
                lg:w-[62vw]
                xl:w-[58vw]
              "
              style={{
                perspective:
                  '1800px',

                transformStyle:
                  'preserve-3d',
              }}
            >

              {/* =================================================
                  COMPONENTS

                  At scrollProgress = 0 these ARE the TOR'Q logo.
                  ================================================= */}

              <MechanicalPiece
                src="/images/torq-components/t_section.png"
                className="
                  left-[0%]
                  top-[0%]
                  w-[30%]
                "
                opacity={
                  componentOpacity
                }
                {...pieces.t}
              />

              <MechanicalPiece
                src="/images/torq-components/turbine.png"
                className="
                  left-[16%]
                  top-[3%]
                  w-[31%]
                "
                opacity={
                  componentOpacity
                }
                {...pieces.turbine}
              />

              <MechanicalPiece
                src="/images/torq-components/r_section.png"
                className="
                  left-[38%]
                  top-[1%]
                  w-[25%]
                "
                opacity={
                  componentOpacity
                }
                {...pieces.r}
              />

              <MechanicalPiece
                src="/images/torq-components/r_lower.png"
                className="
                  left-[37%]
                  top-[35%]
                  w-[29%]
                "
                opacity={
                  componentOpacity
                }
                {...pieces.rLower}
              />

              <MechanicalPiece
                src="/images/torq-components/piston.png"
                className="
                  left-[53%]
                  top-[-10%]
                  w-[21%]
                "
                opacity={
                  componentOpacity
                }
                {...pieces.piston}
              />

              <MechanicalPiece
                src="/images/torq-components/q_section.png"
                className="
                  left-[61%]
                  top-[0%]
                  w-[33%]
                "
                opacity={
                  componentOpacity
                }
                {...pieces.q}
              />

              <MechanicalPiece
                src="/images/torq-components/q_base.png"
                className="
                  left-[67%]
                  top-[52%]
                  w-[24%]
                "
                opacity={
                  componentOpacity
                }
                {...pieces.qBase}
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
   MECHANICAL PIECE
   ================================================================ */

function MechanicalPiece({
  src,
  className,
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
  className: string
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
      className={`
        absolute
        h-auto
        object-contain
        will-change-transform
        ${className}
      `}
      style={{
        opacity,

        transformStyle:
          'preserve-3d',

        transformOrigin:
          'center center',

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
      }}
    />
  )
}

/* ================================================================
   COMPONENT OPACITY
   ================================================================ */

function componentOpacityValue(
  scrollProgress: number,
) {
  const fadeStart =
    0.82

  if (
    scrollProgress <
    fadeStart
  ) {
    return 1
  }

  const fade =
    (scrollProgress -
      fadeStart) /
    (1 - fadeStart)

  return 1 -
    Math.min(
      1,
      Math.max(
        0,
        fade,
      ),
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
