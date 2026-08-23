import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function PATCH(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    
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

    const body = await request.json()
    const { registrationNumber } = body

    if (!registrationNumber) {
      return NextResponse.json(
        { error: 'Registration number is required.' },
        { status: 400 },
      )
    }

    const { data: registration, error: findError } =
      await supabaseAdmin
        .from('registrations')
        .select(
          `
          id,
          registration_number,
          full_name,
          checked_in,
          checked_in_at
          `,
        )
        .eq('registration_number', registrationNumber)
        .single()

    if (findError || !registration) {
      return NextResponse.json(
        { error: 'Registration not found.' },
        { status: 404 },
      )
    }

    if (!registration.checked_in) {
      return NextResponse.json(
        { error: 'This participant is not currently checked in.' },
        { status: 400 },
      )
    }

    const { data, error: updateError } = await supabaseAdmin
      .from('registrations')
      .update({
        checked_in: false,
        checked_in_at: null,
      })
      .eq('id', registration.id)
      .select(
        `
        id,
        registration_number,
        full_name,
        checked_in,
        checked_in_at
        `,
      )
      .single()

    if (updateError) {
      console.error('Check-in reversal error:', updateError)

      return NextResponse.json(
        { error: 'Unable to reverse check-in.' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      message: 'Check-in reversed successfully.',
      registration: data,
    })
  } catch (error) {
    console.error('Reverse check-in API error:', error)

    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    )
  }
}
