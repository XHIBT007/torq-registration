import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ADMIN_EMAILS = (
  process.env.ADMIN_EMAILS || ''
)
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

export async function requireAdmin(request: Request) {
  const authHeader =
    request.headers.get('authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      ),
    }
  }

  const token = authHeader.slice(7).trim()

  if (!token) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      ),
    }
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)

  if (error || !user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      ),
    }
  }

  const email =
    user.email?.trim().toLowerCase() || ''

  if (
    ADMIN_EMAILS.length === 0 ||
    !ADMIN_EMAILS.includes(email)
  ) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 },
      ),
    }
  }

  return {
    user,
    response: null,
  }
}
