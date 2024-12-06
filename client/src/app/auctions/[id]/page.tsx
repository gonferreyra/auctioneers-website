import AuctionDetailClient from '@/components/auction-detail';

// This data will come from the server
const auctionData = {
  id: '1',
  title: '2023 Porsche 911 GT3',
  status: 'Upcoming',
  startingPrice: 180000,
  minimumBid: 5000,
  startDate: '2024-04-15T10:00:00',
  endDate: '2024-04-15T16:00:00',
  location: 'Miami, FL',
  description: `
    Exceptional 2023 Porsche 911 GT3 featuring:
    - 502 hp naturally aspirated flat-six engine
    - 7-speed PDK transmission
    - Track-focused suspension
    - Carbon ceramic brakes
    - GT Sport steering wheel
    - Full service history
    - Only 1,200 miles
  `,
  documents: [
    { name: 'Vehicle History Report', url: '#' },
    { name: 'Inspection Report', url: '#' },
    { name: 'Service Records', url: '#' },
  ],
  images: [
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600',
    'https://images.unsplash.com/photo-1617814177823-d52d9a97e30f?w=800&h=600',
  ],
  auctionUrl: 'https://external-auction-site.com/auction/123',
};

export default function Page() {
  return <AuctionDetailClient auctionData={auctionData} />;
}
