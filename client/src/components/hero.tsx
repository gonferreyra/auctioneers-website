import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <div className="relative flex min-h-[90vh] items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="mb-4 block text-lg font-semibold text-secondary">
            Premium Real Estate Auctions
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            Discover Exceptional{' '}
            <span className="text-secondary">Properties</span> at Auction
          </h1>
          <p className="mb-8 text-xl text-gray-200">
            Connect with trusted auction houses and verified sellers for
            exclusive real estate opportunities in prime locations.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="text-lg">
              Browse Auctions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="secondary" className="text-lg">
              Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
