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
   MASTER CANVAS
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
}

const COMPONENTS: Record<string, ComponentData> = {
  t: {
    x: -2.01,
    y: 34.27,
    width: 177,
    rotation: -21,
    flightX: -620,
    flightY: -260,
    rotateX: 140,
    rotateY: -120,
    rotateZ: -240,
  },

  turbine: {
    x: 128.14,
    y: 39.31,
    width: 188,
    rotation: -7,
    flightX: -420,
    flightY: 430,
    rotateX: 150,
    rotateY: -140,
    rotateZ: 220,
  },

  number26: {
    x: 247.95,
    y: 108.56,
    width: 38,
    rotation: 0,
    flightX: 40,
    flightY: -560,
    rotateX: 130,
    rotateY: 160,
    rotateZ: 220,
  },

  r: {
    x: 266.87,
    y: 32.9,
    width: 153,
    rotation: -22,
    flightX: 650,
    flightY: -180,
    rotateX: -160,
    rotateY: 130,
    rotateZ: 260,
  },

  rLower: {
    x: 313.28,
    y: 153.54,
    width: 168,
    rotation: -21,
    flightX: 480,
    flightY: 480,
    rotateX: 160,
    rotateY: -150,
    rotateZ: -280,
  },

  piston: {
    x: 423.85,
    y: 10.75,
    width: 169,
    rotation: -14,
    flightX: 420,
    flightY: -560,
    rotateX: -180,
    rotateY: 150,
    rotateZ: 280,
  },

  q: {
    x: 498.7,
    y: 13.01,
    width: 224,
    rotation: -6,
    flightX: 700,
    flightY: 40,
    rotateX: 150,
    rotateY: 180,
    rotateZ: -260,
  },

  qBase: {
    x: 592.88,
    y: 187.1,
    width: 150,
    rotation: 0,
    flightX: 520,
    flightY: 500,
    rotateX: -160,
    rotateY: 140,
    rotateZ: 240,
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

  if (t < 0.5) {
    return 4 * t * t * t
  }

  return 1 - Math.pow(-2 * t + 2, 3) / 2
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
     RESPONSIVE SCALE
  ============================================================ */

  useEffect(() => {
    const wrapper =
      stageWrapperRef.current

    if (!wrapper) return

    const updateScale = () => {
      const width =
        wrapper.getBoundingClientRect().width

      const scale =
        Math.min(
          1,
          width / STAGE_WIDTH,
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
    let frame = 0

    const update = () => {
      frame = 0

      const section =
        sectionRef.current

      if (!section) return

      const distance =
        section.offsetHeight -
        window.innerHeight

      if (distance <= 0) {
        setProgress(0)
        return
      }

      const rect =
        section.getBoundingClientRect()

      const value =
        -rect.top / distance

      setProgress(
        clamp(value),
      )
    }

    const onScroll = () => {
      if (frame) return

      frame =
        window.requestAnimationFrame(
          update,
        )
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

      if (frame) {
        window.cancelAnimationFrame(
          frame,
        )
      }
    }
  }, [])

  /* ============================================================
     TIMELINE

     0.00 - 0.12
       Logo and components fully visible.

     0.12 - 0.30
       Original logo fades away.

     0.30 - 0.36
       Brief hold.

     0.36 - 1.00
       Mechanical components explode.
  ============================================================ */

  const logoOpacity =
    1 -
    easeInOut(
      (progress - 0.12) / 0.18,
    )

  const explosion =
    easeIn(
      (progress - 0.36) / 0.64,
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

  const backgroundOpacity =
    easeOut(
      (progress - 0.42) / 0.30,
    )

  const contentOpacity =
    easeInOut(
      (progress - 0.60) / 0.25,
    )

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
          perspective: '1600px',
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

          <div className="
            absolute
            inset-0
            bg-black/65
          />

          <div className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black
            via-black/65
            to-transparent
          />

          <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/10
            to-black/50
          " />
        </div>

        {/* ======================================================
            NORMAL HERO CONTENT
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
          <div className="
            mx-auto
            flex
            h-full
            w-full
            max-w-7xl
            items-center
            px-6
            sm:px-8
            lg:px-10
          ">
            <div className="
              w-full
              max-w-5xl
            ">

              <h1 className="
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
              ">
                <span className="block">
                  AFRICA&apos;S BIGGEST
                </span>

                <span className="
                  block
                  text-red-500
                ">
                  MOTORSPORT
                </span>

                <span className="block">
                  SPECTACLE
                </span>
              </h1>

              <p className="
                mt-5
                max-w-2xl
                text-[14px]
                leading-[1.55]
                text-white/70
                sm:mt-7
                sm:text-lg
                sm:leading-8
                md:text-xl
              ">
                A cinematic celebration of
                performance, sound and precision
                where drifting legends, stunt riders,
                performance cars and motorsport
                culture come together for one
                unforgettable experience.
              </p>

              <div className="
                mt-6
                flex
                flex-col
                gap-4
                sm:mt-8
                sm:flex-row
                sm:items-center
              ">
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
                  <Ticket className="
                    mr-2
                    h-5
                    w-5
                  " />

                  REGISTER NOW
                </Button>

                <div className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white/70
                  sm:text-base
                ">
                  <MapPin className="
                    h-5
                    w-5
                    text-red-500
                  " />

                  {EVENT.location}
                </div>
              </div>

              <div className="
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
              ">
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

              <div className="
                mt-6
                sm:mt-9
              ">
                <p className="
                  mb-3
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-white/40
                ">
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
            CINEMATIC LOGO INTRO
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
        >
          <div className="
            flex
            w-full
            flex-col
            items-center
          ">

            {/* WELCOME */}

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
                RESPONSIVE STAGE
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
                  MASTER 790 × 316 CANVAS
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

                    zIndex: 1,

                    transform:
                      'translateZ(0)',

                    transformOrigin:
                      'center center',

                    willChange:
                      'opacity',
                  }}
                />

                {/* =================================================
                    MECHANICAL COMPONENTS
                ================================================= */}

                <MechanicalPiece
                  src="/images/torq-components/t_section.png"
                  data={COMPONENTS.t}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/turbine.png"
                  data={COMPONENTS.turbine}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={COMPONENTS.number26}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/r_section.png"
                  data={COMPONENTS.r}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  data={COMPONENTS.rLower}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={COMPONENTS.piston}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  data={COMPONENTS.q}
                  explosion={explosion}
                />

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
              <span className="
                whitespace-nowrap
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/45
                sm:text-[10px]
              ">
                Scroll down to experience TOR&apos;Q
              </span>

              <div className="
                flex
                flex-col
                items-center
              ">
                <div className="
                  h-7
                  w-px
                  bg-gradient-to-b
                  from-white/50
                  to-transparent
                />

                <ChevronDown className="
                  mt-1
                  h-4
                  w-4
                  animate-bounce
                  text-white/50
                " />
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
  explosion,
}: {
  src: string
  data: ComponentData
  explosion: number
}) {
  const e =
    clamp(explosion)

  /*
   * Smooth acceleration.
   */
  const travel =
    e * e * e

  /*
   * Start exactly at the registered position.
   */
  const x =
    data.x +
    data.flightX * travel

  const y =
    data.y +
    data.flightY * travel

  /*
   * Controlled camera depth.

   * Previous version used 5200px.
   * That was excessive and caused huge scaling/cropping.

   * 900px gives us depth without blowing
   * the pieces up uncontrollably.
   */
  const z =
    Math.pow(e, 1.65) * 900

  /*
   * Subtle perspective growth.
   */
  const scale =
    1 +
    Math.pow(e, 2) * 1.25

  /*
   * 3D rotation.
   */
  const rotateX =
    data.rotateX * e

  const rotateY =
    data.rotateY * e

  const rotateZ =
    data.rotation +
    data.rotateZ * e

  /*
   * Very subtle motion blur.
   */
  const blur =
    Math.pow(e, 2) * 2.5

  /*
   * Keep pieces fully visible initially.

   * Begin fading late in the journey,
   * so they disappear because they are
   * actually leaving the scene.
   */
  const fade =
    easeIn(
      (e - 0.72) / 0.28,
    )

  const opacity =
    1 - fade

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
          Math.round(z / 20),

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
      <p className="
        text-2xl
        font-black
        leading-none
        text-white
        sm:text-4xl
      ">
        {value}
      </p>

      <p className="
        mt-2
        max-w-[120px]
        text-[7px]
        uppercase
        tracking-[0.18em]
        text-white/45
        sm:text-[10px]
        sm:tracking-[0.2em]
      ">
        {label}
      </p>
    </div>
  )
}
