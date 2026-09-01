'use client'

import { useMemo, useState } from 'react'

type Piece = {
  id: string
  name: string
  src: string
  x: number
  y: number
  scale: number
  rotation: number
}

const INITIAL_PIECES: Piece[] = [
  {
    id: 't',
    name: 'T',
    src: '/images/torq-components/t_section.png',
    x: 30,
    y: 15,
    scale: 1,
    rotation: 0,
  },
  {
    id: 'turbine',
    name: 'Turbine',
    src: '/images/torq-components/turbine.png',
    x: 155,
    y: 20,
    scale: 1,
    rotation: 0,
  },
  {
    id: '26',
    name: '26',
    src: '/images/torq-components/torq-26-transparent.png',
    x: 245,
    y: 70,
    scale: 0.62,
    rotation: 0,
  },
  {
    id: 'r',
    name: 'R',
    src: '/images/torq-components/r_section.png',
    x: 340,
    y: 25,
    scale: 1.45,
    rotation: 0,
  },
  {
    id: 'r-lower',
    name: 'R Lower',
    src: '/images/torq-components/r_lower.png',
    x: 425,
    y: 125,
    scale: 0.72,
    rotation: 0,
  },
  {
    id: 'piston',
    name: 'Piston',
    src: '/images/torq-components/piston.png',
    x: 445,
    y: 10,
    scale: 0.85,
    rotation: 0,
  },
  {
    id: 'q',
    name: 'Q',
    src: '/images/torq-components/q_section.png',
    x: 510,
    y: 35,
    scale: 1.12,
    rotation: 0,
  },
  {
    id: 'q-base',
    name: 'Q Base',
    src: '/images/torq-components/q_base.png',
    x: 600,
    y: 190,
    scale: 1,
    rotation: 0,
  },
]

const CANVAS_WIDTH = 790
const CANVAS_HEIGHT = 316

