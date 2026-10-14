export const EVENT = {
  name: "TOR'Q",
  tagline: "Artistry in Motorsport",

  date: "2026-12-06",

  dateLabel: "December 6, 2026",

  location: "Ibadan, Nigeria",
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
      "A curated exhibition where engineering meets artistry, brought to life with live theatre performance. Discover remarkable machines up close and experience automotive design as a form of expression.",
    image: "/images/exp-supercar.png",
    category: "AUTOMOTIVE ARTISTRY & LIVE THEATRE",
    label: "Cars, Design & Theatre",
  },

  {
    number: "02",
    title: "Drift & Burnout Arena",
    description:
      "Professional drift drivers deliver precision smoke shows, controlled burnouts and synchronized drifting alongside high-energy power bike stunt performances.",
    image: "/images/exp-drift.png",
    category: "DRIFT, BURNOUT & POWER BIKE STUNTS",
    label: "Live Performance",
  },

  {
    number: "03",
    title: "TOR'Q Lounge",
    description:
      "A premium hospitality experience with elevated views, curated refreshments, networking opportunities and an exclusive way to experience TOR'Q.",
    image: "/images/exp-vip.png",
    category: "VIP & HOSPITALITY",
    label: "Premium Experience",
  },

  {
    number: "04",
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

export const GALLERY_ALBUMS = [
  {
    id: 'cars-bikes',
    title: 'Cars & Bikes at TOR’Q',
    description: 'Machines, builds and two-wheel action from the TOR’Q archive.',
    images: [
      { src: '/images/torq-originals/mustang-crowd.jpg', alt: 'White Mustang performing a smoky burnout before the crowd' },
      { src: '/images/torq-originals/red-bmw-smoke.jpg', alt: 'Red BMW drifting through smoke at the event' },
      { src: '/images/torq-originals/motorcycle-gathering.jpg', alt: 'Motorcycles and spectators gathered at TOR’Q' },
      { src: '/images/torq-originals/blue-bmw-drift.jpg', alt: 'Blue BMW drifting across the track' },
      { src: '/images/cars-bikes/torq-24-red-mustang-display.jpg', alt: 'Red Mustang on display at TOR’Q 2024' },
      { src: '/images/cars-bikes/torq-24-mustang-drift.jpg', alt: 'Mustang drifting across the TOR’Q arena' },
      { src: '/images/cars-bikes/torq-24-blue-car-drift.jpg', alt: 'Blue car drifting through a cloud of tyre smoke' },
      { src: '/images/cars-bikes/torq-24-teal-bmw-burnout.jpg', alt: 'Teal BMW performing a smoky burnout' },
      { src: '/images/cars-bikes/torq-24-white-mustang-smoke.jpg', alt: 'White Mustang emerging through smoke during a driving display' },
      { src: '/images/cars-bikes/torq-24-motorcycle-stunt.jpg', alt: 'Motorcycle stunt rider performing in the arena' },
      { src: '/images/cars-bikes/torq-24-corvette-steering-detail.jpg', alt: 'Close-up of a classic Corvette steering wheel' },
      { src: '/images/cars-bikes/torq-24-classic-headlight-detail.jpg', alt: 'Close-up detail of a classic car headlight' },
      { src: '/images/cars-bikes/torq-24-dodge-display.jpg', alt: 'Dodge muscle car displayed at TOR’Q' },
      { src: '/images/cars-bikes/torq-25-bike-wheelie.jpg', alt: 'Motorcycle rider lifting the front wheel at TOR’Q 2025' },
      { src: '/images/cars-bikes/torq-25-motorcycle-enthusiast.jpg', alt: 'Motorcycle enthusiast with a sport bike at TOR’Q 2025' },
    ],
  },
  {
    id: 'celebrities',
    title: 'Celebrities at TOR’Q',
    description: 'Artists, public figures and special guests in the TOR’Q crowd.',
    images: [
      { src: '/images/celebrities/torq-guest-crowd-2025.jpg', alt: 'Special guest greeting fans at TOR’Q' },
      { src: '/images/celebrities/torq-cultural-guest-2025.jpg', alt: 'Special guest speaking in traditional attire at TOR’Q' },
      { src: '/images/celebrities/torq-guest-2024-01.jpg', alt: 'Guest attending a TOR’Q event in 2024' },
      { src: '/images/celebrities/torq-guest-2024-02.jpg', alt: 'Guest enjoying the TOR’Q event atmosphere in 2024' },
      { src: '/images/celebrities/torq-23-performer-crowd.jpg', alt: 'Guest performer on stage with the TOR’Q crowd' },
      { src: '/images/celebrities/torq-23-musician-performance.jpg', alt: 'Musician performing at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-performer-crowd-bw.jpg', alt: 'Performer connecting with the audience at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-guest-motorcycle.jpg', alt: 'Guest seated on a motorcycle at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-patterned-shirt-guest.jpg', alt: 'Guest in a colourful patterned shirt at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-live-singer-stage.jpg', alt: 'Singer performing on stage at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-live-dance-performance.jpg', alt: 'Performer dancing with the live band at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-vocalist-performance.jpg', alt: 'Vocalist performing under colourful stage lights at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-artist-portrait.jpg', alt: 'Artist greeting the crowd at TOR’Q 2023' },
      { src: '/images/celebrities/torq-23-press-event-guests.jpg', alt: 'Special guests at the TOR’Q press event' },
      { src: '/images/celebrities/torq-23-public-guest-and-crowd.jpg', alt: 'Public figure meeting guests at the TOR’Q press event' },
      { src: '/images/celebrities/torq-23-press-event-group.jpg', alt: 'Guests posing together at the TOR’Q press event' },
    ],
  },
  {
    id: 'enthusiasts',
    title: 'The Enthusiasts',
    description: 'The people, performances and shared moments that make TOR’Q.',
    images: [
      { src: '/images/torq-originals/fire-performance.jpg', alt: 'Live fire performance before the TOR’Q crowd' },
      { src: '/images/torq-originals/cultural-performance.jpg', alt: 'Traditional dancers performing on the event stage' },
      { src: '/images/torq-originals/mustang-crowd.jpg', alt: 'TOR’Q enthusiasts gathered around a performance car' },
      { src: '/images/enthusiasts/torq-23-community-guests.jpg', alt: 'Friends enjoying the TOR’Q experience together' },
      { src: '/images/enthusiasts/torq-23-enthusiasts-interview.jpg', alt: 'TOR’Q guests speaking with an event interviewer' },
      { src: '/images/enthusiasts/torq-23-enthusiast-group.jpg', alt: 'A group of motorsport enthusiasts at TOR’Q' },
      { src: '/images/enthusiasts/torq-23-friends-at-torq.jpg', alt: 'Friends meeting at TOR’Q' },
      { src: '/images/enthusiasts/torq-23-crowd-watching.jpg', alt: 'Enthusiasts watching the action at TOR’Q' },
      { src: '/images/enthusiasts/torq-23-enthusiast-crowd.jpg', alt: 'TOR’Q crowd sharing the event experience' },
    ],
  },
]


/* ================================================================
   SPONSORS
   ================================================================ */

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
      "TOR'Q 2026 takes place on December 6, 2026 in Ibadan, Nigeria. Full venue and access details will be communicated to registered participants ahead of the event.",
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

export const PARTICIPANT_TYPES = [
  "Driver",
  "Rider",
  "VIP",
  "Spectator",
  "Sim Racer",
] as const

export type ParticipantType =
  (typeof PARTICIPANT_TYPES)[number]
