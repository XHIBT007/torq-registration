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

type SearchResult = {
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

export default function CheckInPage() {
  const [stats, setStats] = useState<CheckInStats | null>(null)
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [manualCheckingIn, setManualCheckingIn] = useState(false)
  const [reversingCheckIn, setReversingCheckIn] = useState(false)
  const [manualMessage, setManualMessage] = useState('')
  const [manualError, setManualError] = useState('')

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

  const searchRegistrations = async () => {
    const query = searchQuery.trim()

    if (!query) {
      setSearchResults([])
      return
    }

    setSearching(true)
    setManualError('')
    setManualMessage('')

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const token = session?.access_token

      if (!token) {
        throw new Error('Your admin session has expired.')
      }

      const response = await fetch(
        `/api/admin/check-in/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data?.error || 'Unable to search registrations.',
        )
      }

      setSearchResults(data)
    } catch (error) {
      console.error('Manual search error:', error)

      setManualError(
        error instanceof Error
          ? error.message
          : 'Unable to search registrations.',
      )
    } finally {
      setSearching(false)
    }
  }

  const manualCheckIn = async (
  registrationNumber: string,
) => {
  setManualCheckingIn(true)
  setManualError('')
  setManualMessage('')

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const token = session?.access_token

    if (!token) {
      throw new Error('Your admin session has expired.')
    }

    const response = await fetch('/api/admin/check-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        registrationNumber,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data?.error || 'Unable to check in participant.',
      )
    }

    setManualMessage(
      `${data.registration.full_name} has been checked in successfully.`,
    )

    await searchRegistrations()
    await loadStats()
  } catch (error) {
    console.error('Manual check-in error:', error)

    setManualError(
      error instanceof Error
        ? error.message
        : 'Unable to check in participant.',
    )
  } finally {
    setManualCheckingIn(false)
  }
}

const reverseCheckIn = async (
  registrationNumber: string,
) => {
  const confirmed = window.confirm(
    'Are you sure you want to reverse this check-in? The participant will be allowed to check in again.',
  )

  if (!confirmed) return

  setReversingCheckIn(true)
  setManualError('')
  setManualMessage('')

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const token = session?.access_token

    if (!token) {
      throw new Error('Your admin session has expired.')
    }

    const response = await fetch(
      '/api/admin/check-in/reverse',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          registrationNumber,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data?.error || 'Unable to reverse check-in.',
      )
    }

    setManualMessage(
      `${data.registration.full_name} check-in has been reversed successfully.`,
    )

    await searchRegistrations()
    await loadStats()
  } catch (error) {
    console.error('Reverse check-in error:', error)

    setManualError(
      error instanceof Error
        ? error.message
        : 'Unable to reverse check-in.',
    )
  } finally {
    setReversingCheckIn(false)
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

        {/* Manual Check-In */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Manual Check-In
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Find a Participant
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Search by name, registration number, email or phone.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  searchRegistrations()
                }
              }}
              placeholder="e.g. TORQ-0001 or John Doe"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-red-500"
            />

            <button
              type="button"
              onClick={searchRegistrations}
              disabled={searching || !searchQuery.trim()}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {searching ? 'SEARCHING...' : 'SEARCH'}
            </button>
          </div>

          {manualMessage && (
            <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
              <p className="text-sm font-semibold text-green-400">
                ✓ {manualMessage}
              </p>
            </div>
          )}

          {manualError && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm font-semibold text-red-400">
                {manualError}
              </p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="mt-5 space-y-3">
              {searchResults.map((participant) => (
                <div
                  key={participant.id}
                  className="rounded-xl border border-white/10 bg-black/40 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="font-semibold text-white">
                        {participant.full_name}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {participant.registration_number}
                      </p>

                      <p className="mt-2 text-xs text-white/50">
                        {participant.participant_type}
                        {participant.vehicle_make
                          ? ` • ${participant.vehicle_make} ${
                              participant.vehicle_model || ''
                            }`
                          : ''}
                      </p>
                    </div>

                    <div>
                      {participant.checked_in ? (
  <div className="rounded-xl bg-green-500/10 p-3 text-center">
    <p className="text-xs font-bold text-green-400">
      ✓ ALREADY CHECKED IN
    </p>

    {participant.checked_in_at && (
      <p className="mt-1 text-[11px] text-white/40">
        {new Date(
          participant.checked_in_at,
        ).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    )}

    <<button
  type="button"
  onClick={() =>
    reverseCheckIn(
      participant.registration_number,
    )
  }
  disabled={reversingCheckIn}
      className="mt-3 rounded-lg border border-red-500/30 px-3 py-2 text-[11px] font-bold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      {reversingCheckIn
  ? 'PROCESSING...'
  : 'UNDO CHECK-IN'}
    </button>
  </div>
) : (
                        <button
                          type="button"
                          onClick={() =>
                            manualCheckIn(
                              participant.registration_number,
                            )
                          }
                          disabled={manualCheckingIn}
                          className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                        >
                          {manualCheckingIn
                            ? 'CHECKING IN...'
                            : 'CHECK IN'}
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {!searching &&
            searchQuery.trim() &&
            searchResults.length === 0 && (
              <div className="mt-5 rounded-xl border border-dashed border-white/10 p-6 text-center">
                <p className="text-sm text-white/40">
                  No approved participant found.
                </p>
              </div>
            )}
        </div>

        {/* Scanner */}
        <div className="mb-8">
          <CheckInScanner />
        </div>

        {/* Recent Check-Ins */}
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
