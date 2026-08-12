'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Car,
  Bike,
  Crown,
  Eye,
  Gamepad2,
  Search,
  Users,
  ArrowLeft,
  LogOut,
} from 'lucide-react'

type Registration = {
  id: string
  full_name: string
  email: string
  phone: string | null
  city: string | null
  participant_type: string | null
  emergency_contact: string | null
  vehicle_make: string | null
  vehicle_model: string | null
  instagram: string | null
  registration_number: string | null
  created_at: string
}

const participantIcons: Record<string, any> = {
  Driver: Car,
  Rider: Bike,
  VIP: Crown,
  Spectator: Eye,
  'Sim Racer': Gamepad2,
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  
  async function handleLogout() {
  await supabase.auth.signOut()
  window.location.href = '/admin/login'
}

  useEffect(() => {
    loadRegistrations()
  }, [])

  async function loadRegistrations() {
    try {
      const {
  data: { session },
} = await supabase.auth.getSession()

if (!session) {
  window.location.href = '/admin/login'
  return
}

const response = await fetch('/api/admin/registrations', {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
})

      if (!response.ok) {
        throw new Error('Failed to load registrations')
      }

      const data = await response.json()

      setRegistrations(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      registration.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      registration.registration_number
        ?.toLowerCase()
        .includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All' ||
      registration.participant_type === filter

    return matchesSearch && matchesFilter
  })

  const count = (type: string) =>
    registrations.filter(
      (registration) => registration.participant_type === type,
    ).length

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
              TOR&apos;Q Motorsport
            </p>

            <h1 className="mt-1 text-2xl font-black uppercase tracking-tight">
              Command Centre
            </h1>
          </div>

          <<div className="flex items-center gap-3">
  <a
    href="/"
    className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-red-500 hover:text-white"
  >
    <ArrowLeft className="h-4 w-4" />
    Website
  </a>

  <button
    onClick={handleLogout}
    className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-red-500 hover:text-white"
  >
    <LogOut className="h-4 w-4" />
    Logout
  </button>
</div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            label="Total Registrations"
            value={registrations.length}
            icon={Users}
          />

          <StatCard
            label="Spectators"
            value={count('Spectator')}
            icon={Eye}
          />

          <StatCard
            label="Drivers"
            value={count('Driver')}
            icon={Car}
          />

          <StatCard
            label="Riders"
            value={count('Rider')}
            icon={Bike}
          />

          <StatCard
            label="VIP"
            value={count('VIP')}
            icon={Crown}
          />
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email or registration number..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-red-500"
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="All" className="bg-black">
              All Participants
            </option>
            <option value="Spectator" className="bg-black">
              Spectators
            </option>
            <option value="Driver" className="bg-black">
              Drivers
            </option>
            <option value="Rider" className="bg-black">
              Riders
            </option>
            <option value="VIP" className="bg-black">
              VIP
            </option>
            <option value="Sim Racer" className="bg-black">
              Sim Racers
            </option>
          </select>
        </div>

        {/* Registrations */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="font-bold uppercase tracking-wider">
              Registrations
            </h2>

            <p className="mt-1 text-sm text-white/40">
              {filteredRegistrations.length} registration
              {filteredRegistrations.length === 1 ? '' : 's'} displayed
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-white/40">
              Loading registrations...
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="px-6 py-16 text-center text-white/40">
              No registrations found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-white/10 bg-white/[0.02]">
                  <tr className="text-xs uppercase tracking-wider text-white/40">
                    <th className="px-6 py-4">Registration</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">City</th>
                    <th className="px-6 py-4">Vehicle</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filteredRegistrations.map((registration) => {
                    const Icon =
                      participantIcons[
                        registration.participant_type || ''
                      ] || Users

                    return (
                      <tr
                        key={registration.id}
                        className="transition hover:bg-white/[0.03]"
                      >
                        <td className="px-6 py-5">
                          <p className="font-mono text-sm font-semibold text-red-400">
                            {registration.registration_number || '—'}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold">
                            {registration.full_name}
                          </p>

                          <p className="mt-1 text-xs text-white/40">
                            {registration.email}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm">
                            <Icon className="h-4 w-4 text-red-500" />
                            {registration.participant_type || '—'}
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-white/70">
                          {registration.city || '—'}
                        </td>

                        <td className="px-6 py-5 text-sm text-white/70">
                          {registration.vehicle_make
                            ? `${registration.vehicle_make} ${registration.vehicle_model || ''}`
                            : '—'}
                        </td>

                        <td className="px-6 py-5 text-sm text-white/40">
                          {new Date(
                            registration.created_at,
                          ).toLocaleDateString('en-NG')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: any
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          {label}
        </p>

        <Icon className="h-5 w-5 text-red-500" />
      </div>

      <p className="mt-4 text-4xl font-black">{value}</p>
    </div>
  )
}
