export type EventStatus = 'pending' | 'completed';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  status: EventStatus;
  description?: string;
}
