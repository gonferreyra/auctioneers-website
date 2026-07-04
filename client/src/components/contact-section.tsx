'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="py-20" id="contacto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Contactanos</h2>
            <p className="mb-8 text-gray-600">
              Consultanos sin compromiso. Estamos en Córdoba Capital.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="mt-1 h-6 w-6 text-primary" />
                <div className="ml-4">
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">
                    info@ferreyramartilleros.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="mt-1 h-6 w-6 text-primary" />
                <div className="ml-4">
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-gray-600">351-3123123</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mt-1 h-6 w-6 text-primary" />
                <div className="ml-4">
                  <h3 className="font-semibold">Dirección</h3>
                  <p className="text-gray-600">
                    Av. Cordillera Nº 1234
                    <br />
                    Córdoba, Capital
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">
                  Matrícula: M.P. 01-xxx
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Enviar mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
