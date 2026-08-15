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
  const [scanning, setScanning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [registration, setRegistration] =
    useState<Registration | null>(null)

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop()
        scannerRef.current.clear()
        scannerRef.current = null
      }
    } catch (err) {
      console.error('Scanner stop error:', err)
    }

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
  throw new Error('Your admin session has expired. Please log in again.')
}

      const response = await fetch('/api/admin/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          registrationNumber: decodedText.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result?.error || 'Unable to check in registration.',
        )
      }

      setRegistration(result.registration)
      setMessage('CHECK-IN SUCCESSFUL')
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
    const cameras = await Html5Qrcode.getCameras()

    if (!cameras || cameras.length === 0) {
      throw new Error(
        'No camera was found. Please check your browser camera permission.'
      )
    }

    const rearCamera =
      cameras.find((camera) =>
        camera.label.toLowerCase().includes('back')
      ) ||
      cameras.find((camera) =>
        camera.label.toLowerCase().includes('rear')
      ) ||
      cameras[cameras.length - 1]

    const scanner = new Html5Qrcode('torq-qr-reader')

    scannerRef.current = scanner

    await scanner.start(
      rearCamera.id,
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      handleScan,
      () => {
        // Ignore QR decoding errors while scanning.
      },
    )

    setScanning(true)
  } catch (err) {
    console.error('Camera error:', err)

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
    }
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            TOR&apos;Q Check-In
          </h2>

          <p className="mt-2 text-sm text-white/60">
            Scan the participant&apos;s QR code to verify their
            registration and check them in.
          </p>
        </div>

        {!scanning && !registration && (
          <button
            type="button"
            onClick={startScanner}
            disabled={loading}
            className="w-full rounded-xl bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'PLEASE WAIT...' : 'START QR SCANNER'}
          </button>
        )}

        <div
          id="torq-qr-reader"
          className={scanning ? 'mt-4 overflow-hidden rounded-xl' : 'hidden'}
        />

        {scanning && (
          <button
            type="button"
            onClick={stopScanner}
            className="mt-4 w-full rounded-xl border border-white/20 px-6 py-3 font-semibold text-white"
          >
            STOP SCANNER
          </button>
        )}

        {loading && (
          <div className="mt-6 rounded-xl bg-white/5 p-4 text-center text-white">
            Verifying registration...
          </div>
        )}

        {message && registration && (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
            <p className="font-bold text-green-400">
              ✓ {message}
            </p>

            <div className="mt-4 space-y-2 text-sm text-white">
              <p>
                <span className="text-white/50">Registration:</span>{' '}
                {registration.registration_number}
              </p>

              <p>
                <span className="text-white/50">Name:</span>{' '}
                {registration.full_name}
              </p>

              <p>
                <span className="text-white/50">Participant:</span>{' '}
                {registration.participant_type}
              </p>

              {registration.vehicle_make && (
                <p>
                  <span className="text-white/50">Vehicle:</span>{' '}
                  {registration.vehicle_make}{' '}
                  {registration.vehicle_model || ''}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={startScanner}
              className="mt-5 w-full rounded-xl bg-white px-6 py-3 font-bold text-black"
            >
              SCAN NEXT PARTICIPANT
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
            <p className="font-bold text-red-400">
              CHECK-IN FAILED
            </p>

            <p className="mt-2 text-sm text-white/80">
              {error}
            </p>

            <button
              type="button"
              onClick={startScanner}
              className="mt-5 w-full rounded-xl bg-red-600 px-6 py-3 font-bold text-white"
            >
              TRY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
