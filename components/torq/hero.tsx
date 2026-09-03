'use client'

import { ChevronDown, MapPin, Ticket } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Countdown } from './countdown'
import { useRegistration } from './registration'
import { EVENT } from '@/lib/torq-data'

const STAGE_WIDTH = 790
const STAGE_HEIGHT = 316
const INITIAL_RELEASE = 0.32
const MUSTANG_SRC = '/images/Hero-mustang-03.jpg'

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
  spinX: number
  spinY: number
  spinZ: number
  microX: number
  microY: number
  phase: number
  motionType: number
}

/* LOCKED TOR'Q GEOMETRY — DO NOT CHANGE */
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
    depth: 1,
    spinX: 1,
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
    spinX: 0.6,
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
    spinY: 0.7,
    spinZ: 0.8,
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
    spinX: 1,
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
    spinZ: 1,
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
    depth: 1,
    spinX: 0.9,
    spinY: 1.2,
    spinZ: 1.3,
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
    spinX: 1.1,
    spinY: 0.9,
    spinZ: 1.2,
    microX: 9,
    microY: 9,
    phase: 9.6,
    motionType: 0,
  },
}

function clamp(v: number) {
  return Math.max(0, Math.min(1, v))
}

function easeIn(v: number) {
  const t = clamp(v)
  return t * t * t
}

function easeOut(v: number) {
  const t = clamp(v)
  return 1 - Math.pow(1 - t, 3)
}

