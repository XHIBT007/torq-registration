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
      current === index
        ? null
        : index,
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

      {/* ==========================================================
          CONTENT
          ========================================================== */}

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
                  tracking-[0.4em]
                  text-red-500
                "
              >
                Frequently Asked
              </p>

            </Reveal>

            <Reveal delay={100}>

              <h2
                className="
                  text-4xl
                  font-black
                  uppercase
                  leading-[0.88]
                  tracking-[-0.04em]
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Everything
                <br />

                <span className="text-red-500">
                  you need to know.
                </span>
              </h2>

            </Reveal>

            <Reveal delay={200}>

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
                Your guide to experiencing
                TOR&apos;Q. If you still have a
                question, our team is always
                available.
              </p>

            </Reveal>

            {/* SMALL BRAND MARKER */}

            <Reveal delay={300}>

              <div
                className="
                  mt-10
                  flex
                  items-center
                  gap-4
                "
              >

                <div
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

              {FAQS.map(
                (item, index) => {

                  const isOpen =
                    openIndex === index

                  return (
                    <Reveal
                      key={index}
                      delay={
                        100 +
                        index * 70
                      }
                    >

                      <div>

                        {/* QUESTION */}

                        <button
                          type="button"
                          onClick={() =>
                            toggle(index)
                          }
                          aria-expanded={
                            isOpen
                          }
                          className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            gap-6
                            py-6
                            text-left
                            transition-colors
                            duration-300
                            hover:text-white
                            sm:py-7
                          "
                        >

                          <div
                            className="
                              flex
                              items-start
                              gap-5
                            "
                          >

                            <span
                              className="
                                pt-1
                                text-[9px]
                                font-bold
                                tracking-[0.2em]
                                text-white/20
                              "
                            >
                              {String(
                                index + 1,
                              ).padStart(
                                2,
                                '0',
                              )}
                            </span>

                            <span
                              className="
                                text-base
                                font-semibold
                                leading-6
                                text-white/75
                                transition-colors
                                duration-300
                                group-hover:text-white
                                sm:text-lg
                              "
                            >
                              {item.question}
                            </span>

                          </div>

                          <span
                            className={`
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              transition-all
                              duration-500

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
                              size={17}
                              className={`
                                transition-transform
                                duration-500
                                ${
                                  isOpen
                                    ? 'rotate-180'
                                    : ''
                                }
                              `}
                            />

                          </span>

                        </button>

                        {/* ANSWER */}

                        <div
                          className={`
                            grid
                            transition-[grid-template-rows]
                            duration-500
                            ease-out

                            ${
                              isOpen
                                ? 'grid-rows-[1fr]'
                                : 'grid-rows-[0fr]'
                            }
                          `}
                        >

                          <div
                            className="
                              overflow-hidden
                            "
                          >

                            <div
                              className="
                                pb-7
                                pl-10
                                pr-12
                                text-sm
                                leading-7
                                text-white/40
                                sm:pl-14
                                sm:text-base
                              "
                            >
                              {item.answer}
                            </div>

                          </div>

                        </div>

                      </div>

                    </Reveal>
                  )
                },
              )}

            </div>

            {/* CONTACT LINK */}

            <Reveal delay={300}>

              <a
                href="#contact"
                className="
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white/50
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >

                Still have questions?

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    transition-all
                    duration-300
                    group-hover:border-red-500
                    group-hover:bg-red-500
                  "
                >

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
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
