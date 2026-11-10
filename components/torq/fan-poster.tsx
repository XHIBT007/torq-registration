'use client'

import { Download, ImagePlus, MapPin, Share2, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'

const IMAGE_WIDTH = 1080
const IMAGE_HEIGHT = 1920
const MAX_FILE_SIZE = 10 * 1024 * 1024

const LENSES = [
  { id: 'race-day', name: 'Race day', badge: 'RACE DAY READY', accent: '#f3292d', glow: 'rgba(243,41,45,.6)' },
  { id: 'pit-crew', name: 'Pit crew', badge: 'PIT CREW PASS', accent: '#ffc344', glow: 'rgba(255,195,68,.52)' },
  { id: 'ibadan', name: 'Ibadan takeover', badge: 'IBADAN TAKEOVER', accent: '#ff5938', glow: 'rgba(255,89,56,.58)' },
] as const

type LensId = (typeof LENSES)[number]['id']

function drawCapsule(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  ctx.beginPath()
  ctx.roundRect(x, y, width, height, height / 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawLens(canvas: HTMLCanvasElement, photoUrl: string | null, fanName: string, lensId: LensId, onReady: () => void, onError: () => void) {
  let cancelled = false
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    onError()
    return () => {}
  }
  const lens = LENSES.find((item) => item.id === lensId) ?? LENSES[0]

  const drawOverlay = () => {
    const topShade = ctx.createLinearGradient(0, 0, 0, 600)
    topShade.addColorStop(0, 'rgba(3,3,5,.78)')
    topShade.addColorStop(0.68, 'rgba(3,3,5,.16)')
    topShade.addColorStop(1, 'rgba(3,3,5,0)')
    ctx.fillStyle = topShade
    ctx.fillRect(0, 0, IMAGE_WIDTH, 600)

    const bottomShade = ctx.createLinearGradient(0, 1080, 0, IMAGE_HEIGHT)
    bottomShade.addColorStop(0, 'rgba(3,3,5,0)')
    bottomShade.addColorStop(0.29, 'rgba(3,3,5,.66)')
    bottomShade.addColorStop(1, 'rgba(3,3,5,.96)')
    ctx.fillStyle = bottomShade
    ctx.fillRect(0, 1080, IMAGE_WIDTH, IMAGE_HEIGHT - 1080)

    const glow = ctx.createRadialGradient(IMAGE_WIDTH * 0.5, 1330, 50, IMAGE_WIDTH * 0.5, 1330, 690)
    glow.addColorStop(0, lens.glow)
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 780, IMAGE_WIDTH, 800)

    // Lens frame and angular light streaks sit over the photo like a camera filter.
    ctx.save()
    ctx.strokeStyle = lens.accent
    ctx.globalAlpha = 0.88
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(52, 292); ctx.lineTo(52, 108); ctx.lineTo(218, 108)
    ctx.moveTo(1028, 292); ctx.lineTo(1028, 108); ctx.lineTo(862, 108)
    ctx.moveTo(52, 1538); ctx.lineTo(52, 1812); ctx.lineTo(218, 1812)
    ctx.moveTo(1028, 1538); ctx.lineTo(1028, 1812); ctx.lineTo(862, 1812)
    ctx.stroke()

    ctx.globalAlpha = 0.44
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.ellipse(540, 770, 486, 630, -0.12, Math.PI * 1.05, Math.PI * 1.95)
    ctx.stroke()
    ctx.restore()

    // TOR’Q wordmark and lens label.
    ctx.fillStyle = lens.accent
    ctx.beginPath()
    ctx.arc(100, 206, 36, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = '900 34px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Q', 100, 218)
    ctx.textAlign = 'left'
    ctx.fillStyle = '#fff'
    ctx.font = '900 68px Arial, sans-serif'
    ctx.fillText('TOR’Q', 154, 218)
    ctx.fillStyle = 'rgba(255,255,255,.74)'
    ctx.font = '700 21px Arial, sans-serif'
    ctx.letterSpacing = '6px'
    ctx.fillText('OFFICIAL EVENT LENS', 158, 258)
    ctx.letterSpacing = '0px'

    // The pill reads like a playful camera sticker.
    drawCapsule(ctx, 62, 334, 346, 64, 'rgba(5,5,7,.68)')
    ctx.strokeStyle = lens.accent
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(62, 334, 346, 64, 32)
    ctx.stroke()
    ctx.fillStyle = lens.accent
    ctx.beginPath()
    ctx.arc(96, 366, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = '900 24px Arial, sans-serif'
    ctx.fillText(lens.badge, 120, 375)

    // Decorative racing checks in the upper corner.
    const checkSize = 22
    ctx.save()
    ctx.globalAlpha = 0.85
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 6; col += 1) {
        ctx.fillStyle = (row + col) % 2 === 0 ? '#fff' : 'rgba(255,255,255,.12)'
        ctx.fillRect(872 + col * checkSize, 326 + row * checkSize, checkSize, checkSize)
      }
    }
    ctx.restore()

    // Event copy sits low enough to keep the face clear in a typical selfie.
    ctx.fillStyle = 'rgba(255,255,255,.76)'
    ctx.font = '800 24px Arial, sans-serif'
    ctx.letterSpacing = '8px'
    ctx.fillText('TOR’Q 2026  ·  DECEMBER 6', 74, 1452)
    ctx.letterSpacing = '0px'

    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,.4)'
    ctx.shadowBlur = 20
    ctx.fillStyle = '#fff'
    ctx.font = 'italic 900 112px Arial, sans-serif'
    const headline = fanName.trim() ? fanName.trim().slice(0, 18).toUpperCase() : 'I’M GOING'
    ctx.fillText(headline, 68, 1584, 920)
    ctx.restore()

    ctx.fillStyle = lens.accent
    ctx.fillRect(74, 1630, 932, 5)
    ctx.fillStyle = '#fff'
    ctx.font = '900 46px Arial, sans-serif'
    ctx.fillText('THE IBADAN CIVIC CENTRE', 74, 1706, 930)

    // Small location pin mark.
    ctx.fillStyle = lens.accent
    ctx.beginPath()
    ctx.arc(88, 1764, 11, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = '700 27px Arial, sans-serif'
    ctx.fillText('IBADAN, NIGERIA', 114, 1773)

    drawCapsule(ctx, 738, 1734, 270, 66, lens.accent)
    ctx.fillStyle = lens.id === 'pit-crew' ? '#1b1710' : '#fff'
    ctx.font = '900 23px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('#TORQ2026', 873, 1777)
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(255,255,255,.72)'
    ctx.font = '700 19px Arial, sans-serif'
    ctx.letterSpacing = '5px'
    ctx.fillText('ARTISTRY IN MOTORSPORT', 74, 1850)
    ctx.letterSpacing = '0px'
  }

  ctx.clearRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
  ctx.fillStyle = '#141418'
  ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)

  if (!photoUrl) {
    const backdrop = ctx.createLinearGradient(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
    backdrop.addColorStop(0, '#502023')
    backdrop.addColorStop(0.52, '#25252c')
    backdrop.addColorStop(1, '#100f12')
    ctx.fillStyle = backdrop
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
    ctx.save()
    ctx.globalAlpha = 0.24
    ctx.strokeStyle = lens.accent
    ctx.lineWidth = 4
    for (let line = -600; line < 1800; line += 180) {
      ctx.beginPath()
      ctx.moveTo(line, 0)
      ctx.lineTo(line + 900, IMAGE_HEIGHT)
      ctx.stroke()
    }
    ctx.restore()
    ctx.fillStyle = 'rgba(5,5,7,.42)'
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
    ctx.fillStyle = 'rgba(255,255,255,.88)'
    ctx.textAlign = 'center'
    ctx.font = '900 44px Arial, sans-serif'
    ctx.fillText('ADD YOUR SELFIE TO TRY THE LENS', IMAGE_WIDTH / 2, 950, 880)
    ctx.textAlign = 'left'
    drawOverlay()
    onReady()
    return () => { cancelled = true }
  }

  const image = new Image()
  image.onload = () => {
    if (cancelled) return
    const scale = Math.max(IMAGE_WIDTH / image.width, IMAGE_HEIGHT / image.height)
    const width = image.width * scale
    const height = image.height * scale
    const cropTop = Math.max(0, (height - IMAGE_HEIGHT) * 0.34)
    ctx.drawImage(image, (IMAGE_WIDTH - width) / 2, (IMAGE_HEIGHT - height) / 2 - cropTop, width, height)
    drawOverlay()
    onReady()
  }
  image.onerror = () => {
    if (cancelled) return
    onError()
  }
  image.src = photoUrl
  return () => { cancelled = true }
}

