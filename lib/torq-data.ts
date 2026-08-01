export const EVENT = {
  name: "TOR'Q",
  tagline: 'Artistry in Motorsport',
  // Event day used for the countdown
  date: '2026-11-14T10:00:00',
  dateLabel: 'November 14–16, 2026',
  location: 'Silverstone Grand Circuit, United Kingdom',
}

export type Experience = {
  title: string
  description: string
  image: string
  tag: string
}

export const EXPERIENCES: Experience[] = [
  {
    title: 'Drift Experience',
    tag: 'Track',
    description:
      'Feel the g-force as professional drivers slide 700bhp machines inches from the apex in a symphony of smoke and controlled chaos.',
    image: '/images/exp-drift.png',
  },
  {
    title: 'Bike Stunts',
    tag: 'Arena',
    description:
      'World-champion freestyle riders defy gravity with wheelies, backflips and burnouts in the floodlit stunt arena.',
    image: '/images/exp-bike.png',
  },
  {
    title: 'Supercar Showcase',
    tag: 'Paddock',
    description:
      'An open-air gallery of the rarest hypercars on earth, each one lit like a sculpture and ready to roar.',
    image: '/images/exp-supercar.png',
  },
  {
    title: 'Sim Racing',
    tag: 'Esports',
    description:
      'Compete on motion-rig simulators against the fastest virtual drivers and chase a place on the leaderboard.',
    image: '/images/exp-sim.png',
  },
  {
    title: 'VIP Lounge',
    tag: 'Hospitality',
    description:
      'Trackside luxury with champagne service, private viewing decks and access to the drivers behind the wheel.',
    image: '/images/exp-vip.png',
  },
]

export const GALLERY = [
  { src: '/images/gallery-1.png', alt: 'Crowd watching cars at golden hour' },
  { src: '/images/gallery-2.png', alt: 'Close up of a race car livery' },
  { src: '/images/gallery-3.png', alt: 'Night race with light trails' },
  { src: '/images/gallery-4.png', alt: 'Pit crew working on a race car' },
  { src: '/images/gallery-5.png', alt: 'Aerial view of a race track at dusk' },
  { src: '/images/gallery-6.png', alt: 'Drifting car surrounded by smoke' },
]

export const SPONSORS = [
  'AGENA',
  'VELOCE',
  'MERIDIAN',
  'APEX FUEL',
  'NOVA TYRES',
  'AURUM',
  'CIRQUE',
  'HELIOS',
]

export const FAQS = [
  {
    q: 'When and where does TOR\u2019Q take place?',
    a: 'TOR\u2019Q runs November 14\u201316, 2026 at the Silverstone Grand Circuit in the United Kingdom. Gates open at 09:00 each day.',
  },
  {
    q: 'What is included in a general admission ticket?',
    a: 'General admission grants access to the drift track grandstands, the supercar paddock, the stunt arena and the sim-racing zone across all three days.',
  },
  {
    q: 'Can I participate as a driver or rider?',
    a: 'Yes. Select your participant type during registration. Drivers and riders must hold a valid competition licence and will be contacted by our scrutineering team.',
  },
  {
    q: 'Is there parking and camping on site?',
    a: 'Complimentary parking is available, and premium camping pods can be added to any registration while spaces last.',
  },
  {
    q: 'What does the VIP experience include?',
    a: 'The VIP Lounge offers trackside hospitality, gourmet catering, champagne service, priority paddock access and meet-and-greets with headline drivers.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Registrations are fully refundable up to 30 days before the event. After that, they can be transferred to another attendee free of charge.',
  },
]

export const PARTICIPANT_TYPES = [
  'Driver',
  'Rider',
  'VIP',
  'Spectator',
  'Sim Racer',
] as const

export type ParticipantType = (typeof PARTICIPANT_TYPES)[number]
