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
   REGISTERED COMPONENT POSITIONS
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
  },
}

/* ============================================================
   EASING
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
  Softer cinematic motion.

  Starts immediately but accelerates smoothly.
*/
function cinematicMotion(value: number) {
  const t = clamp(value)

  return 1 - Math.pow(1 - t, 2.4)
}

/* ============================================================
   HERO
============================================================ */

export function Hero() {
  const { open } = useRegistration()

  const sectionRef = useRef<HTMLElement>(null)
  const stageWrapperRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)
  const [stageScale, setStageScale] = useState(1)

  /* ============================================================
     RESPONSIVE STAGE
  ============================================================ */

  useEffect(() => {
    const wrapper = stageWrapperRef.current

    if (!wrapper) return

    const updateScale = () => {
      const availableWidth =
        wrapper.getBoundingClientRect().width

      const scale = Math.min(
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
     CINEMATIC TIMELINE

     0.00 → 0.12
       Logo and components are completely assembled.

     0.12
       LOGO FADING BEGINS.

       DISINTEGRATION ALSO BEGINS HERE.

     0.12 → 0.32
       Logo disappears while pieces begin separating.

     0.12 → 0.88
       Components continuously accelerate toward camera.

     0.72 → 1.00
       Main hero headline enters.
  ============================================================ */

  /* ------------------------------------------------------------
     LOGO
  ------------------------------------------------------------ */

  const logoOpacity =
    1 -
    easeInOut(
      (progress - 0.12) / 0.20,
    )

  /* ------------------------------------------------------------
     DISINTEGRATION

     IMPORTANT:

     This starts at EXACTLY 0.12.

     There is no pause after the logo starts fading.
  ------------------------------------------------------------ */

  const explosion =
    cinematicMotion(
      (progress - 0.12) / 0.76,
    )

  /* ------------------------------------------------------------
     WELCOME TEXT
  ------------------------------------------------------------ */

  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.13,
    )

  /* ------------------------------------------------------------
     SCROLL PROMPT
  ------------------------------------------------------------ */

  const scrollOpacity =
    1 -
    easeOut(
      progress / 0.16,
    )

  /* ------------------------------------------------------------
     BACKGROUND

     Starts arriving as the TOR'Q intro is leaving.
  ------------------------------------------------------------ */

  const backgroundOpacity =
    easeOut(
      (progress - 0.42) / 0.30,
    )

  /* ------------------------------------------------------------
     MAIN HERO ENTRANCE

     Starts AFTER the mechanical explosion.

     The headline:
     - fades in
     - rises
     - scales slightly
     - sharpens from blur
  ------------------------------------------------------------ */

  const contentProgress =
    easeOut(
      (progress - 0.70) / 0.25,
    )

  const contentOpacity =
    contentProgress

  const contentY =
    (1 - contentProgress) * 90

  const contentScale =
    0.94 +
    contentProgress * 0.06

  const contentBlur =
    (1 - contentProgress) * 12

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[170vh] bg-black"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden bg-black"
        style={{
          perspective: '1800px',
        }}
      >

        {/* ======================================================
            BACKGROUND
        ====================================================== */}

        <div
          className="absolute inset-0"
          style={{
            opacity:
              backgroundOpacity,
          }}
        >
          <img
            src="/images/hero-drift-red-mustang.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
        </div>

        {/* ======================================================
            MAIN HERO CONTENT

            This enters AFTER the TOR'Q mechanical explosion.
        ====================================================== */}

        <div
          className="absolute inset-0 z-10"
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
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 sm:px-8 lg:px-10">
            <div className="w-full max-w-5xl">

              <h1 className="max-w-5xl font-black uppercase leading-[0.86] tracking-[-0.045em] text-white text-[3rem] sm:text-6xl md:text-7xl lg:text-[6.5rem]">

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

              <p className="mt-5 max-w-2xl text-[14px] leading-[1.55] text-white/70 sm:mt-7 sm:text-lg sm:leading-8 md:text-xl">
                A cinematic celebration of
                performance, sound and precision
                where drifting legends, stunt riders,
                performance cars and motorsport
                culture come together for one
                unforgettable experience.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">

                <Button
                  size="lg"
                  onClick={open}
                  className="h-12 w-full rounded-full bg-red-600 px-7 text-sm font-bold text-white hover:bg-red-500 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  REGISTER NOW
                </Button>

                <div className="flex items-center gap-2 text-sm text-white/70 sm:text-base">
                  <MapPin className="h-5 w-5 text-red-500" />
                  {EVENT.location}
                </div>

              </div>

              <div className="mt-7 grid grid-cols-4 gap-3 border-t border-white/10 pt-6 sm:mt-9 sm:gap-6 sm:pt-7">

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

              <div className="mt-6 sm:mt-9">

                <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-white/40">
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
            TOR'Q CINEMATIC INTRO
        ====================================================== */}

        <div
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
          style={{
            perspective:
              '1800px',
          }}
        >

          <div className="flex w-full flex-col items-center">

            {/* ==================================================
                WELCOME
            ================================================== */}

            <p
              className="mb-5 text-[9px] font-semibold uppercase tracking-[0.48em] text-white/50 sm:mb-6 sm:text-xs"
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
              className="relative w-[94vw] max-w-[790px]"
              style={{
                aspectRatio:
                  `${STAGE_WIDTH}/${STAGE_HEIGHT}`,
              }}
            >

              <div
                className="absolute left-1/2 top-1/2"
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

                    This is behind the components.

                    It begins fading at EXACTLY the same moment
                    the mechanical disintegration begins.
                ================================================= */}

                <img
                  src="/images/torq-components/torq-logo-intact-reference.png"
                  alt="TOR'Q"
                  draggable={false}
                  className="absolute left-0 top-0 h-full w-full"
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
                  explosion={explosion}
                />

                {/* =================================================
                    TURBINE
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/turbine.png"
                  data={COMPONENTS.turbine}
                  explosion={explosion}
                />

                {/* =================================================
                    26
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={COMPONENTS.number26}
                  explosion={explosion}
                />

                {/* =================================================
                    R
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_section.png"
                  data={COMPONENTS.r}
                  explosion={explosion}
                />

                {/* =================================================
                    R LOWER
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  data={COMPONENTS.rLower}
                  explosion={explosion}
                />

                {/* =================================================
                    PISTON
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={COMPONENTS.piston}
                  explosion={explosion}
                />

                {/* =================================================
                    Q
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  data={COMPONENTS.q}
                  explosion={explosion}
                />

                {/* =================================================
                    Q BASE
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_base.png"
                  data={COMPONENTS.qBase}
                  explosion={explosion}
                />

              </div>
            </div>

            {/* ==================================================
                SCROLL PROMPT
            ================================================== */}

            <div
              className="mt-8 flex flex-col items-center gap-2 sm:mt-10"
              style={{
                opacity:
                  scrollOpacity,
              }}
            >

              <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.3em] text-white/45 sm:text-[10px]">
                Scroll down to experience TOR&apos;Q
              </span>

              <div className="flex flex-col items-center">

                <div className="h-7 w-px bg-gradient-to-b from-white/50 to-transparent" />

                <ChevronDown className="mt-1 h-4 w-4 animate-bounce text-white/50" />

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

   The component starts exactly on the registered logo position.

   The moment the logo starts fading, the piece starts moving.

   Motion:
   - immediate
   - smooth acceleration
   - continuous 3D travel
   - increasing depth
   - increasing scale
   - rotation
   - gradual motion blur
   - fade occurs during the final part of the flight
