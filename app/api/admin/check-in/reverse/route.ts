import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function PATCH(request: Request) {
  try {
    /* ---------------------------------------------------------------------- */
    /* Admin authorization                                                    */
    /* ---------------------------------------------------------------------- */

    const auth = await requireAdmin(request)

    if (auth.response) {
      return auth.response
    }

    /* ---------------------------------------------------------------------- */
    /* Read request body                                                       */
    /* ---------------------------------------------------------------------- */

    const body = await request.json()

    const registrationNumber =
      typeof body.registrationNumber === 'string'
        ? body.registrationNumber.trim()
        : ''

    if (!registrationNumber) {
      return NextResponse.json(
        {
          error:
            'Registration number is required.',
        },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Find registration                                                      */
    /* ---------------------------------------------------------------------- */

    const {
      data: registration,
      error: findError,
    } = await supabaseAdmin
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
      .eq(
        'registration_number',
        registrationNumber,
      )
      .single()

    if (findError || !registration) {
      return NextResponse.json(
        {
          error: 'Registration not found.',
        },
        { status: 404 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Make sure participant is currently checked in                          */
    /* ---------------------------------------------------------------------- */

    if (!registration.checked_in) {
      return NextResponse.json(
        {
          error:
            'This participant is not currently checked in.',
        },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Reverse check-in                                                       */
    /* ---------------------------------------------------------------------- */

    const {
      data,
      error: updateError,
    } = await supabaseAdmin
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
      console.error(
        'Check-in reversal error:',
        updateError,
      )

      return NextResponse.json(
        {
          error:
            'Unable to reverse check-in.',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Success                                                                */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      success: true,
      message:
        'Check-in reversed successfully.',
      registration: data,
    })
  } catch (error) {
    console.error(
      'Reverse check-in API error:',
      error,
    )

    return NextResponse.json(
      {
        error: 'Something went wrong.',
      },
      { status: 500 },
    )
  }
}
