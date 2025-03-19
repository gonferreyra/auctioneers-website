'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { CalendarEvent } from '@/types/event';

interface EventListProps {
  events: CalendarEvent[];
  onMarkCompleted: (eventId: string) => void;
}

export default function EventList({ events, onMarkCompleted }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.length > 0 ? (
        events.map((event) => (
          <Card key={event.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-primary">{event.title}</h3>
                {event.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {event.description}
                  </p>
                )}
              </div>
              {event.status === 'pending' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMarkCompleted(event.id)}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Check className="mr-1 h-4 w-4" />
                  Marcar Como Completado
                </Button>
              )}
              {event.status === 'completed' && (
                <span className="text-sm font-medium text-green-600">
                  Completado
                </span>
              )}
            </div>
          </Card>
        ))
      ) : (
        <p className="text-gray-600">
          No hay eventos agendados para esta fecha.
        </p>
      )}
    </div>
  );
}
