import AuctionGrid from '@/components/auction-grid';
import ContactSection from '@/components/contact-section';
import Hero from '@/components/hero';
import ServicesSection from '@/components/services-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AuctionGrid />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
