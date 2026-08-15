'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { supabase } from '@/lib/supabase'

type Registration = {
  id: string
  registration_number: string
  full_name: string
  email: string
  phone: string
  participant_type: string
  vehicle_make?: string | null
  vehicle_model?: string | null
  status: string
  checked_in?: boolean
  checked_in_at?: string | null
}

export default function CheckInScanner() {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const successAudioRef = useRef<AudioContext | null>(null)
  const errorAudioRef = useRef<AudioContext | null>(null)

  const [scanning, setScanning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [registration, setRegistration] =
    useState<Registration | null>(null)

  const playSuccessSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext
          }
        ).webkitAudioContext

      if (!AudioContextClass) return

      if (!successAudioRef.current) {
        successAudioRef.current = new AudioContextClass()
      }

      const context = successAudioRef.current

      const oscillator = context.createOscillator()
      const gain = context.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(
        880,
        context.currentTime,
      )

      oscillator.frequency.setValueAtTime(
        1174,
        context.currentTime + 0.12,
      )

      gain.gain.setValueAtTime(
        0.001,
        context.currentTime,
      )

      gain.gain.exponentialRampToValueAtTime(
        0.25,
        context.currentTime + 0.02,
      )

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.35,
      )

      oscillator.connect(gain)
      gain.connect(context.destination)

      oscillator.start()
      oscillator.stop(context.currentTime + 0.35)
    } catch (err) {
      console.error('Success sound error:', err)
    }
  }

  const playErrorSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext
          }
        ).webkitAudioContext

      if (!AudioContextClass) return

      if (!errorAudioRef.current) {
        errorAudioRef.current = new AudioContextClass()
      }

      const context = errorAudioRef.current

      const oscillator = context.createOscillator()
      const gain = context.createGain()

      oscillator.type = 'square'

      oscillator.frequency.setValueAtTime(
        220,
        context.currentTime,
      )

      oscillator.frequency.setValueAtTime(
        160,
        context.currentTime + 0.18,
      )

      gain.gain.setValueAtTime(
        0.001,
        context.currentTime,
      )

      gain.gain.exponentialRampToValueAtTime(
        0.18,
        context.currentTime + 0.02,
      )

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.45,
      )

      oscillator.connect(gain)
      gain.connect(context.destination)

      oscillator.start()
      oscillator.stop(context.currentTime + 0.45)
    } catch (err) {
      console.error('Error sound error:', err)
    }
  }

  const stopScanner = async () => {
    const scanner = scannerRef.current

    if (!scanner) {
      setScanning(false)
      return
    }

    try {
      if (scanner.isScanning) {
        await scanner.stop()
      }
    } catch (err) {
      console.error('Scanner stop error:', err)
    }

    try {
      scanner.clear()
    } catch (err) {
      console.error('Scanner clear error:', err)
    }

    scannerRef.current = null
    setScanning(false)
  }

  const handleScan = async (decodedText: string) => {
    if (loading) return

    setLoading(true)
    setError('')
    setMessage('')

    await stopScanner()

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const token = session?.access_token

      if (!token) {
        throw new Error(
          'Your admin session has expired. Please log in again.',
        )
      }

      const response = await fetch(
        '/api/admin/check-in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            registrationNumber:
              decodedText.trim(),
          }),
        },
      )

      const result = await response.json()

      if (!response.ok) {
        playErrorSound()

        throw new Error(
          result?.error ||
            'Unable to check in registration.',
        )
      }

      setRegistration(result.registration)
      setMessage('CHECK-IN SUCCESSFUL')

      playSuccessSound()
    } catch (err) {
      console.error('Check-in error:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to complete check-in.',
      )
    } finally {
      setLoading(false)
    }
  }

  const startScanner = async () => {
    setError('')
    setMessage('')
    setRegistration(null)

    try {
      const cameras =
        await Html5Qrcode.getCameras()

      console.log(
        'Available cameras:',
        cameras,
      )

      if (!cameras || cameras.length === 0) {
        throw new Error(
          'No camera was found. Please check your browser camera permission.',
        )
      }

      const rearCamera =
        cameras.find((camera) =>
          camera.label
            .toLowerCase()
            .includes('back'),
        ) ||
        cameras.find((camera) =>
          camera.label
            .toLowerCase()
            .includes('rear'),
        ) ||
        cameras[cameras.length - 1]

      const scanner =
        new Html5Qrcode('torq-qr-reader')

      scannerRef.current = scanner

      console.log(
        'Starting camera:',
        rearCamera,
      )

      await scanner.start(
        rearCamera.id,
        {
          fps: 10,
          qrbox: {
            width: 280,
            height: 280,
          },
        },
        handleScan,
        () => {
          // Ignore QR decoding errors.
        },
      )

      setScanning(true)
    } catch (err) {
      console.error(
        'Camera error:',
        err,
      )

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to access the camera. Please allow camera access and try again.',
      )

      scannerRef.current = null
      setScanning(false)
    }
  }

  useEffect(() => {
    return () => {
      stopScanner()

      successAudioRef.current?.close()
      errorAudioRef.current?.close()
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#090909] shadow-2xl">

        {/* Header */}
        <div className="border-b border-white/10 px-5 py-5 sm:px-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                TOR&apos;Q Motorsport
              </p>

              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                Entrance Check-In
              </h2>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                scanning
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-white/5 text-white/40'
              }`}
            >
              {scanning
                ? 'Scanner Ready'
                : 'Standby'}
            </div>
          </div>

          <p className="mt-2 text-sm text-white/40">
            Scan the participant QR code to verify
            and admit them.
          </p>
        </div>

        {/* Scanner */}
        {!registration && !error && (
          <div className="p-5 sm:p-7">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div
                id="torq-qr-reader"
                className="min-h-[320px] w-full overflow-hidden"
              />

              {!scanning && !loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-6">
                  <button
                    type="button"
                    onClick={startScanner}
                    className="w-full max-w-sm rounded-2xl bg-red-600 px-6 py-5 text-lg font-black text-white shadow-lg transition hover:bg-red-700 active:scale-[0.98]"
                  >
                    START SCANNER
                  </button>
                </div>
              )}
            </div>

            {scanning && (
              <button
                type="button"
                onClick={stopScanner}
                className="mt-4 w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                STOP SCANNER
              </button>
            )}

            {loading && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <div className="text-sm font-bold uppercase tracking-wider text-white">
                  Verifying Registration
                </div>

                <p className="mt-1 text-xs text-white/40">
                  Please wait...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Success */}
        {message && registration && (
          <div className="p-5 sm:p-7">
            <div className="rounded-3xl border border-green-500/30 bg-green-500/[0.08] p-6 text-center sm:p-10">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-4xl font-black text-black">
                ✓
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-green-400">
                Check-In Successful
              </p>

              <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                {registration.full_name}
              </h3>

              <div className="mt-4 inline-flex rounded-full bg-white/5 px-4 py-2">
                <span className="text-sm font-bold tracking-wider text-white/70">
                  {registration.registration_number}
                </span>
              </div>

              <div className="mt-7 grid gap-3 text-left sm:grid-cols-2">
                <div className="rounded-xl bg-black/30 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                    Participant
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {registration.participant_type}
                  </p>
                </div>

                {registration.vehicle_make && (
                  <div className="rounded-xl bg-black/30 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                      Vehicle
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      {registration.vehicle_make}{' '}
                      {registration.vehicle_model || ''}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={startScanner}
                className="mt-7 w-full rounded-2xl bg-white px-6 py-5 text-base font-black text-black transition hover:bg-white/90 active:scale-[0.99]"
              >
                SCAN NEXT PARTICIPANT
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !message && (
          <div className="p-5 sm:p-7">
            <div className="rounded-3xl border border-red-500/30 bg-red-500/[0.08] p-6 text-center sm:p-10">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-3xl font-black text-white">
                !
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-red-400">
                Check-In Failed
              </p>

              <h3 className="mt-3 text-xl font-bold text-white">
                Participant Could Not Be Checked In
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
                {error}
              </p>

              <button
                type="button"
                onClick={startScanner}
                className="mt-7 w-full rounded-2xl bg-red-600 px-6 py-5 text-base font-black text-white transition hover:bg-red-700 active:scale-[0.99]"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
