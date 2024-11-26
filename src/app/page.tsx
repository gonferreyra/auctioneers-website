import AuctionGrid from '@/components/auction-grid';
import Hero from '@/components/hero';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AuctionGrid />
    </div>
  );
}
