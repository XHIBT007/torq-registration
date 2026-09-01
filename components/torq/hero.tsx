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

/* =========================================================================
   TOR'Q CINEMATIC LOGO SYSTEM

   The logo stage uses the same coordinate system as the registration tool:

   790 × 316

   Layer 1:
   ORIGINAL TOR'Q LOGO
   100% visible at the beginning.

   Layer 2:
   MECHANICAL COMPONENTS
   Positioned over the original logo.

   The original logo fades away first.

   The mechanical components then become the visible TOR'Q structure
   before exploding toward the camera.
========================================================================= */

const ART_WIDTH = 790
const ART_HEIGHT = 316

type Motion = {
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

/* =========================================================================
   REGISTERED COMPONENT POSITIONS

   These are the exact values supplied from the registration page.
========================================================================= */

const COMPONENTS: Record<
  string,
  Motion
> = {
  t: {
    x: -2.01,
    y: 34.27,
    width: 177,
    rotation: -21,

    flightX: -760,
    flightY: -260,

    rotateX: 260,
    rotateY: -180,
    rotateZ: -420,
  },

  turbine: {
    x: 128.14,
    y: 39.31,
    width: 188,
    rotation: -7,

    flightX: -520,
    flightY: 520,

    rotateX: 320,
    rotateY: -240,
    rotateZ: 420,
  },

  number26: {
    x: 247.95,
    y: 108.56,
    width: 38,
    rotation: 0,

    flightX: 70,
    flightY: -760,

    rotateX: 260,
    rotateY: 360,
    rotateZ: 300,
  },

  r: {
    x: 266.87,
    y: 32.9,
    width: 153,
    rotation: -22,

    flightX: 760,
    flightY: -240,

    rotateX: -300,
    rotateY: 240,
    rotateZ: 480,
  },

  rLower: {
    x: 313.28,
    y: 153.54,
    width: 168,
    rotation: -21,

    flightX: 650,
    flightY: 620,

    rotateX: 360,
    rotateY: -280,
    rotateZ: -520,
  },

  piston: {
    x: 423.85,
    y: 10.75,
    width: 169,
    rotation: -14,

    flightX: 520,
    flightY: -760,

    rotateX: -360,
    rotateY: 280,
    rotateZ: 520,
  },

  q: {
    x: 498.7,
    y: 13.01,
    width: 224,
    rotation: -6,

    flightX: 860,
    flightY: 100,

    rotateX: 300,
    rotateY: 360,
    rotateZ: -480,
  },

  qBase: {
    x: 592.88,
    y: 187.1,
    width: 150,
    rotation: 0,

    flightX: 820,
    flightY: 680,

    rotateX: -300,
    rotateY: 260,
    rotateZ: 440,
  },
}

/* =========================================================================
   EASING
========================================================================= */

function clamp(value: number) {
  return Math.min(
    1,
    Math.max(
      0,
      value,
    ),
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

/* =========================================================================
   HERO
========================================================================= */

export function Hero() {
  const { open } =
    useRegistration()

  const sectionRef =
    useRef<HTMLElement>(null)

  const [progress, setProgress] =
    useState(0)

  /* =======================================================================
     SCROLL PROGRESS
  ======================================================================= */

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

      const value =
        clamp(
          -rect.top /
            distance,
        )

      setProgress(value)
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

  /* =======================================================================
     TIMELINE

     0.00 → 0.12
     Everything completely intact.

     0.12 → 0.30
     ORIGINAL LOGO fades away.

     Components stay completely still.

     0.30 → 0.36
     Mechanical structure is exposed.

     0.36 → 1.00
     Components explode continuously toward the camera.
  ======================================================================= */

  const logoFade =
    1 -
    easeInOut(
      (progress - 0.12) /
        0.18,
    )

  const explosion =
    easeIn(
      (progress - 0.36) /
        0.64,
    )

  /* =======================================================================
     TEXT
  ======================================================================= */

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

  /* =======================================================================
     BACKGROUND / HERO CONTENT
  ======================================================================= */

  const backgroundOpacity =
    easeOut(
      (progress - 0.42) /
        0.30,
    )

  const contentOpacity =
    easeInOut(
      (progress - 0.60) /
        0.25,
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

      {/* =================================================================
          STICKY HERO
      ================================================================= */}

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

        {/* ===============================================================
            BACKGROUND
        =============================================================== */}

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

        {/* ===============================================================
            HERO CONTENT
        =============================================================== */}

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

        {/* ===============================================================
            CINEMATIC TOR'Q STAGE
        =============================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
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
              px-4
              sm:px-8
            "
          >

            {/* =========================================================
                WELCOME
            ========================================================= */}

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

            {/* =========================================================
                LOGO STAGE

                IMPORTANT:

                The master logo and mechanical pieces occupy EXACTLY
                the same stage.

                Master logo = behind
                Components = in front
            ========================================================= */}

            <div
              className="
                relative
                w-[94vw]
                max-w-[790px]
              "
              style={{
                aspectRatio:
                  `${ART_WIDTH}/${ART_HEIGHT}`,

                transformStyle:
                  'preserve-3d',
              }}
            >

              {/* =======================================================
                  ORIGINAL TOR'Q LOGO

                  This is the PERFECT visual logo.

                  It remains at 100% initially.

                  It fades away BEFORE the mechanical pieces move.
              ======================================================= */}

              <img
                src="/images/torq-components/torq-logo-intact-reference.png"
                alt="TOR'Q"
                draggable={false}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-contain
                "
                style={{
                  opacity:
                    logoFade,

                  transform:
                    'translateZ(0)',

                  transformOrigin:
                    'center center',

                  willChange:
                    'opacity',
                }}
              />

              {/* =======================================================
                  MECHANICAL COMPONENTS

                  These are visible from the very beginning.

                  They do NOT fade with the master logo.

                  They remain still until the logo has disappeared.
              ======================================================= */}

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

            {/* =========================================================
                SCROLL CUE
            ========================================================= */}

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

/* =========================================================================
   MECHANICAL PIECE
========================================================================= */

function MechanicalPiece({
  src,
  data,
  explosion,
}: {
  src: string
  data: Motion
  explosion: number
}) {
  /*
   * ---------------------------------------------------------------
   * EXPLOSION
   *
   * 0 = completely registered
   * 1 = completely out of the scene
   * ---------------------------------------------------------------
   */

  const e =
    clamp(explosion)

  /*
   * ---------------------------------------------------------------
   * CONTINUOUS ACCELERATION
   *
   * The movement gets faster as the user scrolls.
   *
   * There is no "destination point".
   *
   * The components simply continue travelling.
   * ---------------------------------------------------------------
   */

  const travel =
    e *
    e *
    e

  /*
   * ---------------------------------------------------------------
   * INITIAL RELEASE
   *
   * A very small amount of separation gives the feeling that the
   * machinery is unlocking itself.
   * ---------------------------------------------------------------
   */

  const release =
    easeOut(
      e / 0.16,
    )

  /*
   * ---------------------------------------------------------------
   * POSITION
   * ---------------------------------------------------------------
   */

  const x =
    data.x +
    data.flightX *
      travel

  const y =
    data.y +
    data.flightY *
      travel

  /*
   * Tiny mechanical release before the major explosion.
   */

  const microX =
    data.flightX *
    0.025 *
    release

  const microY =
    data.flightY *
    0.025 *
    release

  const finalX =
    x +
    microX

  const finalY =
    y +
    microY

  /*
   * ---------------------------------------------------------------
   * CAMERA DEPTH
   *
   * The parts come toward the viewer.
   * ---------------------------------------------------------------
   */

  const z =
    e *
    e *
    5600

  /*
   * ---------------------------------------------------------------
   * SCALE
   *
   * The parts grow dramatically as they approach the camera.
   * ---------------------------------------------------------------
   */

  const scale =
    1 +
    Math.pow(
      e,
      2,
    ) *
    5

  /*
   * ---------------------------------------------------------------
   * ROTATION
   * ---------------------------------------------------------------
   */

  const rotateX =
    data.rotateX *
    e

  const rotateY =
    data.rotateY *
    e

  const rotateZ =
    data.rotation +
    data.rotateZ *
    e

  /*
   * ---------------------------------------------------------------
   * MOTION BLUR
   * ---------------------------------------------------------------
   */

  const blur =
    Math.pow(
      e,
      2.2,
    ) *
    5

  /*
   * ---------------------------------------------------------------
   * EXIT FADE
   *
   * The parts stay fully visible through the beginning and middle
   * of the explosion.
   *
   * Fade starts only once they're already travelling aggressively.
   * ---------------------------------------------------------------
   */

  const fade =
    1 -
    easeIn(
      (e - 0.68) /
        0.32,
    )

  /*
   * ---------------------------------------------------------------
   * RESPONSIVE COORDINATES
   * ---------------------------------------------------------------
   */

  const left =
    (finalX /
      ART_WIDTH) *
    100

  const top =
    (finalY /
      ART_HEIGHT) *
    100

  const width =
    (data.width /
      ART_WIDTH) *
    100

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
        /*
         * Registered starting position.
         */
        left:
          `${left}%`,

        top:
          `${top}%`,

        /*
         * Registered size.
         */
        width:
          `${width}%`,

        height:
          'auto',

        /*
         * IMPORTANT:
         *
         * At explosion = 0:
         *
         * opacity = 1
         * z = 0
         * scale = 1
         *
         * So the components are already sitting on the master logo
         * before anything happens.
         */
        opacity:
          fade,

        transformOrigin:
          'top left',

        transformStyle:
          'preserve-3d',

        backfaceVisibility:
          'visible',

        filter:
          blur > 0
            ? `blur(${blur}px)`
            : 'none',

        transform: `
          rotate(${data.rotation}deg)
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

        willChange:
          'transform, opacity, filter',

        /*
         * As the parts move toward camera they sit above everything.
         */
        zIndex:
          50 +
          Math.round(
            z / 100,
          ),
      }}
    />
  )
}

/* =========================================================================
   HERO STAT
========================================================================= */

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
