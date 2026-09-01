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

  const [scrollProgress, setScrollProgress] = useState(0)

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
     INTRO
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
     LOGO PHASE 1
     ============================================================ */

  /*
   * Very small mechanical release.

   * At the beginning:
   *
   * x = 0
   * y = 0
   * z = 0
   * rotation = 0
   * scale = 1
   *
   * Therefore the component artwork sits directly
   * over the intact logo.
   */

  const separation =
    easeInOut(
      (scrollProgress -
        0.13) /
        0.22,
    )

  /* ============================================================
     LOGO PHASE 2
     ============================================================ */

  const launch =
    easeIn(
      (scrollProgress -
        0.23) /
        0.38,
    )

  /* ============================================================
     LOGO PHASE 3
     ============================================================ */

  /*
   * Long continuous flight.
   *
   * The components travel far beyond the viewport.
   */

  const flight =
    easeIn(
      (scrollProgress -
        0.31) /
        0.69,
    )

  /* ============================================================
     INTACT LOGO
     ============================================================ */

  const intactOpacity =
    1 -
    easeInOut(
      (scrollProgress -
        0.14) /
        0.16,
    )

  /* ============================================================
     COMPONENT FADE
     ============================================================ */

  const componentEnter =
    easeOut(
      (scrollProgress -
        0.12) /
        0.12,
    )

  /*
   * IMPORTANT:
   *
   * The pieces don't fade during separation.
   *
   * Fade only happens near the END of flight.
   */

  const componentExit =
    1 -
    easeInOut(
      (flight -
        0.82) /
        0.18,
    )

  const componentOpacity =
    componentEnter *
    componentExit

  /* ============================================================
     CAMERA IMPACT
     ============================================================ */

  const cameraImpact =
    easeOut(
      (scrollProgress -
        0.42) /
        0.10,
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

  const pieces = {

    /* ==========================================================
       T
       ========================================================== */

    t: {
      x:
        -15 * separation -
        78 * launch -
        125 * flight,

      y:
        -7 * separation -
        45 * launch -
        110 * flight,

      z:
        0 +
        650 * launch +
        2500 * flight,

      rotateX:
        -10 * separation -
        30 * launch -
        50 * flight,

      rotateY:
        -9 * separation -
        45 * launch -
        75 * flight,

      rotateZ:
        -7 * separation -
        55 * launch -
        120 * flight,

      scale:
        1 +
        0.10 * launch +
        2.15 * flight,

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
        -5 * separation -
        45 * launch -
        110 * flight,

      y:
        10 * separation +
        65 * launch +
        160 * flight,

      z:
        0 +
        700 * launch +
        2850 * flight,

      rotateX:
        9 * separation +
        45 * launch +
        75 * flight,

      rotateY:
        -17 * separation -
        68 * launch -
        120 * flight,

      rotateZ:
        -22 * separation -
        120 * launch -
        225 * flight,

      scale:
        1 +
        0.10 * launch +
        2.60 * flight,

      blur:
        0 +
        2 * launch +
        10 * flight,
    },

    /* ==========================================================
       R
       ========================================================== */

    r: {
      x:
        7 * separation +
        80 * launch +
        125 * flight,

      y:
        -10 * separation -
        60 * launch -
        125 * flight,

      z:
        0 +
        650 * launch +
        2650 * flight,

      rotateX:
        -9 * separation -
        36 * launch -
        62 * flight,

      rotateY:
        15 * separation +
        60 * launch +
        108 * flight,

      rotateZ:
        9 * separation +
        78 * launch +
        135 * flight,

      scale:
        1 +
        0.10 * launch +
        2.35 * flight,

      blur:
        0 +
        2 * launch +
        9 * flight,
    },

    /* ==========================================================
       LOWER R
       ========================================================== */

    rLower: {
      x:
        -9 * separation -
        88 * launch -
        130 * flight,

      y:
        12 * separation +
        92 * launch +
        155 * flight,

      z:
        0 +
        600 * launch +
        2400 * flight,

      rotateX:
        12 * separation +
        48 * launch +
        80 * flight,

      rotateY:
        -11 * separation -
        50 * launch -
        85 * flight,

      rotateZ:
        16 * separation +
        108 * launch +
        170 * flight,

      scale:
        1 +
        0.10 * launch +
        2.10 * flight,

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
        14 * separation +
        115 * launch +
        165 * flight,

      y:
        -18 * separation -
        108 * launch -
        170 * flight,

      z:
        0 +
        900 * launch +
        3600 * flight,

      rotateX:
        20 * separation +
        70 * launch +
        120 * flight,

      rotateY:
        28 * separation +
        95 * launch +
        170 * flight,

      rotateZ:
        35 * separation +
        150 * launch +
        240 * flight,

      scale:
        1 +
        0.12 * launch +
        3.45 * flight,

      blur:
        0 +
        3 * launch +
        14 * flight,
    },

    /* ==========================================================
       Q
       ========================================================== */

    q: {
      x:
        12 * separation +
        95 * launch +
        140 * flight,

      y:
        7 * separation +
        68 * launch +
        120 * flight,

      z:
        0 +
        750 * launch +
        3100 * flight,

      rotateX:
        -10 * separation -
        36 * launch -
        66 * flight,

      rotateY:
        18 * separation +
        70 * launch +
        115 * flight,

      rotateZ:
        -16 * separation -
        92 * launch -
        160 * flight,

      scale:
        1 +
        0.10 * launch +
        2.85 * flight,

      blur:
        0 +
        2 * launch +
        11 * flight,
    },

    /* ==========================================================
       Q BASE
       ========================================================== */

    qBase: {
      x:
        20 * separation +
        130 * launch +
        180 * flight,

      y:
        18 * separation +
        98 * launch +
        150 * flight,

      z:
        0 +
        850 * launch +
        3400 * flight,

      rotateX:
        22 * separation +
        68 * launch +
        112 * flight,

      rotateY:
        -18 * separation -
        60 * launch -
        100 * flight,

      rotateZ:
        28 * separation +
        130 * launch +
        205 * flight,

      scale:
        1 +
        0.12 * launch +
        3.10 * flight,

      blur:
        0 +
        3 * launch +
        13 * flight,
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
            TOR'Q LOGO
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

                THIS IS THE REFERENCE FRAME.

                The intact logo and every component are
                positioned within the same exact stage.
                ================================================== */}

            <div
              className="
                relative
                aspect-[790/316]
                w-full
                max-w-[720px]
              "
              style={{
                perspective:
                  '1800px',

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
                    'translate3d(0,0,0) scale(1)',

                  transformOrigin:
                    'center center',

                  willChange:
                    'opacity',
                }}
              />

              {/* =================================================
                  COMPONENT LAYER

                  The 1.12 scale compensates for transparent
                  padding inside the individual component PNGs.
                  ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  opacity:
                    componentOpacity,

                  transform:
                    `
                      translate3d(
                        0,
                        0,
                        ${cameraImpact * -45}px
                      )
                      scale(
                        ${
                          1 +
                          cameraImpact *
                            0.025
                        }
                      )
                    `,

                  transformOrigin:
                    'center center',

                  transformStyle:
                    'preserve-3d',

                  willChange:
                    'transform, opacity',
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
                    left-[16%]
                    top-[3%]
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
                    left-[38%]
                    top-[1%]
                    w-[25%]
                  "
                  {...pieces.r}
                />

                {/* =================================================
                    LOWER R
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  className="
                    left-[37%]
                    top-[35%]
                    w-[29%]
                  "
                  {...pieces.rLower}
                />

                {/* =================================================
                    PISTON
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  className="
                    left-[53%]
                    top-[-10%]
                    w-[21%]
                  "
                  {...pieces.piston}
                />

                {/* =================================================
                    Q
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  className="
                    left-[61%]
                    top-[0%]
                    w-[33%]
                  "
                  {...pieces.q}
                />

                {/* =================================================
                    Q BASE
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_base.png"
                  className="
                    left-[67%]
                    top-[52%]
                    w-[24%]
                  "
                  {...pieces.qBase}
                />

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
