import { getEvents, addEvent } from 'src/services/eventsStorage';
import type { EventItem } from 'src/models/event';

export function initEvents(): void {
  if (getEvents().length > 0) return;

  const initialEvents: EventItem[] = [
    {
      id: 1,
      title: 'Astana Hub 2025',
      description: 'Annual tech conference on AI and ML',
      date: '2025-05-15T10:00:00Z',
      category: 'Conference',
      status: 'Planned',
    },
    {
      id: 2,
      title: 'Team Meetup',
      description: 'Monthly team sync',
      date: '2025-04-30T14:00:00Z',
      category: 'Meeting',
      status: 'Completed',
    },
  ];

  initialEvents.forEach(addEvent);
}
