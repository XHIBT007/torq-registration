'use client'

import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/torq-data'
import {
  AtSign,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Ticket,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { Reveal } from './reveal'
import { useRegistration } from './registration'

const DETAILS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'baiohpm007@gmail.com',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'Adeniyie.b115@yahoo.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 903 018 8030',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 814 339 2465',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lagos, Nigeria',
  },
  {
    icon: AtSign,
    label: 'Social',
    value: '@torq.motorsport',
  },
]

export function Contact() {
  const { open } = useRegistration()

  const imageRef =
    useRef<HTMLDivElement>(null)

  const [visible, setVisible] =
    useState(false)

  useEffect(() => {
    const element =
      imageRef.current

    if (!element) return

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        },
        {
          threshold: 0.15,
        },
      )

    observer.observe(element)

    return () =>
      observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        py-24
        sm:py-32
      "
    >

      {/* ==========================================================
          ATMOSPHERE
          ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[800px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.05]
          blur-[150px]
        "
      />

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <Reveal>
          <div
            ref={imageRef}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-border
            "
          >

            {/* ====================================================
                BACKGROUND IMAGE
                ==================================================== */}

            <div
              className={`
                absolute
                inset-0
                transition-transform
                duration-[10000ms]
                ease-out
                ${
                  visible
                    ? 'scale-100'
                    : 'scale-110'
                }
              `}
            >
              <img
                src="/images/gallery-6.png"
                alt=""
                aria-hidden="true"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            {/* ====================================================
                OVERLAYS
                ==================================================== */}

            <div
              className="
                absolute
                inset-0
                bg-black/65
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-background/95
                via-background/80
                to-background/55
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-transparent
                to-transparent
              "
            />

            {/* Red atmospheric glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-72
                w-72
                rounded-full
                bg-red-600/10
                blur-[100px]
              "
            />

            {/* ====================================================
                CONTENT
                ==================================================== */}

            <div
              className="
                relative
                grid
                gap-10
                p-8
                sm:p-12
                lg:grid-cols-2
                lg:gap-16
                lg:p-16
              "
            >

              {/* ==================================================
                  LEFT
                  ================================================== */}

              <div>

                <Reveal delay={100}>
                  <p
                    className="
                      font-display
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-accent
                    "
                  >
                    Contact
                  </p>
                </Reveal>

                <Reveal delay={180}>
                  <h2
                    className="
                      font-display
                      mt-4
                      max-w-2xl
                      text-4xl
                      font-bold
                      leading-[0.95]
                      tracking-tight
                      text-balance
                      sm:text-5xl
                      lg:text-6xl
                    "
                  >
                    Ready to feel
                    <br />

                    <span className="text-red-500">
                      the adrenaline?
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={260}>
                  <p
                    className="
                      mt-6
                      max-w-md
                      text-base
                      leading-relaxed
                      text-muted-foreground
                    "
                  >
                    Reserve your place at
                    TOR&apos;Q, or reach out to
                    our team for partnership and
                    hospitality enquiries.
                  </p>
                </Reveal>

                {/* ==================================================
                    EVENT INFORMATION
                    ================================================== */}

                <Reveal delay={330}>
                  <div
                    className="
                      mt-8
                      flex
                      flex-wrap
                      gap-3
                    "
                  >

                    <div
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-white/70
                        backdrop-blur-sm
                      "
                    >
                      {EVENT.location}
                    </div>

                    <div
                      className="
                        rounded-full
                        border
                        border-red-500/30
                        bg-red-500/10
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-red-400
                        backdrop-blur-sm
                      "
                    >
                      December 6, 2026
                    </div>

                  </div>
                </Reveal>

                {/* ==================================================
                    CTA
                    ================================================== */}

                <Reveal delay={400}>
                  <Button
                    size="lg"
                    onClick={open}
                    className="
                      group
                      mt-8
                      h-13
                      rounded-full
                      bg-red-600
                      px-7
                      text-base
                      font-bold
                      text-white
                      transition-all
                      duration-500
                      hover:scale-105
                      hover:bg-red-500
                      hover:shadow-[0_0_35px_rgba(239,68,68,0.3)]
                    "
                  >
                    <Ticket
                      className="
                        size-4
                        transition-transform
                        duration-300
                        group-hover:rotate-[-8deg]
                      "
                    />

                    Register Now

                    <ArrowUpRight
                      className="
                        size-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </Button>
                </Reveal>

              </div>

              {/* ==================================================
                  CONTACT DETAILS
                  ================================================== */}

              <div
                className="
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >

                {DETAILS.map(
                  (
                    detail,
                    index,
                  ) => {
                    const Icon =
                      detail.icon

                    return (
                      <Reveal
                        key={`${detail.label}-${detail.value}`}
                        delay={
                          180 +
                          index * 80
                        }
                      >
                        <div
                          className="
                            group
                            h-full
                            rounded-xl
                            border
                            border-white/10
                            bg-black/30
                            p-5
                            backdrop-blur-md
                            transition-all
                            duration-500
                            hover:-translate-y-1
                            hover:border-red-500/40
                            hover:bg-black/45
                          "
                        >

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/10
                              bg-white/[0.04]
                              transition-all
                              duration-500
                              group-hover:border-red-500/50
                              group-hover:bg-red-500/10
                            "
                          >
                            <Icon
                              className="
                                size-5
                                text-accent
                                transition-transform
                                duration-500
                                group-hover:scale-110
                              "
                            />
                          </div>

                          <p
                            className="
                              mt-4
                              text-[10px]
                              uppercase
                              tracking-[0.2em]
                              text-muted-foreground
                            "
                          >
                            {detail.label}
                          </p>

                          <p
                            className="
                              mt-1
                              break-words
                              font-medium
                              text-foreground
                            "
                          >
                            {detail.value}
                          </p>

                        </div>
                      </Reveal>
                    )
                  },
                )}

              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
