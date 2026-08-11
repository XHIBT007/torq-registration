export const EVENT = {
  name: "TOR'Q",
  tagline: "Artistry in Motorsport",

  // Event day used for the countdown
  date: "2026-12-06T10:00:00",

  dateLabel: "December 6, 2026",

  location: "Lagos, Nigeria",
}

export type Experience = {
  title: string
  description: string
  image: string
  tag: string
}

export const EXPERIENCES = [
  {
    title: "Cars on the Runway",
    description:
      "A curated exhibition where engineering meets artistry. Discover the world's most desirable machines up close.",
    image: "/images/exp-supercar.png",
  },
  {
    title: "Drift Theatre",
    description:
      "Professional drift drivers perform precision smoke shows and synchronized tandem drifting.",
    image: "/images/exp-drift.png",
  },
  {
    title: "Stunt District",
    description:
      "High-energy motorcycle stunt performances featuring wheelies, stoppies and freestyle tricks.",
    image: "/images/exp-bike.png",
  },
  {
    title: "TOR'Q Lounge",
    description:
      "Premium hospitality with the best views, networking opportunities and luxury experiences.",
    image: "/images/exp-vip.png",
  },
  {
    title: "Simulator Championship",
    description:
      "Nigeria's best sim racers compete in a live esports motorsport championship before thousands of spectators.",
    image: "/images/exp-sim.png",
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
  q: "When and where does TOR'Q take place?",
  a: "TOR'Q takes place on December 6, 2026 in Lagos, Nigeria. Full venue and access details will be announced ahead of the event.",
},
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
