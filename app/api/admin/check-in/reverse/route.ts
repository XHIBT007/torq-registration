import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

const REGISTRATION_SELECT = `
  id,
  registration_number,
  full_name,
  checked_in,
  checked_in_at
`

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
      typeof body?.registrationNumber === 'string'
        ? body.registrationNumber.trim().slice(0, 50)
        : ''

    if (!registrationNumber) {
      return NextResponse.json(
        {
          error: 'Registration number is required.',
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
      console.error(
        'Reverse check-in lookup error:',
        findError,
      )

      return NextResponse.json(
        {
          error: 'Unable to find registration.',
        },
        { status: 500 },
      )
    }

    if (!registration) {
      return NextResponse.json(
        {
          error: 'Registration not found.',
        },
        { status: 404 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Fast state check                                                       */
    /* ---------------------------------------------------------------------- */

    if (!registration.checked_in) {
      return NextResponse.json(
        {
          error: 'This participant is not currently checked in.',
        },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Atomic reversal                                                        */
    /* ---------------------------------------------------------------------- */
    /*
     * The important protection is here:
     *
     * WHERE id = ... AND checked_in = true
     *
     * Only one simultaneous reversal can change the row from true -> false.
     */

    const {
      data: updatedRegistration,
      error: updateError,
    } = await supabaseAdmin
      .from('registrations')
      .update({
        checked_in: false,
        checked_in_at: null,
      })
      .eq('id', registration.id)
      .eq('checked_in', true)
      .select(REGISTRATION_SELECT)
      .maybeSingle()

    if (updateError) {
      console.error(
        'Check-in reversal error:',
        updateError,
      )

      return NextResponse.json(
        {
          error: 'Unable to reverse check-in.',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Another request already reversed it                                   */
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
          'Reverse check-in race-condition lookup error:',
          currentError,
        )
      }

      return NextResponse.json(
        {
          error:
            'This participant is not currently checked in.',
          registration:
            currentRegistration || registration,
        },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Success                                                                */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      success: true,
      message: 'Check-in reversed successfully.',
      registration: updatedRegistration,
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
