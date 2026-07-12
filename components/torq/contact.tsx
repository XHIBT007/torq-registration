'use client'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import { AtSign, Mail, MapPin, Phone, Ticket } from 'lucide-react'
import { Reveal } from './reveal'
import { useRegistration } from './registration'

const DETAILS = [
  { icon: Mail, label: 'Email', value: 'hello@torq.events' },
  { icon: Phone, label: 'Phone', value: '+44 20 7946 0000' },
  { icon: MapPin, label: 'Venue', value: EVENT.location },
  { icon: AtSign, label: 'Social', value: '@torq.motorsport' },
]

export function Contact() {
  const { open } = useRegistration()

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border">
          <img
            src="/images/gallery-6.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div>
              <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
                Contact
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Ready to feel the g-force?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Reserve your place on the grid, or reach out to our team for
                partnership and hospitality enquiries.
              </p>
              <Button
                size="lg"
                onClick={open}
                className="mt-8 h-12 px-7 text-base"
              >
                <Ticket className="size-4" />
                Register Now
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-lg border border-border/70 bg-card/50 p-5 backdrop-blur-sm"
                >
                  <detail.icon className="size-5 text-accent" />
                  <p className="mt-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {detail.label}
                  </p>
                  <p className="mt-1 font-medium text-foreground">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
