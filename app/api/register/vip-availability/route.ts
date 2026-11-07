import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('vip_registration_capacity')
    .select('capacity, reserved_count')
    .eq('id', 1)
    .single()

  if (error || !data) {
    console.error('VIP availability lookup error:', error)
    return NextResponse.json(
      { error: 'VIP availability is temporarily unavailable.' },
      { status: 503 },
    )
  }

  // Only return whether requests are open; never expose capacity or counts.
  return NextResponse.json({
    available: data.reserved_count < data.capacity,
  }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
