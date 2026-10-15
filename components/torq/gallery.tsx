'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Images } from 'lucide-react'

import { GALLERY_ALBUMS } from '@/lib/torq-data'
import { Reveal } from './reveal'
import { Lightbox } from './lightbox'

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null)
  const activeAlbum = GALLERY_ALBUMS.find((album) => album.id === activeAlbumId) ?? null
  const totalPhotos = GALLERY_ALBUMS.reduce((total, album) => total + album.images.length, 0)

  useEffect(() => {
    if (!activeAlbumId) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('gallery-album-content')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [activeAlbumId])

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-black py-24 text-white md:py-32"
    >
      {/* ==========================================================
          ATMOSPHERE
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[460px]
          w-[680px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.045]
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-[360px]
          w-[360px]
          rounded-full
          bg-red-600/[0.025]
          blur-[110px]
        "
      />

      {/* ==========================================================
          INTRO
          ========================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="max-w-5xl">
            <p
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[0.32em]
                text-red-500
                sm:text-sm
              "
            >
              The Gallery
            </p>

            <h2
              className="
                text-5xl
                font-black
                uppercase
                leading-[0.88]
                tracking-[-0.04em]
                md:text-7xl
                lg:text-8xl
              "
            >
              The Machines.
              <br />

              <span className="text-red-500">
                The Moments.
              </span>

              <br />

              The Culture.
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                leading-7
                text-white/45
                sm:text-lg
                sm:leading-8
                md:text-xl
              "
            >
              Open a collection to explore the machines, special guests, and people
              who bring TOR&apos;Q to life. Every album leads to the full photo archive.
            </p>
          </div>
        </Reveal>
      </div>

      {!activeAlbum ? (
        <div className="relative mx-auto mt-10 max-w-7xl px-6 md:mt-14 md:px-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-400 sm:text-[11px]">
                Choose a collection
              </p>
              <p className="mt-2 text-sm text-white/45">
                Open an album to browse its photographs.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              <Images className="h-4 w-4 text-red-400" />
              {GALLERY_ALBUMS.length} albums · {totalPhotos} photographs
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {GALLERY_ALBUMS.map((album, index) => (
              <Reveal key={album.id} delay={index * 90}>
                <AlbumCard
                  album={album}
                  index={index}
                  onOpen={() => {
                    setActiveAlbumId(album.id)
                    setActiveIndex(null)
                  }}
                />
              </Reveal>
            ))}
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-white/30 sm:text-[10px]">
            Select any album to unlock the full photo gallery
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-red-400" />
          </p>
        </div>
      ) : (
        <Reveal key={activeAlbum.id} className="relative mx-auto mt-10 max-w-7xl px-6 md:mt-14 md:px-10">
          <button
            id="gallery-album-content"
            type="button"
            onClick={() => {
              setActiveAlbumId(null)
              setActiveIndex(null)
            }}
            className="group scroll-mt-24 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All albums
          </button>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-red-400">
                Collection {String(GALLERY_ALBUMS.findIndex((album) => album.id === activeAlbum.id) + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.025em] sm:text-3xl">
                {activeAlbum.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                {activeAlbum.description}
              </p>
            </div>
            <span className="text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
              {String(activeAlbum.images.length).padStart(2, '0')} photographs
              <span className="mt-2 block text-[9px] font-medium tracking-[0.12em] text-white/30">
                Select a photo to expand
              </span>
            </span>
          </div>
        </Reveal>
      )}

      {/* ==========================================================
          GALLERY RAIL
          ========================================================== */}

      {activeAlbum && <div className="relative mt-10 md:mt-14">
        {/* DESKTOP EDGE FADES */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            hidden
            h-full
            w-24
            bg-gradient-to-r
            from-black
            to-transparent
            md:block
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            hidden
            h-full
            w-24
            bg-gradient-to-l
            from-black
            to-transparent
            md:block
          "
        />

        <div
          className="
            torq-scroll-rail
            overflow-x-auto
            overscroll-x-contain
            px-6
            pb-5
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            md:px-[8vw]
          "
        >
          <div className="flex w-max snap-x snap-mandatory gap-4 sm:gap-5 md:gap-6">
            {activeAlbum.images.map((img, index) => (
              <GalleryCard
                key={`${img.src}-${index}`}
                img={img}
                index={index}
                total={activeAlbum.images.length}
                onOpen={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>}

      {/* ==========================================================
          MOVEMENT CUE
          ========================================================== */}

      {activeAlbum && <div
        className="
          mx-auto
          mt-5
          flex
          max-w-7xl
          items-center
          gap-4
          px-6
          md:mt-7
          md:px-10
        "
      >
        <div className="h-px flex-1 bg-white/10" />

        <div className="flex shrink-0 items-center gap-3">
          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-white/30
              sm:text-[10px]
            "
          >
            Scroll or swipe through the album · Select any photo to expand
          </span>

          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 text-red-500"
          />
        </div>

        <div className="h-px flex-1 bg-white/10" />
      </div>}

      {/* ==========================================================
          CLOSING STATEMENT
          ========================================================== */}

      <Reveal
        delay={150}
        className="
          mx-auto
          mt-20
          max-w-7xl
          border-t
          border-white/10
          px-6
          pt-10
          md:mt-28
          md:px-10
        "
      >
        <div
          className="
            flex
            flex-col
            gap-8
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.32em]
                text-white/30
              "
            >
              Artistry in Motorsport
            </p>

            <h3
              className="
                mt-4
                max-w-2xl
                text-3xl
                font-black
                uppercase
                leading-[0.95]
                tracking-[-0.025em]
                md:text-5xl
              "
            >
              Every machine
              <br />
              has a story.
              <br />

              <span className="text-red-500">
                TOR&apos;Q tells it.
              </span>
            </h3>
          </div>

          <p
            className="
              max-w-sm
              text-sm
              leading-6
              text-white/35
            "
          >
            From the roar of the engine to the details in the
            build, this is where performance becomes culture.
          </p>
        </div>
      </Reveal>

      {/* ==========================================================
          LIGHTBOX
          ========================================================== */}

      {activeIndex !== null && activeAlbum && (
        <Lightbox
          images={activeAlbum.images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  )
}

/* ================================================================
   ALBUM ENTRY CARD
   ================================================================ */

function AlbumCard({
  album,
  index,
  onOpen,
}: {
  album: (typeof GALLERY_ALBUMS)[number]
  index: number
  onOpen: () => void
}) {
  const [cover, ...previews] = album.images

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${album.title}, ${album.images.length} photographs`}
      className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-[#11100f] text-left transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_70px_rgba(0,0,0,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[1.15] overflow-hidden bg-neutral-900">
        <img
          src={cover.src || '/placeholder.svg'}
          alt=""
          aria-hidden="true"
          loading={index === 0 ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] motion-reduce:transition-none"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
            Collection {String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
            {String(album.images.length).padStart(2, '0')} photos
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <div className="min-w-0 pb-1">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-red-300">
              TOR’Q archive
            </p>
            <h3 className="text-xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-white sm:text-2xl">
              {album.title}
            </h3>
          </div>
          <div aria-hidden="true" className="flex shrink-0 -space-x-3 pb-1">
            {previews.slice(0, 2).map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt=""
                className="h-12 w-9 rounded-md border border-white/60 object-cover shadow-lg sm:h-14 sm:w-10"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="min-h-10 text-xs leading-5 text-white/50 sm:text-sm sm:leading-6">
          {album.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/65">
            Open album
          </span>
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/75 transition-[background-color,border-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:border-red-400/50 group-hover:bg-red-500 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </button>
  )
}

/* ================================================================
   GALLERY CARD
   ================================================================ */

function GalleryCard({
  img,
  index,
  total,
  onOpen,
}: {
  img: (typeof GALLERY_ALBUMS)[number]['images'][number]
  index: number
  total: number
  onOpen: () => void
}) {
  const number = String(index + 1).padStart(2, '0')
  const totalNumber = String(total).padStart(2, '0')

  return (
    <article
      className="
        group
        torq-carousel-card
        relative
        shrink-0
        snap-start
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-neutral-950
      "
    >
      <button
        type="button"
        onClick={onOpen}
        className="
          absolute
          inset-0
          z-20
          cursor-pointer
          rounded-2xl
          text-left
          outline-none
          focus-visible:ring-2
          focus-visible:ring-red-500
          focus-visible:ring-inset
        "
        aria-label={`Open image ${index + 1} of ${total}: ${img.alt}`}
      >
        <span className="sr-only">
          Open {img.alt}
        </span>
      </button>

      {/* ==========================================================
          IMAGE
          ========================================================== */}

      <img
        src={img.src || '/placeholder.svg'}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading={index < 2 ? 'eager' : 'lazy'}
        className="
          h-full
          w-full
          select-none
          object-cover
          transition-transform
          duration-500
          ease-out
          motion-reduce:transition-none
          group-hover:scale-[1.025]
        "
      />

      {/* ==========================================================
          CINEMATIC OVERLAY
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/95
          via-black/15
          to-black/5
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/0
          transition-colors
          duration-300
          motion-reduce:transition-none
          group-hover:bg-black/10
        "
      />

      {/* ==========================================================
          TOP METADATA
          ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-10
          flex
          items-start
          justify-between
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            h-10
            min-w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/40
            px-3
            text-[10px]
            font-bold
            tabular-nums
            tracking-[0.12em]
            text-white/85
            backdrop-blur-md
          "
        >
          {number}
        </div>

        <div
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-white/45
          "
        >
          {number} / {totalNumber}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end p-5 sm:p-6 md:p-7">
        <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white backdrop-blur-md transition-all duration-300 motion-reduce:transition-none group-hover:border-white/35 group-hover:bg-white/[0.14]">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none group-hover:rotate-45" />
        </div>
      </div>

      {/* ==========================================================
          TOR'Q ACCENT
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-10
          h-[2px]
          w-full
          origin-left
          scale-x-0
          bg-red-500
          transition-transform
          duration-300
          motion-reduce:transition-none
          group-hover:scale-x-100
        "
      />
    </article>
  )
}
