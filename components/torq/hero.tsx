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
import { Countdown } from './countdown'
import { useRegistration } from './registration'
import { EVENT } from '@/lib/torq-data'

/* ============================================================
   MASTER TOR'Q ARTBOARD
   ============================================================ */

const STAGE_WIDTH = 790
const STAGE_HEIGHT = 316

/*
 * IMPORTANT:
 *
 * This is the smoothened TOR'Q state we approved.
 *
 * It is present immediately on page load.
 */
const INITIAL_RELEASE = 0.32

/*
 * MUSTANG HERO IMAGE
 *
 * Put the image here:
 *
 * public/images/hero-mustang-2026.webp
 */
const MUSTANG_SRC =
  '/images/hero-mustang-2026.JPG'

/* ============================================================
   COMPONENT DATA
   ============================================================ */

type ComponentData = {
  /* LOCKED REGISTRATION GEOMETRY */
  x: number
  y: number
  width: number
  rotation: number

  /* LOCKED FLIGHT */
  flightX: number
  flightY: number

  /* LOCKED ROTATION */
  rotateX: number
  rotateY: number
  rotateZ: number

  /* DEPTH */
  depth: number

  /* MECHANICAL CHARACTER */
  spinX: number
  spinY: number
  spinZ: number

  microX: number
  microY: number

  phase: number

  /*
   * 0 = standard
   * 1 = turbine
   * 2 = piston
   */
  motionType: number
}

/* ============================================================
   LOCKED COMPONENT POSITIONS

   DO NOT CHANGE THESE VALUES.
   ============================================================ */

const COMPONENTS: Record<
  string,
  ComponentData
> = {
  t: {
    x: -2.01,
    y: 34.27,
    width: 177,
    rotation: -21,

    flightX: -900,
    flightY: -350,

    rotateX: 300,
    rotateY: -220,
    rotateZ: -480,

    depth: 1.0,

    spinX: 1.00,
    spinY: 0.75,
    spinZ: 1.15,

    microX: 10,
    microY: 5,

    phase: 0.4,

    motionType: 0,
  },

  turbine: {
    x: 128.14,
    y: 39.31,
    width: 188,
    rotation: -7,

    flightX: -600,
    flightY: 650,

    rotateX: 320,
    rotateY: -260,
    rotateZ: 420,

    depth: 1.15,

    spinX: 0.60,
    spinY: 0.85,
    spinZ: 1.55,

    microX: 7,
    microY: 7,

    phase: 1.8,

    motionType: 1,
  },

  number26: {
    x: 247.95,
    y: 108.56,
    width: 38,
    rotation: 0,

    flightX: 80,
    flightY: -900,

    rotateX: 280,
    rotateY: 350,
    rotateZ: 360,

    depth: 0.9,

    spinX: 0.55,
    spinY: 0.70,
    spinZ: 0.80,

    microX: 4,
    microY: 3,

    phase: 2.9,

    motionType: 0,
  },

  r: {
    x: 266.87,
    y: 32.9,
    width: 153,
    rotation: -22,

    flightX: 900,
    flightY: -280,

    rotateX: -320,
    rotateY: 260,
    rotateZ: 500,

    depth: 1.1,

    spinX: 1.00,
    spinY: 1.05,
    spinZ: 1.15,

    microX: 8,
    microY: 5,

    phase: 4.1,

    motionType: 0,
  },

  rLower: {
    x: 313.28,
    y: 153.54,
    width: 168,
    rotation: -21,

    flightX: 750,
    flightY: 700,

    rotateX: 350,
    rotateY: -300,
    rotateZ: -520,

    depth: 1.2,

    spinX: 1.15,
    spinY: 0.85,
    spinZ: 1.25,

    microX: 9,
    microY: 8,

    phase: 5.4,

    motionType: 0,
  },

  piston: {
    x: 423.85,
    y: 10.75,
    width: 169,
    rotation: -14,

    flightX: 600,
    flightY: -900,

    rotateX: -380,
    rotateY: 300,
    rotateZ: 520,

    depth: 1.35,

    spinX: 0.95,
    spinY: 0.75,
    spinZ: 1.00,

    microX: 6,
    microY: 16,

    phase: 6.8,

    motionType: 2,
  },

  q: {
    x: 498.7,
    y: 13.01,
    width: 224,
    rotation: -6,

    flightX: 1000,
    flightY: 80,

    rotateX: 300,
    rotateY: 380,
    rotateZ: -500,

    depth: 1.0,

    spinX: 0.90,
    spinY: 1.20,
    spinZ: 1.30,

    microX: 12,
    microY: 5,

    phase: 8.1,

    motionType: 0,
  },

  qBase: {
    x: 592.88,
    y: 187.1,
    width: 150,
    rotation: 0,

    flightX: 900,
    flightY: 750,

    rotateX: -320,
    rotateY: 280,
    rotateZ: 460,

    depth: 1.25,

    spinX: 1.10,
    spinY: 0.90,
    spinZ: 1.20,

    microX: 9,
    microY: 9,

    phase: 9.6,

    motionType: 0,
  },
}

