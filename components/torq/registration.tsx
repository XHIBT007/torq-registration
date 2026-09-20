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
  Loader2,
  ShieldCheck,
  Trophy,
  X,
  type LucideIcon,
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
  {
    number: '01',
    label: 'Details',
  },
  {
    number: '02',
    label: 'Participation',
  },
  {
    number: '03',
    label: 'Machine',
  },
  {
    number: '04',
    label: 'Confirm',
  },
] as const

export function RegistrationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({
      open,
    }),
    [open],
  )

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
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
  const [form, setForm] =
    useState<FormData>(EMPTY_FORM)

  const [submitted, setSubmitted] =
    useState(false)

  const [regNumber, setRegNumber] =
    useState('')

  const [copied, setCopied] =
    useState(false)

  const [submitting, setSubmitting] =
    useState(false)

  const [error, setError] =
    useState('')

  const [attempted, setAttempted] =
    useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitting) {
        onClose()
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [onClose, submitting])

  const update = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))

    setError('')
  }

  const validation = useMemo(() => {
    const errors: Record<string, string> = {}

    if (step === 0) {
      if (!form.fullName.trim()) {
        errors.fullName = 'Enter your full name.'
      }

      if (
        !form.email.trim() ||
        !/.+@.+\..+/.test(form.email)
      ) {
        errors.email =
          'Enter a valid email address.'
      }

      if (!form.phone.trim()) {
        errors.phone =
          'Enter your phone number.'
      }

      if (!form.city.trim()) {
        errors.city = 'Enter your city.'
      }
    }

    if (step === 1) {
      if (!form.participantType) {
        errors.participantType =
          'Select how you are joining TOR’Q.'
      }

      if (!form.emergencyContact.trim()) {
        errors.emergencyContact =
          'Enter an emergency contact.'
      }

      if (form.participantType === 'VIP') {
        if (!form.vipCategory.trim()) {
          errors.vipCategory =
            'Select a category.'
        }

        if (!form.vipReason.trim()) {
          errors.vipReason =
            'Tell us briefly why you would like VIP access.'
        }

        if (!form.vipReferralSource.trim()) {
          errors.vipReferralSource =
            'Select how you heard about TOR’Q.'
        }
      }
    }

    if (step === 3 && !form.agree) {
      errors.agree =
        'Please accept the TOR’Q safety acknowledgement.'
    }

    return errors
  }, [step, form])

  const stepValid =
    Object.keys(validation).length === 0

  const handleContinue = () => {
    setAttempted(true)

    if (!stepValid) return

    setAttempted(false)
    setError('')
    setStep((current) => current + 1)
  }

  const handleBack = () => {
    if (submitting) return

    setAttempted(false)
    setError('')
    setStep((current) =>
      Math.max(0, current - 1),
    )
  }

  const handleSubmit = async () => {
    if (submitting) return

    setAttempted(true)

    if (!stepValid) return

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch(
        '/api/register',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            city: form.city,
            participantType:
              form.participantType,
            emergencyContact:
              form.emergencyContact,
            vehicleMake:
              form.vehicleMake,
            vehicleModel:
              form.vehicleModel,
            instagram:
              form.instagram,

            vipCategory:
              form.vipCategory,
            vipOrganisation:
              form.vipOrganisation,
            vipRole:
              form.vipRole,
            vipReason:
              form.vipReason,
            vipReferralSource:
              form.vipReferralSource,
            vipRepresentsOrganisation:
              form.vipRepresentsOrganisation,
            vipWebsite:
              form.vipWebsite,
          }),
        },
      )

      const result =
        await response.json()

      if (!response.ok) {
        console.error(
          'Registration error:',
          result,
        )

        setError(
          result.error ||
            'We could not complete your registration. Please try again.',
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

        setError(
          'Your registration was received, but we could not retrieve your registration number. Please contact the TOR’Q team.',
        )

        return
      }

      /*
       * Confirmation email is intentionally
       * non-blocking. The registration remains
       * successful even if email delivery fails.
       */
      try {
        const emailResponse =
          await fetch(
            '/api/send-confirmation',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify({
                email: form.email,
                fullName:
                  form.fullName,
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

      setRegNumber(
        registrationNumber,
      )
      setSubmitted(true)
    } catch (submissionError) {
      console.error(
        'Registration submission error:',
        submissionError,
      )

      setError(
        'Something went wrong while submitting your registration. Please check your connection and try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const copyNumber = () => {
    if (!regNumber) return

    navigator.clipboard
      ?.writeText(regNumber)
      .then(() => {
        setCopied(true)

        window.setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
      .catch(() => {
        setCopied(false)
      })
  }

  return (
    <div
      className="torq-modal-backdrop fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Register for TOR'Q"
    >
      <button
        type="button"
        aria-label="Close registration"
        onClick={() => {
          if (!submitting) onClose()
        }}
        className="fixed inset-0 cursor-default"
      />

      <div className="torq-modal-shell relative z-10 my-auto w-full max-w-xl overflow-hidden">
        <div className="h-[2px] w-full bg-gradient-to-r from-primary via-ember to-gold" />

        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close registration"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:border-accent/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
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
          <div className="torq-modal-scroll max-h-[calc(100svh-24px)] overflow-y-auto">
            <div className="p-5 sm:p-8">
              <header className="pr-10">
                <p className="font-display text-[10px] font-bold tracking-[0.32em] text-accent uppercase">
                  TOR’Q 2026
                </p>

                <h2 className="font-display mt-2 text-2xl font-bold tracking-wide text-foreground sm:text-3xl">
                  Secure your place.
                </h2>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Register for Africa&apos;s biggest
                  motorsport spectacle in Lagos.
                </p>
              </header>

              <Stepper step={step} />

              <div
                key={step}
                className="animate-in fade-in slide-in-from-right-2 duration-300"
              >
                <div className="mt-7 min-h-[260px]">
                  {step === 0 && (
                    <DetailsStep
                      form={form}
                      update={update}
                      errors={
                        attempted
                          ? validation
                          : {}
                      }
                    />
                  )}

                  {step === 1 && (
                    <ParticipationStep
                      form={form}
                      update={update}
                      errors={
                        attempted
                          ? validation
                          : {}
                      }
                    />
                  )}

                  {step === 2 && (
                    <MachineStep
                      form={form}
                      update={update}
                    />
                  )}

                  {step === 3 && (
                    <ConfirmStep
                      form={form}
                      update={update}
                      errors={
                        attempted
                          ? validation
                          : {}
                      }
                    />
                  )}
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3"
                >
                  <p className="text-sm leading-relaxed text-destructive">
                    {error}
                  </p>
                </div>
              )}

              <div className="mt-7 flex items-center justify-between gap-3 border-t border-border/70 pt-5">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={
                    step === 0
                      ? onClose
                      : handleBack
                  }
                  disabled={submitting}
                  className="min-w-[90px]"
                >
                  {step === 0
                    ? 'Cancel'
                    : 'Back'}
                </Button>

                {step <
                STEPS.length - 1 ? (
                  <Button
                    size="lg"
                    onClick={
                      handleContinue
                    }
                    disabled={submitting}
                    className="min-w-[120px]"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={
                      handleSubmit
                    }
                    disabled={
                      submitting
                    }
                    className="min-w-[190px]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-4" />
                        Complete Registration
                      </>
                    )}
                  </Button>
                )}
              </div>
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
    <nav
      aria-label="Registration progress"
      className="mt-7"
    >
      <div className="grid grid-cols-4 gap-2">
        {STEPS.map(
          ({ number, label }, index) => {
            const active = index <= step
            const current =
              index === step

            return (
              <div
                key={label}
                className="min-w-0"
              >
                <div
                  className={cn(
                    'h-1 rounded-full transition-colors duration-300',
                    active
                      ? 'bg-primary'
                      : 'bg-border',
                  )}
                />

                <div className="mt-2 flex items-baseline gap-1.5">
                  <span
                    className={cn(
                      'font-display text-[9px] font-bold tracking-wider',
                      current
                        ? 'text-accent'
                        : 'text-muted-foreground',
                    )}
                  >
                    {number}
                  </span>

                  <span
                    className={cn(
                      'truncate text-[9px] font-medium tracking-[0.08em] uppercase',
                      current
                        ? 'text-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </span>
                </div>
              </div>
            )
          },
        )}
      </div>
    </nav>
  )
}

function DetailsStep({
  form,
  update,
  errors,
}: {
  form: FormData
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => void
  errors: Record<string, string>
}) {
  return (
    <section>
      <StepHeading
        eyebrow="Step 01"
        title="Tell us about yourself."
        description="We’ll use these details to create your TOR’Q registration."
      />

      <div className="mt-6 grid gap-4">
        <Field
          label="Full Name"
          value={form.fullName}
          onChange={(value) =>
            update('fullName', value)
          }
          placeholder="Ayrton Senna"
          required
          error={errors.fullName}
          autoComplete="name"
        />

        <Field
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(value) =>
            update('email', value)
          }
          placeholder="you@email.com"
          required
          error={errors.email}
          autoComplete="email"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={(value) =>
              update('phone', value)
            }
            placeholder="+234 801 234 5678"
            required
            error={errors.phone}
            autoComplete="tel"
          />

          <Field
            label="City"
            value={form.city}
            onChange={(value) =>
              update('city', value)
            }
            placeholder="Lagos"
            required
            error={errors.city}
            autoComplete="address-level2"
          />
        </div>
      </div>
    </section>
  )
}

function ParticipationStep({
  form,
  update,
  errors,
}: {
  form: FormData
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => void
  errors: Record<string, string>
}) {
  return (
    <section>
      <StepHeading
        eyebrow="Step 02"
        title="Choose your way in."
        description="Tell us how you’ll experience the TOR’Q spectacle."
      />

      <div className="mt-6 grid gap-5">
        <div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PARTICIPANT_TYPES.filter(
              (type) => type !== 'VIP',
            ).map((type) => {
              const Icon =
                PARTICIPANT_ICONS[type]

              const active =
                form.participantType ===
                type

              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    update(
                      'participantType',
                      type,
                    )
                  }
                  className={cn(
                    'group flex min-h-[108px] flex-col items-center justify-center gap-3 rounded-xl border px-3 py-4 text-center transition-all duration-200',
                    active
                      ? 'border-primary bg-primary/10 text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.03)]'
                      : 'border-border bg-secondary/20 text-muted-foreground hover:border-accent/40 hover:bg-secondary/40 hover:text-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full border transition-colors',
                      active
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-border bg-background text-accent group-hover:border-accent/40',
                    )}
                  >
                    <Icon className="size-4" />
                  </span>

                  <span className="text-xs font-semibold">
                    {type}
                  </span>
                </button>
              )
            })}
          </div>

          {errors.participantType && (
            <FieldError>
              {errors.participantType}
            </FieldError>
          )}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gold/25 bg-gradient-to-br from-gold/10 via-background to-primary/5 p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="size-4 text-gold" />

                  <span className="text-[9px] font-bold tracking-[0.25em] text-gold uppercase">
                    VIP & Hospitality
                  </span>
                </div>

                <h3 className="font-display mt-2 text-lg font-bold tracking-wide sm:text-xl">
                  Experience TOR&apos;Q differently.
                </h3>
              </div>

              <span className="hidden rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[8px] font-bold tracking-[0.18em] text-gold uppercase sm:block">
                Limited
              </span>
            </div>

            <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Request access to elevated viewing,
              dedicated access and our premium
              hospitality experience.
            </p>

            <button
              type="button"
              aria-pressed={
                form.participantType ===
                'VIP'
              }
              onClick={() =>
                update(
                  'participantType',
                  'VIP',
                )
              }
              className={cn(
                'mt-5 flex w-full items-center justify-between rounded-lg border px-4 py-3.5 text-left transition-all',
                form.participantType ===
                  'VIP'
                  ? 'border-gold bg-gold/15'
                  : 'border-gold/25 bg-background/40 hover:border-gold/50',
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full border',
                    form.participantType ===
                      'VIP'
                      ? 'border-gold bg-gold text-black'
                      : 'border-gold/25 text-gold',
                  )}
                >
                  <Crown className="size-4" />
                </span>

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
                  'text-[9px] font-bold tracking-[0.15em] uppercase',
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

            {form.participantType ===
              'VIP' && (
              <div className="mt-5 grid gap-4 border-t border-gold/15 pt-5">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] text-gold uppercase">
                    VIP Application
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    VIP access is curated. Give
                    us a little context so the
                    team can review your request.
                  </p>
                </div>

                <SelectField
                  label="What best describes you?"
                  value={form.vipCategory}
                  onChange={(value) =>
                    update(
                      'vipCategory',
                      value,
                    )
                  }
                  error={
                    errors.vipCategory
                  }
                >
                  <option value="">
                    Select a category
                  </option>
                  <option value="Business Executive">
                    Business Executive
                  </option>
                  <option value="Sponsor / Brand Representative">
                    Sponsor / Brand Representative
                  </option>
                  <option value="Motorsport Professional">
                    Motorsport Professional
                  </option>
                  <option value="Automotive Industry">
                    Automotive Industry
                  </option>
                  <option value="Content Creator / Media">
                    Content Creator / Media
                  </option>
                  <option value="Celebrity / Public Figure">
                    Celebrity / Public Figure
                  </option>
                  <option value="Investor">
                    Investor
                  </option>
                  <option value="TOR'Q Community">
                    TOR&apos;Q Community
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </SelectField>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Organisation / Company"
                    value={
                      form.vipOrganisation
                    }
                    onChange={(value) =>
                      update(
                        'vipOrganisation',
                        value,
                      )
                    }
                    placeholder="Company name"
                  />

                  <Field
                    label="Your Role"
                    value={form.vipRole}
                    onChange={(value) =>
                      update(
                        'vipRole',
                        value,
                      )
                    }
                    placeholder="CEO, Founder, Driver..."
                  />
                </div>

                <CheckboxField
                  checked={
                    form.vipRepresentsOrganisation
                  }
                  onChange={(checked) =>
                    update(
                      'vipRepresentsOrganisation',
                      checked,
                    )
                  }
                  title="I am attending on behalf of an organisation"
                  description="For example, a brand, company, media organisation or business."
                />

                <TextareaField
                  label="Why would you like to experience TOR’Q as a VIP?"
                  value={form.vipReason}
                  onChange={(value) =>
                    update(
                      'vipReason',
                      value,
                    )
                  }
                  placeholder="Tell us briefly why you'd like VIP access..."
                  rows={4}
                  error={errors.vipReason}
                />

                <SelectField
                  label="How did you hear about TOR’Q?"
                  value={
                    form.vipReferralSource
                  }
                  onChange={(value) =>
                    update(
                      'vipReferralSource',
                      value,
                    )
                  }
                  error={
                    errors.vipReferralSource
                  }
                >
                  <option value="">
                    Select an option
                  </option>
                  <option value="Previous TOR'Q">
                    Previous TOR&apos;Q
                  </option>
                  <option value="Friend / Referral">
                    Friend / Referral
                  </option>
                  <option value="Sponsor">
                    Sponsor
                  </option>
                  <option value="Social Media">
                    Social Media
                  </option>
                  <option value="Media">
                    Media
                  </option>
                  <option value="Partner">
                    Partner
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </SelectField>

                <Field
                  label="Website / Professional Profile"
                  value={
                    form.vipWebsite
                  }
                  onChange={(value) =>
                    update(
                      'vipWebsite',
                      value,
                    )
                  }
                  placeholder="https://..."
                  type="url"
                />
              </div>
            )}
          </div>
        </div>

        <Field
          label="Emergency Contact"
          value={form.emergencyContact}
          onChange={(value) =>
            update(
              'emergencyContact',
              value,
            )
          }
          placeholder="Name & phone number"
          required
          error={errors.emergencyContact}
        />
      </div>
    </section>
  )
}

