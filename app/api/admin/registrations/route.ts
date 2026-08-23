import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { Resend } from 'resend'
import QRCode from 'qrcode'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Get the current registration first
    const { data: existingRegistration, error: findError } =
      await supabaseAdmin
        .from('registrations')
        .select(
          `
          id,
          full_name,
          email,
          registration_number,
          participant_type,
          status
          `,
        )
        .eq('id', registrationId)
        .single()

    if (findError || !existingRegistration) {
      console.error('Registration lookup error:', findError)

      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      )
    }

    const previousStatus = existingRegistration.status

    // Update registration status
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

    // Only send the QR approval email when the status
    // actually changes to Approved.
    if (status === 'Approved' && previousStatus !== 'Approved') {
      try {
        const qrData = existingRegistration.registration_number

        const qrDataUrl = await QRCode.toDataURL(qrData, {
          width: 800,
          margin: 2,
          errorCorrectionLevel: 'H',
        })

        const qrBase64 = qrDataUrl.split(',')[1]

        const { data: emailData, error: emailError } =
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: existingRegistration.email,
            subject: "You're Approved for TOR'Q 2026 🏁",
            attachments: [
              {
                filename: `TORQ-${existingRegistration.registration_number}-PASS.png`,
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
                  Hi ${existingRegistration.full_name},
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
                    ${existingRegistration.registration_number}
                  </p>

                  ${
                    existingRegistration.participant_type
                      ? `
                  <p style="margin: 18px 0 0; font-size: 12px; color: #777; text-transform: uppercase;">
                    Participant Type
                  </p>

                  <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold;">
                    ${existingRegistration.participant_type}
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

        if (emailError) {
          // The approval itself succeeded, so don't tell the admin
          // that the approval failed. Report the email problem clearly.
          console.error('Approval email error:', emailError)

          return NextResponse.json({
            ...data,
            emailSent: false,
            emailError: emailError.message,
            message:
              'Registration approved, but the QR email could not be sent.',
          })
        }

        return NextResponse.json({
          ...data,
          emailSent: true,
          emailId: emailData?.id,
          message:
            'Registration approved and QR pass sent successfully.',
        })
      } catch (emailError) {
        console.error('Approval email exception:', emailError)

        return NextResponse.json({
          ...data,
          emailSent: false,
          message:
            'Registration approved, but the QR email could not be sent.',
        })
      }
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
