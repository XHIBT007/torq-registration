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
  status: 'Pending' | 'Approved' | 'Rejected'
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
  const [selectedRegistration, setSelectedRegistration] =
  useState<Registration | null>(null)
  
  async function handleLogout() {
  await supabase.auth.signOut()
  window.location.href = '/admin/login'
}

async function updateStatus(
  registrationId: string,
  status: 'Pending' | 'Approved' | 'Rejected'
) {
  const { error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', registrationId)

  if (error) {
    alert('Unable to update registration status')
    console.error(error)
    return
  }

  setRegistrations((current) =>
    current.map((registration) =>
      registration.id === registrationId
        ? { ...registration, status }
        : registration
    )
  )

  setSelectedRegistration((current) =>
    current && current.id === registrationId
      ? { ...current, status }
      : current
  )
}

useEffect(() => {
  loadRegistrations()
}, [])

async function loadRegistrations() {
  try {
    const sessionResponse = await supabase.auth.getSession()
    const session = sessionResponse.data.session

    if (!session) {
      window.location.href = '/admin/login'
      return
    }

    const response = await fetch('/api/admin/registrations', {
      headers: {Authorization: `Bearer ${session.access_token}`,
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

          <div className="flex items-center gap-3">
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
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <StatCard
    label="Total Registrations"
    value={registrations.length}
    icon={Users}
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
    label="Spectators"
    value={count('Spectator')}
    icon={Eye}
  />

  <StatCard
    label="VIP"
    value={count('VIP')}
    icon={Crown}
  />

  <StatCard
    label="Sim Racers"
    value={count('Sim Racer')}
    icon={Gamepad2}
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
                    <th className="px-6 py-4 text-left">
  Status
</th>
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
    onClick={() => setSelectedRegistration(registration)}
    className="cursor-pointer transition hover:bg-white/5"
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
    <td className="px-6 py-4">
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
      registration.status === 'Approved'
        ? 'bg-green-500/15 text-green-400'
        : registration.status === 'Rejected'
          ? 'bg-red-500/15 text-red-400'
          : 'bg-yellow-500/15 text-yellow-400'
    }`}
  >
    {registration.status || 'Pending'}
  </span>
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
    
      {selectedRegistration && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    onClick={() => setSelectedRegistration(null)}
  >
    <div
      className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111318] p-6 shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        onClick={() => setSelectedRegistration(null)}
        className="absolute right-4 top-4 rounded-full border border-white/10 px-3 py-1 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        ✕
      </button>

      <div className="mb-6 pr-10">
        <p className="text-xs uppercase tracking-[0.25em] text-red-500">
          Registration Details
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          {selectedRegistration.full_name}
        </h2>

        <p className="mt-1 text-sm text-white/50">
          {selectedRegistration.registration_number || 'Registration number pending'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
<div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
  <p className="text-xs uppercase tracking-wider text-white/40">
    Registration Status
  </p>

  <div className="mt-3 flex flex-wrap gap-2">
    <button
      onClick={() =>
        updateStatus(selectedRegistration.id, 'Pending')
      }
      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
        selectedRegistration.status === 'Pending'
          ? 'bg-yellow-500 text-black'
          : 'border border-white/10 text-white/60 hover:bg-white/10'
      }`}
    >
      Pending
    </button>

    <button
      onClick={() =>
        updateStatus(selectedRegistration.id, 'Approved')
      }
      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
        selectedRegistration.status === 'Approved'
          ? 'bg-green-500 text-black'
          : 'border border-white/10 text-white/60 hover:bg-white/10'
      }`}
    >
      Approved
    </button>

    <button
      onClick={() =>
        updateStatus(selectedRegistration.id, 'Rejected')
      }
      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
        selectedRegistration.status === 'Rejected'
          ? 'bg-red-600 text-white'
          : 'border border-white/10 text-white/60 hover:bg-white/10'
      }`}
    >
      Rejected
    </button>
  </div>
</div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Email
          </p>
          <p className="mt-1 break-all text-sm text-white">
            {selectedRegistration.email}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Phone
          </p>
          <p className="mt-1 text-sm text-white">
            {selectedRegistration.phone || '—'}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            City
          </p>
          <p className="mt-1 text-sm text-white">
            {selectedRegistration.city || '—'}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Participant Type
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {selectedRegistration.participant_type || '—'}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Emergency Contact
          </p>
          <p className="mt-1 text-sm text-white">
            {selectedRegistration.emergency_contact || '—'}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Vehicle Make
          </p>
          <p className="mt-1 text-sm text-white">
            {selectedRegistration.vehicle_make || '—'}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Vehicle Model
          </p>
          <p className="mt-1 text-sm text-white">
            {selectedRegistration.vehicle_model || '—'}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Instagram
          </p>
          <p className="mt-1 text-sm text-white">
            {selectedRegistration.instagram || '—'}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Registered
          </p>
          <p className="mt-1 text-sm text-white">
            {new Date(selectedRegistration.created_at).toLocaleString()}
          </p>
        </div>

      </div>
      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
  <p className="text-xs uppercase tracking-wider text-white/40">
    Registration Status
  </p>

  <div className="mt-3 flex flex-wrap gap-2">
    <button
      onClick={() =>
        updateStatus(selectedRegistration.id, 'Pending')
      }
      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
        selectedRegistration.status === 'Pending'
          ? 'bg-yellow-500 text-black'
          : 'border border-white/10 text-white/60 hover:bg-white/10'
      }`}
    >
      Pending
    </button>

    <button
      onClick={() =>
        updateStatus(selectedRegistration.id, 'Approved')
      }
      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
        selectedRegistration.status === 'Approved'
          ? 'bg-green-500 text-black'
          : 'border border-white/10 text-white/60 hover:bg-white/10'
      }`}
    >
      Approved
    </button>

    <button
      onClick={() =>
        updateStatus(selectedRegistration.id, 'Rejected')
      }
      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
        selectedRegistration.status === 'Rejected'
          ? 'bg-red-600 text-white'
          : 'border border-white/10 text-white/60 hover:bg-white/10'
      }`}
    >
      Rejected
    </button>
  </div>
</div>

      <button
        onClick={() => setSelectedRegistration(null)}
        className="mt-6 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        Close
      </button>
    </div>
  </div>
)}
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
