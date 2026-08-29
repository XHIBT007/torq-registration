'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  PARTICIPANT_TYPES,
  type ParticipantType,
} from '@/lib/torq-data'
import {
  Bike,
  Car,
  CheckCircle2,
  Copy,
  Crown,
  Eye,
  Gamepad2,
  type LucideIcon,
  ShieldCheck,
  Trophy,
  X,
} from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type RegistrationContextValue = {
  open: () => void
}

const RegistrationContext =
  createContext<RegistrationContextValue | null>(null)

export function useRegistration() {
  const ctx = useContext(RegistrationContext)

  if (!ctx) {
    throw new Error(
      'useRegistration must be used within RegistrationProvider',
    )
  }

  return ctx
}

type FormData = {
  fullName: string
  email: string
  phone: string
  city: string
  participantType: ParticipantType | ''
  emergencyContact: string
  vehicleMake: string
  vehicleModel: string
  instagram: string
  agree: boolean

  // VIP application
  vipCategory: string
  vipOrganisation: string
  vipRole: string
  vipReason: string
  vipReferralSource: string
  vipRepresentsOrganisation: boolean
  vipWebsite: string
}

const EMPTY_FORM: FormData = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  participantType: '',
  emergencyContact: '',
  vehicleMake: '',
  vehicleModel: '',
  instagram: '',
  agree: false,

  vipCategory: '',
  vipOrganisation: '',
  vipRole: '',
  vipReason: '',
  vipReferralSource: '',
  vipRepresentsOrganisation: false,
  vipWebsite: '',
}

const PARTICIPANT_ICONS: Record<
  ParticipantType,
  LucideIcon
> = {
  Driver: Car,
  Rider: Bike,
  VIP: Crown,
  Spectator: Eye,
  'Sim Racer': Gamepad2,
}

const STEPS = [
  'Details',
  'Participation',
  'Machine',
  'Confirm',
] as const

export function RegistrationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ open }), [open])

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow

      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  return (
    <RegistrationContext.Provider value={value}>
      {children}

      {isOpen && (
        <RegistrationDialog onClose={close} />
      )}
    </RegistrationContext.Provider>
  )
}

