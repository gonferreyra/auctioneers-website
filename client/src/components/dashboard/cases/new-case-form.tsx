'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import type { Case } from '@/types/case';

export default function NewCaseForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Case>>({
    internalNumber: '',
    recordNumber: '',
    title: '',
    status: 'active',
    court: '',
    plaintiff: '',
    defendant: '',
    type: '',
    filingDate: new Date().toISOString().split('T')[0],
    movements: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.recordNumber || !formData.court) {
        toast.error('Please fill in all required fields');
        return;
      }

      // In a real app, this would be an API call
      console.log('Creating new case:', formData);

      toast.success('Case created successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create case');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Case Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Banco Suquia c/ Daniel Blanco - Ejecucion hipotecaria"
              required
            />
          </div>

          <div>
            <Label htmlFor="internalNumber">Internal Number *</Label>
            <Input
              id="internalNumber"
              value={formData.internalNumber}
              onChange={(e) =>
                setFormData({ ...formData, internalNumber: e.target.value })
              }
              placeholder="e.g., 2024-001"
              required
            />
          </div>

          <div>
            <Label htmlFor="recordNumber">Record Number *</Label>
            <Input
              id="recordNumber"
              value={formData.recordNumber}
              onChange={(e) =>
                setFormData({ ...formData, recordNumber: e.target.value })
              }
              placeholder="e.g., 123456/2024"
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Case['status']) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paralyzed">Paralyzed</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="court">Court *</Label>
            <Input
              id="court"
              value={formData.court}
              onChange={(e) =>
                setFormData({ ...formData, court: e.target.value })
              }
              placeholder="Enter court name"
              required
            />
          </div>

          <div>
            <Label htmlFor="plaintiff">Plaintiff *</Label>
            <Input
              id="plaintiff"
              value={formData.plaintiff}
              onChange={(e) =>
                setFormData({ ...formData, plaintiff: e.target.value })
              }
              placeholder="Enter plaintiff name"
              required
            />
          </div>

          <div>
            <Label htmlFor="defendant">Defendant *</Label>
            <Input
              id="defendant"
              value={formData.defendant}
              onChange={(e) =>
                setFormData({ ...formData, defendant: e.target.value })
              }
              placeholder="Enter defendant name"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Case Type *</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              placeholder="Enter case type"
              required
            />
          </div>

          <div>
            <Label htmlFor="filingDate">Filing Date</Label>
            <Input
              id="filingDate"
              type="date"
              value={formData.filingDate}
              onChange={(e) =>
                setFormData({ ...formData, filingDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Create Case
        </Button>
      </div>
    </form>
  );
}
