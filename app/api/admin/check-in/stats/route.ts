import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request) {
  try {
    /* ---------------------------------------------------------------------- */
    /* Admin authorization                                                    */
    /* ---------------------------------------------------------------------- */

    const auth = await requireAdmin(request)

    if (auth.response) {
      return auth.response
    }

    /* ---------------------------------------------------------------------- */
    /* Load approved registrations                                            */
    /* ---------------------------------------------------------------------- */

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select(
        `
        id,
        registration_number,
        full_name,
        participant_type,
        vehicle_make,
        vehicle_model,
        checked_in,
        checked_in_at,
        status
        `,
      )
      .eq('status', 'Approved')
      .order('checked_in_at', {
        ascending: false,
        nullsFirst: false,
      })

    if (error) {
      console.error(
        'Check-in stats error:',
        error,
      )

      return NextResponse.json(
        {
          error:
            'Unable to load check-in statistics',
        },
        { status: 500 },
      )
    }

    const registrations = data || []

    /* ---------------------------------------------------------------------- */
    /* Calculate statistics                                                   */
    /* ---------------------------------------------------------------------- */

    const totalApproved =
      registrations.length

    const checkedIn =
      registrations.filter(
        (registration) =>
          registration.checked_in === true,
      ).length

    const remaining =
      totalApproved - checkedIn

    const percentage =
      totalApproved > 0
        ? Math.round(
            (checkedIn / totalApproved) * 100,
          )
        : 0

    /* ---------------------------------------------------------------------- */
    /* Return statistics                                                      */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      totalApproved,
      checkedIn,
      remaining,
      percentage,
      recentCheckIns:
        registrations
          .filter(
            (registration) =>
              registration.checked_in === true,
          )
          .slice(0, 10),
    })
  } catch (error) {
    console.error(
      'Check-in stats API error:',
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
