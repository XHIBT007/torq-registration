import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      email,
      fullName,
      registrationNumber,
      participantType,
    } = body

    if (!email || !fullName || !registrationNumber) {
      return NextResponse.json(
        { error: 'Missing required email information' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "You're registered for TOR'Q 2026",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111;">
          
          <h1 style="font-size: 32px; margin-bottom: 8px;">
            TOR'Q 2026
          </h1>

          <p style="font-size: 14px; letter-spacing: 2px; color: #666;">
            ARTISTRY IN MOTORSPORT
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

          <h2>Registration Confirmed</h2>

          <p>
            Hi ${fullName},
          </p>

          <p>
            Your registration for TOR'Q 2026 has been successfully received.
            We look forward to having you with us in Lagos.
          </p>

          <div style="background: #f5f5f5; padding: 24px; margin: 30px 0; border-radius: 8px;">
            <p style="margin: 0 0 8px; color: #666; font-size: 13px;">
              YOUR REGISTRATION NUMBER
            </p>

            <p style="margin: 0; font-size: 26px; font-weight: bold;">
              ${registrationNumber}
            </p>

            ${
              participantType
                ? `
                  <p style="margin: 20px 0 0; color: #666; font-size: 13px;">
                    PARTICIPATION
                  </p>

                  <p style="margin: 4px 0 0; font-weight: bold;">
                    ${participantType}
                  </p>
                `
                : ''
            }
          </div>

          <p>
            Please keep this email and your registration number for your records.
          </p>

          <p style="margin-top: 40px;">
            See you at TOR'Q.
          </p>

          <p style="font-weight: bold;">
            TOR'Q Motorsport
          </p>

        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    })
  } catch (error) {
    console.error('Confirmation email error:', error)

    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    )
  }
}
