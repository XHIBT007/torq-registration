'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MapPin, Play, Trophy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useRegistration } from '@/components/torq/registration-provider'

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const STAGE_WIDTH = 790
const STAGE_HEIGHT = 316

const INITIAL_RELEASE = 0.32

const MUSTANG_SRC = '/images/Hero-mustang-03.jpg'

/* -------------------------------------------------------------------------- */
/*                              ANIMATION HELPERS                             */
/* -------------------------------------------------------------------------- */

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

const easeIn = (t: number) => t * t

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

const easeInOut = (t: number) =>
  t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2

const flightCurve = (t: number) => {
  const eased = easeInOut(clamp(t))
  return eased * eased
}

/* -------------------------------------------------------------------------- */
/*                             COMPONENT DEFINITIONS                          */
/* -------------------------------------------------------------------------- */

type ComponentData = {
  src: string
  x: number
  y: number
  width: number
  rotation: number

  flightX: number
  flightY: number
  flightZ: number

  rotateX: number
  rotateY: number
  rotateZ: number

  depth: number
  spin: number

  microX: number
  microY: number
  microRotate: number
}

/*
 * IMPORTANT:
 * These coordinates are LOCKED.
 * Do not change them.
 */

const COMPONENTS: Record<string, ComponentData> = {
  t: {
    src: '/images/torq-components/t_section.png',
    x: -2.01,
    y: 34.27,
    width: 177,
    rotation: -21,

    flightX: -440,
    flightY: -180,
    flightZ: 760,

    rotateX: 72,
    rotateY: -48,
    rotateZ: -38,

    depth: 1.1,
    spin: 42,

    microX: -18,
    microY: -7,
    microRotate: -3,
  },

  turbine: {
    src: '/images/torq-components/turbine.png',
    x: 128.14,
    y: 39.31,
    width: 188,
    rotation: -7,

    flightX: -270,
    flightY: 210,
    flightZ: 620,

    rotateX: -62,
    rotateY: 66,
    rotateZ: 48,

    depth: 1,
    spin: -55,

    microX: -9,
    microY: 14,
    microRotate: 4,
  },

  number26: {
    src: '/images/torq-components/torq-26-transparent.png',
    x: 247.95,
    y: 108.56,
    width: 38,
    rotation: 0,

    flightX: -40,
    flightY: -250,
    flightZ: 900,

    rotateX: 80,
    rotateY: -30,
    rotateZ: 18,

    depth: 1,
    spin: 28,

    microX: 4,
    microY: -10,
    microRotate: -2,
  },

  r: {
    src: '/images/torq-components/r_section.png',
    x: 266.87,
    y: 32.9,
    width: 153,
    rotation: -22,

    flightX: 180,
    flightY: -210,
    flightZ: 820,

    rotateX: -70,
    rotateY: -52,
    rotateZ: -46,

    depth: 1,
    spin: -38,

    microX: 12,
    microY: -9,
    microRotate: 3,
  },

  rLower: {
    src: '/images/torq-components/r_lower.png',
    x: 313.28,
    y: 153.54,
    width: 168,
    rotation: -21,

    flightX: 290,
    flightY: 230,
    flightZ: 720,

    rotateX: 62,
    rotateY: 48,
    rotateZ: 52,

    depth: 1,
    spin: 44,

    microX: 15,
    microY: 10,
    microRotate: -3,
  },

  piston: {
    src: '/images/torq-components/piston.png',
    x: 423.85,
    y: 10.75,
    width: 169,
    rotation: -14,

    flightX: 460,
    flightY: -190,
    flightZ: 940,

    rotateX: -58,
    rotateY: 74,
    rotateZ: -58,

    depth: 1,
    spin: -48,

    microX: 20,
    microY: -8,
    microRotate: 4,
  },

  q: {
    src: '/images/torq-components/q_section.png',
    x: 498.7,
    y: 13.01,
    width: 224,
    rotation: -6,

    flightX: 470,
    flightY: 180,
    flightZ: 780,

    rotateX: 66,
    rotateY: -64,
    rotateZ: 42,

    depth: 1,
    spin: 36,

    microX: 18,
    microY: 8,
    microRotate: -2,
  },

  qBase: {
    src: '/images/torq-components/q_base.png',
    x: 592.88,
    y: 187.1,
    width: 150,
    rotation: 0,

    flightX: 610,
    flightY: 250,
    flightZ: 860,

    rotateX: -74,
    rotateY: 58,
    rotateZ: -44,

    depth: 1,
    spin: -52,

    microX: 23,
    microY: 12,
    microRotate: 3,
  },
}

