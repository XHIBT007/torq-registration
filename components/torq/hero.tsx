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

   DO NOT CHANGE THESE.
   These are the coordinates registered against the logo.
============================================================ */

const STAGE_WIDTH = 790
const STAGE_HEIGHT = 316

/* ============================================================
   REGISTERED COMPONENT DATA

   The x / y / width / rotation values are LOCKED.

   flightX / flightY are only used AFTER the logo disappears.
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

  const sectionRef =
    useRef<HTMLElement>(null)

  const stageWrapperRef =
    useRef<HTMLDivElement>(null)

  const [progress, setProgress] =
    useState(0)

  const [stageScale, setStageScale] =
    useState(1)

  /* ============================================================
     RESPONSIVE STAGE SCALE

     The artwork remains 790 × 316.
     Mobile only scales the entire artboard.
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
     CINEMATIC TIMELINE

     0.00 → 0.12
     Completely static.

     0.12 → 0.34
     TOR'Q logo fades.
     Components make tiny "release" movements.

     0.34 → 0.42
     Logo is gone.
     Components are now free.

     0.42 → 0.82
     Strong 3D disintegration / flight.

     0.68 → 1.00
     Main hero content comes in.
  ============================================================ */

  const logoFade =
    easeInOut(
      (progress - 0.12) / 0.22,
    )

  const logoOpacity =
    1 - logoFade

  /*
   * IMPORTANT:
   *
   * releaseProgress starts at exactly the same time
   * as the logo begins fading.
   *
   * But the movement is extremely subtle.
   */
  const releaseProgress =
    easeInOut(
      (progress - 0.12) / 0.24,
    )

  /*
   * Strong flight DOES NOT begin until the logo
   * has essentially disappeared.
   */
  const flightProgress =
    easeIn(
      (progress - 0.36) / 0.58,
    )

  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.12,
    )

  const scrollOpacity =
    1 -
    easeOut(
      progress / 0.14,
    )

  /*
   * Bring the main hero in after the mechanical
   * sequence has opened the screen.
   */
  const contentOpacity =
    easeInOut(
      (progress - 0.68) / 0.22,
    )

  const backgroundOpacity =
    easeInOut(
      (progress - 0.52) / 0.30,
    )

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        h-[180vh]
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
          perspectiveOrigin: '50% 50%',
        }}
      >

        {/* ======================================================
            BACKGROUND
        ====================================================== */}

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

            This comes in AFTER the logo sequence.
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
                STAGE WRAPPER

                The wrapper is responsive.

                The actual artboard remains exactly 790 × 316.
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
                  MASTER ARTBOARD

                  NOTHING IN HERE IS RESPONSIVE.

                  This protects the registration coordinates.
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

                  perspective:
                    '1800px',

                  perspectiveOrigin:
                    '50% 50%',
                }}
              >

                {/* =================================================
                    ORIGINAL TOR'Q LOGO

                    ALWAYS BEHIND THE COMPONENTS.

                    This is the visual anchor.
                ================================================= */}

                <img
                  src="/images/torq-components/torq-logo-intact-reference.png"
                  alt="TOR'Q"
                  draggable={false}
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-full
                    w-full
                    select-none
                  "
                  style={{
                    objectFit:
                      'fill',

                    opacity:
                      logoOpacity,

                    transform:
                      'translate3d(0, 0, 0)',

                    transformOrigin:
                      'center center',

                    zIndex: 1,

                    willChange:
                      'opacity',
                  }}
                />

                {/* =================================================
                    COMPONENTS

                    All registered coordinates remain untouched.
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/t_section.png"
                  data={COMPONENTS.t}
                  release={releaseProgress}
                  flight={flightProgress}
                />

                <MechanicalPiece
                  src="/images/torq-components/turbine.png"
                  data={COMPONENTS.turbine}
                  release={releaseProgress}
                  flight={flightProgress}
                />

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={COMPONENTS.number26}
                  release={releaseProgress}
                  flight={flightProgress}
                />

                <MechanicalPiece
                  src="/images/torq-components/r_section.png"
                  data={COMPONENTS.r}
                  release={releaseProgress}
                  flight={flightProgress}
                />

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  data={COMPONENTS.rLower}
                  release={releaseProgress}
                  flight={flightProgress}
                />

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={COMPONENTS.piston}
                  release={releaseProgress}
                  flight={flightProgress}
                />

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  data={COMPONENTS.q}
                  release={releaseProgress}
                  flight={flightProgress}
                />

                <MechanicalPiece
                  src="/images/torq-components/q_base.png"
                  data={COMPONENTS.qBase}
                  release={releaseProgress}
                  flight={flightProgress}
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

   release = subtle movement while logo disappears.

   flight = dramatic 3D movement AFTER logo disappearance.

   The registered x/y/width/rotation values NEVER change.
================================================================ */

function MechanicalPiece({
  src,
  data,
  release,
  flight,
}: {
  src: string
  data: ComponentData
  release: number
  flight: number
}) {
  const r =
    clamp(release)

  const f =
    clamp(flight)

  /* ============================================================
     SUBTLE RELEASE

     This is intentionally tiny.

     It should feel as though the pieces were physically
     holding the logo and are beginning to lift away from it.
  ============================================================ */

  const releaseAmount =
    Math.pow(r, 2.4)

  const releaseX =
    data.flightX *
    0.025 *
    releaseAmount

  const releaseY =
    data.flightY *
    0.025 *
    releaseAmount

  const releaseZ =
    70 *
    releaseAmount

  const releaseRotate =
    data.rotateZ *
    0.035 *
    releaseAmount

  /* ============================================================
     3D FLIGHT

     The pieces don't simply slide.

     They move:
     - sideways
     - vertically
     - toward the camera
     - while rotating around X/Y/Z axes
  ============================================================ */

  const flightAmount =
    Math.pow(f, 1.35)

  const x =
    data.x +
    releaseX +
    data.flightX *
    flightAmount

  const y =
    data.y +
    releaseY +
    data.flightY *
    flightAmount

  /*
   * Positive Z brings the mechanical piece
   * toward the camera.
   */
  const z =
    1200 *
    Math.pow(f, 1.65)

  /*
   * Controlled enlargement as the piece approaches.
   *
   * This is deliberately much smaller than the
   * previous 4–5× scaling so the pieces don't
   * immediately fill the screen.
   */
  const scale =
    1 +
    1.35 *
    Math.pow(f, 1.7)

  /* ============================================================
     3D ROTATION
  ============================================================ */

  const rotateX =
    data.rotateX *
    flightAmount

  const rotateY =
    data.rotateY *
    flightAmount

  const rotateZ =
    data.rotation +
    releaseRotate +
    data.rotateZ *
    flightAmount

  /* ============================================================
     MOTION BLUR

     Kept subtle so the metal remains sharp.
  ============================================================ */

  const blur =
    Math.min(
      3,
      Math.pow(f, 2) * 3,
    )

  /* ============================================================
     FADE

     Pieces remain visible for most of their flight.
     They only begin disappearing near the end.
  ============================================================ */

  const fade =
    easeIn(
      (f - 0.72) / 0.28,
    )

  const opacity =
    1 - fade

  /* ============================================================
     Z-INDEX

     Flying pieces can come in front of one another,
     creating a stronger 3D feeling.
  ============================================================ */

  const zIndex =
    10 +
    Math.round(
      z / 30,
    )

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="
        pointer-events-none
        absolute
        select-none
        object-contain
      "
      style={{
        /* ======================================================
           LOCKED REGISTRATION POSITION
        ====================================================== */

        left:
          `${x}px`,

        top:
          `${y}px`,

        width:
          `${data.width}px`,

        height:
          'auto',

        /* ======================================================
           OPACITY
        ====================================================== */

        opacity,

        /* ======================================================
           TRUE 3D TRANSFORMATION
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

          rotateX(${rotateX}deg)

          rotateY(${rotateY}deg)

          rotateZ(${rotateZ}deg)

          scale(${scale})
        `,

        /* ======================================================
           MOTION BLUR
        ====================================================== */

        filter:
          blur > 0
            ? `blur(${blur}px)`
            : 'none',

        /* ======================================================
           DEPTH
        ====================================================== */

        zIndex,

        /* ======================================================
           PERFORMANCE
        ====================================================== */

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
    <div
      className="
        min-w-0
      "
    >
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