================================================================ */

function MechanicalPiece({
  src,
  data,
  explosion,
}: {
  src: string
  data: ComponentData
  explosion: number
}) {
  const e =
    clamp(explosion)

  /* ------------------------------------------------------------
     Continuous flight

     The movement starts immediately at e = 0.
  ------------------------------------------------------------ */

  const travel =
    cinematicMotion(e)

  /* ------------------------------------------------------------
     POSITION
  ------------------------------------------------------------ */

  const x =
    data.x +
    data.flightX * travel

  const y =
    data.y +
    data.flightY * travel

  /* ------------------------------------------------------------
     DEPTH

     The pieces progressively come toward the camera.
  ------------------------------------------------------------ */

  const z =
    Math.pow(e, 1.65) * 5200

  /* ------------------------------------------------------------
     SCALE

     Starts at exactly 1.

     Then grows as the object approaches the camera.
  ------------------------------------------------------------ */

  const scale =
    1 +
    Math.pow(e, 1.9) * 4.8

  /* ------------------------------------------------------------
     ROTATION
  ------------------------------------------------------------ */

  const rotateX =
    data.rotateX * e

  const rotateY =
    data.rotateY * e

  const rotateZ =
    data.rotation +
    data.rotateZ * e

  /* ------------------------------------------------------------
     MOTION BLUR

     Kept subtle at first.
  ------------------------------------------------------------ */

  const blur =
    Math.pow(e, 2.4) * 5

  /* ------------------------------------------------------------
     FADE

     The object remains solid during the main flight.

     It only begins disappearing toward the end.
  ------------------------------------------------------------ */

  const fadeProgress =
    clamp(
      (e - 0.68) / 0.32,
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
      className="absolute select-none object-contain"
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

      <p className="text-2xl font-black leading-none text-white sm:text-4xl">
        {value}
      </p>

      <p className="mt-2 max-w-[120px] text-[7px] uppercase tracking-[0.18em] text-white/45 sm:text-[10px] sm:tracking-[0.2em]">
        {label}
      </p>

    </div>
  )
}
