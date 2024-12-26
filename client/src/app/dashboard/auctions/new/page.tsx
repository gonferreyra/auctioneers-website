import NewAuctionForm from '@/components/dashboard/auctions/new-auction-form';
import { Card } from '@/components/ui/card';
import BackButton from '@/components/dashboard/back-button';

export default function NewAuctionPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <BackButton />

        <Card className="p-6">
          <h1 className="mb-6 text-2xl font-bold">Create New Auction</h1>
          <NewAuctionForm />
        </Card>
      </div>
    </div>
  );
}
