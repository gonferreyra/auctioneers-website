import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const auctions = [
  {
    id: 1,
    title: 'Luxury Apartment in Downtown Miami',
    description: '2-bedroom luxury apartment with ocean views',
    status: 'Finished',
    date: 'Apr 15, 2024',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
  },
  {
    id: 2,
    title: 'Commercial Space in Manhattan',
    description: "Prime retail location in Manhattan's business district",
    status: 'Upcoming',
    date: 'Apr 20, 2024',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
  },
  {
    id: 3,
    title: 'Beachfront Villa in Malibu',
    description: 'Spectacular beachfront property with private access',
    status: 'Upcoming',
    date: 'Apr 25, 2024',
    location: 'Malibu, CA',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=500',
  },
];

export default function AuctionGrid() {
  return (
    <section className="py-20" id="auctions">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Featured Properties</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover exceptional real estate opportunities in our curated
            selection of upcoming auctions. Each property is carefully verified
            and ready for bidding.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {auctions.map((auction) => (
            <Card
              key={auction.id}
              className="overflow-hidden border-2 transition-shadow hover:shadow-lg"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={auction.image}
                    alt={auction.title}
                    width={500}
                    height={500}
                    className="h-48 w-full object-cover"
                  />
                  <Badge
                    variant="outline"
                    className="absolute right-4 top-4 bg-white/80 font-semibold text-primary"
                  >
                    {auction.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex min-h-[200px] flex-col justify-between p-6">
                <h3 className="mb-2 text-xl font-semibold">{auction.title}</h3>
                <p className="mb-4 text-gray-600">{auction.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-secondary" />
                    {auction.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-secondary" />
                    {auction.location}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/auctions/${auction.id}`} className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
