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
   MASTER TOR'Q COORDINATE SYSTEM
============================================================ */

const STAGE_WIDTH = 790
const STAGE_HEIGHT = 316

/* ============================================================
   COMPONENT DATA
============================================================ */

type ComponentData = {
  x: number
  y: number
  width: number
  rotation: number

  flightX: number
  flightY: number

  rotateX: number
  rotateY: number
  rotateZ: number

  /* Small movement while releasing the logo */
  releaseX: number
  releaseY: number
  releaseRotation: number
}

const COMPONENTS: Record<string, ComponentData> = {
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

    releaseX: -5,
    releaseY: -8,
    releaseRotation: -2,
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

    releaseX: -4,
    releaseY: -7,
    releaseRotation: 2,
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

    releaseX: 0,
    releaseY: -6,
    releaseRotation: 1,
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

    releaseX: 5,
    releaseY: -8,
    releaseRotation: -2,
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

    releaseX: 5,
    releaseY: 7,
    releaseRotation: 2,
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

    releaseX: 4,
    releaseY: -7,
    releaseRotation: -2,
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

    releaseX: 5,
    releaseY: -5,
    releaseRotation: 2,
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

    releaseX: 6,
    releaseY: 6,
    releaseRotation: -2,
  },
}

/* ============================================================
   HELPERS
============================================================ */

function clamp(value: number) {
  return Math.max(0, Math.min(1, value))
}

function easeIn(value: number) {
  const t = clamp(value)
  return t * t * t
}

function easeOut(value: number) {
  const t = clamp(value)
  return 1 - Math.pow(1 - t, 3)
}

