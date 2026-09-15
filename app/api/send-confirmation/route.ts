import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

const resend = new Resend(process.env.RESEND_API_KEY)

const MAX_BODY_BYTES = 16 * 1024

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  try {
    // Basic request-size protection
    const contentLength = request.headers.get('content-length')

    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    const body = await request.json()

    const email = cleanString(body?.email, 254).toLowerCase()
    const fullName = cleanString(body?.fullName, 120)
    const registrationNumber = cleanString(
      body?.registrationNumber,
      30
    )

    if (!email || !fullName || !registrationNumber) {
      return NextResponse.json(
        { error: 'Missing required information' },
        { status: 400 }
      )
    }

    /*
     * Find the registration using the trusted server-side client.
     */
    const { data: registration, error: registrationError } =
      await supabaseAdmin
        .from('registrations')
        .select(
          `
            id,
            full_name,
            email,
            participant_type,
            registration_number,
            status,
            confirmation_email_sent_at
          `
        )
        .eq('email', email)
        .eq('registration_number', registrationNumber)
        .maybeSingle()

    if (registrationError) {
      console.error(
        'Confirmation registration lookup error:',
        registrationError
      )

      return NextResponse.json(
        { error: 'Unable to process confirmation' },
        { status: 500 }
      )
    }

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    /*
     * If this registration has already received a confirmation email,
     * do not send another one.
     */
    if (registration.confirmation_email_sent_at) {
      return NextResponse.json(
        {
          success: false,
          alreadySent: true,
          message: 'Confirmation email has already been sent.',
        },
        { status: 409 }
      )
    }

    /*
     * Atomically claim the confirmation-email slot.
     *
     * If two requests arrive at nearly the same time, only one should
     * successfully update the NULL timestamp.
     */
    const claimTimestamp = new Date().toISOString()

    const { data: claimedRegistration, error: claimError } =
      await supabaseAdmin
        .from('registrations')
        .update({
          confirmation_email_sent_at: claimTimestamp,
        })
        .eq('id', registration.id)
        .is('confirmation_email_sent_at', null)
        .select('id')
        .maybeSingle()

    if (claimError) {
      console.error(
        'Confirmation email claim error:',
        claimError
      )

      return NextResponse.json(
        { error: 'Unable to process confirmation' },
        { status: 500 }
      )
    }

    /*
     * Another request already claimed the email slot.
     */
    if (!claimedRegistration) {
      return NextResponse.json(
        {
          success: false,
          alreadySent: true,
          message: 'Confirmation email is already being processed.',
        },
        { status: 409 }
      )
    }

    const safeName = escapeHtml(registration.full_name)
    const safeEmail = escapeHtml(registration.email)
    const safeRegistrationNumber = escapeHtml(
      registration.registration_number
    )

    const isVip =
      registration.participant_type?.toLowerCase() === 'vip'

    const subject = isVip
      ? "TOR'Q 2026 — VIP Registration Received"
      : "TOR'Q 2026 — Registration Confirmed"

    const html = isVip
      ? `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
            <div style="max-width:620px;margin:0 auto;padding:40px 24px;">
              <div style="text-align:center;margin-bottom:32px;">
                <h1 style="margin:0;font-size:32px;letter-spacing:2px;">
                  TOR'Q 2026
                </h1>
                <p style="color:#f59e0b;font-size:14px;letter-spacing:3px;">
                  ARTISTRY IN MOTORSPORT
                </p>
              </div>

              <div style="background:#111111;border:1px solid #2a2a2a;border-radius:14px;padding:32px;">
                <h2 style="margin-top:0;">
                  VIP Request Received
                </h2>

                <p>
                  Hello ${safeName},
                </p>

                <p>
                  Your VIP registration request for TOR'Q 2026 has been received successfully.
                </p>

                <div style="margin:28px 0;padding:20px;background:#050505;border-radius:10px;">
                  <p style="margin:0 0 8px;color:#999999;font-size:13px;">
                    REGISTRATION NUMBER
                  </p>

                  <p style="margin:0;font-size:28px;font-weight:bold;letter-spacing:3px;">
                    ${safeRegistrationNumber}
                  </p>
                </div>

                <p>
                  Your VIP request is currently under review. A separate communication will be sent regarding your VIP approval status.
                </p>

                <p style="color:#aaaaaa;font-size:13px;">
                  Registered email: ${safeEmail}
                </p>
              </div>

              <p style="text-align:center;color:#777777;font-size:12px;margin-top:28px;">
                TOR'Q 2026 • Lagos, Nigeria
              </p>
            </div>
          </body>
        </html>
      `
      : `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
            <div style="max-width:620px;margin:0 auto;padding:40px 24px;">
              <div style="text-align:center;margin-bottom:32px;">
                <h1 style="margin:0;font-size:32px;letter-spacing:2px;">
                  TOR'Q 2026
                </h1>
                <p style="color:#f59e0b;font-size:14px;letter-spacing:3px;">
                  ARTISTRY IN MOTORSPORT
                </p>
              </div>

              <div style="background:#111111;border:1px solid #2a2a2a;border-radius:14px;padding:32px;">
                <h2 style="margin-top:0;">
                  Registration Confirmed
                </h2>

                <p>
                  Hello ${safeName},
                </p>

                <p>
                  Your registration for TOR'Q 2026 has been received successfully.
                </p>

                <div style="margin:28px 0;padding:20px;background:#050505;border-radius:10px;">
                  <p style="margin:0 0 8px;color:#999999;font-size:13px;">
                    REGISTRATION NUMBER
                  </p>

                  <p style="margin:0;font-size:28px;font-weight:bold;letter-spacing:3px;">
                    ${safeRegistrationNumber}
                  </p>
                </div>

                <p>
                  Please keep your registration number safe. You may need it for event access and check-in.
                </p>

                <p style="color:#aaaaaa;font-size:13px;">
                  Registered email: ${safeEmail}
                </p>
              </div>

              <p style="text-align:center;color:#777777;font-size:12px;margin-top:28px;">
                TOR'Q 2026 • Lagos, Nigeria
              </p>
            </div>
          </body>
        </html>
      `

    /*
     * Send through Resend.
     */
    const { data, error: resendError } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'TOR’Q 2026 <onboarding@resend.dev>',
      to: [registration.email],
      subject,
      html,
    })

    /*
     * If Resend rejects the email, release the claim so the legitimate
     * registration can try again.
     */
    if (resendError) {
      console.error('Resend confirmation error:', resendError)

      await supabaseAdmin
        .from('registrations')
        .update({
          confirmation_email_sent_at: null,
        })
        .eq('id', registration.id)
        .eq('confirmation_email_sent_at', claimTimestamp)

      return NextResponse.json(
        { error: 'Unable to send confirmation email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      id: data?.id ?? null,
    })
  } catch (error) {
    console.error('Confirmation endpoint error:', error)

    return NextResponse.json(
      { error: 'Unable to process confirmation' },
      { status: 500 }
    )
  }
}
