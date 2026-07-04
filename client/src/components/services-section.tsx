import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Shield, Handshake, Building } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section className="py-20" id="servicios">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            ¿Querés vender en subasta?
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Te acompañamos en todo el proceso, desde la tasación hasta el remate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <Building className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">
                Tasación profesional
              </h3>
              <p className="text-gray-600">
                Valuamos tu propiedad o vehículo con precisión y experiencia en
                el mercado cordobés.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Search className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">
                Promoción y difusión
              </h3>
              <p className="text-gray-600">
                Damos máxima visibilidad a tu subasta a través de nuestros
                canales y martilleros asociados.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Shield className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">
                Transparencia y seguridad
              </h3>
              <p className="text-gray-600">
                Procesos claros y certificados, respaldados por más de 60 años
                de trayectoria.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Handshake className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">
                Acompañamiento personalizado
              </h3>
              <p className="text-gray-600">
                Te guiamos en cada paso del proceso, desde el primer contacto
                hasta el remate final.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <a href="#contacto">
            <Button size="lg">Quiero vender en subasta</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
