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

  const sectionRef =
    useRef<HTMLElement>(null)

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
        sectionRef.current

      if (!section) return

      const rect =
        section.getBoundingClientRect()

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
          window.requestAnimationFrame(
            update,
          )
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
        window.cancelAnimationFrame(
          raf,
        )
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

    return 1 -
      Math.pow(
        1 - t,
        3,
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
     WELCOME
     ============================================================ */

  const welcomeOpacity =
    1 -
    easeOut(
      scrollProgress /
        0.16,
    )

  const scrollHintOpacity =
    1 -
    easeOut(
      scrollProgress /
        0.14,
    )

  /* ============================================================
     LOGO DISINTEGRATION
     ============================================================ */

  /*
   * The logo stays intact longer.
   */

  const separation =
    easeInOut(
      (scrollProgress -
        0.12) /
        0.28,
    )

  /*
   * This is the important part.
   *
   * The pieces don't stop after separating.
   *
   * They continue accelerating out of the
   * viewport and toward the camera.
   */

  const exit =
    easeIn(
      (scrollProgress -
        0.25) /
        0.75,
    )

  /*
   * Combined motion.
   *
   * Separation creates the initial mechanical
   * breakup.
   *
   * Exit takes over and launches everything
   * through the camera.
   */

  const motion =
    Math.max(
      separation,
      exit,
    )

  /* ============================================================
     INTACT LOGO
     ============================================================ */

  const intactOpacity =
    1 -
    easeInOut(
      (scrollProgress -
        0.12) /
        0.18,
    )

  const intactScale =
    1 +
    easeOut(
      (scrollProgress -
        0.08) /
        0.22,
    ) *
      0.035

  /* ============================================================
     PIECE VISIBILITY
     ============================================================ */

  /*
   * IMPORTANT:
   *
   * We do NOT fade the pieces simply because
   * scrolling has reached a certain percentage.
   *
   * They remain visible while they're travelling.
   *
   * Fade begins only during the final part of
   * their flight toward / through the camera.
   */

  const exitFade =
    1 -
    easeInOut(
      (exit -
        0.70) /
        0.30,
    )

  const piecesOpacity =
    clamp(
      separation +
        exit * 0.25,
    ) *
    exitFade

  /* ============================================================
     PIECES
     ============================================================ */

  const pieces = {
    /* ----------------------------------------------------------
       T
       ---------------------------------------------------------- */

    t: {
      x:
        -10 * separation -
        58 * exit,

      y:
        -5 * separation -
        48 * exit,

      z:
        140 * separation +
        1550 * exit,

      rotateX:
        -8 * separation -
        26 * exit,

      rotateY:
        -18 * separation -
        42 * exit,

      rotateZ:
        -12 * separation -
        55 * exit,

      scale:
        1 +
        0.18 * separation +
        1.25 * exit,
    },

    /* ----------------------------------------------------------
       TURBINE
       ---------------------------------------------------------- */

    turbine: {
      x:
        -4 * separation -
        32 * exit,

      y:
        9 * separation +
        62 * exit,

      z:
        250 * separation +
        1750 * exit,

      rotateX:
        14 * separation +
        42 * exit,

      rotateY:
        -24 * separation -
        65 * exit,

      rotateZ:
        -34 * separation -
        110 * exit,

      scale:
        1 +
        0.28 * separation +
        1.65 * exit,
    },

    /* ----------------------------------------------------------
       R
       ---------------------------------------------------------- */

    r: {
      x:
        6 * separation +
        52 * exit,

      y:
        -8 * separation -
        55 * exit,

      z:
        220 * separation +
        1650 * exit,

      rotateX:
        -14 * separation -
        38 * exit,

      rotateY:
        20 * separation +
        55 * exit,

      rotateZ:
        16 * separation +
        70 * exit,

      scale:
        1 +
        0.24 * separation +
        1.45 * exit,
    },

    /* ----------------------------------------------------------
       LOWER R
       ---------------------------------------------------------- */

    rLower: {
      x:
        -7 * separation -
        55 * exit,

      y:
        14 * separation +
        72 * exit,

      z:
        180 * separation +
        1450 * exit,

      rotateX:
        18 * separation +
        55 * exit,

      rotateY:
        -15 * separation -
        38 * exit,

      rotateZ:
        24 * separation +
        95 * exit,

      scale:
        1 +
        0.25 * separation +
        1.35 * exit,
    },

    /* ----------------------------------------------------------
       PISTON
       ---------------------------------------------------------- */

    piston: {
      x:
        14 * separation +
        72 * exit,

      y:
        -20 * separation -
        70 * exit,

      z:
        400 * separation +
        2200 * exit,

      rotateX:
        24 * separation +
        65 * exit,

      rotateY:
        34 * separation +
        90 * exit,

      rotateZ:
        42 * separation +
        130 * exit,

      scale:
        1 +
        0.42 * separation +
        2.10 * exit,
    },

    /* ----------------------------------------------------------
       Q
       ---------------------------------------------------------- */

    q: {
      x:
        12 * separation +
        64 * exit,

      y:
        5 * separation +
        45 * exit,

      z:
        280 * separation +
        1800 * exit,

      rotateX:
        -12 * separation -
        32 * exit,

      rotateY:
        22 * separation +
        58 * exit,

      rotateZ:
        -20 * separation -
        75 * exit,

      scale:
        1 +
        0.28 * separation +
        1.55 * exit,
    },

    /* ----------------------------------------------------------
       Q BASE
       ---------------------------------------------------------- */

    qBase: {
      x:
        20 * separation +
        82 * exit,

      y:
        18 * separation +
        68 * exit,

      z:
        360 * separation +
        1950 * exit,

      rotateX:
        28 * separation +
        60 * exit,

      rotateY:
        -20 * separation -
        50 * exit,

      rotateZ:
        32 * separation +
        105 * exit,

      scale:
        1 +
        0.35 * separation +
        1.80 * exit,
    },
  }

  /* ============================================================
     HERO REVEAL
     ============================================================ */

  const heroOpacity =
    easeInOut(
      (scrollProgress -
        0.55) /
        0.30,
    )

  const backgroundOpacity =
    easeOut(
      (scrollProgress -
        0.45) /
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
            TOR'Q CINEMATIC LOGO
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
                LOGO
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

              {/* ==================================================
                  INTACT LOGO
                  ================================================== */}

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

              {/* ==================================================
                  COMPONENTS
                  ================================================== */}

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
                  }}
                >

                  <MechanicalPiece
                    src="/images/torq-components/t_section.png"
                    className="
                      left-[0%]
                      top-[0%]
                      w-[30%]
                    "
                    {...pieces.t}
                  />

                  <MechanicalPiece
                    src="/images/torq-components/turbine.png"
                    className="
                      left-[17%]
                      top-[5%]
                      w-[31%]
                    "
                    {...pieces.turbine}
                  />

                  <MechanicalPiece
                    src="/images/torq-components/r_section.png"
                    className="
                      left-[39%]
                      top-[5%]
                      w-[24%]
                    "
                    {...pieces.r}
                  />

                  <MechanicalPiece
                    src="/images/torq-components/r_lower.png"
                    className="
                      left-[38%]
                      top-[38%]
                      w-[27%]
                    "
                    {...pieces.rLower}
                  />

                  <MechanicalPiece
                    src="/images/torq-components/piston.png"
                    className="
                      left-[55%]
                      top-[-9%]
                      w-[20%]
                    "
                    {...pieces.piston}
                  />

                  <MechanicalPiece
                    src="/images/torq-components/q_section.png"
                    className="
                      left-[63%]
                      top-[3%]
                      w-[32%]
                    "
                    {...pieces.q}
                  />

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
        transformStyle:
          'preserve-3d',

        transform: `
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
