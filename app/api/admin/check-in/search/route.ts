import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

const MAX_QUERY_LENGTH = 100

const SEARCH_SELECT = `
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
`

function escapeSearchQuery(value: string) {
  /*
   * Supabase/PostgREST filter syntax uses special characters such as:
   * %, _, ., ,, (, ), and *
   *
   * We escape them so the user's input is treated strictly as search text.
   */
  return value
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
    .replace(/,/g, '\\,')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\./g, '\\.')
    .replace(/\*/g, '\\*')
    .slice(0, MAX_QUERY_LENGTH)
}

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

    const rawQuery = searchParams.get('q')?.trim() || ''

    if (!rawQuery) {
      return NextResponse.json([])
    }

    const query = rawQuery.slice(0, MAX_QUERY_LENGTH)

    /*
     * Prevent extremely unusual control characters from reaching the
     * database filter.
     */
    const normalizedQuery = query.replace(
      /[\u0000-\u001F\u007F]/g,
      '',
    )

    if (!normalizedQuery) {
      return NextResponse.json([])
    }

    const safeQuery = escapeSearchQuery(normalizedQuery)

    /* ---------------------------------------------------------------------- */
    /* Search approved registrations                                          */
    /* ---------------------------------------------------------------------- */

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select(SEARCH_SELECT)
      .eq('status', 'Approved')
      .or(
        `full_name.ilike.%${safeQuery}%,registration_number.ilike.%${safeQuery}%,email.ilike.%${safeQuery}%,phone.ilike.%${safeQuery}%`,
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
          error: 'Unable to search registrations',
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
