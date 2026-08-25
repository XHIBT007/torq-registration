export const EVENT = {
  name: "TOR'Q",
  tagline: "Artistry in Motorsport",

  // Official event date/time used for the countdown
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

export const EXPERIENCES: Experience[] = [
  {
    title: "Cars on the Runway",
    description:
      "A curated exhibition where engineering meets artistry. Discover remarkable machines up close and experience automotive design as a form of expression.",
    image: "/images/exp-supercar.png",
    tag: "AUTOMOTIVE ARTISTRY",
  },
  {
    title: "Drift Theatre",
    description:
      "Professional drift drivers deliver precision smoke shows, controlled burnouts and synchronized tandem drifting in a spectacle built for the senses.",
    image: "/images/exp-drift.png",
    tag: "DRIFT & BURNOUT",
  },
  {
    title: "Stunt District",
    description:
      "High-energy motorcycle stunt performances featuring wheelies, stoppies and freestyle tricks from some of the country's most fearless riders.",
    image: "/images/exp-bike.png",
    tag: "POWER BIKE STUNTS",
  },
  {
    title: "TOR'Q Lounge",
    description:
      "A premium hospitality experience with elevated views, curated refreshments, networking opportunities and an exclusive way to experience TOR'Q.",
    image: "/images/exp-vip.png",
    tag: "VIP & HOSPITALITY",
  },
  {
    title: "Simulator Championship",
    description:
      "Nigeria's best sim racers compete in a live esports motorsport championship, bringing the intensity of the track into the heart of TOR'Q.",
    image: "/images/exp-sim.png",
    tag: "SIM RACING",
  },
]

export const GALLERY = [
  {
    src: "/images/gallery-1.png",
    alt: "Crowd watching cars at golden hour",
  },
  {
    src: "/images/gallery-2.png",
    alt: "Close up of a race car livery",
  },
  {
    src: "/images/gallery-3.png",
    alt: "Night race with light trails",
  },
  {
    src: "/images/gallery-4.png",
    alt: "Pit crew working on a race car",
  },
  {
    src: "/images/gallery-5.png",
    alt: "Aerial view of a race track at dusk",
  },
  {
    src: "/images/gallery-6.png",
    alt: "Drifting car surrounded by smoke",
  },
]

/*
 * IMPORTANT:
 * Only put confirmed sponsors/partners here.
 *
 * If these names are placeholders, replace this array with:
 * []
 *
 * until the real partners are confirmed.
 */
export const SPONSORS: string[] = []

export const FAQS = [
  {
    q: "When and where does TOR'Q take place?",
    a: "TOR'Q 2026 takes place on December 6, 2026 in Lagos, Nigeria. Full venue and access details will be communicated to registered participants ahead of the event.",
  },
  {
    q: "How do I register for TOR'Q?",
    a: "Click REGISTER NOW and complete the registration form with your details. Once submitted, your registration will be reviewed by the TOR'Q team.",
  },
  {
    q: "What happens after I register?",
    a: "You'll receive a registration confirmation with your unique registration number. Your application will then be reviewed. If approved, you'll receive your official TOR'Q QR pass by email.",
  },
  {
    q: "What do I need my QR pass for?",
    a: "Your QR pass is your official digital access pass for TOR'Q. Keep it accessible on your phone or save the attached QR image. It will be scanned at the entrance during check-in.",
  },
  {
    q: "Can I participate as a driver or rider?",
    a: "Yes. Drivers and riders can select their participant type during registration. Participation is subject to TOR'Q's safety, eligibility and event requirements.",
  },
  {
    q: "Can I display my car at TOR'Q?",
    a: "Yes. Selected performance, modified, classic and enthusiast vehicles may be featured as part of the TOR'Q automotive experience. Vehicle display opportunities are subject to approval.",
  },
  {
    q: "What is VIP access?",
    a: "VIP access is a premium TOR'Q experience designed for guests who want elevated hospitality, exclusive viewing and a more private way to experience the event. VIP access is limited and subject to availability.",
  },
  {
    q: "Can I bring my family?",
    a: "Yes. TOR'Q is designed to bring together motorsport enthusiasts, friends and families. Specific age and access requirements will be communicated ahead of the event.",
  },
  {
    q: "Is TOR'Q a racing event?",
    a: "TOR'Q is not a conventional racing event. It is a celebration of motorsport culture featuring drifting, burnouts, stunt riding, performance cars, sim racing, music and immersive experiences.",
  },
  {
    q: "How can brands partner with TOR'Q?",
    a: "Brands can partner with TOR'Q through sponsorships, experience partnerships, media partnerships and branded activations. Contact the TOR'Q team to discuss partnership opportunities.",
  },
]

/*
 * These are participant categories, not ticket tiers.
 *
 * VIP remains here for now so the existing registration system
 * continues to work, but the UI should present it differently
 * from ordinary participation.
 */
export const PARTICIPANT_TYPES = [
  "Driver",
  "Rider",
  "VIP",
  "Spectator",
  "Sim Racer",
] as const

export type ParticipantType = (typeof PARTICIPANT_TYPES)[number]