function easeInOut(value: number) {
  const t = clamp(value)

  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/*
  Gentle movement.

  Used during the "release" phase so the pieces
  don't suddenly jump.
*/
function gentleRelease(value: number) {
  const t = clamp(value)

  return t * t * (3 - 2 * t)
}

/*
  Slow beginning → aggressive ending.

  This is deliberately NOT used until the logo
  has completely disappeared.
*/
function disintegrationEase(value: number) {
  const t = clamp(value)

  return Math.pow(t, 2.2)
}

/* ============================================================
   HERO
============================================================ */

export function Hero() {
  const { open } = useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const stageWrapperRef =
    useRef<HTMLDivElement>(null)

  const [progress, setProgress] =
    useState(0)

  const [stageScale, setStageScale] =
    useState(1)

  /* ============================================================
     RESPONSIVE MASTER STAGE
  ============================================================ */

  useEffect(() => {
    const wrapper =
      stageWrapperRef.current

    if (!wrapper) return

    const updateScale = () => {
      const availableWidth =
        wrapper.getBoundingClientRect().width

      const scale =
        Math.min(
          1,
          availableWidth / STAGE_WIDTH,
        )

      setStageScale(scale)
    }

    updateScale()

    const observer =
      new ResizeObserver(updateScale)

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

  /* ============================================================
     SCROLL PROGRESS
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

      setProgress(
        clamp(
          -rect.top / distance,
        ),
      )
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
        cancelAnimationFrame(raf)
      }
    }
  }, [])

  /* ============================================================
     PHASE 1
     
     Everything is completely static.
     
     0.00 → 0.12
  ============================================================ */

  /* ============================================================
     PHASE 2
     
     Logo fades.
     
     Parts make a tiny "release" movement.
     
     IMPORTANT:
     This is NOT the explosion.
     
     0.12 → 0.30
  ============================================================ */

  const logoFade =
    easeInOut(
      (progress - 0.12) / 0.18,
    )

  const logoOpacity =
    1 - logoFade

  const releaseProgress =
    gentleRelease(
      (progress - 0.12) / 0.18,
    )

  /* ============================================================
     PHASE 3
     
     Logo is gone.
     
     Parts now begin their actual disintegration.
     
     0.30 → 0.82
  ============================================================ */

  const disintegration =
    disintegrationEase(
      (progress - 0.30) / 0.52,
    )

  /* ============================================================
     WELCOME TEXT
  ============================================================ */

  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.15,
    )

  /* ============================================================
     SCROLL PROMPT
  ============================================================ */

  const scrollOpacity =
    1 -
    easeOut(
      progress / 0.17,
    )

  /* ============================================================
     BACKGROUND
  ============================================================ */

  const backgroundOpacity =
    easeOut(
      (progress - 0.55) / 0.25,
    )

  /* ============================================================
     MAIN HERO ENTRANCE
     
     Begins while the final pieces are leaving.
     
     This makes the transition feel like one continuous
     cinematic shot rather than separate animations.
  ============================================================ */

  const headlineProgress =
    easeOut(
      (progress - 0.70) / 0.25,
    )

  const contentOpacity =
    headlineProgress

  const contentY =
    (1 - headlineProgress) * 100

  const contentScale =
    0.92 +
    headlineProgress * 0.08

  const contentBlur =
    (1 - headlineProgress) * 14

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        h-[170vh]
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
        style={{
          perspective: '1800px',
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
              via-black/10
              to-black/50
            "
          />
        </div>

        {/* ======================================================
            MAIN HERO CONTENT
        ====================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
          "
          style={{
            opacity:
              contentOpacity,

            transform: `
              translate3d(
                0,
                ${contentY}px,
                0
              )
              scale(${contentScale})
            `,

            filter:
              contentBlur > 0
                ? `blur(${contentBlur}px)`
                : 'none',

            transformOrigin:
              'center center',

            willChange:
              'transform, opacity, filter',
          }}
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
            TOR'Q INTRO
        ====================================================== */}

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
              '1800px',
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
              "
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

            {/* ==================================================
                MASTER STAGE
            ================================================== */}

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
                    ORIGINAL TOR'Q LOGO
                   
                    It stays behind everything.

                    It does NOT start fading until 12%.

                    The components only make their small
                    release movement at the same time.
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

                    transform:
                      'translateZ(0)',

                    transformOrigin:
                      'center center',

                    zIndex:
                      1,

                    willChange:
                      'opacity',
                  }}
                />

                {/* =================================================
                    T
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/t_section.png"
                  data={COMPONENTS.t}
                  release={releaseProgress}
                  explosion={disintegration}
                />

                {/* =================================================
                    TURBINE
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/turbine.png"
                  data={COMPONENTS.turbine}
                  release={releaseProgress}
                  explosion={disintegration}
                />

                {/* =================================================
                    26
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={COMPONENTS.number26}
                  release={releaseProgress}
                  explosion={disintegration}
                />

                {/* =================================================
                    R
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_section.png"
                  data={COMPONENTS.r}
                  release={releaseProgress}
                  explosion={disintegration}
                />

                {/* =================================================
                    R LOWER
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  data={COMPONENTS.rLower}
                  release={releaseProgress}
                  explosion={disintegration}
                />

                {/* =================================================
                    PISTON
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={COMPONENTS.piston}
                  release={releaseProgress}
                  explosion={disintegration}
                />

                {/* =================================================
                    Q
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  data={COMPONENTS.q}
                  release={releaseProgress}
                  explosion={disintegration}
                />

                {/* =================================================
                    Q BASE
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_base.png"
                  data={COMPONENTS.qBase}
                  release={releaseProgress}
                  explosion={disintegration}
                />

              </div>
            </div>

            {/* ==================================================
                SCROLL PROMPT
            ================================================== */}

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

   TWO DIFFERENT MOVEMENTS:

   1. RELEASE
      Tiny physical movement while the logo fades.

      This is deliberately VERY small.

   2. EXPLOSION
      Begins ONLY after the logo is gone.

      This is the actual disintegration.
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
  const r =
    clamp(release)

  const e =
    clamp(explosion)

  /* ============================================================
     RELEASE MOVEMENT
     
     The pieces move only a few pixels.
     
     This creates the impression that they were physically
     supporting/holding the logo.
  ============================================================ */

  const releaseX =
    data.releaseX * r

  const releaseY =
    data.releaseY * r

  const releaseRotation =
    data.releaseRotation * r

  /* ============================================================
     ACTUAL DISINTEGRATION
     
     IMPORTANT:
     
     e = 0 while logo is fading.
     
     Therefore the large flight movement CANNOT happen
     during the logo fade.
  ============================================================ */

  const x =
    data.x +
    releaseX +
    data.flightX * e

  const y =
    data.y +
    releaseY +
    data.flightY * e

  /* ============================================================
     DEPTH
  ============================================================ */

  const z =
    Math.pow(e, 1.65) * 5200

  /* ============================================================
     SCALE
     
     No scale change during release.

     Scale starts only during the actual disintegration.
  ============================================================ */

  const scale =
    1 +
    Math.pow(e, 1.9) * 4.8

  /* ============================================================
     ROTATION
  ============================================================ */

  const rotateX =
    data.rotateX * e

  const rotateY =
    data.rotateY * e

  const rotateZ =
    data.rotation +
    releaseRotation +
    data.rotateZ * e

  /* ============================================================
     MOTION BLUR
     
     No blur during the release.

     Blur appears only after the disintegration starts.
  ============================================================ */

  const blur =
    Math.pow(e, 2.3) * 5

  /* ============================================================
     OPACITY
     
     Pieces remain completely visible through the release.

     They only start fading near the end of the flight.
  ============================================================ */

  const fadeProgress =
    clamp(
      (e - 0.72) / 0.28,
    )

  const opacity =
    1 -
    easeIn(
      fadeProgress,
    )

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
        left:
          `${x}px`,

        top:
          `${y}px`,

        width:
          `${data.width}px`,

        height:
          'auto',

        opacity,

        transformOrigin:
          'top left',

        transformStyle:
          'preserve-3d',

        backfaceVisibility:
          'visible',

        transform: `
          translate3d(
            0,
            0,
            ${z}px
          )

          rotateX(${rotateX}deg)

          rotateY(${rotateY}deg)

          rotateZ(${rotateZ}deg)

          scale(${scale})
        `,

        filter:
          blur > 0
            ? `blur(${blur}px)`
            : 'none',

        zIndex:
          10 +
          Math.round(z / 100),

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
