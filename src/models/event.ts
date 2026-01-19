export type EventStatus = 'Planned' | 'Completed';
export type EventCategory = 'Conference' | 'Meeting' | 'Workshop';

export interface EventItem {
  id: number;
  title: string;
  description?: string;
  date: string;
  category: EventCategory;
  status: EventStatus;
  [key: string]: unknown;
}

export interface EventsStorage {
  events: EventItem[];
}
