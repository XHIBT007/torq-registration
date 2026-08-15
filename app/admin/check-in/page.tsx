'use client'

import Link from 'next/link'
import CheckInScanner from '@/components/check-in-scanner'

export default function CheckInPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              TOR&apos;Q Motorsport
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Event Check-In
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Scan approved participant QR codes at the entrance.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10"
          >
            Back to Admin
          </Link>
        </div>

        <CheckInScanner />
      </div>
    </main>
  )
}
