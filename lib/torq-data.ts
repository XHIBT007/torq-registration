export const EVENT = {
  name: "TOR'Q",
  tagline: "Artistry in Motorsport",

  // Official event date/time used for the countdown
  date: "2026-12-06T10:00:00",

  dateLabel: "December 6, 2026",

  location: "Lagos, Nigeria",
}


/* ================================================================
   EXPERIENCES
   ================================================================ */

export type Experience = {
  number: string
  title: string
  description: string
  image: string
  category: string
  label: string
}

export const EXPERIENCES: Experience[] = [
  {
    number: "01",
    title: "Cars on the Runway",
    description:
      "A curated exhibition where engineering meets artistry. Discover remarkable machines up close and experience automotive design as a form of expression.",
    image: "/images/exp-supercar.png",
    category: "AUTOMOTIVE ARTISTRY",
    label: "Cars & Design",
  },

  {
    number: "02",
    title: "Drift Theatre",
    description:
      "Professional drift drivers deliver precision smoke shows, controlled burnouts and synchronized tandem drifting in a spectacle built for the senses.",
    image: "/images/exp-drift.png",
    category: "DRIFT & BURNOUT",
    label: "Live Performance",
  },

  {
    number: "03",
    title: "Stunt District",
    description:
      "High-energy motorcycle stunt performances featuring wheelies, stoppies and freestyle tricks from some of the country's most fearless riders.",
    image: "/images/exp-bike.png",
    category: "POWER BIKE STUNTS",
    label: "Live Performance",
  },

  {
    number: "04",
    title: "TOR'Q Lounge",
    description:
      "A premium hospitality experience with elevated views, curated refreshments, networking opportunities and an exclusive way to experience TOR'Q.",
    image: "/images/exp-vip.png",
    category: "VIP & HOSPITALITY",
    label: "Premium Experience",
  },

  {
    number: "05",
    title: "Simulator Championship",
    description:
      "Nigeria's best sim racers compete in a live esports motorsport championship, bringing the intensity of virtual competition into the heart of TOR'Q.",
    image: "/images/exp-sim.png",
    category: "SIM RACING",
    label: "Esports",
  },
]


/* ================================================================
   GALLERY
   ================================================================ */

export const GALLERY = [
  {
    src: "/images/gallery-1.png",
    alt: "Crowd experiencing TOR'Q at golden hour",
  },

  {
    src: "/images/gallery-2.png",
    alt: "Close up of a performance car livery",
  },

  {
    src: "/images/gallery-3.png",
    alt: "TOR'Q illuminated at night",
  },

  {
    src: "/images/gallery-4.png",
    alt: "Technical preparation around a performance car",
  },

  {
    src: "/images/gallery-5.png",
    alt: "Aerial view of the TOR'Q experience at dusk",
  },

  {
    src: "/images/gallery-6.png",
    alt: "Drifting car surrounded by smoke",
  },
]


/* ================================================================
   SPONSORS
   ================================================================ */

/*
 * Only confirmed sponsors/partners should be added here.
 *
 * Keeping this empty allows the website to display the
 * partnership invitation instead of inventing sponsors.
 */

export type Sponsor = {
  name: string
  logo?: string
}

export const SPONSORS: Sponsor[] = []


/* ================================================================
   FAQ
   ================================================================ */

export type FAQItem = {
  question: string
  answer: string
}

export const FAQS: FAQItem[] = [
  {
    question:
      "When and where does TOR'Q take place?",

    answer:
      "TOR'Q 2026 takes place on December 6, 2026 in Lagos, Nigeria. Full venue and access details will be communicated to registered participants ahead of the event.",
  },

  {
    question:
      "How do I register for TOR'Q?",

    answer:
      "Click REGISTER NOW and complete the registration form with your details. Once submitted, your registration will be reviewed by the TOR'Q team.",
  },

  {
    question:
      "What happens after I register?",

    answer:
      "You'll receive a registration confirmation with your unique registration number. Your application will then be reviewed. If approved, you'll receive your official TOR'Q QR pass by email.",
  },

  {
    question:
      "What do I need my QR pass for?",

    answer:
      "Your QR pass is your official digital access pass for TOR'Q. Keep it accessible on your phone or save the attached QR image. It will be scanned at the entrance during check-in.",
  },

  {
    question:
      "Can I participate as a driver or rider?",

    answer:
      "Yes. Drivers and riders can select their participant type during registration. Participation is subject to TOR'Q's safety, eligibility and event requirements.",
  },

  {
    question:
      "Can I display my car at TOR'Q?",

    answer:
      "Yes. Selected performance, modified, classic and enthusiast vehicles may be featured as part of the TOR'Q automotive experience. Vehicle display opportunities are subject to approval.",
  },

  {
    question:
      "What is VIP access?",

    answer:
      "VIP access is a premium TOR'Q experience designed for guests who want elevated hospitality, exclusive viewing and a more private way to experience the event. VIP access is limited and subject to availability.",
  },

  {
    question:
      "Can I bring my family?",

    answer:
      "Yes. TOR'Q is designed to bring together motorsport enthusiasts, friends and families. Specific age and access requirements will be communicated ahead of the event.",
  },

  {
    question:
      "Is TOR'Q a racing event?",

    answer:
      "TOR'Q is not a conventional racing event. It is a celebration of motorsport culture featuring drifting, burnouts, stunt riding, performance cars, sim racing, music and immersive experiences.",
  },

  {
    question:
      "How can brands partner with TOR'Q?",

    answer:
      "Brands can partner with TOR'Q through sponsorships, experience partnerships, media partnerships and branded activations. Contact the TOR'Q team to discuss partnership opportunities.",
  },
]


/* ================================================================
   PARTICIPANT TYPES
   ================================================================ */

/*
 * These are participant categories, not ticket tiers.
 *
 * VIP remains here so the existing registration system
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

export type ParticipantType =
  (typeof PARTICIPANT_TYPES)[number]
