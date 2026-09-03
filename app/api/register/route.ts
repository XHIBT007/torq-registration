import { NextResponse } from 'next/server'
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

function generateRegistrationNumber() {
  const number = Math.floor(Math.random() * 1_000_000)

  return `TORQ-2026-${String(number).padStart(6, '0')}`
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      fullName,
      email,
      phone,
      city,
      participantType,
      emergencyContact,
      vehicleMake,
      vehicleModel,
      instagram,

      // VIP application
      vipCategory,
      vipOrganisation,
      vipRole,
      vipReason,
      vipReferralSource,
      vipRepresentsOrganisation,
      vipWebsite,
    } = body

    const cleanFullName =
      typeof fullName === 'string' ? fullName.trim() : ''

    const cleanEmail =
      typeof email === 'string'
        ? email.trim().toLowerCase()
        : ''

    const cleanPhone =
      typeof phone === 'string' ? phone.trim() : ''

    const cleanCity =
      typeof city === 'string' ? city.trim() : ''

    const cleanEmergencyContact =
      typeof emergencyContact === 'string'
        ? emergencyContact.trim()
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

    if (!PARTICIPANT_TYPES.includes(participantType)) {
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

    if (participantType === 'VIP') {
      const cleanVipCategory =
        typeof vipCategory === 'string'
          ? vipCategory.trim()
          : ''

      const cleanVipReason =
        typeof vipReason === 'string'
          ? vipReason.trim()
          : ''

      const cleanVipReferralSource =
        typeof vipReferralSource === 'string'
          ? vipReferralSource.trim()
          : ''

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
        !VIP_CATEGORIES.includes(cleanVipCategory) ||
        !VIP_REFERRAL_SOURCES.includes(
          cleanVipReferralSource,
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
          emergency_contact: cleanEmergencyContact,

          vehicle_make:
            typeof vehicleMake === 'string'
              ? vehicleMake.trim() || null
              : null,

          vehicle_model:
            typeof vehicleModel === 'string'
              ? vehicleModel.trim() || null
              : null,

          instagram:
            typeof instagram === 'string'
              ? instagram.trim() || null
              : null,

          registration_number:
            registrationNumber,

          // Every new application starts here.
          // Admin controls approval/rejection.
          status: 'Pending',

          /* VIP application */

          vip_category:
            participantType === 'VIP'
              ? vipCategory.trim()
              : null,

          vip_organisation:
            participantType === 'VIP'
              ? typeof vipOrganisation === 'string'
                ? vipOrganisation.trim() || null
                : null
              : null,

          vip_role:
            participantType === 'VIP'
              ? typeof vipRole === 'string'
                ? vipRole.trim() || null
                : null
              : null,

          vip_reason:
            participantType === 'VIP'
              ? vipReason.trim()
              : null,

          vip_referral_source:
            participantType === 'VIP'
              ? vipReferralSource.trim()
              : null,

          vip_represents_organisation:
            participantType === 'VIP'
              ? Boolean(vipRepresentsOrganisation)
              : false,

          vip_website:
            participantType === 'VIP'
              ? typeof vipWebsite === 'string'
                ? vipWebsite.trim() || null
                : null
              : null,
        })
        .select()
        .single()

      if (!result.error) {
        data = result.data
        registrationCreated = true
        break
      }

      /*
       * PostgreSQL 23505 means unique violation.
       *
       * It can mean:
       * 1. registration_number collision
       * 2. email collision
       *
       * Check the email before retrying.
       */

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

        // No matching email means the generated
        // registration number likely collided.
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
      registration: data,
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
