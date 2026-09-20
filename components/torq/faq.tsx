'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react'

import { FAQS } from '@/lib/torq-data'
import { Reveal } from './reveal'

export function Faq() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index,
    )
  }

  return (
    <section
      id="faq"
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        bg-black
        py-24
        text-white
        sm:py-32
      "
    >
      {/* ==========================================================
          ATMOSPHERE
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-red-600/[0.035]
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-[350px]
          w-[350px]
          rounded-full
          bg-red-600/[0.025]
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
          md:px-10
        "
      >
        <div
          className="
            grid
            gap-14
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-20
          "
        >
          {/* ======================================================
              INTRO
              ====================================================== */}

          <div>
            <Reveal>
              <p
                className="
                  mb-5
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.34em]
                  text-red-500
                  sm:text-sm
                "
              >
                Frequently Asked
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2
                className="
                  text-5xl
                  font-black
                  uppercase
                  leading-[0.88]
                  tracking-[-0.045em]
                  sm:text-6xl
                  md:text-7xl
                "
              >
                Everything
                <br />

                <span className="text-red-500">
                  you need to know.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p
                className="
                  mt-7
                  max-w-md
                  text-base
                  leading-7
                  text-white/45
                  md:text-lg
                "
              >
                Your guide to experiencing TOR&apos;Q.
                If you still have a question, our team
                is always available.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div
                className="
                  mt-10
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    h-px
                    w-12
                    bg-red-500
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.35em]
                    text-white/25
                  "
                >
                  Artistry in Motorsport
                </span>
              </div>
            </Reveal>
          </div>

          {/* ======================================================
              FAQ LIST
              ====================================================== */}

          <div>
            <div
              className="
                divide-y
                divide-white/10
                border-y
                border-white/10
              "
            >
              {FAQS.map((item, index) => {
                const isOpen =
                  openIndex === index

                const questionId =
                  `faq-question-${index}`

                const answerId =
                  `faq-answer-${index}`

                return (
                  <div key={questionId}>
                    <button
                      id={questionId}
                      type="button"
                      onClick={() =>
                        toggle(index)
                      }
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className={`
                        group
                        flex
                        min-h-16
                        w-full
                        items-center
                        justify-between
                        gap-5
                        py-5
                        text-left
                        outline-none
                        transition-colors
                        duration-200
                        sm:min-h-20
                        sm:py-6

                        focus-visible:ring-2
                        focus-visible:ring-red-500
                        focus-visible:ring-inset

                        ${
                          isOpen
                            ? 'text-white'
                            : 'text-white/75'
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          min-w-0
                          items-start
                          gap-4
                          sm:gap-5
                        "
                      >
                        <span
                          aria-hidden="true"
                          className={`
                            pt-1
                            text-[9px]
                            font-bold
                            tracking-[0.2em]
                            transition-colors
                            duration-200
                            ${
                              isOpen
                                ? 'text-red-500'
                                : 'text-white/20'
                            }
                          `}
                        >
                          {String(index + 1).padStart(
                            2,
                            '0',
                          )}
                        </span>

                        <span
                          className={`
                            text-base
                            font-semibold
                            leading-6
                            transition-colors
                            duration-200
                            sm:text-lg
                            ${
                              isOpen
                                ? 'text-white'
                                : 'text-white/70 group-hover:text-white'
                            }
                          `}
                        >
                          {item.question}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition-[background-color,border-color,color,transform]
                          duration-200

                          ${
                            isOpen
                              ? `
                                border-red-500
                                bg-red-500
                                text-white
                              `
                              : `
                                border-white/15
                                bg-white/[0.02]
                                text-white/40
                                group-hover:border-white/30
                                group-hover:text-white
                              `
                          }
                        `}
                      >
                        <ChevronDown
                          className={`
                            h-4
                            w-4
                            transition-transform
                            duration-200
                            ${
                              isOpen
                                ? 'rotate-180'
                                : ''
                            }
                          `}
                        />
                      </span>
                    </button>

                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      className={`
                        grid
                        transition-[grid-template-rows]
                        duration-300
                        ease-out

                        ${
                          isOpen
                            ? 'grid-rows-[1fr]'
                            : 'grid-rows-[0fr]'
                        }
                      `}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="
                            pb-6
                            pl-9
                            pr-4
                            text-sm
                            leading-7
                            text-white/40
                            sm:pb-7
                            sm:pl-14
                            sm:pr-12
                            sm:text-base
                          "
                        >
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ====================================================
                CONTACT LINK
                ==================================================== */}

            <Reveal delay={180}>
              <a
                href="#contact"
                className="
                  group
                  mt-8
                  inline-flex
                  min-h-10
                  items-center
                  gap-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white/50
                  outline-none
                  transition-colors
                  duration-200
                  hover:text-white
                  focus-visible:text-white
                  focus-visible:ring-2
                  focus-visible:ring-red-500
                  focus-visible:ring-offset-4
                  focus-visible:ring-offset-black
                "
              >
                Still have questions?

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    transition-[background-color,border-color,color]
                    duration-200
                    group-hover:border-red-500
                    group-hover:bg-red-500
                    group-hover:text-white
                  "
                >
                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-200
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
