import { NextResponse } from 'next/server'
import { randomInt } from 'crypto'
import { supabaseAdmin } from '@/lib/supabase-admin'

const PARTICIPANT_TYPES = [
  'Driver',
  'Rider',
  'VIP',
  'Spectator',
  'Sim Racer',
] as const

const VIP_CATEGORIES = [
  'Business Executive',
  'Sponsor / Brand Representative',
  'Motorsport Professional',
  'Automotive Industry',
  'Content Creator / Media',
  'Celebrity / Public Figure',
  'Investor',
  "TOR'Q Community",
  'Other',
] as const

const VIP_REFERRAL_SOURCES = [
  "Previous TOR'Q",
  'Friend / Referral',
  'Sponsor',
  'Social Media',
  'Media',
  'Partner',
  'Other',
] as const

const MAX_BODY_BYTES = 32 * 1024

const MAX_LENGTHS = {
  fullName: 120,
  email: 254,
  phone: 40,
  city: 80,
  emergencyContact: 120,
  vehicleMake: 80,
  vehicleModel: 80,
  instagram: 100,
  vipOrganisation: 150,
  vipRole: 100,
  vipReason: 1000,
  vipWebsite: 300,
} as const

function generateRegistrationNumber() {
  const number = randomInt(0, 1_000_000)

  return `TORQ-2026-${String(number).padStart(6, '0')}`
}

function cleanString(
  value: unknown,
  maxLength: number,
) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

