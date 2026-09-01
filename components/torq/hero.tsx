'use client'

import {
  ChevronDown,
  MapPin,
  Ticket,
} from 'lucide-react'
import {
  useEffect,
  useState,
} from 'react'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { Countdown } from './countdown'
import { useRegistration } from './registration'

export function Hero() {
  const { open } = useRegistration()

  const [scrollProgress, setScrollProgress] =
    useState(0)

  /* ============================================================
     SCROLL
     ============================================================ */

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0

      const section =
        document.getElementById('top')

      if (!section) return

      const distance =
        section.offsetHeight -
        window.innerHeight

      if (distance <= 0) return

      const progress = Math.min(
        1,
        Math.max(
          0,
          -section.getBoundingClientRect().top /
            distance,
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
     HELPERS
     ============================================================ */

  const clamp = (value: number) =>
    Math.min(
      1,
      Math.max(0, value),
    )

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

  /*
   * Main disintegration progress.
   *
   * The logo doesn't start breaking immediately.
   * We allow the visitor to see the identity first.
   */

  const disintegration =
    easeInOut(
      (scrollProgress -
        0.10) /
        0.58,
    )

  /* ============================================================
     OPENING COPY
     ============================================================ */

  const welcomeOpacity =
    1 -
    easeOut(
      scrollProgress /
        0.18,
    )

  const scrollHintOpacity =
    1 -
    easeOut(
      scrollProgress /
        0.15,
    )

  /* ============================================================
     INTACT LOGO
     ============================================================ */

  /*
   * The intact logo stays visible initially,
   * then disappears as the physical pieces
   * take over.
   */

  const intactOpacity =
    1 -
    easeInOut(
      (scrollProgress -
        0.16) /
        0.22,
    )

  const intactScale =
    1 +
    easeOut(
      (scrollProgress -
        0.12) /
        0.30,
    ) *
      0.025

  /* ============================================================
     COMPONENT OPACITY
     ============================================================ */

  /*
   * Components appear gradually rather than
   * suddenly switching on.
   */

  const componentOpacity =
    easeOut(
      (scrollProgress -
        0.13) /
        0.25,
    )

  /*
   * Final disappearance.
   */

  const finalComponentFade =
    1 -
    easeOut(
      (scrollProgress -
        0.78) /
        0.22,
    )

  const componentVisibility =
    componentOpacity *
    finalComponentFade

  /* ============================================================
     COMPONENT MOTION
     ============================================================ */

  /*
   * Each component has its own direction.
   *
   * This is what makes the logo feel like a
   * machine physically coming apart.
   */

  const pieces = {
    /* ----------------------------------------------------------
       T SECTION
       ---------------------------------------------------------- */

    t: {
      x:
        -disintegration *
        12,

      y:
        -disintegration *
        8,

      rotate:
        -disintegration *
        9,

      scale:
        1 +
        disintegration *
          0.08,
    },

    /* ----------------------------------------------------------
       TURBINE
       ---------------------------------------------------------- */

    turbine: {
      x:
        -disintegration *
        4,

      y:
        disintegration *
        10,

      rotate:
        disintegration *
        -24,

      scale:
        1 +
        disintegration *
          0.05,
    },

    /* ----------------------------------------------------------
       R SECTION
       ---------------------------------------------------------- */

    r: {
      x:
        disintegration *
        5,

      y:
        -disintegration *
        12,

      rotate:
        disintegration *
        14,

      scale:
        1 +
        disintegration *
          0.07,
    },

    /* ----------------------------------------------------------
       LOWER R
       ---------------------------------------------------------- */

    rLower: {
      x:
        -disintegration *
        8,

      y:
        disintegration *
        14,

      rotate:
        disintegration *
        18,

      scale:
        1 +
        disintegration *
          0.10,
    },

    /* ----------------------------------------------------------
       PISTON
       ---------------------------------------------------------- */

    piston: {
      x:
        disintegration *
        15,

      y:
        -disintegration *
        20,

      rotate:
        disintegration *
        32,

      scale:
        1 +
        disintegration *
          0.15,
    },

    /* ----------------------------------------------------------
       Q SECTION
       ---------------------------------------------------------- */

    q: {
      x:
        disintegration *
        12,

      y:
        disintegration *
        7,

      rotate:
        disintegration *
        -13,

      scale:
        1 +
        disintegration *
          0.08,
    },

    /* ----------------------------------------------------------
       Q BASE
       ---------------------------------------------------------- */

    qBase: {
      x:
        disintegration *
        19,

      y:
        disintegration *
        17,

      rotate:
        disintegration *
        24,

      scale:
        1 +
        disintegration *
          0.12,
    },
  }

  /* ============================================================
     MAIN HERO REVEAL
     ============================================================ */

  const backgroundOpacity =
    easeOut(
      (scrollProgress -
        0.48) /
        0.42,
    )

  const heroOpacity =
    easeInOut(
      (scrollProgress -
        0.55) /
        0.32,
    )

  return (
    <section
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
      >

        {/* ======================================================
            BLACK BASE
            ====================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black
          "
        />

        {/* ======================================================
            HERO BACKGROUND
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
            MAIN HERO
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
            TOR'Q MECHANICAL INTRO
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
                MECHANICAL LOGO
                ================================================== */}

            <div
              className="
                relative
                aspect-[790/316]
                w-full
                max-w-[720px]
              "
            >

              {/* ==================================================
                  ORIGINAL ASSEMBLED LOGO
                  ================================================== */}

              <img
                src="/images/torq-logo-intact.png"
                alt="TOR'Q"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-contain
                "
                style={{
                  opacity:
                    intactOpacity,
                  transform:
                    `scale(${intactScale})`,
                }}
              />

              {/* ==================================================
                  T SECTION
                  ================================================== */}

              <MechanicalPiece
                src="/images/torq-components/t_section.png"
                className="
                  left-[2%]
                  top-[2%]
                  w-[20%]
                "
                opacity={
                  componentVisibility
                }
                x={
                  pieces.t.x
                }
                y={
                  pieces.t.y
                }
                rotate={
                  pieces.t.rotate
                }
                scale={
                  pieces.t.scale
                }
              />

              {/* ==================================================
                  TURBINE
                  ================================================== */}

              <MechanicalPiece
                src="/images/torq-components/turbine.png"
                className="
                  left-[19%]
                  top-[10%]
                  w-[20%]
                "
                opacity={
                  componentVisibility
                }
                x={
                  pieces.turbine.x
                }
                y={
                  pieces.turbine.y
                }
                rotate={
                  pieces.turbine.rotate
                }
                scale={
                  pieces.turbine.scale
                }
              />

              {/* ==================================================
                  R SECTION
                  ================================================== */}

              <MechanicalPiece
                src="/images/torq-components/r_section.png"
                className="
                  left-[43%]
                  top-[10%]
                  w-[15%]
                "
                opacity={
                  componentVisibility
                }
                x={
                  pieces.r.x
                }
                y={
                  pieces.r.y
                }
                rotate={
                  pieces.r.rotate
                }
                scale={
                  pieces.r.scale
                }
              />

              {/* ==================================================
                  LOWER R
                  ================================================== */}

              <MechanicalPiece
                src="/images/torq-components/r_lower.png"
                className="
                  left-[40%]
                  top-[39%]
                  w-[19%]
                "
                opacity={
                  componentVisibility
                }
                x={
                  pieces.rLower.x
                }
                y={
                  pieces.rLower.y
                }
                rotate={
                  pieces.rLower.rotate
                }
                scale={
                  pieces.rLower.scale
                }
              />

              {/* ==================================================
                  PISTON
                  ================================================== */}

              <MechanicalPiece
                src="/images/torq-components/piston.png"
                className="
                  left-[57%]
                  top-[-4%]
                  w-[14%]
                "
                opacity={
                  componentVisibility
                }
                x={
                  pieces.piston.x
                }
                y={
                  pieces.piston.y
                }
                rotate={
                  pieces.piston.rotate
                }
                scale={
                  pieces.piston.scale
                }
              />

              {/* ==================================================
                  Q SECTION
                  ================================================== */}

              <MechanicalPiece
                src="/images/torq-components/q_section.png"
                className="
                  left-[66%]
                  top-[7%]
                  w-[23%]
                "
                opacity={
                  componentVisibility
                }
                x={
                  pieces.q.x
                }
                y={
                  pieces.q.y
                }
                rotate={
                  pieces.q.rotate
                }
                scale={
                  pieces.q.scale
                }
              />

              {/* ==================================================
                  Q BASE
                  ================================================== */}

              <MechanicalPiece
                src="/images/torq-components/q_base.png"
                className="
                  left-[69%]
                  top-[55%]
                  w-[15%]
                "
                opacity={
                  componentVisibility
                }
                x={
                  pieces.qBase.x
                }
                y={
                  pieces.qBase.y
                }
                rotate={
                  pieces.qBase.rotate
                }
                scale={
                  pieces.qBase.scale
                }
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
  rotate,
  scale,
}: {
  src: string
  className: string
  opacity: number
  x: number
  y: number
  rotate: number
  scale: number
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
        transform: `
          translate3d(
            ${x}vw,
            ${y}vh,
            0
          )
          rotate(${rotate}deg)
          scale(${scale})
        `,
        transition:
          'opacity 80ms linear',
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
