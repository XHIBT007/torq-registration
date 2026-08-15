import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request) {
  try {
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

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim()

    if (!query) {
      return NextResponse.json([])
    }

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
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Manual search error:', error)

      return NextResponse.json(
        { error: 'Unable to search registrations' },
        { status: 500 },
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Search API error:', error)

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    )
  }
}
