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
        status,
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
export async function PATCH(request: Request) {
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

    const body = await request.json()

    const { registrationId, status } = body

    if (!registrationId || !status) {
      return NextResponse.json(
        { error: 'Registration ID and status are required' },
        { status: 400 },
      )
    }

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 },
      )
    }

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .update({ status })
      .eq('id', registrationId)
      .select()
      .single()

    if (error) {
      console.error('Status update error:', error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('PATCH error:', error)

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    )
  }
}
