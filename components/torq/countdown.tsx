'use client'

import { useEffect, useState } from 'react'

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown({
  date,
  className,
}: {
  date: string
  className?: string
}) {
  const target = new Date(date).getTime()
  const [time, setTime] = useState(() => getRemaining(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className={className}>
      <div className="flex items-stretch gap-2 sm:gap-3">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-stretch gap-2 sm:gap-3">
            <div className="flex min-w-[64px] flex-col items-center rounded-md border border-border/70 bg-card/60 px-3 py-3 backdrop-blur-sm sm:min-w-[84px] sm:py-4">
              <span className="font-display text-3xl font-bold tabular-nums text-foreground sm:text-5xl">
                {mounted ? String(unit.value).padStart(2, '0') : '--'}
              </span>
              <span className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:text-xs">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-display self-center text-2xl font-bold text-primary sm:text-4xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
