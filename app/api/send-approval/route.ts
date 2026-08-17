import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import QRCode from 'qrcode'

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
        { error: 'Missing required approval information' },
        { status: 400 }
      )
    }

    // QR contains only the official registration number.
    const qrData = registrationNumber

    const qrDataUrl = await QRCode.toDataURL(qrData, {
      width: 800,
      margin: 2,
      errorCorrectionLevel: 'H',
    })

    const qrBase64 = qrDataUrl.split(',')[1]

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "You're Approved for TOR'Q 2026 🏁",
      attachments: [
        {
          filename: `TORQ-${registrationNumber}-PASS.png`,
          content: qrBase64,
          contentType: 'image/png',
        },
      ],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111;">

          <h1 style="font-size: 32px; margin-bottom: 8px;">
            You're Approved. 🏁
          </h1>

          <p style="font-size: 16px; line-height: 1.6;">
            Hi ${fullName},
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Your registration for <strong>TOR'Q 2026</strong> has been approved.
            You're officially on the grid.
          </p>

          <div style="margin: 30px 0; padding: 24px; background: #f5f5f5; border-radius: 12px;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #777; text-transform: uppercase;">
              Registration Number
            </p>

            <p style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
              ${registrationNumber}
            </p>

            ${
              participantType
                ? `
            <p style="margin: 18px 0 0; font-size: 12px; color: #777; text-transform: uppercase;">
              Participant Type
            </p>

            <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold;">
              ${participantType}
            </p>
            `
                : ''
            }
          </div>

          <div style="margin: 30px 0; padding: 24px; border: 1px solid #ddd; border-radius: 12px; text-align: center;">
            <h2 style="margin-top: 0;">
              Your Official TOR'Q Pass
            </h2>

            <p style="font-size: 14px; color: #666; line-height: 1.5;">
              Your unique QR pass is attached to this email.
              Please keep it accessible on your phone or save the image
              before arriving at the event.
            </p>

            <p style="font-size: 14px; color: #666; line-height: 1.5;">
              This QR code will be scanned at the TOR'Q entrance.
            </p>
          </div>

          <p style="margin-top: 40px;">
            See you at the grid.
          </p>

          <p style="font-weight: bold;">
            TOR'Q Motorsport
          </p>

        </div>
      `,
    })

    if (error) {
      console.error('Resend approval email error:', error)

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
    console.error('Approval email error:', error)

    return NextResponse.json(
      { error: 'Failed to send approval email' },
      { status: 500 }
    )
  }
}
