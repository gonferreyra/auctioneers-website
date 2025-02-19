'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { CalendarEvent } from '@/types/event';
import { Plus } from 'lucide-react';

interface EventDialogProps {
  selectedDate: Date;
  onAddEvent: (event: Omit<CalendarEvent, 'id' | 'status'>) => void;
}

export default function EventDialog({
  selectedDate,
  onAddEvent,
}: EventDialogProps) {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({
      ...eventData,
      date: selectedDate.toISOString().split('T')[0],
    });
    setEventData({ title: '', description: '' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Evento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Evento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripcion</Label>
            <Textarea
              id="description"
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Agregar Evento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