/* ============================================================
   MATH
   ============================================================ */

function clamp(value: number) {
  return Math.max(
    0,
    Math.min(1, value),
  )
}

function easeIn(value: number) {
  const t = clamp(value)

  return t * t * t
}

function easeOut(value: number) {
  const t = clamp(value)

  return (
    1 -
    Math.pow(
      1 - t,
      3,
    )
  )
}

function easeInOut(value: number) {
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
 * Approved flight curve.
 */
function flightCurve(
  value: number,
) {
  const t = clamp(value)

  return (
    0.08 * t +
    0.92 *
      Math.pow(
        t,
        1.72,
      )
  )
}

/* ============================================================
   HERO
   ============================================================ */

export function Hero() {
  const { open } =
    useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const stageWrapperRef =
    useRef<HTMLDivElement>(null)

  const [progress, setProgress] =
    useState(0)

  const [stageScale, setStageScale] =
    useState(1)

  /* ==========================================================
     RESPONSIVE STAGE
     ========================================================== */

  useEffect(() => {
    const wrapper =
      stageWrapperRef.current

    if (!wrapper) return

    const updateScale = () => {
      const availableWidth =
        wrapper.getBoundingClientRect()
          .width

      const scale = Math.min(
        1,
        availableWidth /
          STAGE_WIDTH,
      )

      setStageScale(scale)
    }

    updateScale()

    const observer =
      new ResizeObserver(
        updateScale,
      )

    observer.observe(wrapper)

    window.addEventListener(
      'resize',
      updateScale,
    )

    return () => {
      observer.disconnect()

      window.removeEventListener(
        'resize',
        updateScale,
      )
    }
  }, [])

  /* ==========================================================
     SCROLL PROGRESS
     ========================================================== */

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

      setProgress(
        clamp(
          -rect.top /
            distance,
        ),
      )
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
      {
        passive: true,
      },
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
        window.cancelAnimationFrame(
          raf,
        )
      }
    }
  }, [])

  /* ==========================================================
     TOR'Q TIMELINE
     ========================================================== */

  /*
   * Logo disappears immediately with scroll.
   */
  const logoFade =
    easeInOut(
      progress / 0.30,
    )

  const logoOpacity =
    1 - logoFade

  /*
   * Smooth opening state.
   */
  const releaseProgress =
    easeInOut(
      progress / 0.30,
    )

  const release =
    INITIAL_RELEASE +
    (
      1 -
      INITIAL_RELEASE
    ) *
      releaseProgress

  /*
   * Mechanical explosion.
   *
   * Begins from ZERO.
   */
  const explosion =
    easeInOut(
      progress / 0.78,
    )

  /* ==========================================================
     MUSTANG REVEAL
     ========================================================== */

  /*
   * The Mustang begins appearing BEFORE the final
   * mechanical pieces have completely disappeared.
   *
   * This creates the feeling that the car was sitting
   * inside the darkness behind the TOR'Q.
   */
  const mustangProgress =
    easeInOut(
      (progress - 0.28) /
        0.48,
    )

  /*
   * Very dark beginning.
   */
  const mustangOpacity =
    mustangProgress

  /*
   * The car physically appears to reverse toward
   * the camera.
   *
   * It begins smaller and farther away.
   */
  const mustangScale =
    0.72 +
    mustangProgress *
      0.34

  /*
   * Tiny vertical movement gives the impression
   * of the car approaching rather than a flat
   * background simply fading in.
   */
  const mustangY =
    18 -
    mustangProgress *
      18

  /*
   * Slight blur while distant.
   */
  const mustangBlur =
    (1 -
      mustangProgress) *
    4

  /*
   * Dark-to-visible atmospheric treatment.
   */
  const mustangBrightness =
    0.45 +
    mustangProgress *
      0.55

  const mustangContrast =
    0.95 +
    mustangProgress *
      0.12

  /* ==========================================================
     BRAKE LIGHT GLOW
     ========================================================== */

  /*
   * Brake lights begin weakly and bloom as the Mustang
   * approaches.
   */
  const brakeGlow =
    easeOut(
      (progress - 0.36) /
        0.28,
    )

  /*
   * A secondary pulse gives the lights a sense of
   * intensity rather than a simple opacity fade.
   */
  const brakePulse =
    0.82 +
    Math.sin(
      brakeGlow *
        Math.PI *
        2,
    ) *
      0.08

  const finalBrakeGlow =
    brakeGlow *
    brakePulse

  /* ==========================================================
     ATMOSPHERE
     ========================================================== */

  const atmosphereOpacity =
    easeOut(
      (progress - 0.32) /
        0.32,
    )

  /*
   * Final red illumination.
   */
  const redWashOpacity =
    easeOut(
      (progress - 0.40) /
        0.30,
    ) *
    0.28

  /* ==========================================================
     INTRO TEXT
     ========================================================== */

  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.10,
    )

  const scrollOpacity =
    1 -
    easeOut(
      progress / 0.14,
    )

  /* ==========================================================
     HERO HEADLINE
     ========================================================== */

  /*
   * The headline starts while the Mustang is still
   * approaching.
   */
  const headlineProgress =
    easeInOut(
      (progress - 0.61) /
        0.25,
    )

  const headlineOpacity =
    headlineProgress

  const headlineY =
    60 -
    headlineProgress *
      60

  const headlineScale =
    0.94 +
    headlineProgress *
      0.06

  const headlineX =
    -24 +
    headlineProgress *
      24

  /* ==========================================================
     HEADLINE KICKER
     ========================================================== */

  const kickerProgress =
    easeOut(
      (progress - 0.66) /
        0.16,
    )

  /* ==========================================================
     DETAILS
     ========================================================== */

  const detailProgress =
    easeInOut(
      (progress - 0.72) /
        0.18,
    )

  const detailOpacity =
    detailProgress

  const detailY =
    22 -
    detailProgress *
      22

  /* ==========================================================
     LOWER CONTENT
     ========================================================== */

  const lowerProgress =
    easeOut(
      (progress - 0.79) /
        0.16,
    )

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        h-[190vh]
        bg-black
      "
    >
      {/* ======================================================
          STICKY CINEMATIC STAGE
          ====================================================== */}

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
            '1100px',

          perspectiveOrigin:
            '50% 50%',
        }}
      >

        {/* ====================================================
            MUSTANG BACKGROUND
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            overflow-hidden
          "
          style={{
            opacity:
              mustangOpacity,
          }}
        >
          <img
            src={MUSTANG_SRC}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
            style={{
              transform: `
                translate3d(
                  0,
                  ${mustangY}px,
                  0
                )
                scale(
                  ${mustangScale}
                )
              `,

              transformOrigin:
                'center 72%',

              filter: `
                brightness(
                  ${mustangBrightness}
                )
                contrast(
                  ${mustangContrast}
                )
                blur(
                  ${mustangBlur}px
                )
              `,

              willChange:
                'transform, filter, opacity',
            }}
          />

          {/* ==================================================
              DARK ATMOSPHERE
              ================================================== */}

          <div
            className="
              absolute
              inset-0
            "
            style={{
              opacity:
                atmosphereOpacity,

              background: `
                linear-gradient(
                  to bottom,
                  rgba(0,0,0,0.72),
                  rgba(0,0,0,0.20) 48%,
                  rgba(0,0,0,0.80)
                )
              `,
            }}
          />

          {/* ==================================================
              RED BRAKE-LIGHT ILLUMINATION

              Two concentrated red pools imitate light
              spilling from the Mustang's rear lamps.
              ================================================== */}

          <div
            className="
              absolute
              inset-0
            "
            style={{
              opacity:
                finalBrakeGlow,

              mixBlendMode:
                'screen',

              background: `
                radial-gradient(
                  ellipse 15% 10%
                  at 36% 63%,
                  rgba(
                    255,
                    30,
                    20,
                    0.82
                  ),
                  rgba(
                    255,
                    20,
                    10,
                    0.28
                  ) 38%,
                  transparent 72%
                ),

                radial-gradient(
                  ellipse 15% 10%
                  at 64% 63%,
                  rgba(
                    255,
                    30,
                    20,
                    0.82
                  ),
                  rgba(
                    255,
                    20,
                    10,
                    0.28
                  ) 38%,
                  transparent 72%
                ),

                radial-gradient(
                  ellipse 70% 55%
                  at 50% 67%,
                  rgba(
                    255,
                    20,
                    10,
                    0.18
                  ),
                  transparent 70%
                )
              `,

              transform:
                `scale(
                  ${0.88 +
                    brakeGlow *
                      0.16}
                )`,

              transformOrigin:
                'center center',

              willChange:
                'opacity, transform',
            }}
          />

          {/* ==================================================
              LOW RED REFLECTION
              ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[55%]
            "
            style={{
              opacity:
                redWashOpacity,

              background: `
                radial-gradient(
                  ellipse at 50% 100%,
                  rgba(
                    255,
                    20,
                    10,
                    0.42
                  ),
                  transparent 68%
                )
              `,

              mixBlendMode:
                'screen',
            }}
          />

          {/* ==================================================
              CINEMATIC VIGNETTE
              ================================================== */}

          <div
            className="
              absolute
              inset-0
            "
            style={{
              background: `
                radial-gradient(
                  ellipse at center,
                  transparent 25%,
                  rgba(
                    0,
                    0,
                    0,
                    0.72
                  ) 100%
                )
              `,
            }}
          />
        </div>

        {/* ====================================================
            HERO CONTENT

            The Mustang is now the background.

            Everything below sits above it.
            ==================================================== */}

        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-full
              w-full
              max-w-7xl
              items-center
              px-6
              sm:px-8
              lg:px-10
            "
          >
            <div
              className="
                w-full
                max-w-5xl
              "
            >

              {/* =================================================
                  KICKER
                  ================================================= */}

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                  sm:mb-7
                "
                style={{
                  opacity:
                    kickerProgress,

                  transform: `
                    translate3d(
                      ${headlineX}px,
                      0,
                      0
                    )
                  `,

                  willChange:
                    'transform, opacity',
                }}
              >
                <div
                  className="
                    h-px
                    w-8
                    bg-red-500
                    sm:w-12
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.38em]
                    text-white/65
                    sm:text-xs
                  "
                >
                  TOR&apos;Q 2026
                </span>
              </div>

              {/* =================================================
                  HEADLINE
                  ================================================= */}

              <div
                className="
                  overflow-hidden
                "
              >
                <h1
                  className="
                    max-w-5xl
                    font-black
                    uppercase
                    leading-[0.84]
                    tracking-[-0.055em]
                    text-white
                    text-[3rem]
                    sm:text-6xl
                    md:text-7xl
                    lg:text-[6.5rem]
                  "
                  style={{
                    opacity:
                      headlineOpacity,

                    transform: `
                      translate3d(
                        ${headlineX}px,
                        ${headlineY}px,
                        0
                      )
                      scale(
                        ${headlineScale}
                      )
                    `,

                    transformOrigin:
                      'left center',

                    textShadow: `
                      0 4px 30px
                      rgba(
                        0,
                        0,
                        0,
                        0.55
                      )
                    `,

                    willChange:
                      'transform, opacity',
                  }}
                >
                  <span className="block">
                    AFRICA&apos;S BIGGEST
                  </span>

                  <span
                    className="
                      block
                      text-red-500
                    "
                  >
                    MOTORSPORT
                  </span>

                  <span className="block">
                    SPECTACLE
                  </span>
                </h1>
              </div>

              {/* =================================================
                  DETAILS
                  ================================================= */}

              <div
                style={{
                  opacity:
                    detailOpacity,

                  transform: `
                    translate3d(
                      0,
                      ${detailY}px,
                      0
                    )
                  `,

                  willChange:
                    'transform, opacity',
                }}
              >
                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-[14px]
                    leading-[1.55]
                    text-white/75
                    sm:mt-7
                    sm:text-lg
                    sm:leading-8
                    md:text-xl
                  "
                >
                  A cinematic celebration of
                  performance, sound and
                  precision where drifting
                  legends, stunt riders,
                  performance cars and
                  motorsport culture come
                  together for one
                  unforgettable experience.
                </p>

                {/* =============================================
                    CTA
                    ============================================= */}

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
                      shadow-[0_0_35px_rgba(220,38,38,0.25)]
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
                      text-white/75
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
              </div>

              {/* =================================================
                  STATS
                  ================================================= */}

              <div
                className="
                  mt-7
                  grid
                  grid-cols-4
                  gap-3
                  border-t
                  border-white/15
                  pt-6
                  sm:mt-9
                  sm:gap-6
                  sm:pt-7
                "
                style={{
                  opacity:
                    lowerProgress,

                  transform: `
                    translate3d(
                      0,
                      ${(1 -
                        lowerProgress) *
                        14}px,
                      0
                    )
                  `,

                  willChange:
                    'transform, opacity',
                }}
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

              {/* =================================================
                  COUNTDOWN
                  ================================================= */}

              <div
                className="
                  mt-6
                  sm:mt-9
                "
                style={{
                  opacity:
                    lowerProgress,

                  transform: `
                    translate3d(
                      0,
                      ${(1 -
                        lowerProgress) *
                        12}px,
                      0
                    )
                  `,

                  willChange:
                    'transform, opacity',
                }}
              >
                <p
                  className="
                    mb-3
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-white/50
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

        {/* ====================================================
            TOR'Q INTRO / MECHANICAL STAGE

            Z-INDEX 40

            Pieces remain above the Mustang AND headline.
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-40
            flex
            items-center
            justify-center
          "
          style={{
            perspective:
              '1100px',

            perspectiveOrigin:
              '50% 50%',
          }}
        >
          <div
            className="
              flex
              w-full
              flex-col
              items-center
            "
          >

            {/* =================================================
                WELCOME
                ================================================= */}

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
              "
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

            {/* =================================================
                MASTER STAGE
                ================================================= */}

            <div
              ref={stageWrapperRef}
              className="
                relative
                w-[94vw]
                max-w-[790px]
              "
              style={{
                aspectRatio:
                  `${STAGE_WIDTH}/${STAGE_HEIGHT}`,
              }}
            >
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                "
                style={{
                  width:
                    `${STAGE_WIDTH}px`,

                  height:
                    `${STAGE_HEIGHT}px`,

                  transform: `
                    translate(-50%, -50%)
                    scale(${stageScale})
                  `,

                  transformOrigin:
                    'center center',

                  transformStyle:
                    'preserve-3d',
                }}
              >

                {/* =================================================
                    INTACT LOGO
                    ================================================= */}

                <img
                  src="/images/torq-components/torq-logo-intact-reference.png"
                  alt="TOR'Q"
                  draggable={false}
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-full
                  "
                  style={{
                    objectFit:
                      'fill',

                    opacity:
                      logoOpacity,

                    transform: `
                      translate3d(
                        0,
                        ${release * 2}px,
                        ${release * -8}px
                      )
                    `,

                    transformOrigin:
                      'center center',

                    zIndex: 1,

                    willChange:
                      'opacity, transform',
                  }}
                />

                {/* =================================================
                    T
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/t_section.png"
                  data={COMPONENTS.t}
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    TURBINE
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/turbine.png"
                  data={
                    COMPONENTS.turbine
                  }
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    26
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={
                    COMPONENTS.number26
                  }
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    R
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_section.png"
                  data={COMPONENTS.r}
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    R LOWER
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  data={
                    COMPONENTS.rLower
                  }
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    PISTON
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={
                    COMPONENTS.piston
                  }
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    Q
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  data={COMPONENTS.q}
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    Q BASE
                    ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_base.png"
                  data={
                    COMPONENTS.qBase
                  }
                  release={release}
                  explosion={explosion}
                />
              </div>
            </div>

            {/* =================================================
                SCROLL PROMPT
                ================================================= */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                gap-2
                sm:mt-10
              "
              style={{
                opacity:
                  scrollOpacity,
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
                "
              >
                Scroll down to experience
                TOR&apos;Q
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
  data,
  release,
  explosion,
}: {
  src: string
  data: ComponentData
  release: number
  explosion: number
}) {
  const r = clamp(release)
  const e = clamp(explosion)

  /* ============================================================
     RELEASE
     ============================================================ */

  const releaseAmount =
    easeInOut(r)

  const lift =
    -4 *
    releaseAmount

  const releaseZ =
    16 *
    releaseAmount

  const releaseRotateX =
    data.rotateX *
    0.006 *
    releaseAmount

  const releaseRotateY =
    data.rotateY *
    0.006 *
    releaseAmount

  /* ============================================================
     FLIGHT
     ============================================================ */

  const flight =
    flightCurve(e)

  /* ============================================================
     POSITION
     ============================================================ */

  const x =
    data.x +
    data.flightX *
      flight

  const y =
    data.y +
    data.flightY *
      flight

  /* ============================================================
     DEPTH
     ============================================================ */

  const depth =
    releaseZ +
    Math.pow(
      flight,
      1.40,
    ) *
      (
        460 +
        data.depth * 180
      )

  /* ============================================================
     SCALE
     ============================================================ */

  const scale =
    1 +
    Math.pow(
      flight,
      1.65,
    ) *
      (
        0.38 +
        data.depth * 0.08
      )

  /* ============================================================
     ROTATION
     ============================================================ */

  const rotationProgress =
    Math.pow(
      flight,
      0.72,
    )

  const primaryX =
    data.rotateX *
    0.34 *
    data.spinX

  const primaryY =
    data.rotateY *
    0.34 *
    data.spinY

  const primaryZ =
    data.rotateZ *
    0.48 *
    data.spinZ

  /* ============================================================
     MECHANICAL WAVES
     ============================================================ */

  const phase =
    data.phase

  const slowWave =
    Math.sin(
      flight *
        Math.PI *
        1.35 +
        phase,
    )

  const fastWave =
    Math.sin(
      flight *
        Math.PI *
        3.1 +
        phase,
    )

  const tumbleX =
    slowWave *
    data.microX *
    flight

  const tumbleY =
    Math.cos(
      flight *
        Math.PI *
        1.55 +
        phase,
    ) *
    data.microX *
    0.75 *
    flight

  const tumbleZ =
    fastWave *
    data.microX *
    0.60 *
    flight

  /* ============================================================
     PISTON
     ============================================================ */

  let mechanicalX = 0
  let mechanicalY = 0

  if (
    data.motionType === 2
  ) {
    const pistonEnvelope =
      Math.sin(
        Math.min(
          1,
          flight * 1.35,
        ) *
          Math.PI,
      )

    mechanicalY =
      Math.sin(
        flight *
          Math.PI *
          6 +
          phase,
      ) *
      data.microY *
      pistonEnvelope

    mechanicalX =
      Math.cos(
        flight *
          Math.PI *
          3 +
          phase,
      ) *
      3 *
      pistonEnvelope
  }

  /* ============================================================
     TURBINE
     ============================================================ */

  let turbineSpin = 0

  if (
    data.motionType === 1
  ) {
    turbineSpin =
      flight *
      flight *
      70
  }

  /* ============================================================
     FINAL ROTATION
     ============================================================ */

  const rotateX =
    releaseRotateX +
    primaryX *
      rotationProgress +
    tumbleX

  const rotateY =
    releaseRotateY +
    primaryY *
      rotationProgress +
    tumbleY

  const rotateZ =
    data.rotation +
    primaryZ *
      rotationProgress +
    tumbleZ +
    turbineSpin

  /* ============================================================
     FINAL POSITION
     ============================================================ */

  const finalX =
    x +
    mechanicalX

  const finalY =
    y +
    mechanicalY

  /* ============================================================
     FADE

     Keep pieces visible long enough to pass through
     the Mustang/headline transition.
     ============================================================ */

  const fadeProgress =
    (
      flight -
      0.92
    ) /
    0.08

  const opacity =
    1 -
    easeIn(
      fadeProgress,
    )

  /* ============================================================
     MOTION BLUR
     ============================================================ */

  const blur =
    Math.pow(
      flight,
      3,
    ) *
    1.1

  /* ============================================================
     METALLIC EMPHASIS
     ============================================================ */

  const brightness =
    1 +
    flight *
    0.055

  const contrast =
    1 +
    flight *
    0.08

  /* ============================================================
     SHADOW
     ============================================================ */

  const shadowOpacity =
    Math.min(
      0.18,
      flight * 0.18,
    )

  const shadowBlur =
    5 +
    flight * 14

  const shadowX =
    -flight * 6

  const shadowY =
    flight * 8

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="
        absolute
        select-none
        object-contain
      "
      style={{
        /* ======================================================
           LOCKED GEOMETRY
           ====================================================== */

        left:
          `${finalX}px`,

        top:
          `${finalY}px`,

        width:
          `${data.width}px`,

        height:
          'auto',

        opacity,

        /* ======================================================
           CRITICAL ALIGNMENT
           ====================================================== */

        transformOrigin:
          'top left',

        transformStyle:
          'preserve-3d',

        backfaceVisibility:
          'visible',

        /* ======================================================
           3D TRANSFORM
           ====================================================== */

        transform: `
          translate3d(
            0,
            ${lift}px,
            ${depth}px
          )

          rotateX(
            ${rotateX}deg
          )

          rotateY(
            ${rotateY}deg
          )

          rotateZ(
            ${rotateZ}deg
          )

          scale(
            ${scale}
          )
        `,

        filter: `
          brightness(${brightness})
          contrast(${contrast})
          blur(${blur}px)

          drop-shadow(
            ${shadowX}px
            ${shadowY}px
            ${shadowBlur}px
            rgba(
              0,
              0,
              0,
              ${shadowOpacity}
            )
          )
        `,

        /*
         * Pieces remain above everything.
         */
        zIndex:
          40 +
          Math.round(
            depth / 40,
          ),

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
