import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

const REGISTRATION_SELECT = `
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
`

export async function POST(request: Request) {
  try {
    /* ---------------------------------------------------------------------- */
    /* Admin authorization                                                    */
    /* ---------------------------------------------------------------------- */

    const auth = await requireAdmin(request)

    if (auth.response) {
      return auth.response
    }

    /* ---------------------------------------------------------------------- */
    /* Read registration number                                               */
    /* ---------------------------------------------------------------------- */

    const body = await request.json()

    const registrationNumber =
      typeof body?.registrationNumber === 'string'
        ? body.registrationNumber.trim().slice(0, 50)
        : ''

    if (!registrationNumber) {
      return NextResponse.json(
        {
          error: 'Registration number is required',
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
      .select(REGISTRATION_SELECT)
      .eq('registration_number', registrationNumber)
      .maybeSingle()

    if (findError) {
      console.error('Check-in lookup error:', findError)

      return NextResponse.json(
        {
          error: 'Unable to find registration',
        },
        { status: 500 },
      )
    }

    if (!registration) {
      return NextResponse.json(
        {
          error: 'Registration not found',
        },
        { status: 404 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Registration must be approved                                          */
    /* ---------------------------------------------------------------------- */

    if (registration.status !== 'Approved') {
      return NextResponse.json(
        {
          error: `Registration is ${registration.status}. Only approved registrations can check in.`,
          registration,
        },
        { status: 403 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Fast duplicate check                                                   */
    /* ---------------------------------------------------------------------- */

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

    /* ---------------------------------------------------------------------- */
    /* Atomic check-in                                                        */
    /* ---------------------------------------------------------------------- */
    /*
     * The important protection is here:
     *
     * WHERE id = ... AND checked_in = false
     *
     * Only one simultaneous request can successfully change the row from
     * false -> true. If another scanner gets there first, this update
     * returns no row and we report that the participant was already checked in.
     */

    const checkedInAt = new Date().toISOString()

    const {
      data: updatedRegistration,
      error: updateError,
    } = await supabaseAdmin
      .from('registrations')
      .update({
        checked_in: true,
        checked_in_at: checkedInAt,
      })
      .eq('id', registration.id)
      .eq('checked_in', false)
      .select(REGISTRATION_SELECT)
      .maybeSingle()

    if (updateError) {
      console.error(
        'Check-in update error:',
        updateError,
      )

      return NextResponse.json(
        {
          error: 'Unable to complete check-in',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Another scanner won the race                                           */
    /* ---------------------------------------------------------------------- */

    if (!updatedRegistration) {
      const {
        data: currentRegistration,
        error: currentError,
      } = await supabaseAdmin
        .from('registrations')
        .select(REGISTRATION_SELECT)
        .eq('id', registration.id)
        .maybeSingle()

      if (currentError) {
        console.error(
          'Check-in race-condition lookup error:',
          currentError,
        )
      }

      return NextResponse.json(
        {
          error: 'Already checked in',
          alreadyCheckedIn: true,
          registration:
            currentRegistration || registration,
        },
        { status: 409 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Success                                                                */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      success: true,
      message: 'Check-in successful',
      registration: updatedRegistration,
    })
  } catch (error) {
    console.error(
      'Check-in API error:',
      error,
    )

    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      { status: 500 },
    )
  }
}
