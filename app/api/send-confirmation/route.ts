import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

const resend = new Resend(
  process.env.RESEND_API_KEY,
)

function escapeHtml(value: string | null | undefined) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      email,
      fullName,
      registrationNumber,
      participantType,
    } = body

    if (
      !email ||
      !fullName ||
      !registrationNumber
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required email information.',
        },
        { status: 400 },
      )
    }

    const cleanEmail =
      typeof email === 'string'
        ? email.trim().toLowerCase()
        : ''

    const cleanRegistrationNumber =
      typeof registrationNumber === 'string'
        ? registrationNumber.trim()
        : ''

    /* ---------------------------------------------------------------------- */
    /* Verify registration exists                                             */
    /* ---------------------------------------------------------------------- */

    const {
      data: registration,
      error: lookupError,
    } = await supabaseAdmin
      .from('registrations')
      .select(
        `
        full_name,
        email,
        participant_type,
        registration_number,
        status
        `,
      )
      .eq('email', cleanEmail)
      .eq(
        'registration_number',
        cleanRegistrationNumber,
      )
      .maybeSingle()

    if (lookupError) {
      console.error(
        'Confirmation registration lookup error:',
        lookupError,
      )

      return NextResponse.json(
        {
          error:
            'Unable to verify your registration.',
        },
        { status: 500 },
      )
    }

    if (!registration) {
      return NextResponse.json(
        {
          error:
            'Registration could not be verified.',
        },
        { status: 404 },
      )
    }

    const isVip =
      registration.participant_type === 'VIP'

    const safeName = escapeHtml(
      registration.full_name,
    )

    const safeRegistrationNumber =
      escapeHtml(
        registration.registration_number,
      )

    const safeParticipantType =
      escapeHtml(
        registration.participant_type,
      )

    /* ---------------------------------------------------------------------- */
    /* VIP email                                                               */
    /* ---------------------------------------------------------------------- */

    const subject = isVip
      ? "TOR'Q 2026 — VIP Request Received"
      : "TOR'Q 2026 — Registration Received"

    const heading = isVip
      ? 'VIP Request Received'
      : 'Registration Received'

    const intro = isVip
      ? `
        <p style="font-size:16px;line-height:1.7;">
          Thank you for submitting your VIP request
          for <strong>TOR'Q 2026</strong>.
        </p>

        <p style="font-size:16px;line-height:1.7;">
          Your application has been received and is
          currently under review by the TOR'Q team.
          VIP access is subject to approval.
        </p>
      `
      : `
        <p style="font-size:16px;line-height:1.7;">
          Thank you for registering for
          <strong>TOR'Q 2026</strong>.
        </p>

        <p style="font-size:16px;line-height:1.7;">
          Your registration has been received and is
          currently being processed by the TOR'Q team.
        </p>
      `

    /* ---------------------------------------------------------------------- */
    /* Send email                                                             */
    /* ---------------------------------------------------------------------- */

    const { data, error } =
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: registration.email,
        subject,

        html: `
          <div
            style="
              font-family:Arial,sans-serif;
              max-width:600px;
              margin:0 auto;
              padding:40px 20px;
              color:#111;
            "
          >

            <div
              style="
                border-top:4px solid #e31b23;
                padding-top:28px;
              "
            >

              <h1
                style="
                  font-size:32px;
                  margin:0 0 8px;
                  letter-spacing:-1px;
                "
              >
                TOR'Q 2026
              </h1>

              <p
                style="
                  font-size:13px;
                  letter-spacing:3px;
                  color:#777;
                  margin:0;
                "
              >
                ARTISTRY IN MOTORSPORT
              </p>

            </div>

            <hr
              style="
                border:none;
                border-top:1px solid #ddd;
                margin:32px 0;
              "
            />

            <h2
              style="
                font-size:26px;
                margin-bottom:20px;
              "
            >
              ${heading}
            </h2>

            <p
              style="
                font-size:16px;
                line-height:1.7;
              "
            >
              Hi ${safeName},
            </p>

            ${intro}

            <div
              style="
                background:#f5f5f5;
                padding:24px;
                margin:32px 0;
                border-radius:12px;
              "
            >

              <p
                style="
                  margin:0 0 8px;
                  color:#777;
                  font-size:12px;
                  letter-spacing:1px;
                  text-transform:uppercase;
                "
              >
                ${isVip
                  ? 'Application Number'
                  : 'Registration Number'}
              </p>

              <p
                style="
                  margin:0;
                  font-size:24px;
                  font-weight:bold;
                  letter-spacing:2px;
                "
              >
                ${safeRegistrationNumber}
              </p>

              <p
                style="
                  margin:20px 0 0;
                  color:#777;
                  font-size:12px;
                  letter-spacing:1px;
                  text-transform:uppercase;
                "
              >
                Participation
              </p>

              <p
                style="
                  margin:5px 0 0;
                  font-size:16px;
                  font-weight:bold;
                "
              >
                ${safeParticipantType}
              </p>

            </div>

            ${
              isVip
                ? `
                  <div
                    style="
                      border:1px solid #d4a72c;
                      background:#fffaf0;
                      padding:22px;
                      border-radius:12px;
                      margin:30px 0;
                    "
                  >

                    <h3
                      style="
                        margin:0 0 10px;
                        font-size:18px;
                      "
                    >
                      VIP Review
                    </h3>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.6;
                        color:#555;
                      "
                    >
                      Our team will review your application.
                      If your VIP request is approved, you will
                      receive a separate approval email containing
                      your official TOR'Q QR pass and access details.
                    </p>

                  </div>
                `
                : `
                  <div
                    style="
                      border:1px solid #ddd;
                      padding:22px;
                      border-radius:12px;
                      margin:30px 0;
                    "
                  >

                    <h3
                      style="
                        margin:0 0 10px;
                        font-size:18px;
                      "
                    >
                      What's next?
                    </h3>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.6;
                        color:#555;
                      "
                    >
                      Your registration is now with the TOR'Q
                      team. Once your registration is approved,
                      you will receive a separate email containing
                      your official QR pass.
                    </p>

                  </div>
                `
            }

            <p
              style="
                margin-top:36px;
                font-size:16px;
                line-height:1.6;
              "
            >
              Please keep this email and your
              ${isVip
                ? 'application number'
                : 'registration number'}
              for your records.
            </p>

            <p
              style="
                margin-top:40px;
                font-size:16px;
              "
            >
              See you at TOR'Q.
            </p>

            <p
              style="
                font-weight:bold;
                margin-bottom:4px;
              "
            >
              TOR'Q Motorsport
            </p>

            <p
              style="
                color:#777;
                font-size:12px;
                margin-top:0;
              "
            >
              Artistry in Motorsport
            </p>

          </div>
        `,
      })

    /* ---------------------------------------------------------------------- */
    /* Resend error                                                           */
    /* ---------------------------------------------------------------------- */

    if (error) {
      console.error(
        'Resend error:',
        error,
      )

      return NextResponse.json(
        {
          error:
            'Registration was received, but the confirmation email could not be sent.',
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    })
  } catch (error) {
    console.error(
      'Confirmation email error:',
      error,
    )

    return NextResponse.json(
      {
        error:
          'Failed to send confirmation email.',
      },
      { status: 500 },
    )
  }
}
