export interface Auction {
  id: string;
  title: string;
  titleDescription: string;
  status: 'active' | 'pending' | 'closed';
  date: string;
  location: string;
  images: string[];
  documents: {
    name: string;
    url: string;
  }[];
  details: string;
}
