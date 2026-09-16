import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

const RECENT_CHECK_INS_LIMIT = 10

const RECENT_CHECK_IN_SELECT = `
  id,
  registration_number,
  full_name,
  participant_type,
  vehicle_make,
  vehicle_model,
  checked_in,
  checked_in_at,
  status
`

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
    /* Get total approved count                                               */
    /* ---------------------------------------------------------------------- */

    const {
      count: totalApproved,
      error: totalError,
    } = await supabaseAdmin
      .from('registrations')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('status', 'Approved')

    if (totalError) {
      console.error(
        'Total approved count error:',
        totalError,
      )

      return NextResponse.json(
        {
          error:
            'Unable to load check-in statistics',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Get checked-in count                                                   */
    /* ---------------------------------------------------------------------- */

    const {
      count: checkedIn,
      error: checkedInError,
    } = await supabaseAdmin
      .from('registrations')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('status', 'Approved')
      .eq('checked_in', true)

    if (checkedInError) {
      console.error(
        'Checked-in count error:',
        checkedInError,
      )

      return NextResponse.json(
        {
          error:
            'Unable to load check-in statistics',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Calculate totals                                                       */
    /* ---------------------------------------------------------------------- */

    const approvedCount = totalApproved ?? 0
    const checkedInCount = checkedIn ?? 0

    const remaining = Math.max(
      approvedCount - checkedInCount,
      0,
    )

    const percentage =
      approvedCount > 0
        ? Math.round(
            (checkedInCount / approvedCount) * 100,
          )
        : 0

    /* ---------------------------------------------------------------------- */
    /* Get only recent check-ins                                              */
    /* ---------------------------------------------------------------------- */

    const {
      data: recentCheckIns,
      error: recentError,
    } = await supabaseAdmin
      .from('registrations')
      .select(RECENT_CHECK_IN_SELECT)
      .eq('status', 'Approved')
      .eq('checked_in', true)
      .order('checked_in_at', {
        ascending: false,
        nullsFirst: false,
      })
      .limit(RECENT_CHECK_INS_LIMIT)

    if (recentError) {
      console.error(
        'Recent check-ins error:',
        recentError,
      )

      return NextResponse.json(
        {
          error:
            'Unable to load recent check-ins',
        },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Return statistics                                                      */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      totalApproved: approvedCount,
      checkedIn: checkedInCount,
      remaining,
      percentage,
      recentCheckIns: recentCheckIns || [],
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