export function FanPoster() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [fanName, setFanName] = useState('')
  const [lensId, setLensId] = useState<LensId>('race-day')
  const [status, setStatus] = useState('')
  const [lensReady, setLensReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    setLensReady(false)
    return drawLens(
      canvasRef.current,
      photoUrl,
      fanName,
      lensId,
      () => setLensReady(true),
      () => {
        setStatus('That photo could not be opened. Try another image.')
        setLensReady(true)
      },
    )
  }, [photoUrl, fanName, lensId])

  useEffect(() => () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
  }, [photoUrl])

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setStatus('Choose an image file to try the lens.')
      event.target.value = ''
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setStatus('That image is over 10 MB. Choose a smaller photo and try again.')
      event.target.value = ''
      return
    }
    setStatus('')
    setPhotoUrl(URL.createObjectURL(file))
  }

  function downloadLens() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'my-torq-lens.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    setStatus('Your TOR’Q lens image is ready to share.')
  }

  async function shareLens() {
    const canvas = canvasRef.current
    if (!canvas) return
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) {
      setStatus('Could not prepare the image. Please download it instead.')
      return
    }
    const file = new File([blob], 'my-torq-lens.png', { type: 'image/png' })
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'My TOR’Q lens', text: 'See you at TOR’Q 2026!' })
        setStatus('Your TOR’Q lens image was shared.')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
        setStatus('Sharing isn’t available here. Download the image and share it from your gallery.')
      }
    } else {
      setStatus('Image sharing isn’t supported in this browser. Download the image and share it from your gallery.')
    }
  }

  return (
    <section id="fan-moment" aria-labelledby="fan-moment-title" className="border-y border-white/10 bg-[#111114] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-300 sm:text-xs"><Sparkles className="h-4 w-4" /> Official TOR’Q lens</p>
          <h2 id="fan-moment-title" className="max-w-xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.045em] sm:text-5xl md:text-6xl">Get the <span className="text-red-500">TOR’Q look.</span></h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/65 sm:text-base sm:leading-7">Add your selfie, pick a lens style and share your TOR’Q moment with the crew.</p>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-white/75">Pick your lens style</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Lens style">
            {LENSES.map((lens) => (
              <button key={lens.id} type="button" aria-pressed={lensId === lens.id} onClick={() => setLensId(lens.id)} className={`min-h-10 rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${lensId === lens.id ? 'border-red-500 bg-red-600 text-white' : 'border-white/15 bg-white/[0.04] text-white/70 hover:border-white/40 hover:text-white'}`}>
                {lens.name}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-white/75" htmlFor="fan-poster-name">Your name <span className="font-normal normal-case tracking-normal text-white/35">(optional)</span></label>
          <input id="fan-poster-name" value={fanName} maxLength={18} onChange={(event) => setFanName(event.target.value)} placeholder="Type your name" className="mt-2 w-full max-w-md rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-red-500 focus:ring-1 focus:ring-red-500" />

          <label htmlFor="fan-poster-photo" className="mt-4 inline-flex min-h-12 w-full max-w-md cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-red-400 hover:bg-white/[0.07] focus-within:outline-none focus-within:ring-2 focus-within:ring-red-400">
            <ImagePlus className="h-4 w-4 text-red-400" /> {photoUrl ? 'Choose a different selfie' : 'Add your selfie'}
          </label>
          <input id="fan-poster-photo" type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
          <p className="mt-2 max-w-md text-xs leading-5 text-white/40">Portrait photos work best. Your photo stays on this device and is never uploaded.</p>

          <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row">
            <button type="button" onClick={downloadLens} disabled={!lensReady} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]">
              <Download className="h-4 w-4" /> Download filter
            </button>
            <button type="button" onClick={shareLens} disabled={!lensReady} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]">
              <Share2 className="h-4 w-4" /> Share image
            </button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs text-red-200">{status}</p>
          <p className="mt-1 flex items-center gap-2 text-xs text-white/40"><MapPin className="h-3.5 w-3.5 text-red-400" /> The Ibadan civic centre · December 6, 2026</p>
        </div>

        <div className="mx-auto w-full max-w-[400px] rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-2xl sm:p-4">
          <canvas ref={canvasRef} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} role="img" aria-label={`Preview of your TOR’Q official lens image${fanName ? ` for ${fanName}` : ''}`} className="h-auto w-full rounded-lg" />
        </div>
      </div>
    </section>
  )
}
