'use client'

import { useState } from 'react'

const pieces = [
  {
    name: 'T',
    src: '/images/torq-components/t_section.png',
    className: 't-piece',
  },
  {
    name: 'Turbine',
    src: '/images/torq-components/turbine.png',
    className: 'turbine-piece',
  },
  {
    name: '26',
    src: '/images/torq-components/torq-26-transparent.png',
    className: 'number-piece',
  },
  {
    name: 'R',
    src: '/images/torq-components/r_section.png',
    className: 'r-piece',
  },
  {
    name: 'R Lower',
    src: '/images/torq-components/r_lower.png',
    className: 'r-lower-piece',
  },
  {
    name: 'Piston',
    src: '/images/torq-components/piston.png',
    className: 'piston-piece',
  },
  {
    name: 'Q',
    src: '/images/torq-components/q_section.png',
    className: 'q-piece',
  },
  {
    name: 'Q Base',
    src: '/images/torq-components/q_base.png',
    className: 'q-base-piece',
  },
]

export function LogoRegistrationTest() {
  const [referenceOpacity, setReferenceOpacity] =
    useState(0.35)

  return (
    <main className="min-h-screen bg-black p-8 text-white">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-3 text-3xl font-black uppercase">
          TOR&apos;Q Component Registration
        </h1>

        <p className="mb-8 max-w-2xl text-sm text-white/50">
          The reference logo is shown underneath the
          individual components. Adjust the component
          positions until they perfectly reconstruct the
          original logo.
        </p>

        {/* =====================================================
            CONTROLS
        ===================================================== */}

        <div className="mb-8 flex items-center gap-4">

          <label className="text-xs uppercase tracking-widest text-white/50">
            Reference opacity
          </label>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={referenceOpacity}
            onChange={(event) =>
              setReferenceOpacity(
                Number(event.target.value),
              )
            }
            className="w-64"
          />

          <span className="text-xs">
            {Math.round(
              referenceOpacity * 100,
            )}
            %
          </span>

        </div>

        {/* =====================================================
            LOGO WORKSPACE
        ===================================================== */}

        <div
          className="
            relative
            mx-auto
            aspect-[1920/793]
            w-full
            overflow-hidden
            border
            border-red-500/30
            bg-black
          "
        >

          {/* ===================================================
              MASTER REFERENCE

              This is ONLY for registration.

              It will NOT be part of the final animation.
          =================================================== */}

          <img
            src="/images/torq-components/torq-logo-intact-reference.png"
            alt=""
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

          {/* ===================================================
              COMPONENTS

              These are the actual pieces we're registering.
          =================================================== */}

          <img
            src="/images/torq-components/t_section.png"
            alt=""
            className="
              absolute
              left-[2.8%]
              top-[6%]
              w-[28%]
            "
          />

          <img
            src="/images/torq-components/turbine.png"
            alt=""
            className="
              absolute
              left-[20%]
              top-[9%]
              w-[24%]
            "
          />

          <img
            src="/images/torq-components/torq-26-transparent.png"
            alt=""
            className="
              absolute
              left-[29%]
              top-[31%]
              w-[10%]
            "
          />

          <img
            src="/images/torq-components/r_section.png"
            alt=""
            className="
              absolute
              left-[39%]
              top-[13%]
              w-[18%]
            "
          />

          <img
            src="/images/torq-components/r_lower.png"
            alt=""
            className="
              absolute
              left-[43%]
              top-[44%]
              w-[15%]
            "
          />

          <img
            src="/images/torq-components/piston.png"
            alt=""
            className="
              absolute
              left-[55%]
              top-[5%]
              w-[12%]
            "
          />

          <img
            src="/images/torq-components/q_section.png"
            alt=""
            className="
              absolute
              left-[62%]
              top-[9%]
              w-[28%]
            "
          />

          <img
            src="/images/torq-components/q_base.png"
            alt=""
            className="
              absolute
              left-[70%]
              top-[60%]
              w-[20%]
            "
          />

        </div>

        {/* =====================================================
            COMPONENT CHECKLIST
        ===================================================== */}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {pieces.map((piece) => (
            <div
              key={piece.name}
              className="
                rounded-lg
                border
                border-white/10
                bg-white/[0.03]
                p-4
              "
            >

              <p className="text-xs font-bold uppercase tracking-widest">
                {piece.name}
              </p>

              <p className="mt-1 text-[10px] text-white/30">
                {piece.src}
              </p>

            </div>
          ))}

        </div>

      </div>

    </main>
  )
}
