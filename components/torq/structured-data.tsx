export function StructuredData() {
  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',

    name: "TOR'Q 2026",

    description:
      "TOR'Q is a premium motorsport spectacle in Lagos, Nigeria, bringing together drifting, burnouts, power bike stunts, performance cars, sim racing, music and immersive automotive experiences.",

    startDate: '2026-12-06',

    eventStatus: 'https://schema.org/EventScheduled',

    eventAttendanceMode:
      'https://schema.org/OfflineEventAttendanceMode',

    location: {
      '@type': 'Place',
      name: 'Lagos, Nigeria',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
    },

    image: [
      'https://tor-q-event-website.vercel.app/images/Hero-mustang-03.jpg',
    ],

    organizer: {
      '@type': 'Organization',
      name: "TOR'Q",
      url: 'https://tor-q-event-website.vercel.app',
    },

    url: 'https://tor-q-event-website.vercel.app',

  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(event),
      }}
    />
  )
}
