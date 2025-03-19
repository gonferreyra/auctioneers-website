'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarEvent } from '@/types/event';
import { events as initialEvents } from '@/lib/data/events';
import EventDialog from './calendar/event-dialog';
import EventList from './calendar/event-list';
import { format } from 'date-fns';

export default function DashboardCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const selectedDateEvents = events.filter(
    (event) => event.date === format(date, 'yyyy-MM-dd'),
  );

  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id' | 'status'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: crypto.randomUUID(),
      status: 'pending',
    };
    setEvents([...events, event]);
  };

  const handleMarkCompleted = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, status: 'completed' } : event,
      ),
    );
  };

  // Create an object to store dates with events
  const eventDates = events.reduce(
    (acc, event) => {
      acc[event.date] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  // Custom modifiers for the calendar
  const modifiers = {
    hasEvent: (date: Date) => eventDates[format(date, 'yyyy-MM-dd')] || false,
  };

  // Custom modifier styles
  const modifiersStyles = {
    hasEvent: {
      backgroundColor: 'rgb(var(--primary))',
      color: 'white',
      borderRadius: '50%',
    },
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Calendario</h2>
          <EventDialog selectedDate={date} onAddEvent={handleAddEvent} />
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-primary">
          Eventos para el {format(date, 'd MMMM, yyyy')}
        </h2>
        <EventList
          events={selectedDateEvents}
          onMarkCompleted={handleMarkCompleted}
        />
      </div>
    </div>
  );
}
