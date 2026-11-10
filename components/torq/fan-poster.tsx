'use client'

import { Download, ImagePlus, MapPin, Share2, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'

const POSTER_WIDTH = 1080
const POSTER_HEIGHT = 1350
const MAX_FILE_SIZE = 10 * 1024 * 1024

function drawPoster(
  canvas: HTMLCanvasElement,
  photoUrl: string | null,
  fanName: string,
  onReady: () => void,
  onError: () => void,
) {
  const context = canvas.getContext('2d')
  if (!context) {
    onError()
    return () => {}
  }

  const ctx = context
  let cancelled = false
  const background = ctx.createLinearGradient(0, 0, POSTER_WIDTH, POSTER_HEIGHT)
  background.addColorStop(0, '#1c1c20')
  background.addColorStop(0.56, '#101014')
  background.addColorStop(1, '#09090b')
  ctx.fillStyle = background
  ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)

  ctx.fillStyle = '#e52226'
  ctx.fillRect(0, 0, 18, POSTER_HEIGHT)
  ctx.fillRect(62, 64, 94, 10)

  ctx.fillStyle = '#f5f1eb'
  ctx.font = '900 68px Arial, sans-serif'
  ctx.fillText('TOR’Q', 62, 162)
  ctx.fillStyle = '#b7b3b0'
  ctx.font = '700 22px Arial, sans-serif'
  ctx.letterSpacing = '7px'
  ctx.fillText('ARTISTRY IN MOTORSPORT', 64, 202)
  ctx.letterSpacing = '0px'

  const photoX = 62
  const photoY = 248
  const photoWidth = 956
  const photoHeight = 650

  if (photoUrl) {
    const image = new Image()
    image.onload = () => {
      if (cancelled) return
      const scale = Math.max(photoWidth / image.width, photoHeight / image.height)
      const width = image.width * scale
      const height = image.height * scale
      const cropOffset = (height - photoHeight) * 0.35
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 8)
      ctx.clip()
      ctx.drawImage(image, photoX + (photoWidth - width) / 2, photoY + (photoHeight - height) / 2 - cropOffset, width, height)
      const shade = ctx.createLinearGradient(0, photoY + photoHeight * 0.45, 0, photoY + photoHeight)
      shade.addColorStop(0, 'rgba(5,5,7,0)')
      shade.addColorStop(1, 'rgba(5,5,7,.58)')
      ctx.fillStyle = shade
      ctx.fillRect(photoX, photoY, photoWidth, photoHeight)
      ctx.restore()
      ctx.strokeStyle = 'rgba(255,255,255,.22)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 8)
      ctx.stroke()
      drawPosterDetails(ctx, fanName)
      onReady()
    }
    image.onerror = () => {
      if (cancelled) return
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 8)
      ctx.clip()
      ctx.fillStyle = '#24242a'
      ctx.fillRect(photoX, photoY, photoWidth, photoHeight)
      ctx.restore()
      drawPosterDetails(ctx, fanName)
      onError()
    }
    image.src = photoUrl
  } else {
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 8)
    ctx.clip()
    const placeholder = ctx.createLinearGradient(photoX, photoY, photoX + photoWidth, photoY + photoHeight)
    placeholder.addColorStop(0, '#3c1719')
    placeholder.addColorStop(0.5, '#17171c')
    placeholder.addColorStop(1, '#29292f')
    ctx.fillStyle = placeholder
    ctx.fillRect(photoX, photoY, photoWidth, photoHeight)
    ctx.strokeStyle = 'rgba(229,34,38,.55)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(photoX + 48, photoY + photoHeight - 58)
    ctx.lineTo(photoX + photoWidth - 48, photoY + 88)
    ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,255,.1)'
    ctx.beginPath()
    ctx.arc(photoX + photoWidth * 0.5, photoY + photoHeight * 0.43, 138, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = '900 34px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('YOUR PHOTO GOES HERE', POSTER_WIDTH / 2, photoY + photoHeight - 64)
    ctx.textAlign = 'left'
    ctx.restore()
    ctx.strokeStyle = 'rgba(255,255,255,.22)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 8)
    ctx.stroke()
    drawPosterDetails(ctx, fanName)
    onReady()
  }

  return () => { cancelled = true }
}

