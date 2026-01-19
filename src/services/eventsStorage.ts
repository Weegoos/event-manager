import type { EventItem, EventsStorage } from 'src/models/event';

const STORAGE_KEY = 'eventsData';

/**
 * Получить все события
 */
export function getEvents(): EventItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed: EventsStorage = JSON.parse(raw);
    console.log('Parsed events from localStorage:', parsed.events);
    return parsed.events;
  } catch (error) {
    console.error('Ошибка чтения localStorage', error);
    return [];
  }
}

/**
 * Сохранить список событий
 */
function saveEvents(events: EventItem[]): void {
  const data: EventsStorage = { events };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Добавить событие
 */
export function addEvent(event: EventItem): void {
  const events = getEvents();
  events.push(event);
  saveEvents(events);
}

/**
 * Обновить событие
 */
export function updateEvent(updatedEvent: EventItem): void {
  const events = getEvents().map((event) => (event.id === updatedEvent.id ? updatedEvent : event));

  saveEvents(events);
}

/**
 * Удалить событие
 */
export function deleteEvent(id: number): void {
  const events = getEvents().filter((event) => event.id !== id);
  saveEvents(events);
}

/**
 * Очистить все события (опционально)
 */
export function clearEvents(): void {
  localStorage.removeItem(STORAGE_KEY);
}
