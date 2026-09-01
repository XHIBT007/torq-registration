'use client'

import { useState } from 'react'

const pieces = [
  ['T', '/images/torq-components/t_section.png'],
  ['Turbine', '/images/torq-components/turbine.png'],
  ['26', '/images/torq-components/torq-26-transparent.png'],
  ['R', '/images/torq-components/r_section.png'],
  ['R Lower', '/images/torq-components/r_lower.png'],
  ['Piston', '/images/torq-components/piston.png'],
  ['Q', '/images/torq-components/q_section.png'],
  ['Q Base', '/images/torq-components/q_base.png'],
]

export function LogoRegistrationTest() {
  const [referenceOpacity, setReferenceOpacity] =
    useState(0.35)

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <h1
          className="
            max-w-4xl
            text-3xl
            font-black
            uppercase
            leading-[0.95]
            sm:text-5xl
          "
        >
          TOR&apos;Q Component Registration
        </h1>

        <p
          className="
            mt-4
            max-w-3xl
            text-sm
            leading-6
            text-white/50
            sm:text-lg
            sm:leading-8
          "
        >
          We are registering the individual mechanical
          components against the original TOR&apos;Q logo.
          The reference is temporary and will NOT appear
          in the final animation.
        </p>

        {/* =====================================================
            REFERENCE OPACITY
        ===================================================== */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-4
            sm:mt-10
          "
        >

          <label
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-white/50
            "
          >
            Reference
          </label>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={referenceOpacity}
            onChange={(e) =>
              setReferenceOpacity(
                Number(e.target.value),
              )
            }
            className="
              w-48
              sm:w-80
            "
          />

          <span
            className="
              text-sm
              text-white/60
            "
          >
            {Math.round(
              referenceOpacity * 100,
            )}
            %
          </span>

        </div>

        {/* =====================================================
            REGISTRATION WORKSPACE
        ===================================================== */}

        <div
          className="
            mt-8
            rounded-xl
            border
            border-red-500/30
            bg-black
            p-2
            sm:mt-12
            sm:p-4
          "
        >

          {/* ===================================================
              RESPONSIVE WRAPPER

              The artwork maintains a 1920 × 793 coordinate
              system but scales down as one complete unit.
          =================================================== */}

          <div
            className="
              relative
              mx-auto
              w-full
              overflow-hidden
            "
            style={{
              aspectRatio:
                '1920 / 793',
            }}
          >

            {/* =================================================
                INTERNAL COORDINATE SYSTEM

                This remains 1920 × 793.
            ================================================= */}

            <div
              className="
                absolute
                inset-0
              "
              style={{
                width: '100%',
                height: '100%',
              }}
            >

              {/* =================================================
                  MASTER REFERENCE
              ================================================= */}

              <img
                src="/images/torq-components/torq-logo-intact-reference.png"
                alt=""
                draggable={false}
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-contain
                "
                style={{
                  opacity:
                    referenceOpacity,
                }}
              />

              {/* =================================================
                  T
              ================================================= */}

              <img
                src="/images/torq-components/t_section.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '3%',
                  top: '7%',
                  width: '28%',
                }}
              />

              {/* =================================================
                  TURBINE
              ================================================= */}

              <img
                src="/images/torq-components/turbine.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '20%',
                  top: '10%',
                  width: '23%',
                }}
              />

              {/* =================================================
                  26
              ================================================= */}

              <img
                src="/images/torq-components/torq-26-transparent.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '28.7%',
                  top: '27%',
                  width: '8%',
                }}
              />

              {/* =================================================
                  R
              ================================================= */}

              <img
                src="/images/torq-components/r_section.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '40%',
                  top: '13%',
                  width: '17%',
                }}
              />

              {/* =================================================
                  R LOWER
              ================================================= */}

              <img
                src="/images/torq-components/r_lower.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '44%',
                  top: '43%',
                  width: '14%',
                }}
              />

              {/* =================================================
                  PISTON
              ================================================= */}

              <img
                src="/images/torq-components/piston.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '57%',
                  top: '4%',
                  width: '10%',
                }}
              />

              {/* =================================================
                  Q
              ================================================= */}

              <img
                src="/images/torq-components/q_section.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '63%',
                  top: '10%',
                  width: '27%',
                }}
              />

              {/* =================================================
                  Q BASE
              ================================================= */}

              <img
                src="/images/torq-components/q_base.png"
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: '72%',
                  top: '59%',
                  width: '17%',
                }}
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            INSTRUCTIONS
        ===================================================== */}

        <div
          className="
            mt-8
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            p-5
            sm:p-6
          "
        >

          <h2
            className="
              text-sm
              font-bold
              uppercase
              tracking-widest
            "
          >
            Registration target
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-white/50
            "
          >
            Set the reference opacity between 20% and
            40%. The individual components should align
            directly with the corresponding areas of the
            original TOR&apos;Q logo.
          </p>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-white/50
            "
          >
            The reference image is only a temporary
            alignment guide. It will not be used in the
            final cinematic animation.
          </p>

        </div>

        {/* =====================================================
            ASSET CHECK
        ===================================================== */}

        <div
          className="
            mt-8
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {pieces.map(
            ([name, src]) => (
              <div
                key={name}
                className="
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.02]
                  p-4
                "
              >

                <p
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-widest
                  "
                >
                  {name}
                </p>

                <p
                  className="
                    mt-2
                    break-all
                    text-[10px]
                    text-white/30
                  "
                >
                  {src}
                </p>

              </div>
            ),
          )}

        </div>

      </div>

    </main>
  )
}