function RegistrationDialog({
  onClose,
}: {
  onClose: () => void
}) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [regNumber, setRegNumber] = useState('')
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const update = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const stepValid = useMemo(() => {
    if (step === 0) {
      return (
        form.fullName.trim() !== '' &&
        /.+@.+\..+/.test(form.email) &&
        form.phone.trim() !== '' &&
        form.city.trim() !== ''
      )
    }

    if (step === 1) {
      return (
        form.participantType !== '' &&
        form.emergencyContact.trim() !== ''
      )
    }

    if (step === 2) {
      return true
    }

    if (step === 3) {
      return form.agree
    }

    return false
  }, [step, form])

  const handleSubmit = async () => {
    if (submitting) return

    setSubmitting(true)

    try {
      /*
       * Create the registration through the server.
       *
       * The server generates the official registration number
       * and inserts the registration into Supabase.
       */
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          participantType: form.participantType,
          emergencyContact: form.emergencyContact,
          vehicleMake: form.vehicleMake,
          vehicleModel: form.vehicleModel,
          instagram: form.instagram,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error(
          'Registration error:',
          result,
        )

        alert(
          `Registration failed:\n\n${
            result.error ||
            'Please try again.'
          }`,
        )

        return
      }

      const registrationNumber =
        result.registrationNumber

      if (!registrationNumber) {
        console.error(
          'Registration number missing from API response:',
          result,
        )

        alert(
          'Registration was created, but the registration number could not be retrieved. Please contact the TOR\'Q team.',
        )

        return
      }

      /*
       * Send confirmation email.
       *
       * If the email fails, the registration itself
       * remains successful. The error is logged so the
       * admin team can investigate.
       */
      try {
        const emailResponse = await fetch(
          '/api/send-confirmation',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              email: form.email,
              fullName: form.fullName,
              registrationNumber,
              participantType:
                form.participantType,
            }),
          },
        )

        if (!emailResponse.ok) {
          const emailError =
            await emailResponse.json()

          console.error(
            'Confirmation email error:',
            emailError,
          )
        }
      } catch (emailError) {
        console.error(
          'Failed to send confirmation email:',
          emailError,
        )
      }

      setRegNumber(registrationNumber)
      setSubmitted(true)
    } catch (error) {
      console.error(
        'Registration submission error:',
        error,
      )

      alert(
        'Something went wrong while submitting your registration. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const copyNumber = () => {
    navigator.clipboard
      ?.writeText(regNumber)
      .then(() => {
        setCopied(true)

        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Register for TOR'Q"
    >
      <button
        aria-label="Close registration"
        onClick={onClose}
        className="animate-fade-in fixed inset-0 bg-background/85 backdrop-blur-md"
      />

      <div className="animate-scale-in relative z-10 my-auto w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-ember to-gold" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        {submitted ? (
          <SuccessView
            regNumber={regNumber}
            name={form.fullName}
            participantType={
              form.participantType
            }
            copied={copied}
            onCopy={copyNumber}
            onClose={onClose}
          />
        ) : (
          <div className="p-6 sm:p-8">
            <p className="font-display text-xs tracking-[0.3em] text-accent uppercase">
              Registration
            </p>

            <h2 className="font-display mt-1 text-2xl font-bold tracking-wide">
              Secure your place at TOR&apos;Q
            </h2>

            <Stepper step={step} />

            <div className="mt-6 min-h-[260px]">
              {/* STEP 1 — DETAILS */}
              {step === 0 && (
                <div className="grid gap-4">
                  <Field
                    label="Full Name"
                    value={form.fullName}
                    onChange={(value) =>
                      update(
                        'fullName',
                        value,
                      )
                    }
                    placeholder="Ayrton Senna"
                  />

                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      update(
                        'email',
                        value,
                      )
                    }
                    placeholder="you@email.com"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Phone Number"
                      value={form.phone}
                      onChange={(value) =>
                        update(
                          'phone',
                          value,
                        )
                      }
                      placeholder="+234 801 234 5678"
                    />

                    <Field
                      label="City"
                      value={form.city}
                      onChange={(value) =>
                        update(
                          'city',
                          value,
                        )
                      }
                      placeholder="Lagos"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2 — PARTICIPATION */}
              {step === 1 && (
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Join the action
                    </span>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {PARTICIPANT_TYPES.filter(
                        (type) =>
                          type !== 'VIP',
                      ).map((type) => {
                        const Icon =
                          PARTICIPANT_ICONS[
                            type
                          ]

                        const active =
                          form.participantType ===
                          type

                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              update(
                                'participantType',
                                type,
                              )
                            }
                            className={cn(
                              'flex min-h-[105px] flex-col items-center justify-center gap-2 rounded-md border px-3 py-4 text-center text-sm transition-all',
                              active
                                ? 'border-primary bg-primary/10 text-foreground'
                                : 'border-border bg-secondary/40 text-muted-foreground hover:border-accent/50 hover:text-foreground',
                            )}
                          >
                            <Icon
                              className={cn(
                                'size-5',
                                active
                                  ? 'text-primary'
                                  : 'text-accent',
                              )}
                            />

                            {type}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* VIP EXPERIENCE */}
                  <div className="relative overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br from-gold/10 via-background to-primary/5 p-5">
                    <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gold/10 blur-3xl" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Crown className="size-4 text-gold" />

                            <span className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase">
                              VIP & Hospitality
                            </span>
                          </div>

                          <h3 className="mt-2 font-display text-xl font-bold tracking-wide">
                            Experience TOR&apos;Q differently.
                          </h3>

                          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                            Request access to our premium hospitality experience with elevated viewing, dedicated access and an exclusive way to experience the spectacle.
                          </p>
                        </div>

                        <div className="hidden shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-gold uppercase sm:block">
                          Limited
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          update(
                            'participantType',
                            'VIP',
                          )
                        }
                        className={cn(
                          'mt-5 flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition-all',
                          form.participantType ===
                            'VIP'
                            ? 'border-gold bg-gold/15 text-foreground'
                            : 'border-gold/30 bg-background/40 text-muted-foreground hover:border-gold/60 hover:text-foreground',
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'flex size-9 items-center justify-center rounded-full border',
                              form.participantType ===
                                'VIP'
                                ? 'border-gold bg-gold text-black'
                                : 'border-gold/30 text-gold',
                            )}
                          >
                            <Crown className="size-4" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold">
                              Request VIP Access
                            </p>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Subject to approval
                            </p>
                          </div>
                        </div>

                        <span
                          className={cn(
                            'text-xs font-bold uppercase tracking-wider',
                            form.participantType ===
                              'VIP'
                              ? 'text-gold'
                              : 'text-muted-foreground',
                          )}
                        >
                          {form.participantType ===
                          'VIP'
                            ? 'Selected'
                            : 'Request'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <Field
                    label="Emergency Contact"
                    value={
                      form.emergencyContact
                    }
                    onChange={(value) =>
                      update(
                        'emergencyContact',
                        value,
                      )
                    }
                    placeholder="Name & phone number"
                  />
                </div>
              )}

              {/* STEP 3 — MACHINE */}
              {step === 2 && (
                <div className="grid gap-4">
                  <p className="text-sm text-muted-foreground">
                    Bringing a machine? Tell us what you&apos;ll be running.
                    Vehicle details are optional for spectators, sim racers
                    and VIP guests.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Vehicle Make"
                      value={
                        form.vehicleMake
                      }
                      onChange={(value) =>
                        update(
                          'vehicleMake',
                          value,
                        )
                      }
                      placeholder="Ford"
                    />

                    <Field
                      label="Vehicle Model"
                      value={
                        form.vehicleModel
                      }
                      onChange={(value) =>
                        update(
                          'vehicleModel',
                          value,
                        )
                      }
                      placeholder="Mustang GT"
                    />
                  </div>

                  <Field
                    label="Instagram"
                    value={
                      form.instagram
                    }
                    onChange={(value) =>
                      update(
                        'instagram',
                        value,
                      )
                    }
                    placeholder="@yourhandle"
                  />
                </div>
              )}

              {/* STEP 4 — CONFIRM */}
              {step === 3 && (
                <div className="grid gap-4">
                  <div className="grid gap-3 rounded-md border border-border bg-secondary/30 p-4">
                    <SummaryRow
                      label="Name"
                      value={
                        form.fullName
                      }
                    />

                    <SummaryRow
                      label="Email"
                      value={form.email}
                    />

                    <SummaryRow
                      label="Phone"
                      value={form.phone}
                    />

                    <SummaryRow
                      label="City"
                      value={form.city}
                    />

                    <SummaryRow
                      label="Type"
                      value={
                        form.participantType ||
                        '—'
                      }
                    />

                    <SummaryRow
                      label="Vehicle"
                      value={
                        [
                          form.vehicleMake,
                          form.vehicleModel,
                        ]
                          .filter(Boolean)
                          .join(' ') ||
                        '—'
                      }
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-secondary/30 p-4 text-sm">
                    <span
                      className={cn(
                        'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors',
                        form.agree
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background',
                      )}
                    >
                      {form.agree && (
                        <CheckCircle2 className="size-4" />
                      )}
                    </span>

                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={
                        form.agree
                      }
                      onChange={(e) =>
                        update(
                          'agree',
                          e.target.checked,
                        )
                      }
                    />

                    <span className="text-muted-foreground">
                      I agree to abide by the{' '}
                      <span className="text-accent">
                        TOR&apos;Q safety rules
                      </span>{' '}
                      and understand motorsport carries inherent risk.
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="lg"
                onClick={() =>
                  step === 0
                    ? onClose()
                    : setStep(
                        step - 1,
                      )
                }
                disabled={submitting}
              >
                {step === 0
                  ? 'Cancel'
                  : 'Back'}
              </Button>

              {step <
              STEPS.length - 1 ? (
                <Button
                  size="lg"
                  disabled={
                    !stepValid ||
                    submitting
                  }
                  onClick={() =>
                    setStep(
                      step + 1,
                    )
                  }
                >
                  Continue
                </Button>
              ) : (
                <Button
                  size="lg"
                  disabled={
                    !stepValid ||
                    submitting
                  }
                  onClick={
                    handleSubmit
                  }
                >
                  <ShieldCheck className="size-4" />

                  {submitting
                    ? 'Submitting...'
                    : 'Complete Registration'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Stepper({
  step,
}: {
  step: number
}) {
  return (
    <div className="mt-6 flex items-center gap-2">
      {STEPS.map((label, i) => (
        <div
          key={label}
          className="flex flex-1 flex-col gap-1.5"
        >
          <div
            className={cn(
              'h-1 rounded-full transition-colors duration-500',
              i <= step
                ? 'bg-primary'
                : 'bg-border',
            )}
          />

          <span
            className={cn(
              'text-[10px] tracking-wide uppercase transition-colors',
              i <= step
                ? 'text-accent'
                : 'text-muted-foreground',
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-11 rounded-md border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </label>
  )
}

function SummaryRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="truncate font-medium text-foreground">
        {value}
      </span>
    </div>
  )
}

function SuccessView({
  regNumber,
  name,
  participantType,
  copied,
  onCopy,
  onClose,
}: {
  regNumber: string
  name: string
  participantType: ParticipantType | ''
  copied: boolean
  onCopy: () => void
  onClose: () => void
}) {
  const isVip = participantType === 'VIP'

  const firstName = name
    ? name.trim().split(/\s+/)[0]
    : ''

  return (
    <div className="relative overflow-hidden p-6 text-center sm:p-8">
      {/* VIP ambient glow */}
      {isVip && (
        <>
          <div className="pointer-events-none absolute -top-32 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-primary/10 blur-3xl" />
        </>
      )}

      <div className="relative">
        {/* Success Icon */}
        <div
          className={cn(
            'animate-scale-in mx-auto flex size-20 items-center justify-center rounded-full border',
            isVip
              ? 'border-gold/40 bg-gold/10 text-gold'
              : 'border-primary/30 bg-primary/10 text-primary',
          )}
        >
          {isVip ? (
            <Crown className="size-9" />
          ) : (
            <Trophy className="size-9" />
          )}
        </div>

        {/* Eyebrow */}
        <div className="mt-6">
          <p
            className={cn(
              'text-[10px] font-bold tracking-[0.35em] uppercase',
              isVip
                ? 'text-gold'
                : 'text-accent',
            )}
          >
            TOR&apos;Q 2026
          </p>
        </div>

        {/* Heading */}
        <h2 className="font-display mt-2 text-3xl font-bold tracking-wide sm:text-4xl">
          {isVip
            ? 'VIP Request Received'
            : 'Registration Confirmed'}
        </h2>

        {/* Intro */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {isVip ? (
            <>
              {firstName
                ? `Welcome, ${firstName}. `
                : ''}
              Your request for the TOR&apos;Q VIP
              experience has been successfully
              received.
            </>
          ) : (
            <>
              {firstName
                ? `You're in, ${firstName}. `
                : ''}
              Your registration has been successfully
              received and a confirmation has been
              sent to your email.
            </>
          )}
        </p>

        {/* VIP Status Banner */}
        {isVip && (
          <div className="mt-6 rounded-lg border border-gold/30 bg-gradient-to-br from-gold/10 via-background to-gold/5 p-5 text-left">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Crown className="size-4 text-gold" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  You&apos;re on the VIP list.
                </p>

                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  VIP access is limited and subject to
                  approval. Our team will review your
                  request and contact you with the outcome.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Number */}
        <div
          className={cn(
            'mt-5 rounded-lg border p-5',
            isVip
              ? 'border-gold/30 bg-gold/[0.04]'
              : 'border-border bg-secondary/40',
          )}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
            Registration Number
          </p>

          <p
            className={cn(
              'font-display mt-2 break-all text-2xl font-bold tracking-[0.12em] sm:text-3xl',
              isVip
                ? 'text-gold'
                : 'text-foreground',
            )}
          >
            {regNumber}
          </p>

          <button
            type="button"
            onClick={onCopy}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold transition-opacity hover:opacity-80"
          >
            <Copy className="size-3.5" />

            {copied
              ? 'Registration number copied'
              : 'Copy registration number'}
          </button>
        </div>

        {/* VIP Approval Information */}
        {isVip && (
          <div className="mt-5 grid gap-3 text-left">
            <div className="flex items-start gap-3 rounded-md border border-border bg-secondary/20 p-4">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />

              <div>
                <p className="text-xs font-semibold text-foreground">
                  Request submitted
                </p>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Your details have been received by
                  the TOR&apos;Q team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-md border border-border bg-secondary/20 p-4">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />

              <div>
                <p className="text-xs font-semibold text-foreground">
                  Awaiting approval
                </p>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  If your VIP request is approved,
                  you&apos;ll receive your official TOR&apos;Q
                  pass and access details by email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Email reminder */}
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          {isVip
            ? 'Keep your registration number for your records.'
            : 'Please keep your registration number for your records.'}
        </p>

        {/* CTA */}
        <Button
          size="lg"
          className={cn(
            'mt-6 w-full',
            isVip &&
              'border border-gold/30 bg-gold text-black hover:bg-gold/90',
          )}
          onClick={onClose}
        >
          {isVip
  ? "Return to TOR'Q"
  : 'Done'}
        </Button>

        {/* Closing line */}
        <p className="mt-4 text-[10px] font-medium tracking-[0.25em] text-muted-foreground uppercase">
          Artistry in Motorsport
        </p>
      </div>
    </div>
  )
}
