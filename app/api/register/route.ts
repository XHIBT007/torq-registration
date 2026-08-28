import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const PARTICIPANT_TYPES = [
  'Driver',
  'Rider',
  'VIP',
  'Spectator',
  'Sim Racer',
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

      console.error('Registration insert error:', result.error)

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
    console.error('Registration API error:', error)

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
