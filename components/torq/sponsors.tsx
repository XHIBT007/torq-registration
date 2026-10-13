'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, CheckCircle2, Handshake, Sparkles } from 'lucide-react'
import { Reveal } from './reveal'

const EXPERIENCES = [
  { name: 'Drift & Burnout Arena', category: 'Performance, energy & automotive', image: '/images/exp-drift.png', description: 'Put your brand alongside tire smoke, precision driving and high-energy automotive action.' },
  { name: 'Power Bike Stunts', category: 'Extreme sports, lifestyle & entertainment', image: '/images/exp-bike.png', description: 'Connect with an audience through skill, spectacle and a bold lifestyle experience.' },
  { name: 'Cars on the Runway', category: 'Automotive, luxury & lifestyle', image: '/images/exp-supercar.png', description: 'Place your brand in a polished showcase of automotive design, style and culture.' },
  { name: 'TOR’Q Lounge', category: 'Hospitality, beverages & consumer experiences', image: '/images/exp-vip.png', description: 'Create a premium meeting point for guests, customers and the TOR’Q community.' },
  { name: 'Sim Racing Championship', category: 'Technology, gaming, telecoms & youth', image: '/images/exp-sim.png', description: 'Bring technology and competitive gaming into an interactive audience experience.' },
]

const INDUSTRIES = ['Automotive & mobility', 'Technology & telecommunications', 'Gaming & esports', 'Food & beverage', 'Fashion & lifestyle', 'Finance', 'Media & entertainment', 'Other']
const INTERESTS = ['On-site brand activation', 'Content & media partnership', 'Hospitality experience', 'Product sampling or demonstration', 'Community & audience engagement', 'Exploring options']
const inputClass = 'mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500'

