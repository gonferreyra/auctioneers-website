// 'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

// Sample auction data
const auctions = [
  {
    id: 1,
    title: 'Luxury Apartment in Downtown Miami',
    location: 'Miami, FL',
    date: 'Apr 15, 2024',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Commercial Space in Manhattan',
    location: 'New York, NY',
    date: 'Apr 20, 2024',
    status: 'Upcoming',
  },
  {
    id: 3,
    title: 'Beachfront Villa in Malibu',
    location: 'Malibu, CA',
    date: 'Apr 25, 2024',
    status: 'Upcoming',
  },
];

export default function DashboardSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="space-y-4">
        {filteredAuctions.map((auction) => (
          <Link key={auction.id} href={`/auctions/${auction.id}`}>
            <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-primary">
                    {auction.title}
                  </h3>
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4 text-secondary" />
                      {auction.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-secondary" />
                      {auction.date}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-secondary">
                  {auction.status}
                </span>
              </div>
            </Card>
          </Link>
        ))}

        {filteredAuctions.length === 0 && (
          <p className="text-center text-gray-600">No auctions found.</p>
        )}
      </div>
    </div>
  );
}
