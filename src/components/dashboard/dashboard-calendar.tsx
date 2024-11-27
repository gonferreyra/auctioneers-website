'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

// Sample events data
const events = [
  {
    id: 1,
    title: 'Luxury Apartment Viewing',
    date: new Date(2024, 3, 15),
    type: 'viewing',
  },
  {
    id: 2,
    title: 'Property Inspection',
    date: new Date(2024, 3, 16),
    type: 'inspection',
  },
  {
    id: 3,
    title: 'Online Auction',
    date: new Date(2024, 3, 20),
    type: 'auction',
  },
];

export default function DashboardCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString(),
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-primary">Calendar</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-primary">
          Events for {date?.toLocaleDateString()}
        </h2>
        <div className="space-y-4">
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <h3 className="font-semibold text-primary">{event.title}</h3>
                <p className="text-sm capitalize text-gray-600">{event.type}</p>
              </Card>
            ))
          ) : (
            <p className="text-gray-600">No events scheduled for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}
