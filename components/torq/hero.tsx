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
   TOR'Q MASTER ARTBOARD

   THESE VALUES ARE LOCKED.
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

  depth: number
}

/* ============================================================
   LOCKED REGISTRATION POSITIONS

   DO NOT CHANGE THESE VALUES.
============================================================ */

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
    depth: 1.0,
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
  },
}

/* ============================================================
   MATH HELPERS
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
    : 1 -
        Math.pow(
          -2 * t + 2,
          3,
        ) /
          2
}

/*
 * Cinematic acceleration.
 *
 * Starts immediately, but very subtly.
 * Then progressively gains momentum.
 */
function flightCurve(value: number) {
  const t = clamp(value)

  return (
    0.08 * t +
    0.92 * Math.pow(t, 1.72)
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
     RESPONSIVE ARTBOARD SCALE

     The artwork ALWAYS remains 790 × 316.
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

     Progress starts at EXACTLY zero.
     There is no intentional delay.
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

      const next =
        clamp(
          -rect.top / distance,
        )

      setProgress(next)
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
     MASTER ANIMATION TIMELINE

     0.00
     ----------------------------------------------------------
     Completely assembled TOR'Q.

     The moment scrolling begins:
     - release starts
     - logo starts fading

     0.00 → 0.30
     ----------------------------------------------------------
     Logo disappears progressively.

     Components subtly detach.

     0.30 → 0.78
     ----------------------------------------------------------
     Components accelerate into 3D space.

     0.70 → 0.92
     ----------------------------------------------------------
     Hero typography takes over.
  ========================================================== */

  const logoFade =
    easeInOut(
      progress / 0.30,
    )

  const logoOpacity =
    1 - logoFade

  /*
   * IMPORTANT:
   * This begins at progress 0.
   */
  const release =
    easeInOut(
      progress / 0.30,
    )

  /*
   * Flight begins immediately too,
   * but remains tiny at the start.
   */
  const explosion =
    easeInOut(
      progress / 0.78,
    )

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
     BACKGROUND
  ========================================================== */

  const backgroundOpacity =
    easeOut(
      (progress - 0.60) /
        0.20,
    )

  /* ==========================================================
     HERO CONTENT

     Comes in after the mechanical pieces have
     substantially cleared the centre.
  ========================================================== */

  const contentProgress =
    easeInOut(
      (progress - 0.70) /
        0.22,
    )

  const contentOpacity =
    contentProgress

  const contentY =
    30 -
    contentProgress * 30

  const contentScale =
    0.965 +
    contentProgress *
      0.035

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
          STICKY HERO
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
            BACKGROUND
        ==================================================== */}

        <div
          className="
            pointer-events-none
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
            draggable={false}
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
              via-black/70
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
              to-black/40
            "
          />
        </div>

        {/* ====================================================
            HERO CONTENT
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
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

            transformOrigin:
              'center center',

            willChange:
              'transform, opacity',

            paddingTop:
              'clamp(0px, 2vh, 24px)',

            paddingBottom:
              'clamp(0px, 2vh, 24px)',
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
              {/* =================================================
                  HEADLINE
              ================================================= */}

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

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

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
                performance, sound and
                precision where drifting
                legends, stunt riders,
                performance cars and
                motorsport culture come
                together for one
                unforgettable experience.
              </p>

              {/* =================================================
                  CTA
              ================================================= */}

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

              {/* =================================================
                  COUNTDOWN
              ================================================= */}

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

        {/* ====================================================
            TOR'Q INTRO / MECHANICAL LOGO
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
                WELCOME TO
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
                STAGE WRAPPER

                790 × 316 LOCKED.
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
              {/* ===============================================
                  MASTER ARTBOARD
              =============================================== */}

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
                {/* =============================================
                    INTACT LOGO
                ============================================= */}

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

                {/* =============================================
                    T
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/t_section.png"
                  data={COMPONENTS.t}
                  release={release}
                  explosion={explosion}
                />

                {/* =============================================
                    TURBINE
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/turbine.png"
                  data={COMPONENTS.turbine}
                  release={release}
                  explosion={explosion}
                />

                {/* =============================================
                    26
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={
                    COMPONENTS.number26
                  }
                  release={release}
                  explosion={explosion}
                />

                {/* =============================================
                    R
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_section.png"
                  data={COMPONENTS.r}
                  release={release}
                  explosion={explosion}
                />

                {/* =============================================
                    R LOWER
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  data={COMPONENTS.rLower}
                  release={release}
                  explosion={explosion}
                />

                {/* =============================================
                    PISTON
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={COMPONENTS.piston}
                  release={release}
                  explosion={explosion}
                />

                {/* =============================================
                    Q
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  data={COMPONENTS.q}
                  release={release}
                  explosion={explosion}
                />

                {/* =============================================
                    Q BASE
                ============================================= */}

                <MechanicalPiece
                  src="/images/torq-components/q_base.png"
                  data={COMPONENTS.qBase}
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

   THIS IS WHERE THE NEW 3D MOTION LIVES.

   IMPORTANT:
   x / y / width / starting rotation remain untouched.

   At progress = 0:

   x = registered x
   y = registered y
   scale = 1
   rotation = registered rotation
   Z = 0
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
     INITIAL RELEASE

     Starts IMMEDIATELY when scrolling begins.

     Extremely small so the original alignment remains
     visually perfect.
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
     FLIGHT CURVE
  ============================================================ */

  const flight =
    flightCurve(e)

  /* ============================================================
     POSITION

     Base coordinates remain exactly registered.
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
     Z DEPTH

     This is deliberately MUCH smaller than the previous
     implementation.

     We want depth to be visible without turning the
     component into a disappearing sliver.
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
     PERSPECTIVE SCALE

     The piece grows slightly as it moves through the
     camera space.

     This makes it feel physical instead of flat.
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

     The original rotation values are used as directional
     data, but NOT at 100%.

     This is what prevents the PNGs from becoming edge-on.
  ============================================================ */

  const rotationProgress =
    Math.pow(
      flight,
      0.72,
    )

  const rotateX =
    releaseRotateX +
    data.rotateX *
      0.34 *
      rotationProgress

  const rotateY =
    releaseRotateY +
    data.rotateY *
      0.34 *
      rotationProgress

  const rotateZ =
    data.rotation +
    data.rotateZ *
      0.48 *
      rotationProgress

  /* ============================================================
     SECONDARY TUMBLE

     Every component gets a slightly different rhythm.
  ============================================================ */

  const phase =
    (
      data.x * 0.013 +
      data.y * 0.021
    )

  const tumbleX =
    Math.sin(
      flight *
        Math.PI *
        1.55 +
        phase,
    ) *
    9 *
    flight

  const tumbleY =
    Math.cos(
      flight *
        Math.PI *
        1.25 +
        phase,
    ) *
    8 *
    flight

  const tumbleZ =
    Math.sin(
      flight *
        Math.PI *
        1.10 +
        phase,
    ) *
    7 *
    flight

  /* ============================================================
     FADE

     Stay visible for most of the journey.
  ============================================================ */

  const fadeProgress =
    (flight - 0.88) /
    0.12

  const opacity =
    1 -
    easeIn(
      fadeProgress,
    )

  /* ============================================================
     VERY SUBTLE MOTION BLUR
  ============================================================ */

  const blur =
    Math.pow(
      flight,
      3,
    ) *
    1.1

  /* ============================================================
     DEPTH SHADOW
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
           LOCKED POSITION SYSTEM
        ====================================================== */

        left:
          `${x}px`,

        top:
          `${y}px`,

        width:
          `${data.width}px`,

        height:
          'auto',

        opacity,

        /* ======================================================
           CRITICAL:

           THIS MUST STAY TOP LEFT.

           Changing this will break the alignment.
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
            ${rotateX + tumbleX}deg
          )

          rotateY(
            ${rotateY + tumbleY}deg
          )

          rotateZ(
            ${rotateZ + tumbleZ}deg
          )

          scale(
            ${scale}
          )
        `,

        /* ======================================================
           SUBTLE DEPTH EFFECT
        ====================================================== */

        filter: `
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

        /* ======================================================
           DEPTH ORDER

           Higher Z pieces visually sit closer to camera.
        ====================================================== */

        zIndex:
          10 +
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
