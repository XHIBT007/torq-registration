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
  {
    q: "What is included in a general admission ticket?",
    a: "General admission grants access to the main TOR'Q experience, including the drift displays, performance cars, live stunt shows, entertainment and other public areas.",
  },
  {
    q: "Can I participate as a driver or rider?",
    a: "Yes. Select your participant type during registration. Drivers and riders must meet TOR'Q safety and eligibility requirements before participating.",
  },
  {
    q: "Is TOR'Q a racing event?",
    a: "TOR'Q is not a conventional racing event. It is a celebration of motorsport culture featuring drifting, burnouts, stunt riding, performance cars, sim racing, music and immersive experiences.",
  },
  {
    q: "Can I bring my family?",
    a: "Yes. TOR'Q is designed as a celebration of motorsport culture for enthusiasts, friends and families. Specific age and access requirements will be communicated ahead of the event.",
  },
  {
    q: "Can I display my car at TOR'Q?",
    a: "Yes. Vehicle display opportunities will be available for selected performance, modified, classic and enthusiast vehicles. Details on applications and eligibility will be announced.",
  },
  {
    q: "How can brands partner with TOR'Q?",
    a: "Brands can partner with TOR'Q through sponsorships, experience partnerships, media partnerships and branded activations. Contact the TOR'Q team to discuss partnership opportunities.",
  },
  {
    q: "How do I get tickets?",
    a: "Ticket registration and purchase information will be announced through the official TOR'Q channels. Stay connected for ticket release announcements.",
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
