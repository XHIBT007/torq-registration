import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { Resend } from 'resend'
import QRCode from 'qrcode'

const resend = new Resend(process.env.RESEND_API_KEY)

const VALID_STATUSES = [
  'Pending',
  'Approved',
  'Rejected',
] as const

type Status = (typeof VALID_STATUSES)[number]

function isValidStatus(status: string): status is Status {
  return VALID_STATUSES.includes(status as Status)
}

function clampScore(value: unknown, max: number) {
  const number = Number(value)

  if (!Number.isFinite(number)) {
    return 0
  }

  return Math.max(0, Math.min(max, Math.round(number)))
}

function escapeHtml(value: string | null | undefined) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function generateRegistrationNumber() {
  const number = Math.floor(Math.random() * 1_000_000)

  return `TORQ-2026-${String(number).padStart(6, '0')}`
}

/* -------------------------------------------------------------------------- */
/* GET — Load registrations                                                    */
/* -------------------------------------------------------------------------- */

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
        checked_in,
        checked_in_at,
        created_at,

        vip_category,
        vip_organisation,
        vip_role,
        vip_reason,
        vip_referral_source,
        vip_represents_organisation,
        vip_website,

        vip_score,
        vip_relevance_score,
        vip_strategic_score,
        vip_profile_score,
        vip_motorsport_score,
        vip_brand_score,
        vip_completeness_score,
        vip_assessment_notes,
        vip_assessed_at,
        vip_assessed_by
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

