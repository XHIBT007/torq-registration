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
     SCROLL PROGRESS
     ============================================================ */

  useEffect(() => {
    let raf = 0

    const updateProgress = () => {
      raf = 0

      const section =
        sectionRef.current

      if (!section) return

      const rect =
        section.getBoundingClientRect()

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight

      if (scrollDistance <= 0) {
        setScrollProgress(0)
        return
      }

      const progress =
        Math.min(
          1,
          Math.max(
            0,
            -rect.top /
              scrollDistance,
          ),
        )

      setScrollProgress(progress)
    }

    const onScroll = () => {
      if (!raf) {
        raf =
          window.requestAnimationFrame(
            updateProgress,
          )
      }
    }

    updateProgress()

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      updateProgress,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        onScroll,
      )

      window.removeEventListener(
        'resize',
        updateProgress,
      )

      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])

  /* ============================================================
     ANIMATION HELPERS
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
        0.16,
    )

  /* ============================================================
     TOR'Q MECHANICAL DISINTEGRATION
     ============================================================

     0.00 → 0.14
     Logo remains completely intact.

     0.14 → 0.32
     Mechanical pieces begin separating.

     0.32 → 0.68
     Pieces accelerate outward and toward camera.

     0.68 → 0.86
     Pieces continue flying through the camera.

     0.86 → 1.00
     Logo sequence disappears and Hero is revealed.
     ============================================================ */

  const explosionProgress =
    easeInOut(
      (scrollProgress -
        0.14) /
        0.62,
    )

  const piecesAppear =
    easeOut(
      (scrollProgress -
        0.12) /
        0.10,
    )

  const piecesDisappear =
    1 -
    easeOut(
      (scrollProgress -
        0.82) /
        0.18,
    )

  const piecesOpacity =
    piecesAppear *
    piecesDisappear

  /* ============================================================
     INTACT LOGO
     ============================================================ */

  const intactOpacity =
    1 -
    easeInOut(
      (scrollProgress -
        0.14) /
        0.18,
    )

  const intactScale =
    1 +
    easeOut(
      (scrollProgress -
        0.08) /
        0.20,
    ) *
      0.035

  /* ============================================================
     3D CAMERA
     ============================================================ */

  /*
   * The perspective belongs to the logo stage.
   *
   * Positive Z moves pieces toward the viewer.
   * As Z increases, scale increases to exaggerate
   * the physical camera effect.
   */

  const cameraDepth =
    explosionProgress

  /* ============================================================
     PIECE MOTION
     ============================================================ */

  const pieces = {
    /* ----------------------------------------------------------
       T
       ---------------------------------------------------------- */

    t: {
      x:
        -10 *
        cameraDepth,

      y:
        -5 *
        cameraDepth,

      z:
        180 *
        cameraDepth,

      rotateX:
        -8 *
        cameraDepth,

      rotateY:
        -18 *
        cameraDepth,

      rotateZ:
        -12 *
        cameraDepth,

      scale:
        1 +
        0.24 *
          cameraDepth,
    },

    /* ----------------------------------------------------------
       TURBINE
       ---------------------------------------------------------- */

    turbine: {
      x:
        -4 *
        cameraDepth,

      y:
        9 *
        cameraDepth,

      z:
        330 *
        cameraDepth,

      rotateX:
        14 *
        cameraDepth,

      rotateY:
        -24 *
        cameraDepth,

      rotateZ:
        -34 *
        cameraDepth,

      scale:
        1 +
        0.38 *
          cameraDepth,
    },

    /* ----------------------------------------------------------
       R
       ---------------------------------------------------------- */

    r: {
      x:
        6 *
        cameraDepth,

      y:
        -8 *
        cameraDepth,

      z:
        260 *
        cameraDepth,

      rotateX:
        -14 *
        cameraDepth,

      rotateY:
        20 *
        cameraDepth,

      rotateZ:
        16 *
        cameraDepth,

      scale:
        1 +
        0.30 *
          cameraDepth,
    },

    /* ----------------------------------------------------------
       LOWER R
       ---------------------------------------------------------- */

    rLower: {
      x:
        -7 *
        cameraDepth,

      y:
        14 *
        cameraDepth,

      z:
        220 *
        cameraDepth,

      rotateX:
        18 *
        cameraDepth,

      rotateY:
        -15 *
        cameraDepth,

      rotateZ:
        24 *
        cameraDepth,

      scale:
        1 +
        0.30 *
          cameraDepth,
    },

    /* ----------------------------------------------------------
       PISTON
       ---------------------------------------------------------- */

    piston: {
      x:
        14 *
        cameraDepth,

      y:
        -20 *
        cameraDepth,

      z:
        520 *
        cameraDepth,

      rotateX:
        24 *
        cameraDepth,

      rotateY:
        34 *
        cameraDepth,

      rotateZ:
        42 *
        cameraDepth,

      scale:
        1 +
        0.52 *
          cameraDepth,
    },

    /* ----------------------------------------------------------
       Q
       ---------------------------------------------------------- */

    q: {
      x:
        12 *
        cameraDepth,

      y:
        5 *
        cameraDepth,

      z:
        320 *
        cameraDepth,

      rotateX:
        -12 *
        cameraDepth,

      rotateY:
        22 *
        cameraDepth,

      rotateZ:
        -20 *
        cameraDepth,

      scale:
        1 +
        0.34 *
          cameraDepth,
    },

    /* ----------------------------------------------------------
       Q BASE
       ---------------------------------------------------------- */

    qBase: {
      x:
        20 *
        cameraDepth,

      y:
        18 *
        cameraDepth,

      z:
        430 *
        cameraDepth,

      rotateX:
        28 *
        cameraDepth,

      rotateY:
        -20 *
        cameraDepth,

      rotateZ:
        32 *
        cameraDepth,

      scale:
        1 +
        0.44 *
          cameraDepth,
    },
  }

  /* ============================================================
     MAIN HERO REVEAL
     ============================================================ */

  const layerTwoOpacity =
    easeInOut(
      (scrollProgress -
        0.58) /
        0.35,
    )

  const backgroundOpacity =
    easeOut(
      (scrollProgress -
        0.44) /
        0.48,
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
            BACKGROUND IMAGE
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
              layerTwoOpacity,
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

              {/* ==================================================
                  HEADLINE
                  ================================================== */}

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

              {/* ==================================================
                  DESCRIPTION
                  ================================================== */}

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

              {/* ==================================================
                  CTA
                  ================================================== */}

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

              {/* ==================================================
                  STATS
                  ================================================== */}

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

              {/* ==================================================
                  COUNTDOWN
                  ================================================== */}

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
            TOR'Q OPENING
            ONLY THIS PART IS BEING CHANGED
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
              '1400px',
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
              text-center
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
                3D LOGO STAGE

                IMPORTANT:
                The component pieces occupy the SAME
                overall footprint as the intact logo.
                ================================================== */}

            <div
              className="
                relative
                flex
                w-full
                items-center
                justify-center
              "
              style={{
                perspective:
                  '1400px',
                transformStyle:
                  'preserve-3d',
              }}
            >

              {/* ==================================================
                  INTACT LOGO

                  This is the visual source of truth.
                  ================================================== */}

              <img
                src="/images/torq-logo-intact.png"
                alt="TOR'Q"
                aria-hidden="true"
                className="
                  relative
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
                  COMPONENT LAYER

                  The whole component system uses the exact
                  same footprint as the intact logo.
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

                  {/* =================================================
                      T SECTION
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
                      R SECTION
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
                      Q SECTION
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
                SCROLL INSTRUCTION
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
