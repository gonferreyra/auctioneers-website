'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Auction } from '@/types/auction';
import { useDashboardMenuStore } from '@/stores/useDashboardMenuStore';

export default function NewAuctionForm() {
  const router = useRouter();
  const setActivePage = useDashboardMenuStore((state) => state.setActivePage);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Auction>>({
    title: '',
    titleDescription: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    location: '',
    images: [],
    documents: [],
    details: '',
  });

  const [newImage, setNewImage] = useState('');
  const [newDocument, setNewDocument] = useState({ name: '', url: '' });

  const handleAddImage = () => {
    if (!newImage.trim()) return;
    setFormData({
      ...formData,
      images: [...(formData.images || []), newImage],
    });
    setNewImage('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index),
    });
  };

  const handleAddDocument = () => {
    if (!newDocument.name.trim() || !newDocument.url.trim()) return;
    setFormData({
      ...formData,
      documents: [...(formData.documents || []), newDocument],
    });
    setNewDocument({ name: '', url: '' });
  };

  const handleRemoveDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents?.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.date || !formData.location) {
        toast.error('Completá todos los campos obligatorios');
        return;
      }

      console.log('Creating new auction:', formData);

      toast.success('Subasta creada correctamente');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Error al crear la subasta');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Ingresar título de la subasta"
            required
          />
        </div>

        <div>
          <Label htmlFor="titleDescription">Descripción del título</Label>
          <Textarea
            id="titleDescription"
            value={formData.titleDescription}
            onChange={(e) =>
              setFormData({ ...formData, titleDescription: e.target.value })
            }
            placeholder="Ingresar una descripción detallada"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Auction['status']) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date">Fecha *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Ubicación *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Ingresar ubicación"
            required
          />
        </div>

        <div>
          <Label>Imágenes</Label>
          <div className="mb-2 flex gap-2">
            <Input
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Ingresar URL de Google Drive"
            />
            <Button type="button" onClick={handleAddImage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.images?.map((image, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded bg-gray-50 p-2"
              >
                <span className="flex-1 truncate">{image}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Documentos</Label>
          <div className="mb-2 flex gap-2">
            <Input
              value={newDocument.name}
              onChange={(e) =>
                setNewDocument({ ...newDocument, name: e.target.value })
              }
              placeholder="Nombre del documento"
              className="flex-1"
            />
            <Input
              value={newDocument.url}
              onChange={(e) =>
                setNewDocument({ ...newDocument, url: e.target.value })
              }
              placeholder="URL del documento"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddDocument}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {formData.documents?.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded bg-gray-50 p-2"
              >
                <span className="font-medium">{doc.name}</span>
                <span className="flex-1 truncate text-sm text-gray-600">
                  {doc.url}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveDocument(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="details">Detalles adicionales</Label>
          <Textarea
            id="details"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            placeholder="Ingresar detalles adicionales"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setActivePage('auctions');
            router.push('/dashboard');
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Crear Subasta
        </Button>
      </div>
    </form>
  );
}
