'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  ExternalLink,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

interface AuctionData {
  id: string;
  title: string;
  status: string;
  startingPrice: number;
  minimumBid: number;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  documents: Array<{ name: string; url: string }>;
  images: string[];
  auctionUrl: string;
}

interface Props {
  auctionData: AuctionData;
}

export default function AuctionDetailClient({ auctionData }: Props) {
  return (
    <div className="min-h-screen px-4 pb-12 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">{auctionData.title}</h1>
            <Badge
              variant="secondary"
              className="bg-secondary px-4 py-1 text-lg text-primary"
            >
              {auctionData.status}
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-secondary" />
              Starting at ${auctionData.startingPrice.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-secondary" />
              {new Date(auctionData.startDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-secondary" />
              {auctionData.location}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Images and Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="images" className="w-full">
              <TabsList className="bg-gray-100">
                <TabsTrigger
                  value="images"
                  className="flex items-center data-[state=active]:bg-secondary data-[state=active]:text-primary"
                >
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                  className="flex items-center data-[state=active]:bg-secondary data-[state=active]:text-primary"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="flex items-center data-[state=active]:bg-secondary data-[state=active]:text-primary"
                >
                  Documents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="images" className="mt-4">
                <Carousel className="mx-auto w-[80%]">
                  <CarouselContent>
                    {auctionData.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-[400px] overflow-hidden rounded-lg">
                          <Image
                            src={image}
                            alt={`Auction image ${index + 1}`}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </TabsContent>

              <TabsContent value="info" className="mt-4">
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">
                    Property Details
                  </h3>
                  <div className="whitespace-pre-line text-gray-600">
                    {auctionData.description}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">
                    Available Documents
                  </h3>
                  <ul className="space-y-3">
                    {auctionData.documents.map((doc, index) => (
                      <li key={index}>
                        <a
                          href={doc.url}
                          className="flex items-center text-primary hover:text-primary/80"
                        >
                          <FileText className="mr-2 h-5 w-5" />
                          {doc.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Auction Info */}
          <div className="self-center lg:col-span-1">
            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Auction Information
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Starting Price</p>
                  <p className="text-2xl font-bold">
                    ${auctionData.startingPrice.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Minimum Bid Increment</p>
                  <p className="text-lg font-semibold">
                    ${auctionData.minimumBid.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Auction Date</p>
                  <p className="font-medium">
                    {new Date(auctionData.startDate).toLocaleDateString()} at{' '}
                    {new Date(auctionData.startDate).toLocaleTimeString()}
                  </p>
                </div>

                <hr className="my-6 border-gray-200" />

                <Button
                  size="lg"
                  className="w-full bg-secondary text-primary hover:bg-secondary/90"
                  onClick={() => window.open(auctionData.auctionUrl, '_blank')}
                >
                  Go to Auction Site
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