export function LogoRegistrationTest() {
  const [pieces, setPieces] =
    useState<Piece[]>(INITIAL_PIECES)

  const [selected, setSelected] =
    useState('t')

  const [referenceOpacity, setReferenceOpacity] =
    useState(0.35)

  const selectedPiece = useMemo(
    () =>
      pieces.find(
        (piece) => piece.id === selected,
      ),
    [pieces, selected],
  )

  function updatePiece(
    id: string,
    updates: Partial<Piece>,
  ) {
    setPieces((current) =>
      current.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              ...updates,
            }
          : piece,
      ),
    )
  }

  function reset() {
    setPieces(INITIAL_PIECES)
  }

  function copyTransforms() {
    const output = pieces.reduce(
      (acc, piece) => {
        acc[piece.id] = {
          x: piece.x,
          y: piece.y,
          scale: piece.scale,
          rotation: piece.rotation,
        }

        return acc
      },
      {} as Record<
        string,
        {
          x: number
          y: number
          scale: number
          rotation: number
        }
      >,
    )

    navigator.clipboard?.writeText(
      JSON.stringify(output, null, 2),
    )

    alert(
      'Transform values copied to clipboard.',
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="max-w-4xl">

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.3em]
              text-red-500
            "
          >
            TOR&apos;Q / Engineering
          </p>

          <h1
            className="
              mt-3
              text-4xl
              font-black
              uppercase
              leading-none
              sm:text-6xl
            "
          >
            Component
            <br />
            Registration
          </h1>

          <p
            className="
              mt-5
              max-w-3xl
              text-sm
              leading-6
              text-white/50
              sm:text-base
            "
          >
            Select a component, then drag, scale and
            rotate it until it sits perfectly on the
            original TOR&apos;Q logo.
          </p>

        </div>

        {/* =====================================================
            CONTROLS
        ===================================================== */}

        <div
          className="
            mt-8
            grid
            gap-5
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            p-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {/* REFERENCE */}

          <div>

            <label
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/40
              "
            >
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
              className="mt-3 w-full"
            />

            <p className="mt-2 text-xs text-white/50">
              {Math.round(
                referenceOpacity * 100,
              )}
              %
            </p>

          </div>

          {/* SELECTED COMPONENT */}

          <div>

            <label
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/40
              "
            >
              Selected
            </label>

            <select
              value={selected}
              onChange={(event) =>
                setSelected(event.target.value)
              }
              className="
                mt-3
                w-full
                rounded-md
                border
                border-white/10
                bg-black
                px-3
                py-2
                text-sm
              "
            >
              {pieces.map((piece) => (
                <option
                  key={piece.id}
                  value={piece.id}
                >
                  {piece.name}
                </option>
              ))}
            </select>

          </div>

          {/* SCALE */}

          <div>

            <label
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/40
              "
            >
              Scale
            </label>

            <input
              type="range"
              min="0.2"
              max="3"
              step="0.01"
              value={
                selectedPiece?.scale ?? 1
              }
              onChange={(event) =>
                updatePiece(
                  selected,
                  {
                    scale:
                      Number(
                        event.target.value,
                      ),
                  },
                )
              }
              className="mt-3 w-full"
            />

            <p className="mt-2 text-xs text-white/50">
              {selectedPiece?.scale.toFixed(2)}
            </p>

          </div>

          {/* ROTATION */}

          <div>

            <label
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/40
              "
            >
              Rotation
            </label>

            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={
                selectedPiece?.rotation ?? 0
              }
              onChange={(event) =>
                updatePiece(
                  selected,
                  {
                    rotation:
                      Number(
                        event.target.value,
                      ),
                  },
                )
              }
              className="mt-3 w-full"
            />

            <p className="mt-2 text-xs text-white/50">
              {selectedPiece?.rotation}°
            </p>

          </div>

        </div>

        {/* =====================================================
            WORKSPACE
        ===================================================== */}

        <div
          className="
            mt-8
            overflow-hidden
            rounded-xl
            border
            border-red-500/30
            bg-black
          "
        >

          <div
            className="
              relative
              mx-auto
              w-full
            "
            style={{
              aspectRatio:
                `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
            }}
          >

            {/* =================================================
                MASTER LOGO
            ================================================= */}

            <img
              src="/images/torq-components/torq-logo-intact-reference.png"
              alt=""
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
                  referenceOpacity,
              }}
            />

            {/* =================================================
                COMPONENTS
            ================================================= */}

            {pieces.map((piece) => {

              const isSelected =
                piece.id === selected

              return (
                <img
                  key={piece.id}
                  src={piece.src}
                  alt=""
                  draggable={false}
                  onClick={() =>
                    setSelected(piece.id)
                  }
                  className="
                    absolute
                    cursor-pointer
                    select-none
                    touch-none
                  "
                  style={{
                    left: `${piece.x}px`,
                    top: `${piece.y}px`,

                    width: 'auto',

                    transform:
                      `scale(${piece.scale}) ` +
                      `rotate(${piece.rotation}deg)`,

                    transformOrigin:
                      'top left',

                    outline:
                      isSelected
                        ? '1px solid rgba(255,0,0,.8)'
                        : 'none',

                    zIndex:
                      isSelected
                        ? 100
                        : 10,
                  }}
                />
              )
            })}

          </div>

        </div>

        {/* =====================================================
            SELECTED COMPONENT INFO
        ===================================================== */}

        {selectedPiece && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-white/40
                  "
                >
                  Active component
                </p>

                <h2
                  className="
                    mt-1
                    text-xl
                    font-black
                    uppercase
                  "
                >
                  {selectedPiece.name}
                </h2>

              </div>

              <div className="text-right">

                <p className="text-xs text-white/40">
                  Position
                </p>

                <p className="font-mono text-sm">
                  X {selectedPiece.x.toFixed(1)}
                  {'  '}
                  Y {selectedPiece.y.toFixed(1)}
                </p>

              </div>

            </div>

            {/* POSITION CONTROLS */}

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-4
              "
            >

              <label className="text-xs text-white/50">

                X

                <input
                  type="number"
                  value={selectedPiece.x}
                  onChange={(event) =>
                    updatePiece(
                      selected,
                      {
                        x: Number(
                          event.target.value,
                        ),
                      },
                    )
                  }
                  className="
                    mt-2
                    w-full
                    rounded-md
                    border
                    border-white/10
                    bg-black
                    px-3
                    py-2
                    font-mono
                    text-sm
                    text-white
                  "
                />

              </label>

              <label className="text-xs text-white/50">

                Y

                <input
                  type="number"
                  value={selectedPiece.y}
                  onChange={(event) =>
                    updatePiece(
                      selected,
                      {
                        y: Number(
                          event.target.value,
                        ),
                      },
                    )
                  }
                  className="
                    mt-2
                    w-full
                    rounded-md
                    border
                    border-white/10
                    bg-black
                    px-3
                    py-2
                    font-mono
                    text-sm
                    text-white
                  "
                />

              </label>

            </div>

          </div>
        )}

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >

          <button
            onClick={copyTransforms}
            className="
              rounded-md
              bg-white
              px-5
              py-3
              text-xs
              font-black
              uppercase
              tracking-widest
              text-black
            "
          >
            Copy transforms
          </button>

          <button
            onClick={reset}
            className="
              rounded-md
              border
              border-white/10
              px-5
              py-3
              text-xs
              font-black
              uppercase
              tracking-widest
              text-white/70
            "
          >
            Reset
          </button>

        </div>

        {/* =====================================================
            ASSET LIST
        ===================================================== */}

        <div
          className="
            mt-10
            grid
            gap-3
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {pieces.map((piece) => (
            <button
              key={piece.id}
              onClick={() =>
                setSelected(piece.id)
              }
              className={`
                rounded-lg
                border
                p-4
                text-left
                transition
                ${
                  selected === piece.id
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-white/10 bg-white/[0.02]'
                }
              `}
            >

              <p
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-widest
                "
              >
                {piece.name}
              </p>

              <p
                className="
                  mt-2
                  break-all
                  text-[10px]
                  text-white/30
                "
              >
                {piece.src}
              </p>

            </button>
          ))}

        </div>

      </div>

    </main>
  )
}
