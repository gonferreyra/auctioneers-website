'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import NewAuctionForm from '@/components/dashboard/auctions/new-auction-form';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function NewAuctionPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Create New Auction</h1>
          <NewAuctionForm />
        </Card>
      </div>
    </div>
  );
}