function easeInOut(v: number) {
  const t = clamp(v)

  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function flightCurve(v: number) {
  const t = clamp(v)
  return 0.08 * t + 0.92 * Math.pow(t, 1.72)
}

export function Hero() {
  const { open } = useRegistration()

  const sectionRef = useRef<HTMLElement>(null)
  const stageWrapperRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)

  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  })

  const [stageScale, setStageScale] = useState(1)

  const compactLandscape =
    viewport.width > 0 &&
    viewport.height > 0 &&
    viewport.width > viewport.height &&
    viewport.height <= 760

  useEffect(() => {
    const update = () => {
      const vv = window.visualViewport

      setViewport({
        width: vv?.width ?? window.innerWidth,
        height: vv?.height ?? window.innerHeight,
      })
    }

    update()

    window.addEventListener('resize', update)

    window.visualViewport?.addEventListener(
      'resize',
      update,
    )

    window.visualViewport?.addEventListener(
      'scroll',
      update,
    )

    return () => {
      window.removeEventListener('resize', update)

      window.visualViewport?.removeEventListener(
        'resize',
        update,
      )

      window.visualViewport?.removeEventListener(
        'scroll',
        update,
      )
    }
  }, [])

  useEffect(() => {
    const wrapper = stageWrapperRef.current

    if (!wrapper) return

    const update = () => {
      const width =
        wrapper.getBoundingClientRect().width

      const widthScale = Math.min(
        1,
        width / STAGE_WIDTH,
      )

      if (!compactLandscape) {
        setStageScale(widthScale)
        return
      }

      const h =
        viewport.height ||
        window.innerHeight

      /*
       * In desktop-mode landscape the CSS viewport
       * is short. Fit the complete 790x316 composition
       * to height as well as width.
       */
      const heightScale = Math.min(
        1,
        Math.max(
          0.58,
          (h - 110) / 620,
        ),
      )

      setStageScale(
        Math.min(
          widthScale,
          heightScale,
        ),
      )
    }

    update()

    const ro = new ResizeObserver(update)

    ro.observe(wrapper)

    window.addEventListener(
      'resize',
      update,
    )

    return () => {
      ro.disconnect()

      window.removeEventListener(
        'resize',
        update,
      )
    }
  }, [
    compactLandscape,
    viewport.height,
  ])

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

    const scroll = () => {
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
      scroll,
      { passive: true },
    )

    window.addEventListener(
      'resize',
      update,
    )

    return () => {
      window.removeEventListener(
        'scroll',
        scroll,
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

  const logoOpacity =
    1 - easeInOut(progress / 0.3)

  const release =
    INITIAL_RELEASE +
    (1 - INITIAL_RELEASE) *
      easeInOut(progress / 0.3)

  const explosion =
    easeInOut(progress / 0.78)

  const mustangProgress =
    easeInOut(
      (progress - 0.28) / 0.48,
    )

  const mustangOpacity =
    mustangProgress

  const mustangScale =
    0.72 +
    mustangProgress * 0.34

  const mustangY =
    18 -
    mustangProgress * 18

  const mustangBlur =
    (1 - mustangProgress) * 4

  const mustangBrightness =
    0.45 +
    mustangProgress * 0.55

  const mustangContrast =
    0.95 +
    mustangProgress * 0.12

  const brakeGlow =
    easeOut(
      (progress - 0.36) / 0.28,
    )

  const brakePulse =
    0.82 +
    Math.sin(
      brakeGlow * Math.PI * 2,
    ) * 0.08

  const finalBrakeGlow =
    brakeGlow * brakePulse

  const atmosphereOpacity =
    easeOut(
      (progress - 0.32) / 0.32,
    )

  const redWashOpacity =
    easeOut(
      (progress - 0.4) / 0.3,
    ) * 0.28

  const welcomeOpacity =
    1 -
    easeOut(
      progress / 0.1,
    )

  const scrollOpacity =
    1 -
    easeOut(
      progress / 0.14,
    )

  const headlineProgress =
    easeInOut(
      (progress - 0.61) / 0.25,
    )

  const headlineOpacity =
    headlineProgress

  const headlineY =
    60 -
    headlineProgress * 60

  const headlineScale =
    0.94 +
    headlineProgress * 0.06

  const headlineX =
    -24 +
    headlineProgress * 24

  const kickerProgress =
    easeOut(
      (progress - 0.66) / 0.16,
    )

  const detailProgress =
    easeInOut(
      (progress - 0.72) / 0.18,
    )

  const detailOpacity =
    detailProgress

  const detailY =
    22 -
    detailProgress * 22

  const lowerProgress =
    easeOut(
      (progress - 0.79) / 0.16,
    )

  /*
   * MASTER RESPONSIVE RULE:
   *
   * Compact landscape is a separate layout,
   * not a Tailwind breakpoint.
   *
   * Desktop-mode can report "desktop" while
   * still having only ~500–700px of CSS height.
   */
  const contentScale =
    compactLandscape
      ? Math.max(
          0.66,
          Math.min(
            0.82,
            (viewport.height - 40) /
              700,
          ),
        )
      : 1

  const headlineSize =
    compactLandscape
      ? 'clamp(42px, 8.6vh, 68px)'
      : '6.5rem'

  const paragraphSize =
    compactLandscape
      ? 'clamp(12px, 2.05vh, 17px)'
      : undefined

  const contentWidth =
    compactLandscape
      ? 'min(760px, 82vw)'
      : undefined

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[190vh] bg-black"
    >
      <div
        className="sticky top-0 h-[100dvh] min-h-[100svh] overflow-hidden bg-black"
        style={{
          perspective: '1100px',
          perspectiveOrigin:
            '50% 50%',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{
            opacity:
              mustangOpacity,
          }}
        >
          <img
            src={MUSTANG_SRC}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
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
                'transform,filter,opacity',
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              opacity:
                atmosphereOpacity,
              background:
                'linear-gradient(to bottom,rgba(0,0,0,.72),rgba(0,0,0,.20) 48%,rgba(0,0,0,.80))',
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              opacity:
                finalBrakeGlow,
              mixBlendMode:
                'screen',
              background:
                `
                radial-gradient(
                  ellipse 15% 10%
                  at 36% 63%,
                  rgba(255,30,20,.82),
                  rgba(255,20,10,.28) 38%,
                  transparent 72%
                ),
                radial-gradient(
                  ellipse 15% 10%
                  at 64% 63%,
                  rgba(255,30,20,.82),
                  rgba(255,20,10,.28) 38%,
                  transparent 72%
                ),
                radial-gradient(
                  ellipse 70% 55%
                  at 50% 67%,
                  rgba(255,20,10,.18),
                  transparent 70%
                )
              `,
              transform: `
                scale(
                  ${0.88 +
                  brakeGlow * 0.16}
                )
              `,
              transformOrigin:
                'center center',
            }}
          />

          <div
            className="absolute inset-x-0 bottom-0 h-[55%]"
            style={{
              opacity:
                redWashOpacity,
              background:
                'radial-gradient(ellipse at 50% 100%,rgba(255,20,10,.42),transparent 68%)',
              mixBlendMode:
                'screen',
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center,transparent 25%,rgba(0,0,0,.72) 100%)',
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 top-16 z-20 flex items-center overflow-hidden">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 sm:px-8 lg:px-10">
            <div
              className="w-full max-w-5xl"
              style={{
                transform: `
                  translate3d(
                    0,
                    0,
                    0
                  )
                  scale(
                    ${contentScale}
                  )
                `,
                transformOrigin:
                  compactLandscape
                    ? 'left center'
                    : 'center center',
                width:
                  contentWidth,
                willChange:
                  'transform',
              }}
            >
              <div
                className="mb-5 flex items-center gap-3 sm:mb-7"
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
                }}
              >
                <div className="h-px w-8 bg-red-500 sm:w-12" />

                <span className="text-[9px] font-semibold uppercase tracking-[.38em] text-white/65 sm:text-xs">
                  TOR&apos;Q 2026
                </span>
              </div>

              <div className="overflow-visible">
                <h1
                  className="max-w-5xl font-black uppercase leading-[.84] tracking-[-.055em] text-white"
                  style={{
                    fontSize:
                      headlineSize,
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
                    textShadow:
                      '0 4px 30px rgba(0,0,0,.55)',
                    willChange:
                      'transform,opacity',
                  }}
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
              </div>

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
                }}
              >
                <p
                  className="mt-5 max-w-2xl text-[14px] leading-[1.55] text-white/75 sm:mt-7 sm:text-lg sm:leading-8 md:text-xl"
                  style={
                    paragraphSize
                      ? {
                          fontSize:
                            paragraphSize,
                          lineHeight: 1.45,
                        }
                      : {}
                  }
                >
                  A cinematic celebration of performance,
                  sound and precision where drifting legends,
                  stunt riders, performance cars and motorsport
                  culture come together for one unforgettable
                  experience.
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">
                  <Button
                    size="lg"
                    onClick={open}
                    className="h-12 w-full rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-[0_0_35px_rgba(220,38,38,.25)] hover:bg-red-500 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    REGISTER NOW
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-white/75 sm:text-base">
                    <MapPin className="h-5 w-5 text-red-500" />
                    {EVENT.location}
                  </div>
                </div>
              </div>

              <div
                className="mt-7 grid grid-cols-4 gap-3 border-t border-white/15 pt-6 sm:mt-9 sm:gap-6 sm:pt-7"
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
                }}
              >
                <HeroStat
                  value="100+"
                  label="Performance Cars"
                  compact={
                    compactLandscape
                  }
                />

                <HeroStat
                  value="50+"
                  label="Drivers & Riders"
                  compact={
                    compactLandscape
                  }
                />

                <HeroStat
                  value="3"
                  label="Days of Action"
                  compact={
                    compactLandscape
                  }
                />

                <HeroStat
                  value="1"
                  label="Epic Experience"
                  compact={
                    compactLandscape
                  }
                />
              </div>

              <div
                className="mt-6 sm:mt-9"
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
                }}
              >
                <p className="mb-3 text-[9px] uppercase tracking-[.35em] text-white/50">
                  The Experience Begins In
                </p>

                <Countdown
                  date={EVENT.date}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
          style={{
            perspective: '1100px',
            perspectiveOrigin:
              '50% 50%',
          }}
        >
          <div className="flex w-full flex-col items-center">
            <p
              className="mb-5 text-[9px] font-semibold uppercase tracking-[.48em] text-white/50 sm:mb-6 sm:text-xs"
              style={{
                opacity:
                  welcomeOpacity,
              }}
            >
              Welcome to
            </p>

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
                    STAGE_WIDTH,
                  height:
                    STAGE_HEIGHT,
                  transform: `
                    translate(
                      -50%,
                      -50%
                    )
                    scale(
                      ${stageScale}
                    )
                  `,
                  transformOrigin:
                    'center center',
                  transformStyle:
                    'preserve-3d',
                }}
              >
                <img
                  src="/images/torq-components/torq-logo-intact-reference.png"
                  alt="TOR'Q"
                  draggable={false}
                  className="absolute left-0 top-0 h-full w-full"
                  style={{
                    objectFit: 'fill',
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
                      'opacity,transform',
                  }}
                />

                <MechanicalPiece
                  src="/images/torq-components/t_section.png"
                  data={COMPONENTS.t}
                  release={release}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/turbine.png"
                  data={COMPONENTS.turbine}
                  release={release}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/torq-26-transparent.png"
                  data={COMPONENTS.number26}
                  release={release}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/r_section.png"
                  data={COMPONENTS.r}
                  release={release}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/r_lower.png"
                  data={COMPONENTS.rLower}
                  release={release}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/piston.png"
                  data={COMPONENTS.piston}
                  release={release}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/q_section.png"
                  data={COMPONENTS.q}
                  release={release}
                  explosion={explosion}
                />

                <MechanicalPiece
                  src="/images/torq-components/q_base.png"
                  data={COMPONENTS.qBase}
                  release={release}
                  explosion={explosion}
                />
              </div>
            </div>

            <div
              className="mt-8 flex flex-col items-center gap-2 sm:mt-10"
              style={{
                opacity:
                  scrollOpacity,
              }}
            >
              <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[.3em] text-white/45 sm:text-[10px]">
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

  const releaseAmount =
    easeInOut(r)

  const lift =
    -4 * releaseAmount

  const releaseZ =
    16 * releaseAmount

  const releaseRotateX =
    data.rotateX *
    0.006 *
    releaseAmount

  const releaseRotateY =
    data.rotateY *
    0.006 *
    releaseAmount

  const flight =
    flightCurve(e)

  const x =
    data.x +
    data.flightX *
      flight

  const y =
    data.y +
    data.flightY *
      flight

  const depth =
    releaseZ +
    Math.pow(
      flight,
      1.4,
    ) *
      (460 +
        data.depth * 180)

  const scale =
    1 +
    Math.pow(
      flight,
      1.65,
    ) *
      (0.38 +
        data.depth * 0.08)

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

  const slowWave =
    Math.sin(
      flight *
        Math.PI *
        1.35 +
        data.phase,
    )

  const fastWave =
    Math.sin(
      flight *
        Math.PI *
        3.1 +
        data.phase,
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
        data.phase,
    ) *
    data.microX *
    0.75 *
    flight

  const tumbleZ =
    fastWave *
    data.microX *
    0.6 *
    flight

  let mechanicalX = 0
  let mechanicalY = 0

  if (data.motionType === 2) {
    const envelope =
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
          data.phase,
      ) *
      data.microY *
      envelope

    mechanicalX =
      Math.cos(
        flight *
          Math.PI *
          3 +
          data.phase,
      ) *
      3 *
      envelope
  }

  const turbineSpin =
    data.motionType === 1
      ? flight *
        flight *
        70
      : 0

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

  const finalX =
    x + mechanicalX

  const finalY =
    y + mechanicalY

  const opacity =
    1 -
    easeIn(
      (flight - 0.92) /
        0.08,
    )

  const blur =
    Math.pow(
      flight,
      3,
    ) * 1.1

  const brightness =
    1 + flight * 0.055

  const contrast =
    1 + flight * 0.08

  const shadowOpacity =
    Math.min(
      0.18,
      flight * 0.18,
    )

  const shadowBlur =
    5 + flight * 14

  const shadowX =
    -flight * 6

  const shadowY =
    flight * 8

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className="absolute select-none object-contain"
      style={{
        left: `${finalX}px`,
        top: `${finalY}px`,
        width: `${data.width}px`,
        height: 'auto',
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
          brightness(
            ${brightness}
          )
          contrast(
            ${contrast}
          )
          blur(
            ${blur}px
          )
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
        zIndex:
          40 +
          Math.round(
            depth / 40,
          ),
        willChange:
          'transform,opacity,filter',
      }}
    />
  )
}

function HeroStat({
  value,
  label,
  compact,
}: {
  value: string
  label: string
  compact: boolean
}) {
  return (
    <div className="min-w-0">
      <p
        className="font-black leading-none text-white"
        style={{
          fontSize: compact
            ? 'clamp(22px,4.5vh,30px)'
            : undefined,
        }}
      >
        {value}
      </p>

      <p className="mt-2 max-w-[120px] text-[7px] uppercase tracking-[.18em] text-white/45 sm:text-[10px] sm:tracking-[.2em]">
        {label}
      </p>
    </div>
  )
}
