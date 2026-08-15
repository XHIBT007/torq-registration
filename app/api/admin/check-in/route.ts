import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    // Check admin authentication
    const authHeader = request.headers.get('authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const token = authHeader.replace('Bearer ', '')

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      )
    }

    // Read registration number from QR scanner
    const body = await request.json()

    const registrationNumber =
      body.registrationNumber?.trim()

    if (!registrationNumber) {
      return NextResponse.json(
        { error: 'Registration number is required' },
        { status: 400 },
      )
    }

    // Find registration
    const { data: registration, error: findError } =
      await supabaseAdmin
        .from('registrations')
        .select(
          `
          id,
          registration_number,
          full_name,
          email,
          phone,
          city,
          participant_type,
          vehicle_make,
          vehicle_model,
          status,
          checked_in,
          checked_in_at
          `,
        )
        .eq('registration_number', registrationNumber)
        .single()

    if (findError || !registration) {
      return NextResponse.json(
        {
          error: 'Registration not found',
        },
        { status: 404 },
      )
    }

    // Registration must be approved
    if (registration.status !== 'Approved') {
      return NextResponse.json(
        {
          error: `Registration is ${registration.status}. Only approved registrations can check in.`,
          registration,
        },
        { status: 403 },
      )
    }

    // Prevent duplicate check-in
    if (registration.checked_in) {
      return NextResponse.json(
        {
          error: 'Already checked in',
          alreadyCheckedIn: true,
          registration,
        },
        { status: 409 },
      )
    }

    // Mark registration as checked in
    const { data: updatedRegistration, error: updateError } =
      await supabaseAdmin
        .from('registrations')
        .update({
          checked_in: true,
          checked_in_at: new Date().toISOString(),
        })
        .eq('id', registration.id)
        .select(
          `
          id,
          registration_number,
          full_name,
          email,
          phone,
          city,
          participant_type,
          vehicle_make,
          vehicle_model,
          status,
          checked_in,
          checked_in_at
          `,
        )
        .single()

    if (updateError) {
      console.error('Check-in update error:', updateError)

      return NextResponse.json(
        {
          error: 'Unable to complete check-in',
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Check-in successful',
      registration: updatedRegistration,
    })
  } catch (error) {
    console.error('Check-in API error:', error)

    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      { status: 500 },
    )
  }
}
