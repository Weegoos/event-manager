export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = String(date.getUTCDate()).padStart(2, '0'); // день
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // месяц (0-indexed)
  const year = date.getUTCFullYear(); // год

  return `${day}.${month}.${year}`;
}
