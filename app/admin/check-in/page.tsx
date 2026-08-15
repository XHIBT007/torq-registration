'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CheckInScanner from '@/components/check-in-scanner'
import { supabase } from '@/lib/supabase'

type RecentCheckIn = {
  id: string
  registration_number: string
  full_name: string
  participant_type: string
  vehicle_make?: string | null
  vehicle_model?: string | null
  checked_in?: boolean
  checked_in_at?: string | null
}

type CheckInStats = {
  totalApproved: number
  checkedIn: number
  remaining: number
  percentage: number
  recentCheckIns: RecentCheckIn[]
}

export default function CheckInPage() {
  const [stats, setStats] = useState<CheckInStats | null>(null)
  const [loading, setLoading] = useState(true)

  const loadStats = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const token = session?.access_token

      if (!token) {
        return
      }

      const response = await fetch('/api/admin/check-in/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Unable to load check-in statistics.')
      }

      const data = await response.json()

      setStats(data)
    } catch (error) {
      console.error('Stats error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()

    const interval = setInterval(loadStats, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
              TOR&apos;Q Motorsport
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Event Check-In
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Live entrance control centre.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10"
          >
            Back to Admin
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Approved
            </p>

            <p className="mt-3 text-4xl font-bold text-white">
              {loading ? '—' : stats?.totalApproved ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400/70">
              Checked In
            </p>

            <p className="mt-3 text-4xl font-bold text-green-400">
              {loading ? '—' : stats?.checkedIn ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400/70">
              Remaining
            </p>

            <p className="mt-3 text-4xl font-bold text-yellow-400">
              {loading ? '—' : stats?.remaining ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400/70">
              Arrival Rate
            </p>

            <p className="mt-3 text-4xl font-bold text-red-400">
              {loading ? '—' : `${stats?.percentage ?? 0}%`}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">
              Event Arrival Progress
            </p>

            <p className="text-sm font-bold text-white">
              {stats?.checkedIn ?? 0} / {stats?.totalApproved ?? 0}
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-red-600 transition-all duration-500"
              style={{
                width: `${stats?.percentage ?? 0}%`,
              }}
            />
          </div>
        </div>

        {/* Scanner */}
        <div className="mb-8">
          <CheckInScanner />
        </div>

        {/* Recent check-ins */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Live Activity
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Recent Check-Ins
              </h2>
            </div>

            <button
              type="button"
              onClick={loadStats}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Refresh
            </button>
          </div>

          {!stats?.recentCheckIns?.length ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
              <p className="text-sm text-white/40">
                No participants have checked in yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentCheckIns.map((participant) => (
                <div
                  key={participant.id}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {participant.full_name}
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {participant.registration_number}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                      CHECKED IN
                    </span>

                    {participant.checked_in_at && (
                      <span className="text-xs text-white/40">
                        {new Date(
                          participant.checked_in_at,
                        ).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
