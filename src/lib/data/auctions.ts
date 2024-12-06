import type { Auction } from '@/types/auction';

export const auctions: Auction[] = [
  {
    id: '1',
    title: '2023 Porsche 911 GT3',
    titleDescription: 'Pristine condition, low mileage luxury sports car',
    status: 'active',
    date: '2024-04-15',
    location: 'Miami, FL',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    ],
    documents: [
      {
        name: 'Vehicle History Report',
        url: 'https://example.com/docs/vhr.pdf',
      },
      {
        name: 'Inspection Report',
        url: 'https://example.com/docs/inspection.pdf',
      },
    ],
    details:
      'Exceptional 2023 Porsche 911 GT3 featuring a 502 hp naturally aspirated engine',
  },
  {
    id: '2',
    title: 'Luxury Penthouse - Downtown',
    titleDescription: 'Spectacular views from this premium penthouse',
    status: 'pending',
    date: '2024-04-20',
    location: 'New York, NY',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    documents: [
      { name: 'Floor Plans', url: 'https://example.com/docs/floorplan.pdf' },
      { name: 'Property Report', url: 'https://example.com/docs/report.pdf' },
    ],
    details: 'Stunning 3-bedroom penthouse with panoramic city views',
  },
];
