import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

const MAX_BODY_BYTES = 16 * 1024
const MAX_LENGTHS = {
  name: 120,
  company: 160,
  jobTitle: 120,
  workEmail: 254,
  phone: 40,
  industry: 80,
  partnershipInterest: 100,
  preferredExperience: 80,
  estimatedBudget: 120,
  goals: 3000,
} as const
const EXPERIENCES = [
  'Drift & Burnout Arena + Power Bike Stunts',
  'Cars on the Runway + Live Theatre',
  'TOR’Q Lounge',
  'Sim Racing Championship',
]

function valueOf(body: Record<string, unknown>, key: keyof typeof MAX_LENGTHS) {
  return typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, MAX_LENGTHS[key]) : ''
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }
    const data = body as Record<string, unknown>

    // Quietly discard automated submissions that filled the hidden honeypot.
    if (typeof data.website === 'string' && data.website.trim()) {
      return NextResponse.json({ success: true })
    }

    const inquiry = {
      name: valueOf(data, 'name'),
      company: valueOf(data, 'company'),
      jobTitle: valueOf(data, 'jobTitle'),
      workEmail: valueOf(data, 'workEmail').toLowerCase(),
      phone: valueOf(data, 'phone'),
      industry: valueOf(data, 'industry'),
      partnershipInterest: valueOf(data, 'partnershipInterest'),
      preferredExperience: valueOf(data, 'preferredExperience'),
      estimatedBudget: valueOf(data, 'estimatedBudget'),
      goals: valueOf(data, 'goals'),
      sponsorshipDeckRequested: data.sponsorshipDeckRequested === true,
    }

    if (!inquiry.name || !inquiry.company || !inquiry.workEmail || !inquiry.phone || !inquiry.industry || !inquiry.partnershipInterest || !inquiry.goals) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }
    if (!validEmail(inquiry.workEmail)) {
      return NextResponse.json({ error: 'Please enter a valid work email.' }, { status: 400 })
    }
    if (inquiry.preferredExperience && !EXPERIENCES.includes(inquiry.preferredExperience)) {
      return NextResponse.json({ error: 'Please select a valid experience.' }, { status: 400 })
    }

    const { error: insertError } = await supabaseAdmin.from('sponsorship_inquiries').insert({
      name: inquiry.name,
      company: inquiry.company,
      job_title: inquiry.jobTitle || null,
      work_email: inquiry.workEmail,
      phone: inquiry.phone,
      industry: inquiry.industry,
      partnership_interest: inquiry.partnershipInterest,
      preferred_experience: inquiry.preferredExperience || null,
      estimated_budget: inquiry.estimatedBudget || null,
      goals: inquiry.goals,
      sponsorship_deck_requested: inquiry.sponsorshipDeckRequested,
    })

    if (insertError) {
      console.error('Sponsorship inquiry storage failed:', insertError.message)
      return NextResponse.json({ error: 'We could not save your enquiry right now. Please try again.' }, { status: 503 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    if (apiKey && fromEmail) {
      const lines = [
        'New TOR’Q 2026 partnership enquiry',
        '',
        `Name: ${inquiry.name}`,
        `Company: ${inquiry.company}`,
        `Job title: ${inquiry.jobTitle || 'Not provided'}`,
        `Work email: ${inquiry.workEmail}`,
        `Phone: ${inquiry.phone}`,
        `Industry: ${inquiry.industry}`,
        `Partnership interest: ${inquiry.partnershipInterest}`,
        `Preferred experience: ${inquiry.preferredExperience || 'Open to options'}`,
        `Estimated budget: ${inquiry.estimatedBudget || 'Not provided'}`,
        `Sponsorship deck requested: ${inquiry.sponsorshipDeckRequested ? 'Yes' : 'No'}`,
        '',
        'Goals / notes:',
        inquiry.goals,
      ]
      try {
        const { error: emailError } = await new Resend(apiKey).emails.send({
          from: fromEmail,
          to: 'partnerships@torq.ng',
          replyTo: inquiry.workEmail,
          subject: `TOR’Q partnership enquiry — ${inquiry.company.replace(/[\r\n]/g, ' ')}`,
          text: lines.join('\n'),
        })
        if (emailError) console.error('Sponsorship enquiry notification failed:', emailError.message)
      } catch (error) {
        // The lead is already safely stored; an email outage must not prompt duplicate submissions.
        console.error('Sponsorship enquiry notification failed:', error instanceof Error ? error.message : 'Unknown error')
      }
    } else {
      console.error('Sponsorship inquiry notification skipped: Resend environment is not configured.')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sponsorship inquiry request failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'We could not process your enquiry right now. Please try again.' }, { status: 500 })
  }
}
