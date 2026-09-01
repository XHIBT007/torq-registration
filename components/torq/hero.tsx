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

      const rect = section.getBoundingClientRect()

      const distance =
        section.offsetHeight -
        window.innerHeight

      if (distance <= 0) return

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

  const easeIn = (value: number) => {
    const t = clamp(value)

    return Math.pow(t, 3)
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
     INTRO COPY
     ============================================================ */

  const welcomeOpacity =
    1 -
    easeOut(
      scrollProgress / 0.16,
    )

  const scrollHintOpacity =
    1 -
    easeOut(
      scrollProgress / 0.14,
    )

  /* ============================================================
     LOGO PHASES
     ============================================================ */

  /*
   * PHASE 1
   *
   * Logo remains assembled.
   */

  const separation =
    easeInOut(
      (scrollProgress - 0.12) /
        0.24,
    )

  /*
   * PHASE 2
   *
   * The components begin their actual launch.
   */

  const launch =
    easeIn(
      (scrollProgress - 0.25) /
        0.48,
    )

  /*
   * PHASE 3
   *
   * Components are travelling through
   * the camera and out of frame.
   */

  const flight =
    easeOut(
      (scrollProgress - 0.34) /
        0.66,
    )

  /* ============================================================
     INTACT LOGO
     ============================================================ */

  const intactOpacity =
    1 -
    easeInOut(
      (scrollProgress - 0.13) /
        0.16,
    )

  const intactScale =
    1 +
    easeOut(
      (scrollProgress - 0.08) /
        0.22,
    ) *
      0.025

  /* ============================================================
     COMPONENT VISIBILITY
     ============================================================ */

  /*
   * The pieces appear as the logo breaks apart.
   *
   * They don't fade away simply because the
   * animation is progressing.
   */

  const piecesEnter =
    easeOut(
      (scrollProgress - 0.11) /
        0.14,
    )

  /*
   * Fade happens only during the final
   * portion of their flight.
   */

  const piecesExit =
    1 -
    easeInOut(
      (flight - 0.76) /
        0.24,
    )

  const piecesOpacity =
    piecesEnter *
    piecesExit

  /* ============================================================
     ACCELERATION
     ============================================================ */

  /*
   * This creates the feeling that the parts
   * are initially heavy, then suddenly released.
   */

  const acceleration =
    easeIn(
      (scrollProgress - 0.20) /
        0.42,
    )

  /*
   * Camera impact.
   *
   * Very subtle.
   */

  const cameraImpact =
    easeOut(
      (scrollProgress - 0.48) /
        0.18,
    ) *
    (1 -
      easeOut(
        (scrollProgress - 0.66) /
          0.20,
      ))

  /* ============================================================
     PIECE MOTION
     ============================================================ */

  const pieces = {
    /* ----------------------------------------------------------
       T SECTION
       ---------------------------------------------------------- */

    t: {
      x:
        -8 * separation -
        70 * acceleration,

      y:
        -4 * separation -
        52 * acceleration,

      z:
        80 * separation +
        1850 * acceleration,

      rotateX:
        -5 * separation -
        35 * acceleration,

      rotateY:
        -10 * separation -
        55 * acceleration,

      rotateZ:
        -6 * separation -
        72 * acceleration,

      scale:
        1 +
        0.10 * separation +
        1.65 * acceleration,

      blur:
        1 +
        5 * acceleration,
    },

    /* ----------------------------------------------------------
       TURBINE
       ---------------------------------------------------------- */

    turbine: {
      x:
        -3 * separation -
        42 * acceleration,

      y:
        7 * separation +
        76 * acceleration,

      z:
        150 * separation +
        2050 * acceleration,

      rotateX:
        8 * separation +
        48 * acceleration,

      rotateY:
        -16 * separation -
        75 * acceleration,

      rotateZ:
        -18 * separation -
        150 * acceleration,

      scale:
        1 +
        0.12 * separation +
        1.95 * acceleration,

      blur:
        1 +
        7 * acceleration,
    },

    /* ----------------------------------------------------------
       R SECTION
       ---------------------------------------------------------- */

    r: {
      x:
        5 * separation +
        66 * acceleration,

      y:
        -7 * separation -
        61 * acceleration,

      z:
        120 * separation +
        1900 * acceleration,

      rotateX:
        -8 * separation -
        42 * acceleration,

      rotateY:
        14 * separation +
        65 * acceleration,

      rotateZ:
        9 * separation +
        85 * acceleration,

      scale:
        1 +
        0.12 * separation +
        1.75 * acceleration,

      blur:
        1 +
        6 * acceleration,
    },

    /* ----------------------------------------------------------
       LOWER R
       ---------------------------------------------------------- */

    rLower: {
      x:
        -6 * separation -
        67 * acceleration,

      y:
        11 * separation +
        86 * acceleration,

      z:
        100 * separation +
        1700 * acceleration,

      rotateX:
        12 * separation +
        52 * acceleration,

      rotateY:
        -10 * separation -
        50 * acceleration,

      rotateZ:
        15 * separation +
        115 * acceleration,

      scale:
        1 +
        0.12 * separation +
        1.60 * acceleration,

      blur:
        1 +
        6 * acceleration,
    },

    /* ----------------------------------------------------------
       PISTON
       ---------------------------------------------------------- */

    piston: {
      x:
        11 * separation +
        88 * acceleration,

      y:
        -17 * separation -
        86 * acceleration,

      z:
        250 * separation +
        2450 * acceleration,

      rotateX:
        18 * separation +
        75 * acceleration,

      rotateY:
        25 * separation +
        105 * acceleration,

      rotateZ:
        32 * separation +
        160 * acceleration,

      scale:
        1 +
        0.18 * separation +
        2.55 * acceleration,

      blur:
        1 +
        9 * acceleration,
    },

    /* ----------------------------------------------------------
       Q SECTION
       ---------------------------------------------------------- */

    q: {
      x:
        10 * separation +
        75 * acceleration,

      y:
        4 * separation +
        56 * acceleration,

      z:
        160 * separation +
        2150 * acceleration,

      rotateX:
        -9 * separation -
        40 * acceleration,

      rotateY:
        16 * separation +
        70 * acceleration,

      rotateZ:
        -14 * separation -
        92 * acceleration,

      scale:
        1 +
        0.14 * separation +
        2.00 * acceleration,

      blur:
        1 +
        7 * acceleration,
    },

    /* ----------------------------------------------------------
       Q BASE
       ---------------------------------------------------------- */

    qBase: {
      x:
        17 * separation +
        100 * acceleration,

      y:
        15 * separation +
        80 * acceleration,

      z:
        210 * separation +
        2300 * acceleration,

      rotateX:
        20 * separation +
        70 * acceleration,

      rotateY:
        -16 * separation -
        62 * acceleration,

      rotateZ:
        24 * separation +
        125 * acceleration,

      scale:
        1 +
        0.16 * separation +
        2.20 * acceleration,

      blur:
        1 +
        8 * acceleration,
    },
  }

  /* ============================================================
     HERO REVEAL
     ============================================================ */

  const heroOpacity =
    easeInOut(
      (scrollProgress - 0.55) /
        0.30,
    )

  const backgroundOpacity =
    easeOut(
      (scrollProgress - 0.45) /
        0.45,
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
            '1600px',
        }}
      >

        {/* ======================================================
            EXISTING BACKGROUND
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
            EXISTING HERO CONTENT
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
            LOGO ANIMATION
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
            px-6
            sm:px-8
          "
          style={{
            perspective:
              '1600px',
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
              justify-center
            "
          >

            {/* ==================================================
                WELCOME TO
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
                LOGO STAGE
                ================================================== */}

            <div
              className="
                relative
                w-full
              "
              style={{
                perspective:
                  '1600px',
                transformStyle:
                  'preserve-3d',
              }}
            >

              {/* =================================================
                  INTACT LOGO
                  ================================================= */}

              <img
                src="/images/torq-logo-intact.png"
                alt="TOR'Q"
                aria-hidden="true"
                className="
                  relative
                  mx-auto
                  h-auto
                  w-[82vw]
                  max-w-[720px]
                  object-contain
                  sm:w-[76vw]
                  lg:w-[62vw]
                  xl:w-[58vw]
                "
                style={{
                  opacity:
                    intactOpacity,

                  transform:
                    `scale(${intactScale})`,
                }}
              />

              {/* =================================================
                  COMPONENT SYSTEM
                  ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
                style={{
                  opacity:
                    piecesOpacity,

                  transformStyle:
                    'preserve-3d',
                }}
              >

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
                    transformStyle:
                      'preserve-3d',

                    transform:
                      `
                        scale(
                          ${
                            1 +
                            cameraImpact *
                              0.018
                          }
                        )
                        translate3d(
                          0,
                          0,
                          ${
                            cameraImpact *
                            -35
                          }px
                        )
                      `,
                  }}
                >

                  {/* =================================================
                      T
                      ================================================= */}

                  <MechanicalPiece
                    src="/images/torq-components/t_section.png"
                    className="
                      left-[0%]
                      top-[0%]
                      w-[30%]
                    "
                    {...pieces.t}
                  />

                  {/* =================================================
                      TURBINE
                      ================================================= */}

                  <MechanicalPiece
                    src="/images/torq-components/turbine.png"
                    className="
                      left-[17%]
                      top-[5%]
                      w-[31%]
                    "
                    {...pieces.turbine}
                  />

                  {/* =================================================
                      R
                      ================================================= */}

                  <MechanicalPiece
                    src="/images/torq-components/r_section.png"
                    className="
                      left-[39%]
                      top-[5%]
                      w-[24%]
                    "
                    {...pieces.r}
                  />

                  {/* =================================================
                      LOWER R
                      ================================================= */}

                  <MechanicalPiece
                    src="/images/torq-components/r_lower.png"
                    className="
                      left-[38%]
                      top-[38%]
                      w-[27%]
                    "
                    {...pieces.rLower}
                  />

                  {/* =================================================
                      PISTON
                      ================================================= */}

                  <MechanicalPiece
                    src="/images/torq-components/piston.png"
                    className="
                      left-[55%]
                      top-[-9%]
                      w-[20%]
                    "
                    {...pieces.piston}
                  />

                  {/* =================================================
                      Q
                      ================================================= */}

                  <MechanicalPiece
                    src="/images/torq-components/q_section.png"
                    className="
                      left-[63%]
                      top-[3%]
                      w-[32%]
                    "
                    {...pieces.q}
                  />

                  {/* =================================================
                      Q BASE
                      ================================================= */}

                  <MechanicalPiece
                    src="/images/torq-components/q_base.png"
                    className="
                      left-[69%]
                      top-[58%]
                      w-[23%]
                    "
                    {...pieces.qBase}
                  />

                </div>

              </div>

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
        opacity: 1,

        transformStyle:
          'preserve-3d',

        filter:
          `blur(${blur}px)`,

        transform:
          `
            translate3d(
              ${x}vw,
              ${y}vh,
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
