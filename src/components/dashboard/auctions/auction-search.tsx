'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { auctions } from '@/lib/data/auctions';

export default function AuctionSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAuctions = auctions.filter(
    (auction) =>
      auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.location.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <Link key={auction.id} href={`/dashboard/auctions/${auction.id}`}>
            <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-primary">
                    {auction.title}
                  </h3>
                  <p className="mt-1 text-gray-600">
                    {auction.titleDescription}
                  </p>
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4 text-secondary" />
                      {auction.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-secondary" />
                      {new Date(auction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-sm font-medium ${
                    auction.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : auction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {auction.status.charAt(0).toUpperCase() +
                    auction.status.slice(1)}
                </span>
              </div>
            </Card>
          </Link>
        ))}

        {filteredAuctions.length === 0 && (
          <p className="py-8 text-center text-gray-600">
            No auctions found matching your search criteria.
          </p>
        )}
      </div>
    </div>
  );
}
