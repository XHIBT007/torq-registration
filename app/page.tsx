import { About } from '@/components/torq/about'
import { Contact } from '@/components/torq/contact'
import { Experiences } from '@/components/torq/experiences'
import { Faq } from '@/components/torq/faq'
import { Footer } from '@/components/torq/footer'
import { Gallery } from '@/components/torq/gallery'
import { Hero } from '@/components/torq/hero'
import { Navbar } from '@/components/torq/navbar'
import { RegistrationProvider } from '@/components/torq/registration'
import { Sponsors } from '@/components/torq/sponsors'

export default function Page() {
  return (
    <RegistrationProvider>
      <div className="relative min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experiences />
          <Gallery />
          <Sponsors />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </RegistrationProvider>
  )
}
