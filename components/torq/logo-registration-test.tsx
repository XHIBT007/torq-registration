'use client'

import { useState, useRef } from 'react'

type Piece = {
  id: string
  name: string
  src: string
  x: number
  y: number
  width: number
  rotation: number
}

const INITIAL_PIECES: Piece[] = [
  {
    id: 't',
    name: 'T',
    src: '/images/torq-components/t_section.png',
    x: 35,
    y: 30,
    width: 250,
    rotation: 0,
  },
  {
    id: 'turbine',
    name: 'Turbine',
    src: '/images/torq-components/turbine.png',
    x: 205,
    y: 45,
    width: 220,
    rotation: 0,
  },
  {
    id: '26',
    name: '26',
    src: '/images/torq-components/torq-26-transparent.png',
    x: 275,
    y: 105,
    width: 80,
    rotation: 0,
  },
  {
    id: 'r',
    name: 'R',
    src: '/images/torq-components/r_section.png',
    x: 390,
    y: 45,
    width: 190,
    rotation: 0,
  },
  {
    id: 'r-lower',
    name: 'R Lower',
    src: '/images/torq-components/r_lower.png',
    x: 430,
    y: 145,
    width: 150,
    rotation: 0,
  },
  {
    id: 'piston',
    name: 'Piston',
    src: '/images/torq-components/piston.png',
    x: 500,
    y: 20,
    width: 100,
    rotation: 0,
  },
  {
    id: 'q',
    name: 'Q',
    src: '/images/torq-components/q_section.png',
    x: 535,
    y: 55,
    width: 225,
    rotation: 0,
  },
  {
    id: 'q-base',
    name: 'Q Base',
    src: '/images/torq-components/q_base.png',
    x: 600,
    y: 175,
    width: 150,
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

  const [dragging, setDragging] =
    useState(false)

  const dragStart = useRef({
    pointerX: 0,
    pointerY: 0,
    pieceX: 0,
    pieceY: 0,
  })

  const selectedPiece =
    pieces.find(
      (piece) => piece.id === selected,
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

  function startDrag(
    event: React.PointerEvent<HTMLImageElement>,
    piece: Piece,
  ) {
    event.preventDefault()

    setSelected(piece.id)

    setDragging(true)

    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      pieceX: piece.x,
      pieceY: piece.y,
    }

    event.currentTarget.setPointerCapture(
      event.pointerId,
    )
  }

  function moveDrag(
    event: React.PointerEvent<HTMLImageElement>,
  ) {
    if (!dragging) return

    const dx =
      event.clientX -
      dragStart.current.pointerX

    const dy =
      event.clientY -
      dragStart.current.pointerY

    /*
     * The visible canvas may be scaled down on mobile.
     * Convert screen movement back into our 790px
     * coordinate system.
     */

    const stage =
      event.currentTarget.parentElement

    if (!stage) return

    const rect =
      stage.getBoundingClientRect()

    const scaleX =
      CANVAS_WIDTH / rect.width

    const scaleY =
      CANVAS_HEIGHT / rect.height

    updatePiece(selected, {
      x:
        dragStart.current.pieceX +
        dx * scaleX,

      y:
        dragStart.current.pieceY +
        dy * scaleY,
    })
  }

  function stopDrag() {
    setDragging(false)
  }

  function reset() {
    setPieces(INITIAL_PIECES)
  }

  function copyTransforms() {
    const output = pieces.reduce(
      (acc, piece) => {
        acc[piece.id] = {
          x: Number(piece.x.toFixed(2)),
          y: Number(piece.y.toFixed(2)),
          width: Number(
            piece.width.toFixed(2),
          ),
          rotation: Number(
            piece.rotation.toFixed(2),
          ),
        }

        return acc
      },
      {} as Record<string, object>,
    )

    navigator.clipboard
      ?.writeText(
        JSON.stringify(
          output,
          null,
          2,
        ),
      )
      .then(() => {
        alert(
          'Transform values copied.',
        )
      })
      .catch(() => {
        alert(
          JSON.stringify(
            output,
            null,
            2,
          ),
        )
      })
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

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
          "
        >
          Select a component and drag it directly over
          the original TOR&apos;Q logo. Use the controls
          below for precision adjustments.
        </p>

        {/* =====================================================
            CONTROLS
        ===================================================== */}

        <div
          className="
            mt-8
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            p-5
          "
        >

          {/* REFERENCE */}

          <label
            className="
              text-xs
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
                Number(
                  event.target.value,
                ),
              )
            }
            className="mt-3 w-full"
          />

          <div
            className="
              mt-2
              text-xs
              text-white/40
            "
          >
            {Math.round(
              referenceOpacity * 100,
            )}
            %
          </div>

          {/* COMPONENT */}

          <label
            className="
              mt-6
              block
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-white/40
            "
          >
            Component
          </label>

          <select
            value={selected}
            onChange={(event) =>
              setSelected(
                event.target.value,
              )
            }
            className="
              mt-3
              w-full
              rounded-md
              border
              border-white/10
              bg-black
              px-4
              py-3
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

          {selectedPiece && (
            <>
              {/* WIDTH */}

              <label
                className="
                  mt-6
                  block
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Size
              </label>

              <input
                type="range"
                min="30"
                max="400"
                step="1"
                value={
                  selectedPiece.width
                }
                onChange={(event) =>
                  updatePiece(
                    selected,
                    {
                      width:
                        Number(
                          event.target
                            .value,
                        ),
                    },
                  )
                }
                className="mt-3 w-full"
              />

              <p className="mt-2 font-mono text-xs text-white/40">
                {Math.round(
                  selectedPiece.width,
                )}
                px
              </p>

              {/* ROTATION */}

              <label
                className="
                  mt-6
                  block
                  text-xs
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
                  selectedPiece.rotation
                }
                onChange={(event) =>
                  updatePiece(
                    selected,
                    {
                      rotation:
                        Number(
                          event.target
                            .value,
                        ),
                    },
                  )
                }
                className="mt-3 w-full"
              />

              <p className="mt-2 font-mono text-xs text-white/40">
                {selectedPiece.rotation}°
              </p>
            </>
          )}

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
            border-red-500/40
            bg-black
            p-1
          "
        >

          <div
            className="
              relative
              mx-auto
              w-full
              touch-none
              select-none
            "
            style={{
              aspectRatio:
                `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
            }}
          >

            {/* MASTER */}

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

            {/* COMPONENTS */}

            {pieces.map((piece) => {

              const active =
                piece.id === selected

              return (
                <img
                  key={piece.id}
                  src={piece.src}
                  alt=""
                  draggable={false}
                  onPointerDown={(event) =>
                    startDrag(
                      event,
                      piece,
                    )
                  }
                  onPointerMove={
                    moveDrag
                  }
                  onPointerUp={
                    stopDrag
                  }
                  onPointerCancel={
                    stopDrag
                  }
                  className="
                    absolute
                    touch-none
                    select-none
                  "
                  style={{
                    left:
                      `${(piece.x / CANVAS_WIDTH) * 100}%`,

                    top:
                      `${(piece.y / CANVAS_HEIGHT) * 100}%`,

                    width:
                      `${(piece.width / CANVAS_WIDTH) * 100}%`,

                    height: 'auto',

                    transform:
                      `rotate(${piece.rotation}deg)`,

                    transformOrigin:
                      'top left',

                    cursor:
                      dragging &&
                      active
                        ? 'grabbing'
                        : 'grab',

                    zIndex:
                      active
                        ? 100
                        : 10,

                    outline:
                      active
                        ? '1px solid rgba(255,0,0,.8)'
                        : 'none',
                  }}
                />
              )
            })}

          </div>

        </div>

        {/* =====================================================
            ACTIVE COMPONENT
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
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-[10px]
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

                <p className="text-[10px] uppercase tracking-widest text-white/30">
                  Position
                </p>

                <p className="font-mono text-sm">
                  X {selectedPiece.x.toFixed(1)}
                  {' '}
                  Y {selectedPiece.y.toFixed(1)}
                </p>

              </div>

            </div>

            {/* X / Y */}

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-4
              "
            >

              <label
                className="
                  text-xs
                  text-white/40
                "
              >
                X

                <input
                  type="number"
                  value={
                    selectedPiece.x
                  }
                  onChange={(event) =>
                    updatePiece(
                      selected,
                      {
                        x:
                          Number(
                            event.target
                              .value,
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
                    py-3
                    font-mono
                    text-sm
                    text-white
                  "
                />

              </label>

              <label
                className="
                  text-xs
                  text-white/40
                "
              >
                Y

                <input
                  type="number"
                  value={
                    selectedPiece.y
                  }
                  onChange={(event) =>
                    updatePiece(
                      selected,
                      {
                        y:
                          Number(
                            event.target
                              .value,
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
                    py-3
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
            gap-3
          "
        >

          <button
            onClick={copyTransforms}
            className="
              flex-1
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

      </div>

    </main>
  )
}