function MachineStep({
  form,
  update,
}: {
  form: FormData
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => void
}) {
  return (
    <section>
      <StepHeading
        eyebrow="Step 03"
        title="Tell us about your machine."
        description="Vehicle details help us understand the machines joining the spectacle."
      />

      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-border bg-secondary/20 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
              <Car className="size-4" />
            </span>

            <div>
              <p className="text-sm font-semibold">
                Vehicle information
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Vehicle details are optional for
                spectators, sim racers and VIP
                guests.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Vehicle Make"
            value={form.vehicleMake}
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
            value={form.vehicleModel}
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
          value={form.instagram}
          onChange={(value) =>
            update(
              'instagram',
              value,
            )
          }
          placeholder="@yourhandle"
          type="text"
        />
      </div>
    </section>
  )
}

function ConfirmStep({
  form,
  update,
  errors,
}: {
  form: FormData
  update: <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => void
  errors: Record<string, string>
}) {
  return (
    <section>
      <StepHeading
        eyebrow="Step 04"
        title="Check your details."
        description="Everything looks good? Confirm your registration below."
      />

      <div className="mt-6 grid gap-4">
        <div className="overflow-hidden rounded-xl border border-border bg-secondary/20">
          <div className="border-b border-border px-4 py-3">
            <p className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase">
              Registration Summary
            </p>
          </div>

          <div className="grid gap-0">
            <SummaryRow
              label="Name"
              value={form.fullName}
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
              label="Participation"
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
                  .join(' ') || '—'
              }
            />
          </div>
        </div>

        <CheckboxField
          checked={form.agree}
          onChange={(checked) =>
            update('agree', checked)
          }
          title="I agree to abide by the TOR’Q safety rules."
          description="I understand that motorsport carries inherent risk and agree to follow event safety instructions."
          error={errors.agree}
          accent="primary"
        />
      </div>
    </section>
  )
}

function StepHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div>
      <p className="text-[9px] font-bold tracking-[0.25em] text-accent uppercase">
        {eyebrow}
      </p>

      <h3 className="font-display mt-2 text-xl font-bold tracking-wide text-foreground sm:text-2xl">
        {title}
      </h3>

      <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {description}
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  error?: string
  autoComplete?: string
}) {
  const hasError = Boolean(error)

  return (
    <label className="grid gap-2">
      <span className="torq-field-label">
        {label}

        {required && (
          <span className="ml-1 text-primary">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={hasError}
        aria-describedby={
          hasError
            ? `${label
                .toLowerCase()
                .replace(/\s+/g, '-')}-error`
            : undefined
        }
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className={cn(
          'torq-control',
          hasError &&
            'border-destructive/70 focus:border-destructive focus:ring-destructive/20',
        )}
      />

      {error && (
        <FieldError
          id={`${label
            .toLowerCase()
            .replace(/\s+/g, '-')}-error`}
        >
          {error}
        </FieldError>
      )}
    </label>
  )
}

function SelectField({
  label,
  value,
  onChange,
  children,
  error,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  children: ReactNode
  error?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="torq-field-label">
        {label}
      </span>

      <select
        value={value}
        aria-invalid={Boolean(error)}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className={cn(
          'torq-control appearance-none',
          error &&
            'border-destructive/70 focus:border-destructive focus:ring-destructive/20',
        )}
      >
        {children}
      </select>

      {error && (
        <FieldError>
          {error}
        </FieldError>
      )}
    </label>
  )
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  error?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="torq-field-label">
        {label}
      </span>

      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className={cn(
          'torq-control min-h-[110px] resize-y py-3',
          error &&
            'border-destructive/70 focus:border-destructive focus:ring-destructive/20',
        )}
      />

      {error && (
        <FieldError>
          {error}
        </FieldError>
      )}
    </label>
  )
}

function CheckboxField({
  checked,
  onChange,
  title,
  description,
  error,
  accent = 'gold',
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  title: string
  description: string
  error?: string
  accent?: 'gold' | 'primary'
}) {
  return (
    <div>
      <label
        className={cn(
          'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors',
          error
            ? 'border-destructive/40 bg-destructive/5'
            : 'border-border bg-secondary/20 hover:border-border/80',
        )}
      >
        <span
          className={cn(
            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-all',
            checked &&
              accent === 'gold' &&
              'border-gold bg-gold text-black',
            checked &&
              accent === 'primary' &&
              'border-primary bg-primary text-primary-foreground',
            !checked &&
              'border-border bg-background',
          )}
        >
          {checked && (
            <CheckCircle2 className="size-3.5" />
          )}
        </span>

        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(event) =>
            onChange(
              event.target.checked,
            )
          }
        />

        <span className="min-w-0">
          <span className="block text-sm font-medium text-foreground">
            {title}
          </span>

          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
            {description}
          </span>
        </span>
      </label>

      {error && (
        <FieldError>
          {error}
        </FieldError>
      )}
    </div>
  )
}

