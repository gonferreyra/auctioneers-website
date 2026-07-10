import { use } from 'react';
import { auctions } from '@/lib/data/auctions';
import BackButton from '@/components/dashboard/back-button';
import AuctionDetail from '@/components/dashboard/auctions/auction-details';

export function generateStaticParams() {
  return auctions.map((auction) => ({
    id: auction.id,
  }));
}

interface AuctionPageProps {
  params: Promise<{ id: string }>;
}

export default function AuctionPage({ params }: AuctionPageProps) {
  const { id } = use(params);
  const auctionData = auctions.find((auction) => auction.id === id);

  if (!auctionData) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <BackButton />
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h2 className="font-semibold text-red-800">Subasta no encontrada</h2>
            <p className="text-red-600">
              La subasta solicitada no pudo ser encontrada.
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
