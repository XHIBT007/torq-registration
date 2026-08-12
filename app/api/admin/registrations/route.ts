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

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select(
        `
        id,
        full_name,
        email,
        phone,
        city,
        participant_type,
        emergency_contact,
        vehicle_make,
        vehicle_model,
        instagram,
        registration_number,
        created_at
        `,
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)

      return NextResponse.json(
        { error: 'Unable to load registrations' },
        { status: 500 },
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('API error:', error)

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    )
  }
}