/* -------------------------------------------------------------------------- */
/* PATCH — Status updates + VIP assessment                                    */
/* -------------------------------------------------------------------------- */

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

    const {
      registrationId,
      status,

      vipAssessment,
    } = body

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Get current registration                                                */
    /* ---------------------------------------------------------------------- */

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
          status,

          vip_category,
          vip_organisation,
          vip_role,
          vip_reason,
          vip_referral_source,
          vip_represents_organisation,
          vip_website,

          vip_score,
          vip_relevance_score,
          vip_strategic_score,
          vip_profile_score,
          vip_motorsport_score,
          vip_brand_score,
          vip_completeness_score,
          vip_assessment_notes
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

    /* ---------------------------------------------------------------------- */
    /* Build update payload                                                    */
    /* ---------------------------------------------------------------------- */

    const updatePayload: Record<string, unknown> = {}

    /* ---------------------------- Status update --------------------------- */

    if (status !== undefined) {
      if (
        typeof status !== 'string' ||
        !isValidStatus(status)
      ) {
        return NextResponse.json(
          { error: 'Invalid status' },
          { status: 400 },
        )
      }

      updatePayload.status = status
    }

    /* ------------------------- VIP assessment ----------------------------- */

    if (vipAssessment) {
      if (existingRegistration.participant_type !== 'VIP') {
        return NextResponse.json(
          {
            error:
              'VIP assessment can only be performed on VIP registrations.',
          },
          { status: 400 },
        )
      }

      const relevanceScore = clampScore(
        vipAssessment.relevanceScore,
        25,
      )

      const strategicScore = clampScore(
        vipAssessment.strategicScore,
        25,
      )

      const profileScore = clampScore(
        vipAssessment.profileScore,
        20,
      )

      const motorsportScore = clampScore(
        vipAssessment.motorsportScore,
        15,
      )

      const brandScore = clampScore(
        vipAssessment.brandScore,
        10,
      )

      const completenessScore = clampScore(
        vipAssessment.completenessScore,
        5,
      )

      const totalScore =
        relevanceScore +
        strategicScore +
        profileScore +
        motorsportScore +
        brandScore +
        completenessScore

      updatePayload.vip_relevance_score =
        relevanceScore

      updatePayload.vip_strategic_score =
        strategicScore

      updatePayload.vip_profile_score =
        profileScore

      updatePayload.vip_motorsport_score =
        motorsportScore

      updatePayload.vip_brand_score =
        brandScore

      updatePayload.vip_completeness_score =
        completenessScore

      updatePayload.vip_score = totalScore

      updatePayload.vip_assessment_notes =
        typeof vipAssessment.notes === 'string'
          ? vipAssessment.notes.trim() || null
          : null

      updatePayload.vip_assessed_at =
        new Date().toISOString()

      updatePayload.vip_assessed_by =
        user.email || user.id
    }

    /* ---------------------------------------------------------------------- */
    /* Make sure something is actually being updated                           */
    /* ---------------------------------------------------------------------- */

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json(
        {
          error:
            'No status or VIP assessment data was provided.',
        },
        { status: 400 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Update registration                                                     */
    /* ---------------------------------------------------------------------- */

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .update(updatePayload)
      .eq('id', registrationId)
      .select()
      .single()

    if (error) {
      console.error('Registration update error:', error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      )
    }

    /* ---------------------------------------------------------------------- */
    /* Send approval email only when status changes to Approved               */
    /* ---------------------------------------------------------------------- */

    const newStatus =
      status !== undefined
        ? status
        : existingRegistration.status

    if (
      newStatus === 'Approved' &&
      previousStatus !== 'Approved'
    ) {
      try {
        const qrData =
          existingRegistration.registration_number

        if (!qrData) {
          return NextResponse.json({
            ...data,
            emailSent: false,
            message:
              'Registration approved, but no registration number was available for the QR pass.',
          })
        }

        const qrDataUrl = await QRCode.toDataURL(
          qrData,
          {
            width: 800,
            margin: 2,
            errorCorrectionLevel: 'H',
          },
        )

        const qrBase64 =
          qrDataUrl.split(',')[1]

        const isVip =
          existingRegistration.participant_type ===
          'VIP'

        const subject = isVip
          ? "You're Approved for TOR'Q 2026 — VIP Access 🏁"
          : "You're Approved for TOR'Q 2026 🏁"

        const intro = isVip
          ? `
              <p style="font-size: 16px; line-height: 1.6;">
                Your VIP registration for <strong>TOR'Q 2026</strong>
                has been approved.
              </p>

              <p style="font-size: 16px; line-height: 1.6;">
                You are officially on the TOR'Q VIP list.
                Your official pass and access details are attached
                to this email.
              </p>
            `
          : `
              <p style="font-size: 16px; line-height: 1.6;">
                Your registration for <strong>TOR'Q 2026</strong>
                has been approved.
                You're officially on the grid.
              </p>
            `

        const { data: emailData, error: emailError } =
          await resend.emails.send({
            from:
              process.env.RESEND_FROM_EMAIL!,
            to: existingRegistration.email,
            subject,
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
                  ${isVip ? "You're Approved. 👑" : "You're Approved. 🏁"}
                </h1>

                <p style="font-size: 16px; line-height: 1.6;">
                  Hi ${escapeHtml(existingRegistration.full_name)},
                </p>

                ${intro}

                <div style="margin: 30px 0; padding: 24px; background: #f5f5f5; border-radius: 12px;">

                  <p style="margin: 0 0 8px; font-size: 12px; color: #777; text-transform: uppercase;">
                    Registration Number
                  </p>

                  <p style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
                    ${escapeHtml(existingRegistration.registration_number)}
                  </p>

                  ${
                    existingRegistration.participant_type
                      ? `
                        <p style="margin: 18px 0 0; font-size: 12px; color: #777; text-transform: uppercase;">
                          Participant Type
                        </p>

                        <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold;">
                          ${escapeHtml(existingRegistration.participant_type)}
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
                    Please keep it accessible on your phone or save
                    the image before arriving at the event.
                  </p>

                  <p style="font-size: 14px; color: #666; line-height: 1.5;">
                    This QR code will be scanned at the TOR'Q entrance.
                  </p>

                </div>

                ${
                  isVip
                    ? `
                      <div style="margin: 30px 0; padding: 20px; border: 1px solid #d4a72c; border-radius: 12px; background: #fffaf0;">

                        <h3 style="margin-top: 0;">
                          VIP Access
                        </h3>

                        <p style="font-size: 14px; color: #555; line-height: 1.5;">
                          Your VIP access has been approved.
                          Please retain this email and your QR pass.
                          Further hospitality and access information
                          will be communicated to you by the TOR'Q team.
                        </p>

                      </div>
                    `
                    : ''
                }

                <p style="margin-top: 40px;">
                  See you at the ${isVip ? 'VIP experience' : 'grid'}.
                </p>

                <p style="font-weight: bold;">
                  TOR'Q Motorsport
                </p>

              </div>
            `,
          })

        if (emailError) {
          console.error(
            'Approval email error:',
            emailError,
          )

          return NextResponse.json({
            ...data,
            emailSent: false,
            emailError:
              emailError.message,
            message:
              'Registration approved, but the QR email could not be sent.',
          })
        }

        return NextResponse.json({
          ...data,
          emailSent: true,
          emailId: emailData?.id,
          message:
            isVip
              ? 'VIP registration approved and QR pass sent successfully.'
              : 'Registration approved and QR pass sent successfully.',
        })
      } catch (emailError) {
        console.error(
          'Approval email exception:',
          emailError,
        )

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
