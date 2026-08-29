'use client'

import { FAQS } from '@/lib/torq-data'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from './reveal'

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* ========================================================== */}
      {/* ATMOSPHERE                                                   */}
      {/* ========================================================== */}

      <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-red-600/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* ======================================================== */}
        {/* HEADER                                                     */}
        {/* ======================================================== */}

        <Reveal className="text-center">
          <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
            Frequently asked
          </p>

          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Everything you need to know
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            Everything from registration and access to what you can expect
            when you arrive at TOR&apos;Q.
          </p>
        </Reveal>

        {/* ======================================================== */}
        {/* FAQ LIST                                                   */}
        {/* ======================================================== */}

        <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <Reveal
                key={faq.q}
                delay={i * 70}
              >
                <div
                  className={cn(
                    'group transition-colors duration-500',
                    isOpen && 'bg-white/[0.015]',
                  )}
                >
                  {/* ================================================= */}
                  {/* QUESTION                                            */}
                  {/* ================================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(
                        isOpen ? null : i,
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span
                      className={cn(
                        'font-display text-lg font-medium tracking-wide transition-all duration-300 sm:text-xl',
                        isOpen
                          ? 'text-foreground'
                          : 'text-foreground/85 group-hover:translate-x-1 group-hover:text-foreground',
                      )}
                    >
                      {faq.q}
                    </span>

                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                        isOpen
                          ? 'rotate-45 border-primary bg-primary text-primary-foreground shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                          : 'border-border text-accent group-hover:border-accent/60',
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>

                  {/* ================================================= */}
                  {/* ANSWER                                              */}
                  {/* ================================================= */}

                  <div
                    id={`faq-answer-${i}`}
                    className={cn(
                      'grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={cn(
                          'max-w-3xl pb-6 pr-12 transition-transform duration-500',
                          isOpen
                            ? 'translate-y-0'
                            : '-translate-y-2',
                        )}
                      >
                        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM NOTE                                                */}
        {/* ======================================================== */}

        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/60">
              Still have questions?
            </p>

            <a
              href="#contact"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-primary"
            >
              Contact the TOR&apos;Q team
              <span className="transition-transform duration-300 hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
