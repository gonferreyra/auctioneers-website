import { ArrowRight, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function Hero() {
  // return (
  //   <div className="relative flex min-h-[90vh] items-center">
  //     <div
  //       className="absolute inset-0 z-0"
  //       style={{
  //         backgroundImage:
  //           "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000')",
  //         backgroundSize: 'cover',
  //         backgroundPosition: 'center',
  //       }}
  //     >
  //       <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
  //     </div>

  //     <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
  //       <div className="max-w-3xl">
  //         <span className="mb-4 block text-lg font-semibold">
  //           Premium Real Estate Auctions
  //         </span>
  //         <h1 className="mb-6 text-4xl font-bold md:text-6xl">
  //           Discover Exceptional <span className="">Properties</span> at Auction
  //         </h1>
  //         <p className="mb-8 text-xl">
  //           Connect with trusted auction houses and verified sellers for
  //           exclusive real estate opportunities in prime locations.
  //         </p>
  //         <div className="flex flex-col gap-4 sm:flex-row">
  //           <Button size="lg" variant="secondary" className="text-lg">
  //             Browse Auctions
  //             <ArrowRight className="ml-2 h-5 w-5" />
  //           </Button>
  //           <Button size="lg" variant="secondary" className="text-lg">
  //             Info
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center">
        <div className="flex h-full flex-col items-center justify-center gap-2 py-24 lg:py-32">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
              href="#"
            >
              PRO release - Join to waitlist
              <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-muted-foreground/15 px-2.5 py-1.5 text-sm font-semibold">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Let&apos;s Build Together
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-xl text-muted-foreground">
              Discover Exceptional <span className="">Properties</span> at
              Auction. Connect with trusted auction houses and verified sellers
              for exclusive real estate opportunities in prime locations.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button size={'lg'}>Get started</Button>
            <Button size={'lg'} variant={'outline'}>
              Browse auctions
            </Button>
          </div>
        </div>
      </section>
      {/* End Hero */}
    </>
  );
}
