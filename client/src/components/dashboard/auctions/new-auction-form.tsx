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

export default function NewAuctionForm() {
  const router = useRouter();
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
        toast.error('Please fill in all required fields');
        return;
      }

      // In a real app, this would be an API call
      console.log('Creating new auction:', formData);

      toast.success('Auction created successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create auction');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter auction title"
            required
          />
        </div>

        <div>
          <Label htmlFor="titleDescription">Title Description</Label>
          <Textarea
            id="titleDescription"
            value={formData.titleDescription}
            onChange={(e) =>
              setFormData({ ...formData, titleDescription: e.target.value })
            }
            placeholder="Enter a detailed description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Auction['status']) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date">Date *</Label>
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
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Enter auction location"
            required
          />
        </div>

        <div>
          <Label>Images</Label>
          <div className="mb-2 flex gap-2">
            <Input
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Enter Google Drive URL"
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
          <Label>Documents</Label>
          <div className="mb-2 flex gap-2">
            <Input
              value={newDocument.name}
              onChange={(e) =>
                setNewDocument({ ...newDocument, name: e.target.value })
              }
              placeholder="Document name"
              className="flex-1"
            />
            <Input
              value={newDocument.url}
              onChange={(e) =>
                setNewDocument({ ...newDocument, url: e.target.value })
              }
              placeholder="Document URL"
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
          <Label htmlFor="details">Additional Details</Label>
          <Textarea
            id="details"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            placeholder="Enter any additional details"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Create Auction
        </Button>
      </div>
    </form>
  );
}