function FieldError({
  children,
  id,
}: {
  children: ReactNode
  id?: string
}) {
  return (
    <p
      id={id}
      className="text-xs font-medium text-destructive"
    >
      {children}
    </p>
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
    <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 border-b border-border/60 px-4 py-3 last:border-b-0 sm:grid-cols-[130px_minmax(0,1fr)]">
      <span className="text-xs text-muted-foreground">
        {label}
      </span>

      <span className="min-w-0 truncate text-right text-xs font-medium text-foreground sm:text-sm">
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
  const isVip =
    participantType === 'VIP'

  const firstName = name
    ? name.trim().split(/\s+/)[0]
    : ''

  return (
    <div className="relative overflow-hidden p-5 text-center sm:p-8">
      {isVip && (
        <>
          <div className="pointer-events-none absolute -top-32 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-primary/10 blur-3xl" />
        </>
      )}

      <div className="relative">
        <div
          className={cn(
            'mx-auto flex size-20 items-center justify-center rounded-full border',
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

        <p
          className={cn(
            'mt-6 text-[9px] font-bold tracking-[0.35em] uppercase',
            isVip
              ? 'text-gold'
              : 'text-accent',
          )}
        >
          TOR&apos;Q 2026
        </p>

        <h2 className="font-display mt-2 text-2xl font-bold tracking-wide sm:text-4xl">
          {isVip
            ? 'VIP Request Received'
            : 'Registration Confirmed'}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {isVip ? (
            <>
              {firstName
                ? `Welcome, ${firstName}. `
                : ''}
              Your request for the TOR&apos;Q
              VIP experience has been
              successfully received.
            </>
          ) : (
            <>
              {firstName
                ? `You’re in, ${firstName}. `
                : ''}
              Your registration has been
              successfully received and a
              confirmation has been sent to
              your email.
            </>
          )}
        </p>

        {isVip && (
          <div className="mt-6 rounded-xl border border-gold/30 bg-gradient-to-br from-gold/10 via-background to-gold/5 p-5 text-left">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Crown className="size-4 text-gold" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  VIP request submitted.
                </p>

                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  VIP access is limited and
                  subject to approval. Our team
                  will review your request and
                  contact you with the outcome.
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            'mt-5 rounded-xl border p-5',
            isVip
              ? 'border-gold/30 bg-gold/[0.04]'
              : 'border-border bg-secondary/40',
          )}
        >
          <p className="text-[9px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
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
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent transition-opacity hover:opacity-80"
          >
            <Copy className="size-3.5" />

            {copied
              ? 'Registration number copied'
              : 'Copy registration number'}
          </button>
        </div>

        {isVip && (
          <div className="mt-5 grid gap-3 text-left">
            <StatusItem
              icon={CheckCircle2}
              title="Request submitted"
              description="Your details have been received by the TOR’Q team."
            />

            <StatusItem
              icon={ShieldCheck}
              title="Awaiting approval"
              description="If your VIP request is approved, you’ll receive your official TOR’Q pass and access details by email."
            />
          </div>
        )}

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          {isVip
            ? 'Keep your registration number for your records.'
            : 'Please keep your registration number for your records.'}
        </p>

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

        <p className="mt-4 text-[9px] font-medium tracking-[0.25em] text-muted-foreground uppercase">
          Artistry in Motorsport
        </p>
      </div>
    </div>
  )
}

function StatusItem({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/20 p-4">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" />

      <div>
        <p className="text-xs font-semibold text-foreground">
          {title}
        </p>

        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}
