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

    // Basic validation
    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !city?.trim() ||
      !participantType ||
      !emergencyContact?.trim()
    ) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 },
      )
    }

    if (!PARTICIPANT_TYPES.includes(participantType)) {
      return NextResponse.json(
        { error: 'Invalid participant type.' },
        { status: 400 },
      )
    }

    // VIP-specific validation
    if (participantType === 'VIP') {
      if (
        !vipCategory?.trim() ||
        !vipReason?.trim() ||
        !vipReferralSource?.trim()
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
        !VIP_CATEGORIES.includes(vipCategory) ||
        !VIP_REFERRAL_SOURCES.includes(vipReferralSource)
      ) {
        return NextResponse.json(
          {
            error: 'Invalid VIP application information.',
          },
          { status: 400 },
        )
      }
    }

    // Generate a registration number.
    // The database UNIQUE constraint provides the final
    // protection against duplicates.
    let registrationNumber = ''
    let registrationCreated = false
    let data = null

    for (let attempt = 0; attempt < 5; attempt++) {
      registrationNumber = generateRegistrationNumber()

      const result = await supabaseAdmin
        .from('registrations')
        .insert({
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          city: city.trim(),
          participant_type: participantType,
          emergency_contact: emergencyContact.trim(),
          vehicle_make: vehicleMake?.trim() || null,
          vehicle_model: vehicleModel?.trim() || null,
          instagram: instagram?.trim() || null,
          registration_number: registrationNumber,

          // VIP application
          vip_category:
            participantType === 'VIP'
              ? vipCategory.trim()
              : null,

          vip_organisation:
            participantType === 'VIP'
              ? vipOrganisation?.trim() || null
              : null,

          vip_role:
            participantType === 'VIP'
              ? vipRole?.trim() || null
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
              ? vipWebsite?.trim() || null
              : null,
        })
        .select()
        .single()

      if (!result.error) {
        data = result.data
        registrationCreated = true
        break
      }

      // 23505 = PostgreSQL unique violation.
      // If the generated number already exists, try again.
      if (result.error.code === '23505') {
        continue
      }

      console.error(
        'Registration insert error:',
        result.error,
      )

      return NextResponse.json(
        { error: result.error.message },
        { status: 500 },
      )
    }

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
