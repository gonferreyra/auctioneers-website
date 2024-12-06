'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import type { Auction } from '@/types/auction';

interface AuctionDetailProps {
  auctionData: Auction;
}

export default function AuctionDetail({ auctionData }: AuctionDetailProps) {
  // const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuction, setEditedAuction] = useState<Auction>(auctionData);
  const [originalAuction] = useState<Auction>(auctionData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newDocument, setNewDocument] = useState({ name: '', url: '' });

  const handleUpdate = (updates: Partial<Auction>) => {
    setEditedAuction((prev) => {
      const updated = { ...prev, ...updates };
      setHasUnsavedChanges(
        JSON.stringify(updated) !== JSON.stringify(originalAuction),
      );
      return updated;
    });
  };

  const handleAddImage = () => {
    if (!newImage.trim()) return;
    handleUpdate({
      images: [...editedAuction.images, newImage],
    });
    setNewImage('');
  };

  const handleRemoveImage = (index: number) => {
    handleUpdate({
      images: editedAuction.images.filter((_, i) => i !== index),
    });
  };

  const handleAddDocument = () => {
    if (!newDocument.name.trim() || !newDocument.url.trim()) return;
    handleUpdate({
      documents: [...editedAuction.documents, newDocument],
    });
    setNewDocument({ name: '', url: '' });
  };

  const handleRemoveDocument = (index: number) => {
    handleUpdate({
      documents: editedAuction.documents.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    try {
      if (
        !editedAuction.title ||
        !editedAuction.date ||
        !editedAuction.location
      ) {
        toast.error('Please fill in all required fields');
        return;
      }

      // In a real app, this would be an API call
      console.log('Saving auction:', editedAuction);

      toast.success('Auction updated successfully');
      setIsEditing(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error('Failed to update auction');
      console.error(error);
    }
  };

  const handleUndo = () => {
    setEditedAuction(originalAuction);
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    handleUndo();
    setIsEditing(false);
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <h1 className="text-2xl font-bold">{editedAuction.title}</h1>
        <div className="space-x-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Auction</Button>
          ) : (
            <>
              {hasUnsavedChanges && (
                <Button
                  variant="outline"
                  onClick={handleUndo}
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                >
                  Undo Changes
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You have unsaved changes. Are you sure you want to discard
                      them?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel}>
                      Discard Changes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={editedAuction.title}
                    onChange={(e) => handleUpdate({ title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="titleDescription">Title Description</Label>
                  <Textarea
                    id="titleDescription"
                    value={editedAuction.titleDescription}
                    onChange={(e) =>
                      handleUpdate({ titleDescription: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedAuction.status}
                    onValueChange={(value: Auction['status']) =>
                      handleUpdate({ status: value })
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
                    value={editedAuction.date}
                    onChange={(e) => handleUpdate({ date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={editedAuction.location}
                    onChange={(e) => handleUpdate({ location: e.target.value })}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Title Description</Label>
                  <p className="text-gray-600">
                    {editedAuction.titleDescription}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Status</Label>
                    <p className="text-gray-600">{editedAuction.status}</p>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <p className="text-gray-600">{editedAuction.date}</p>
                  </div>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="text-gray-600">{editedAuction.location}</p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label>Images</Label>
              {isEditing && (
                <div className="mb-2 flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Enter image URL"
                  />
                  <Button type="button" onClick={handleAddImage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                {editedAuction.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded bg-gray-50 p-2"
                  >
                    <span className="flex-1 truncate">{image}</span>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Documents</Label>
              {isEditing && (
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
              )}
              <div className="space-y-2">
                {editedAuction.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded bg-gray-50 p-2"
                  >
                    <span className="font-medium">{doc.name}</span>
                    <span className="flex-1 truncate text-sm text-gray-600">
                      {doc.url}
                    </span>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="details">Additional Details</Label>
              {isEditing ? (
                <Textarea
                  id="details"
                  value={editedAuction.details}
                  onChange={(e) => handleUpdate({ details: e.target.value })}
                  rows={4}
                />
              ) : (
                <p className="whitespace-pre-line text-gray-600">
                  {editedAuction.details}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
