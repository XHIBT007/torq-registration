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

      <div className="mx-auto max-w-7xl px-6 py-16">

        <h1 className="text-4xl font-black uppercase">
          TOR&apos;Q Component Registration
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-white/50">
          We are registering the individual mechanical
          components against the original TOR&apos;Q logo.
          The reference is temporary and will NOT appear
          in the final animation.
        </p>

        {/* =====================================================
            REFERENCE CONTROL
        ===================================================== */}

        <div
          className="
            mt-10
            flex
            items-center
            gap-5
          "
        >

          <label
            className="
              w-36
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
            className="w-80"
          />

          <span className="text-sm text-white/60">
            {Math.round(
              referenceOpacity * 100,
            )}
            %
          </span>

        </div>

        {/* =====================================================
            FIXED REGISTRATION STAGE
        ===================================================== */}

        <div
          className="
            mt-12
            overflow-x-auto
            rounded-xl
            border
            border-red-500/30
            bg-black
            p-4
          "
        >

          <div
            className="
              relative
              mx-auto
              h-[793px]
              w-[1920px]
            "
          >

            {/* =================================================
                ORIGINAL LOGO REFERENCE
            ================================================= */}

            <img
              src="/images/torq-components/torq-logo-intact-reference.png"
              alt=""
              className="
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
              className="absolute"
              style={{
                left: '72%',
                top: '59%',
                width: '17%',
              }}
            />

          </div>

        </div>

        {/* =====================================================
            INSTRUCTIONS
        ===================================================== */}

        <div
          className="
            mt-10
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
        >

          <h2 className="font-bold uppercase">
            Registration target
          </h2>

          <p className="mt-3 text-sm leading-7 text-white/50">
            Lower the reference opacity to approximately
            20–30%. The individual components should sit
            directly on top of the corresponding areas of
            the original logo.
          </p>

          <p className="mt-3 text-sm leading-7 text-white/50">
            We are NOT trying to make the exploded artwork
            look good here. We are only establishing the
            exact assembled position.
          </p>

        </div>

        {/* =====================================================
            ASSET CHECK
        ===================================================== */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {pieces.map(
            ([name, src]) => (
              <div
                key={name}
                className="
                  rounded-lg
                  border
                  border-white/10
                  p-5
                "
              >

                <p
                  className="
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
                    text-xs
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