/* -------------------------------------------------------------------------- */
/*                              MECHANICAL PIECE                              */
/* -------------------------------------------------------------------------- */

type MechanicalPieceProps = {
  data: ComponentData
  progress: number
}

function MechanicalPiece({
  data,
  progress,
}: MechanicalPieceProps) {
  const releaseProgress = clamp(
    (progress - INITIAL_RELEASE) / (1 - INITIAL_RELEASE),
  )

  const flight = flightCurve(releaseProgress)

  const microProgress = easeInOut(
    clamp(progress / INITIAL_RELEASE),
  )

  const x =
    data.x +
    data.microX * microProgress +
    data.flightX * flight

  const y =
    data.y +
    data.microY * microProgress +
    data.flightY * flight

  const rotateZ =
    data.rotation +
    data.microRotate * microProgress +
    data.rotateZ * flight

  const rotateX = data.rotateX * flight
  const rotateY = data.rotateY * flight

  const translateZ = data.flightZ * flight * data.depth

  const scale =
    1 -
    0.14 * flight

  const opacity =
    1 -
    0.88 * easeIn(clamp(releaseProgress))

  const transform = `
    translate3d(${x}px, ${y}px, ${translateZ}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    rotateZ(${rotateZ}deg)
    scale(${scale})
  `

  return (
    <Image
      src={data.src}
      alt=""
      width={data.width}
      height={data.width}
      priority
      draggable={false}
      className="absolute select-none"
      style={{
        left: 0,
        top: 0,
        width: `${data.width}px`,
        height: 'auto',
        opacity,
        transform,
        transformOrigin: 'top left',
        willChange: 'transform, opacity',
        pointerEvents: 'none',
      }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                  HERO STAT                                 */
/* -------------------------------------------------------------------------- */

function HeroStat({
  value,
  label,
  compact,
}: {
  value: string
  label: string
  compact?: boolean
}) {
  return (
    <div className="flex flex-col">
      <span
        className="font-black tracking-tight text-white"
        style={{
          fontSize: compact
            ? 'clamp(17px, 3.4vh, 27px)'
            : 'clamp(24px, 2vw, 32px)',
          lineHeight: 0.95,
        }}
      >
        {value}
      </span>

      <span
        className="mt-1 font-semibold uppercase tracking-[0.18em] text-white/45"
        style={{
          fontSize: compact
            ? 'clamp(5px, 1.05vh, 8px)'
            : '10px',
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const { open } = useRegistration()

  const sectionRef = useRef<HTMLElement | null>(null)
  const stageWrapperRef = useRef<HTMLDivElement | null>(null)

  const [progress, setProgress] = useState(0)

  const [viewport, setViewport] = useState({
    width: 1440,
    height: 900,
  })

  /* ------------------------------------------------------------------------ */
  /*                             VIEWPORT TRACKING                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const updateViewport = () => {
      const visualViewport = window.visualViewport

      const width =
        visualViewport?.width || window.innerWidth

      const height =
        visualViewport?.height || window.innerHeight

      setViewport({
        width,
        height,
      })
    }

    updateViewport()

    window.addEventListener('resize', updateViewport)
    window.visualViewport?.addEventListener(
      'resize',
      updateViewport,
    )

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.visualViewport?.removeEventListener(
        'resize',
        updateViewport,
      )
    }
  }, [])

  /* ------------------------------------------------------------------------ */
  /*                              SCROLL PROGRESS                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let raf = 0

    const updateProgress = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()

      const scrollable =
        sectionRef.current.offsetHeight - window.innerHeight

      const raw =
        scrollable > 0
          ? -rect.top / scrollable
          : 0

      setProgress(clamp(raw))

      raf = 0
    }

    const onScroll = () => {
      if (raf) return

      raf = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (raf) {
        window.cancelAnimationFrame(raf)
      }
    }
  }, [])

  /* ------------------------------------------------------------------------ */
  /*                             RESPONSIVE STATE                             */
  /* ------------------------------------------------------------------------ */

  const width = Math.max(viewport.width, 1)
  const height = Math.max(viewport.height, 1)

  const isPortrait = height >= width
  const isLandscape = width > height

  const isCompactLandscape =
    isLandscape &&
    (width <= 1200 || height <= 820)

  const isSmallPortrait =
    isPortrait &&
    width <= 600

  const isVeryShortLandscape =
    isCompactLandscape &&
    height <= 620

  /* ------------------------------------------------------------------------ */
  /*                       RESPONSIVE STAGE CALCULATION                       */
  /* ------------------------------------------------------------------------ */

  /*
   * The original problem was that the mechanical logo was being sized
   * almost entirely from viewport WIDTH.
   *
   * On landscape displays this creates a very wide 790px stage even when
   * the available HEIGHT is too small.
   *
   * The stage is now constrained by BOTH width and height.
   *
   * Because the internal artwork is 790 x 316, its aspect ratio is 2.5.
   */

  let stageDisplayWidth: number

  if (isVeryShortLandscape) {
    const widthLimit = width * 0.48
    const heightLimit =
      height * 0.72 * (STAGE_WIDTH / STAGE_HEIGHT)

    stageDisplayWidth = Math.min(
      widthLimit,
      heightLimit,
      560,
    )
  } else if (isCompactLandscape) {
    const widthLimit = width * 0.56
    const heightLimit =
      height * 0.84 * (STAGE_WIDTH / STAGE_HEIGHT)

    stageDisplayWidth = Math.min(
      widthLimit,
      heightLimit,
      660,
    )
  } else if (isSmallPortrait) {
    const widthLimit = width * 0.84
    const heightLimit =
      height * 0.32 * (STAGE_WIDTH / STAGE_HEIGHT)

    stageDisplayWidth = Math.min(
      widthLimit,
      heightLimit,
      440,
    )
  } else if (isPortrait) {
    const widthLimit = width * 0.78
    const heightLimit =
      height * 0.36 * (STAGE_WIDTH / STAGE_HEIGHT)

    stageDisplayWidth = Math.min(
      widthLimit,
      heightLimit,
      560,
    )
  } else {
    const widthLimit = width * 0.72
    const heightLimit =
      height * 0.92 * (STAGE_WIDTH / STAGE_HEIGHT)

    stageDisplayWidth = Math.min(
      widthLimit,
      heightLimit,
      790,
    )
  }

  stageDisplayWidth = Math.max(
    stageDisplayWidth,
    isPortrait ? 280 : 360,
  )

  const stageScale =
    stageDisplayWidth / STAGE_WIDTH

  const stageDisplayHeight =
    STAGE_HEIGHT * stageScale

  /* ------------------------------------------------------------------------ */
  /*                         RESPONSIVE CONTENT SIZE                          */
  /* ------------------------------------------------------------------------ */

  let headlineSize: string
  let contentWidth: string
  let contentScale: number

  if (isVeryShortLandscape) {
    headlineSize = 'clamp(25px, 5.2vh, 40px)'
    contentWidth = 'min(560px, 68vw)'
    contentScale = 0.72
  } else if (isCompactLandscape) {
    headlineSize = 'clamp(30px, 5.8vh, 52px)'
    contentWidth = 'min(620px, 68vw)'
    contentScale = 0.82
  } else if (isSmallPortrait) {
    headlineSize = 'clamp(30px, 9vw, 43px)'
    contentWidth = 'min(92vw, 470px)'
    contentScale = 0.94
  } else if (isPortrait) {
    headlineSize = 'clamp(34px, 7.5vw, 58px)'
    contentWidth = 'min(88vw, 620px)'
    contentScale = 0.94
  } else {
    headlineSize = 'clamp(52px, 7vh, 92px)'
    contentWidth = 'min(820px, 60vw)'

    /*
     * Prevent desktop content from becoming too tall on shorter
     * landscape displays.
     */
    contentScale = Math.min(
      1,
      Math.max(0.82, height / 900),
    )
  }

  /* ------------------------------------------------------------------------ */
  /*                              HERO ANIMATION                              */
  /* ------------------------------------------------------------------------ */

  const backgroundScale =
    0.72 +
    0.34 * easeOut(clamp(progress))

  const backgroundOpacity =
    progress < 0.08
      ? 0
      : clamp(
          (progress - 0.08) / 0.18,
        )

  const logoOpacity =
    progress < INITIAL_RELEASE
      ? 1 - easeInOut(progress / INITIAL_RELEASE)
      : 0

  const logoRelease =
    progress < INITIAL_RELEASE
      ? progress / INITIAL_RELEASE
      : 1

  const logoTransform = `
    translate3d(
      0,
      ${-10 * easeOut(logoRelease)}px,
      ${30 * easeOut(logoRelease)}px
    )
    scale(${1 + 0.025 * easeOut(logoRelease)})
  `

  /* ------------------------------------------------------------------------ */
  /*                                   JSX                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <section
      ref={sectionRef}
      className="relative h-[190vh] bg-black"
    >
      <div
        className="sticky top-0 h-[100dvh] min-h-[100svh] overflow-hidden bg-black"
        style={{
          perspective: '1100px',
        }}
      >
        {/* ---------------------------------------------------------------- */}
        {/*                           BACKGROUND                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={MUSTANG_SRC}
            alt="TOR'Q Motorsport"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              opacity: backgroundOpacity,
              transform: `scale(${backgroundScale})`,
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
            }}
          />

          <div className="absolute inset-0 bg-black/35" />

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.92) 100%)',
            }}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*                           HERO CONTENT                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="absolute inset-x-0 bottom-0 top-16 z-20 flex items-center overflow-hidden">
          <div
            className="mx-auto w-full max-w-7xl"
            style={{
              paddingLeft: isPortrait
                ? '5vw'
                : 'clamp(40px, 8vw, 120px)',
              paddingRight: isPortrait
                ? '5vw'
                : 'clamp(40px, 8vw, 120px)',
            }}
          >
            <div
              style={{
                width: contentWidth,
                transform: `scale(${contentScale})`,
                transformOrigin: isPortrait
                  ? 'center center'
                  : 'left center',
                willChange: 'transform',
              }}
            >
              {/* EYEBROW */}

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-white/60" />

                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/60">
                  ARTISTRY IN MOTORSPORT
                </span>
              </div>

              {/* HEADLINE */}

              <h1
                className="font-black uppercase leading-[0.84] tracking-[-0.055em] text-white"
                style={{
                  fontSize: headlineSize,
                }}
              >
                <span className="block whitespace-nowrap">
                  AFRICA’S BIGGEST
                </span>

                <span className="block whitespace-nowrap">
                  MOTORSPORT
                </span>

                <span className="block whitespace-nowrap">
                  SPECTACLE
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p
                className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
                style={{
                  fontSize: isCompactLandscape
                    ? 'clamp(10px, 1.8vh, 13px)'
                    : undefined,
                }}
              >
                Where speed, engineering, creativity and
                culture collide to create Africa’s most
                electrifying motorsport experience.
              </p>

              {/* CTA */}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button
                  onClick={open}
                  className="h-12 rounded-full bg-white px-7 text-xs font-black uppercase tracking-[0.2em] text-black transition-transform hover:scale-105 hover:bg-white"
                >
                  Register Now
                </Button>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  <MapPin className="h-3.5 w-3.5" />

                  Lagos, Nigeria
                </div>
              </div>

              {/* STATS */}

              <div className="mt-10 flex items-center gap-7 sm:gap-10">
                <HeroStat
                  value="06"
                  label="December 2026"
                  compact={
                    isCompactLandscape ||
                    isPortrait
                  }
                />

                <div className="h-8 w-px bg-white/15" />

                <HeroStat
                  value="6+"
                  label="Years of TOR'Q"
                  compact={
                    isCompactLandscape ||
                    isPortrait
                  }
                />

                <div className="h-8 w-px bg-white/15" />

                <HeroStat
                  value="∞"
                  label="Adrenaline"
                  compact={
                    isCompactLandscape ||
                    isPortrait
                  }
                />
              </div>

              {/* COUNTDOWN */}

              <div className="mt-7 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                <Trophy className="h-3.5 w-3.5" />

                <span>
                  The countdown has begun
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*                       MECHANICAL INTRO                            */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden"
          style={{
            pointerEvents:
              progress > 0.12 ? 'none' : 'auto',
          }}
        >
          <div className="absolute inset-0 bg-black" />

          {/* WELCOME TEXT */}

          <div
            className="absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap text-center"
            style={{
              top: isVeryShortLandscape
                ? '12%'
                : isCompactLandscape
                  ? '14%'
                  : '18%',
              opacity:
                progress < 0.18
                  ? 1 -
                    easeInOut(
                      clamp(progress / 0.18),
                    )
                  : 0,
              transform: `
                translateX(-50%)
                translateY(${
                  -12 *
                  easeOut(
                    clamp(progress / 0.18),
                  )
                }px)
              `,
            }}
          >
            <div className="text-[9px] font-bold uppercase tracking-[0.42em] text-white/45 sm:text-[10px]">
              WELCOME TO
            </div>

            <div className="mt-2 text-[12px] font-black uppercase tracking-[0.32em] text-white sm:text-sm">
              TOR'Q 2026
            </div>
          </div>

          {/* MECHANICAL STAGE */}

          <div
            ref={stageWrapperRef}
            className="relative shrink-0"
            style={{
              width: `${stageDisplayWidth}px`,
              height: `${stageDisplayHeight}px`,
              maxWidth: '100vw',
              maxHeight: '60vh',
            }}
          >
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: `${STAGE_WIDTH}px`,
                height: `${STAGE_HEIGHT}px`,
                transform: `
                  translate(-50%, -50%)
                  scale(${stageScale})
                `,
                transformOrigin: 'center center',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* INTACT LOGO */}

              <Image
                src="/images/torq-components/torq-logo-intact-reference.png"
                alt="TOR'Q"
                width={STAGE_WIDTH}
                height={STAGE_HEIGHT}
                priority
                draggable={false}
                className="absolute inset-0 h-full w-full select-none object-fill"
                style={{
                  opacity: logoOpacity,
                  transform: logoTransform,
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                  pointerEvents: 'none',
                }}
              />

              {/* DISASSEMBLED COMPONENTS */}

              {Object.entries(COMPONENTS).map(
                ([key, component]) => (
                  <MechanicalPiece
                    key={key}
                    data={component}
                    progress={progress}
                  />
                ),
              )}
            </div>
          </div>

          {/* SCROLL PROMPT */}

          <div
            className="absolute bottom-[7%] left-1/2 z-50 -translate-x-1/2 text-center"
            style={{
              opacity:
                progress < 0.12
                  ? 1 -
                    easeInOut(
                      clamp(progress / 0.12),
                    )
                  : 0,
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-white/20" />

              <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-white/35">
                Scroll to ignite
              </span>

              <span className="h-px w-8 bg-white/20" />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/*                         PLAY / EXPERIENCE                         */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="absolute bottom-7 right-7 z-30 sm:bottom-10 sm:right-10"
          style={{
            opacity:
              progress > 0.18
                ? 1
                : 0,
            transform:
              progress > 0.18
                ? 'translateY(0)'
                : 'translateY(10px)',
            transition:
              'opacity 500ms ease, transform 500ms ease',
            pointerEvents:
              progress > 0.18
                ? 'auto'
                : 'none',
          }}
        >
          <button
            type="button"
            onClick={open}
            className="group flex items-center gap-3 rounded-full border border-white/15 bg-black/35 px-4 py-2.5 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
              <Play className="ml-0.5 h-3 w-3 fill-current" />
            </span>

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
              Enter TOR'Q
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
