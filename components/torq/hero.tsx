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

   DO NOT CHANGE THESE DIMENSIONS.
   These are the coordinates that correctly align the
   mechanical components with the TOR'Q logo.
============================================================ */

const STAGE_WIDTH = 790
const STAGE_HEIGHT = 316

/* ============================================================
   REGISTERED COMPONENT POSITIONS

   IMPORTANT:
   These are the proven alignment figures.
   DO NOT CHANGE x / y / width / rotation.
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
     RESPONSIVE STAGE SCALE

     The artwork always uses the same 790 × 316 coordinate
     system. Mobile only scales the complete stage.
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

    const observer = new ResizeObserver(updateScale)
    observer.observe(wrapper)

    window.addEventListener('resize', updateScale)

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

      const section = sectionRef.current

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
        raf = window.requestAnimationFrame(update)
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

     0.00 – 0.10
     ----------------
     Complete assembled TOR'Q logo.

     0.10 – 0.34
     ----------------
     Logo fades away.
     Components make a tiny "release" movement.

     0.34 – 0.42
     ----------------
     Parts begin lifting away from the logo.

     0.42 – 0.82
     ----------------
     Full 3D disintegration.

     0.82 – 1.00
     ----------------
     Africa's Biggest Motorsport Spectacle
     enters and settles into the viewport.
  ============================================================ */

  const logoFadeProgress =
    easeInOut(
      (progress - 0.10) / 0.24,
    )

  const logoOpacity =
    1 - logoFadeProgress

  /*
   * This is deliberately subtle.
   *
   * The pieces should feel like they are holding
   * the logo in place before releasing it.
   */
  const release =
  easeInOut(
    (progress - 0.10) / 0.24,
  )

  /*
   * Actual explosion begins only after the release.
   */
  const explosion =
    easeInOut(
      (progress - 0.34) / 0.58,
    )

  /*
   * Welcome disappears very early.
   */
  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.12,
    )

  /*
   * Scroll prompt disappears as the cinematic
   * sequence begins.
   */
  const scrollOpacity =
    1 -
    easeOut(
      progress / 0.15,
    )

  /*
   * Background comes in very late so it does not
   * interfere with the TOR'Q reveal.
   */
  const backgroundOpacity =
    easeOut(
      (progress - 0.72) / 0.18,
    )

  /*
   * Main hero copy appears after the pieces have
   * substantially cleared the frame.
   */
  const contentProgress =
    easeInOut(
      (progress - 0.78) / 0.20,
    )

  const contentOpacity =
    contentProgress

  const contentY =
    55 -
    contentProgress * 55

  const contentScale =
    0.94 +
    contentProgress * 0.06

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

            This now arrives AFTER the mechanical
            disintegration.
        ====================================================== */}

        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
          "
          style={{
            opacity: contentOpacity,

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

              {/* ==================================================
                  AFRICA'S BIGGEST MOTORSPORT SPECTACLE
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
            TOR'Q CINEMATIC INTRO
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
                MASTER STAGE WRAPPER
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

              {/* ==================================================
                  MASTER 790 × 316 ARTBOARD
              ================================================== */}

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

                    This stays BEHIND the parts and is 100%
                    visible at the beginning.

                    It is NOT removed until the pieces
                    start releasing it.
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
                        ${release * -12}px
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
                  data={COMPONENTS.turbine}
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    26
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={COMPONENTS.number26}
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
                  data={COMPONENTS.rLower}
                  release={release}
                  explosion={explosion}
                />

                {/* =================================================
                    PISTON
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={COMPONENTS.piston}
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
                  data={COMPONENTS.qBase}
                  release={release}
                  explosion={explosion}
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

   IMPORTANT:
   The registered x/y/width/rotation remain untouched.

   Animation has THREE stages:

   1. RELEASE
      Tiny physical lift while the logo fades.

   2. DEPTH
      Pieces move toward the camera.

   3. FLIGHT
      Pieces travel away in different directions.

   The combination of perspective + translateZ +
   rotateX + rotateY makes the PNGs feel substantially
   more dimensional.
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
     PHASE 1 — THE "HOLDING" / RELEASE

     The parts should appear to have weight.

     They remain almost completely locked to the logo while
     the logo begins fading.

     Then they gently lift away from it.

     IMPORTANT:
     This movement is intentionally small.
  ============================================================ */

  const releaseCurve =
    easeInOut(r)

  /*
   * Individual lift amount.
   *
   * Components at different depths lift slightly differently,
   * making the release feel organic rather than synchronized.
   */
  const liftAmount =
    3.5 +
    data.depth * 3.5

  const releaseY =
    -liftAmount *
    releaseCurve

  /*
   * Tiny horizontal separation during release.
   *
   * Almost imperceptible.
   */
  const releaseX =
    data.flightX *
    0.012 *
    releaseCurve

  /*
   * Tiny rotation while the pieces "let go".
   */
  const releaseRotateX =
    data.rotateX *
    0.025 *
    releaseCurve

  const releaseRotateY =
    data.rotateY *
    0.025 *
    releaseCurve

  /*
   * Very small Z movement.

   This is what gives the release a little depth instead
   of making it look like a simple 2D translation.
  */
  const releaseZ =
    28 *
    data.depth *
    releaseCurve

  /*
   * Barely noticeable scale change.
   */
  const releaseScale =
    1 +
    0.012 *
    releaseCurve

  /* ============================================================
     PHASE 2 — DISINTEGRATION

     This begins AFTER the release.

     The movement is intentionally delayed so the viewer sees
     the "logo being released" moment first.
  ============================================================ */

  const flight =
    easeInOut(e)

  /*
   * Stronger acceleration later in the sequence.
   */
  const aggressiveFlight =
    Math.pow(e, 1.55)

  /* ============================================================
     X / Y FLIGHT
  ============================================================ */

  const x =
    data.x +
    releaseX +
    data.flightX *
      aggressiveFlight

  const y =
    data.y +
    releaseY +
    data.flightY *
      aggressiveFlight

  /* ============================================================
     TRUE DEPTH
  ============================================================ */

  const z =
    releaseZ +
    Math.pow(
      flight,
      1.35,
    ) *
      (2600 * data.depth)

  /* ============================================================
     PERSPECTIVE SCALE

     Pieces get larger as they move toward the camera.
  ============================================================ */

  const perspectiveScale =
    releaseScale +
    Math.pow(
      flight,
      1.7,
    ) *
      2.8

  /* ============================================================
     3D ROTATION
  ============================================================ */

  const rotateX =
    releaseRotateX +
    data.rotateX *
      Math.pow(
        flight,
        0.9,
      )

  const rotateY =
    releaseRotateY +
    data.rotateY *
      Math.pow(
        flight,
        0.85,
      )

  const rotateZ =
    data.rotation +
    data.rotateZ *
      Math.pow(
        flight,
        0.9,
      )

  /* ============================================================
     SECONDARY MOTION

     Small organic movement once the pieces actually fly.

     This prevents everything from looking like it is following
     eight identical CSS animations.
  ============================================================ */

  const secondaryX =
    Math.sin(
      flight *
        Math.PI *
        1.3,
    ) *
    12 *
    data.depth

  const secondaryY =
    Math.cos(
      flight *
        Math.PI *
        1.1,
    ) *
    10 *
    data.depth

  /* ============================================================
     MOTION BLUR
  ============================================================ */

  const blur =
    Math.pow(
      flight,
      2.4,
    ) *
    1.8

  /* ============================================================
     FADE OUT

     Pieces remain visible for most of their flight.
  ============================================================ */

  const opacity =
    1 -
    easeIn(
      (flight - 0.82) /
        0.18,
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
        /* ======================================================
           REGISTERED POSITION

           The original alignment values remain untouched.
        ====================================================== */

        left:
          `${x + secondaryX}px`,

        top:
          `${y + secondaryY}px`,

        width:
          `${data.width}px`,

        height:
          'auto',

        /* ======================================================
           OPACITY
        ====================================================== */

        opacity,

        /* ======================================================
           3D TRANSFORMATION
        ====================================================== */

        transformOrigin:
          'center center',

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
            ${perspectiveScale}
          )
        `,

        /* ======================================================
           MOTION BLUR
        ====================================================== */

        filter:
          blur > 0
            ? `blur(${blur}px)`
            : 'none',

        /* ======================================================
           DEPTH ORDER
        ====================================================== */

        zIndex:
          10 +
          Math.round(
            z / 100,
          ),

        /* ======================================================
           PERFORMANCE
        ====================================================== */

        willChange:
          'transform, opacity, filter',

        isolation:
          'isolate',
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
