import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Shield, Handshake, Building } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section className="py-20" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Why List Your Property With Us?
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            We connect premium properties with the most reputable auction
            houses, ensuring maximum visibility and optimal results for your
            sale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <Building className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Premium Properties</h3>
              <p className="text-gray-600">
                We showcase only the finest properties to ensure quality
                listings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Search className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Maximum Exposure</h3>
              <p className="text-gray-600">
                Connect with multiple auction houses and qualified buyers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Shield className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Verified Partners</h3>
              <p className="text-gray-600">
                We work only with trusted and licensed auction houses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Handshake className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Expert Support</h3>
              <p className="text-gray-600">
                Professional guidance throughout the entire process.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="text-primary underline">
            <Button size="lg">List Your Property</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