function isValidEmail(email: string) {
  return (
    email.length <= MAX_LENGTHS.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
}

function isValidWebsite(value: string) {
  if (!value) return true

  try {
    const url = new URL(value)

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    )
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    /* ---------------------------------------------------------------------- */
    /* Request size protection                                                */
    /* ---------------------------------------------------------------------- */

    const contentLength = request.headers.get(
      'content-length',
    )

    if (
      contentLength &&
      Number(contentLength) > MAX_BODY_BYTES
    ) {
      return NextResponse.json(
        {
          error:
            'Request is too large. Please reduce the amount of information submitted.',
        },
        { status: 413 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Parse request                                                           */
    /* ---------------------------------------------------------------------- */

    let body: Record<string, unknown>

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          error:
            'Invalid registration request.',
        },
        { status: 400 },
      )
    }

    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid registration request.',
        },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Clean input                                                             */
    /* ---------------------------------------------------------------------- */

    const cleanFullName = cleanString(
      body.fullName,
      MAX_LENGTHS.fullName,
    )

    const cleanEmail = cleanString(
      body.email,
      MAX_LENGTHS.email,
    ).toLowerCase()

    const cleanPhone = cleanString(
      body.phone,
      MAX_LENGTHS.phone,
    )

    const cleanCity = cleanString(
      body.city,
      MAX_LENGTHS.city,
    )

    const cleanEmergencyContact =
      cleanString(
        body.emergencyContact,
        MAX_LENGTHS.emergencyContact,
      )

    const cleanVehicleMake = cleanString(
      body.vehicleMake,
      MAX_LENGTHS.vehicleMake,
    )

    const cleanVehicleModel = cleanString(
      body.vehicleModel,
      MAX_LENGTHS.vehicleModel,
    )

    const cleanInstagram = cleanString(
      body.instagram,
      MAX_LENGTHS.instagram,
    )

    const participantType =
      typeof body.participantType === 'string'
        ? body.participantType.trim()
        : ''

    /* ---------------------------------------------------------------------- */
    /* Basic validation                                                       */
    /* ---------------------------------------------------------------------- */

    if (
      !cleanFullName ||
      !cleanEmail ||
      !cleanPhone ||
      !cleanCity ||
      !participantType ||
      !cleanEmergencyContact
    ) {
      return NextResponse.json(
        {
          error:
            'Please complete all required fields.',
        },
        { status: 400 },
      )
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        {
          error:
            'Please enter a valid email address.',
        },
        { status: 400 },
      )
    }

    if (
      !PARTICIPANT_TYPES.includes(
        participantType as (typeof PARTICIPANT_TYPES)[number],
      )
    ) {
      return NextResponse.json(
        {
          error: 'Invalid participant type.',
        },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* VIP validation                                                         */
    /* ---------------------------------------------------------------------- */

    let cleanVipCategory = ''
    let cleanVipOrganisation = ''
    let cleanVipRole = ''
    let cleanVipReason = ''
    let cleanVipReferralSource = ''
    let cleanVipWebsite = ''
    let vipRepresentsOrganisation = false

    if (participantType === 'VIP') {
      cleanVipCategory = cleanString(
        body.vipCategory,
        100,
      )

      cleanVipOrganisation = cleanString(
        body.vipOrganisation,
        MAX_LENGTHS.vipOrganisation,
      )

      cleanVipRole = cleanString(
        body.vipRole,
        MAX_LENGTHS.vipRole,
      )

      cleanVipReason = cleanString(
        body.vipReason,
        MAX_LENGTHS.vipReason,
      )

      cleanVipReferralSource =
        cleanString(
          body.vipReferralSource,
          100,
        )

      cleanVipWebsite = cleanString(
        body.vipWebsite,
        MAX_LENGTHS.vipWebsite,
      )

      vipRepresentsOrganisation =
        body.vipRepresentsOrganisation === true

      if (
        !cleanVipCategory ||
        !cleanVipReason ||
        !cleanVipReferralSource
      ) {
        return NextResponse.json(
          {
            error:
              'Please complete the required VIP application fields.',
          },
          { status: 400 },
        )
      }

      if (
        !VIP_CATEGORIES.includes(
          cleanVipCategory as (typeof VIP_CATEGORIES)[number],
        ) ||
        !VIP_REFERRAL_SOURCES.includes(
          cleanVipReferralSource as (typeof VIP_REFERRAL_SOURCES)[number],
        )
      ) {
        return NextResponse.json(
          {
            error:
              'Invalid VIP application information.',
          },
          { status: 400 },
        )
      }

      if (
        cleanVipWebsite &&
        !isValidWebsite(cleanVipWebsite)
      ) {
        return NextResponse.json(
          {
            error:
              'Please enter a valid website URL.',
          },
          { status: 400 },
        )
      }
    }

    /* ---------------------------------------------------------------------- */
    /* Duplicate email check                                                  */
    /* ---------------------------------------------------------------------- */

    const {
      data: existingRegistration,
      error: existingError,
    } = await supabaseAdmin
      .from('registrations')
      .select(
        'id, registration_number, status, participant_type',
      )
      .eq('email', cleanEmail)
      .maybeSingle()

    if (existingError) {
      console.error(
        'Existing registration lookup error:',
        existingError,
      )

      return NextResponse.json(
        {
          error:
            'Unable to verify your registration. Please try again.',
        },
        { status: 500 },
      )
    }

    if (existingRegistration) {
      return NextResponse.json(
        {
          error:
            "This email address has already been used for a TOR'Q 2026 registration.",
        },
        { status: 409 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Create registration                                                    */
    /* ---------------------------------------------------------------------- */

    let registrationNumber = ''
    let registrationCreated = false
    let data = null

    for (let attempt = 0; attempt < 5; attempt++) {
      registrationNumber =
        generateRegistrationNumber()

      const result = await supabaseAdmin
        .from('registrations')
        .insert({
          full_name: cleanFullName,
          email: cleanEmail,
          phone: cleanPhone,
          city: cleanCity,
          participant_type: participantType,
          emergency_contact:
            cleanEmergencyContact,

          vehicle_make:
            cleanVehicleMake || null,

          vehicle_model:
            cleanVehicleModel || null,

          instagram:
            cleanInstagram || null,

          registration_number:
            registrationNumber,

          // Every new application starts here.
          // Admin controls approval/rejection.
          status: 'Pending',

          /* VIP application */

          vip_category:
            participantType === 'VIP'
              ? cleanVipCategory
              : null,

          vip_organisation:
            participantType === 'VIP'
              ? cleanVipOrganisation || null
              : null,

          vip_role:
            participantType === 'VIP'
              ? cleanVipRole || null
              : null,

          vip_reason:
            participantType === 'VIP'
              ? cleanVipReason
              : null,

          vip_referral_source:
            participantType === 'VIP'
              ? cleanVipReferralSource
              : null,

          vip_represents_organisation:
            participantType === 'VIP'
              ? vipRepresentsOrganisation
              : false,

          vip_website:
            participantType === 'VIP'
              ? cleanVipWebsite || null
              : null,
        })
        .select()
        .single()

      if (!result.error) {
        data = result.data
        registrationCreated = true
        break
      }

      /* ------------------------------------------------------------------ */
      /* Unique violation                                                    */
      /* ------------------------------------------------------------------ */

      if (result.error.code === '23505') {
        const {
          data: emailMatch,
          error: emailLookupError,
        } = await supabaseAdmin
          .from('registrations')
          .select('id')
          .eq('email', cleanEmail)
          .maybeSingle()

        if (emailLookupError) {
          console.error(
            'Duplicate registration lookup error:',
            emailLookupError,
          )

          return NextResponse.json(
            {
              error:
                'Unable to complete your registration. Please try again.',
            },
            { status: 500 },
          )
        }

        if (emailMatch) {
          return NextResponse.json(
            {
              error:
                "This email address has already been used for a TOR'Q 2026 registration.",
            },
            { status: 409 },
          )
        }

        // Registration number collision.
        continue
      }

      console.error(
        'Registration insert error:',
        result.error,
      )

      return NextResponse.json(
        {
          error:
            'Unable to create your registration at this time. Please try again.',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Final creation check                                                   */
    /* ---------------------------------------------------------------------- */

    if (!registrationCreated || !data) {
      console.error(
        'Unable to generate a unique registration number after multiple attempts.',
      )

      return NextResponse.json(
        {
          error:
            'Unable to create your registration at this time. Please try again.',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Success                                                                */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      success: true,
      registrationNumber,
    })
  } catch (error) {
    console.error(
      'Registration API error:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Something went wrong. Please try again.',
      },
      { status: 500 },
    )
  }
}
