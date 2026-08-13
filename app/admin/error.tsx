'use client'

import { useEffect } from 'react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('ADMIN PAGE ERROR:', error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-red-500/30 bg-white/[0.03] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
          TOR&apos;Q Motorsport
        </p>

        <h1 className="mt-3 text-2xl font-black">
          Admin Page Error
        </h1>

        <p className="mt-4 text-sm text-white/50">
          The admin page encountered a runtime error.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-black p-4">
          <p className="font-mono text-sm text-red-400">
            {error?.message || 'Unknown error'}
          </p>
        </div>

        {error?.digest && (
          <p className="mt-3 text-xs text-white/30">
            Error ID: {error.digest}
          </p>
        )}

        <button
          onClick={() => reset()}
          className="mt-6 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    </main>
  )
}
