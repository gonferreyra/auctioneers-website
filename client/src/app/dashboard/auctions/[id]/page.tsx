import { auctions } from '@/lib/data/auctions';
import BackButton from '@/components/dashboard/back-button';
import AuctionDetail from '@/components/dashboard/auctions/auction-details';

export function generateStaticParams() {
  return auctions.map((auction) => ({
    id: auction.id,
  }));
}

interface AuctionPageProps {
  params: { id: string };
}

export default function AuctionPage({ params }: AuctionPageProps) {
  const auctionData = auctions.find((auction) => auction.id === params.id);

  if (!auctionData) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <BackButton />
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h2 className="font-semibold text-red-800">Auction Not Found</h2>
            <p className="text-red-600">
              The requested auction could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <BackButton />
        <AuctionDetail auctionData={auctionData} />
      </div>
    </div>
  );
}