function drawPosterDetails(ctx: CanvasRenderingContext2D, fanName: string) {
  ctx.fillStyle = '#e52226'
  ctx.fillRect(62, 954, 12, 288)

  const name = fanName.trim().slice(0, 30)
  if (name) {
    ctx.fillStyle = '#f3b1a9'
    ctx.font = '700 22px Arial, sans-serif'
    ctx.letterSpacing = '6px'
    ctx.fillText('TOR’Q FAN', 98, 1010)
    ctx.letterSpacing = '0px'
    ctx.fillStyle = '#fff'
    ctx.font = '900 54px Arial, sans-serif'
    ctx.fillText(name.toUpperCase(), 96, 1080, 860)
  } else {
    ctx.fillStyle = '#fff'
    ctx.font = '900 66px Arial, sans-serif'
    ctx.fillText('I’LL BE THERE.', 96, 1070)
  }

  ctx.fillStyle = '#e52226'
  ctx.fillRect(96, 1124, 890, 2)
  ctx.fillStyle = '#fff'
  ctx.font = '900 36px Arial, sans-serif'
  ctx.fillText('THE IBADAN CIVIC CENTRE', 96, 1192, 880)
  ctx.fillStyle = '#c8c4c1'
  ctx.font = '700 25px Arial, sans-serif'
  ctx.letterSpacing = '3px'
  ctx.fillText('IBADAN, NIGERIA  ·  DECEMBER 6, 2026', 98, 1240, 870)
  ctx.letterSpacing = '0px'
  ctx.fillStyle = '#f3f0ec'
  ctx.font = '700 20px Arial, sans-serif'
  ctx.fillText('TORQ.NG', 96, 1300)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#e52226'
  ctx.fillText('#TORQ2026', 986, 1300)
  ctx.textAlign = 'left'
}

export function FanPoster() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [fanName, setFanName] = useState('')
  const [status, setStatus] = useState('')
  const [posterReady, setPosterReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    setPosterReady(false)
    return drawPoster(
      canvasRef.current,
      photoUrl,
      fanName,
      () => setPosterReady(true),
      () => {
        setStatus('That photo could not be opened. Try another image.')
        setPosterReady(true)
      },
    )
  }, [photoUrl, fanName])

  useEffect(() => () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
  }, [photoUrl])

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setStatus('Choose an image file to personalize your poster.')
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

  function downloadPoster() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'my-torq-moment.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    setStatus('Your TOR’Q poster is ready to share.')
  }

  async function sharePoster() {
    const canvas = canvasRef.current
    if (!canvas) return
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) {
      setStatus('Could not prepare the poster. Please download it instead.')
      return
    }
    const file = new File([blob], 'my-torq-moment.png', { type: 'image/png' })
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'My TOR’Q moment', text: 'See you at TOR’Q 2026!' })
        setStatus('Your poster was shared.')
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
        setStatus('Sharing isn’t available here. Download your poster and share it from your gallery.')
      }
    } else {
      setStatus('Image sharing isn’t supported in this browser. Download your poster and share it from your gallery.')
    }
  }

  return (
    <section id="fan-moment" aria-labelledby="fan-moment-title" className="border-y border-white/10 bg-[#111114] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-300 sm:text-xs"><Sparkles className="h-4 w-4" /> Make it your moment</p>
          <h2 id="fan-moment-title" className="max-w-xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.045em] sm:text-5xl md:text-6xl">Put yourself in the <span className="text-red-500">TOR’Q story.</span></h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/65 sm:text-base sm:leading-7">Create a personal event poster, then download it or share it with your crew.</p>

          <label className="mt-7 block text-xs font-bold uppercase tracking-[0.16em] text-white/75" htmlFor="fan-poster-name">Your name <span className="font-normal normal-case tracking-normal text-white/35">(optional)</span></label>
          <input id="fan-poster-name" value={fanName} maxLength={30} onChange={(event) => setFanName(event.target.value)} placeholder="Type your name" className="mt-2 w-full max-w-md rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-red-500 focus:ring-1 focus:ring-red-500" />

          <label htmlFor="fan-poster-photo" className="mt-4 inline-flex min-h-12 w-full max-w-md cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-red-400 hover:bg-white/[0.07] focus-within:outline-none focus-within:ring-2 focus-within:ring-red-400">
            <ImagePlus className="h-4 w-4 text-red-400" /> {photoUrl ? 'Choose a different photo' : 'Add a photo'}
          </label>
          <input id="fan-poster-photo" type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
          <p className="mt-2 max-w-md text-xs leading-5 text-white/40">A portrait selfie works best. Your photo stays on this device and is never uploaded.</p>

          <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row">
            <button type="button" onClick={downloadPoster} disabled={!posterReady} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]">
              <Download className="h-4 w-4" /> Download poster
            </button>
            <button type="button" onClick={sharePoster} disabled={!posterReady} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]">
              <Share2 className="h-4 w-4" /> Share image
            </button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs text-red-200">{status}</p>
          <p className="mt-1 flex items-center gap-2 text-xs text-white/40"><MapPin className="h-3.5 w-3.5 text-red-400" /> The Ibadan civic centre · December 6, 2026</p>
        </div>

        <div className="mx-auto w-full max-w-[460px] rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-2xl sm:p-4">
          <canvas ref={canvasRef} width={POSTER_WIDTH} height={POSTER_HEIGHT} role="img" aria-label={`Preview of your TOR’Q 2026 poster${fanName ? ` for ${fanName}` : ''}`} className="h-auto w-full rounded-lg" />
        </div>
      </div>
    </section>
  )
}
