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
    /* Read search query                                                      */
    /* ---------------------------------------------------------------------- */

    const { searchParams } = new URL(request.url)

    const query =
      searchParams.get('q')?.trim() || ''

    if (!query) {
      return NextResponse.json([])
    }

    /* ---------------------------------------------------------------------- */
    /* Search approved registrations                                          */
    /* ---------------------------------------------------------------------- */

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select(
        `
        id,
        registration_number,
        full_name,
        email,
        phone,
        participant_type,
        vehicle_make,
        vehicle_model,
        status,
        checked_in,
        checked_in_at
        `,
      )
      .eq('status', 'Approved')
      .or(
        `full_name.ilike.%${query}%,registration_number.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`,
      )
      .order('created_at', {
        ascending: false,
      })
      .limit(10)

    if (error) {
      console.error(
        'Manual search error:',
        error,
      )

      return NextResponse.json(
        {
          error:
            'Unable to search registrations',
        },
        { status: 500 },
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error(
      'Search API error:',
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