export function Sponsors() {
  const [preferredExperience, setPreferredExperience] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function chooseExperience(name: string) {
    setPreferredExperience(name)
    document.getElementById('partnership-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, string | boolean> = Object.fromEntries(formData.entries()) as Record<string, string>
    payload.preferredExperience = preferredExperience
    payload.sponsorshipDeckRequested = formData.get('sponsorshipDeckRequested') === 'on'
    try {
      const response = await fetch('/api/sponsorship-inquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'We could not send your enquiry. Please try again.')
      setStatus('success')
      setMessage(payload.sponsorshipDeckRequested
        ? 'Thanks for reaching out. The TOR’Q partnerships team has received your enquiry and deck request.'
        : 'Thanks for reaching out. The TOR’Q partnerships team has received your enquiry and will follow up.')
      form.reset()
      setPreferredExperience('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.')
    }
  }

  return (
    <section id="sponsors" className="relative overflow-hidden border-t border-white/10 bg-black py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-red-600/[0.04] blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-red-500 sm:text-sm">Partnerships · December 6, 2026 · Lagos</p>
            <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] sm:text-6xl md:text-7xl">Don’t just sponsor<br />the show. <span className="text-red-500">Own the experience.</span></h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 md:text-lg">TOR’Q brings automotive performance, culture and entertainment together. Partner with an experience your brand can activate, participate in and amplify—on site and through content.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {EXPERIENCES.map((experience, index) => (
            <Reveal key={experience.name} delay={index * 60}>
              <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-colors hover:border-red-500/40">
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <img src={experience.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[0.25em] text-red-300">Experience {String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-extrabold uppercase leading-tight">{experience.name}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-400">{experience.category}</p>
                  <p className="mt-4 min-h-12 text-sm leading-6 text-white/50">{experience.description}</p>
                  <button type="button" onClick={() => chooseExperience(experience.name)} className="group/button mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                    Partner with this experience <ArrowUpRight className="h-4 w-4 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal delay={260}>
            <div className="flex h-full min-h-[300px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <div><Sparkles className="h-5 w-5 text-red-500" /><h3 className="mt-6 text-2xl font-black uppercase">A platform to activate</h3><p className="mt-4 text-sm leading-6 text-white/50">Build a tailored partnership across live experiences, hospitality, culture and digital content. Tell us what your brand wants to achieve.</p></div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">TOR’Q 2026 · Lagos, Nigeria</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div id="partnership-enquiry" className="mt-20 scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-10 lg:mt-28 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-red-500"><Handshake className="h-5 w-5" /></div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">Start a conversation</p>
                <h3 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">Let’s build a partnership that moves.</h3>
                <p className="mt-5 text-sm leading-6 text-white/50">Share a little about your brand and goals. Our partnerships team will get back to you to explore the right fit.</p>
                <p className="mt-5 text-xs leading-5 text-white/35">Event date: December 6, 2026<br />Location: Lagos, Nigeria</p>
              </div>
              <form onSubmit={submitEnquiry} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-white/70">Name *<input className={inputClass} name="name" autoComplete="name" maxLength={120} required /></label>
                  <label className="text-xs font-semibold text-white/70">Company *<input className={inputClass} name="company" autoComplete="organization" maxLength={160} required /></label>
                  <label className="text-xs font-semibold text-white/70">Job title<input className={inputClass} name="jobTitle" autoComplete="organization-title" maxLength={120} /></label>
                  <label className="text-xs font-semibold text-white/70">Work email *<input className={inputClass} name="workEmail" type="email" autoComplete="email" maxLength={254} required /></label>
                  <label className="text-xs font-semibold text-white/70">Phone number *<input className={inputClass} name="phone" type="tel" autoComplete="tel" maxLength={40} required /></label>
                  <label className="text-xs font-semibold text-white/70">Industry *<select className={inputClass} name="industry" defaultValue="" required><option value="" disabled>Select industry</option>{INDUSTRIES.map((item) => <option key={item} value={item} className="bg-neutral-900">{item}</option>)}</select></label>
                  <label className="text-xs font-semibold text-white/70">Partnership interest *<select className={inputClass} name="partnershipInterest" defaultValue="" required><option value="" disabled>Select an area</option>{INTERESTS.map((item) => <option key={item} value={item} className="bg-neutral-900">{item}</option>)}</select></label>
                  <label className="text-xs font-semibold text-white/70">Preferred experience<select className={inputClass} name="preferredExperience" value={preferredExperience} onChange={(event) => setPreferredExperience(event.target.value)}><option value="" className="bg-neutral-900">Open to options</option>{EXPERIENCES.map((item) => <option key={item.name} value={item.name} className="bg-neutral-900">{item.name}</option>)}</select></label>
                  <label className="text-xs font-semibold text-white/70 sm:col-span-2">Estimated partnership budget <span className="font-normal text-white/35">(optional)</span><input className={inputClass} name="estimatedBudget" maxLength={120} placeholder="Share a range or leave blank" /></label>
                  <label className="text-xs font-semibold text-white/70 sm:col-span-2">What would you like to achieve? *<textarea className={`${inputClass} min-h-28 resize-y`} name="goals" maxLength={3000} required placeholder="Tell us about your objectives or the activation you have in mind." /></label>
                </div>
                <label className="flex items-start gap-3 text-sm text-white/65"><input type="checkbox" name="sponsorshipDeckRequested" className="mt-0.5 accent-red-500" /><span>Please contact me about requesting the sponsorship deck.</span></label>
                <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                {message && <p role={status === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${status === 'error' ? 'border-red-500/30 bg-red-500/10 text-red-200' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'}`}>{status === 'success' && <CheckCircle2 className="mr-2 inline h-4 w-4" />}{message}</p>}
                <button type="submit" disabled={status === 'sending'} className="group inline-flex h-12 items-center gap-3 rounded-lg bg-red-500 px-5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black">{status === 'sending' ? 'Sending enquiry…' : 'Send partnership enquiry'}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                <p className="text-xs text-white/30">Your details will be used by the TOR’Q partnerships team to respond to this enquiry.</p>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
