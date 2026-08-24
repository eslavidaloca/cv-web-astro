import type { CardList } from '@/interfaces/CardList';
import type { Timeline, Year } from '@/interfaces/TimelineData';

/** Years rendered as tick marks on `/work/timeline` (newest first). */
export const TIMELINE_DISPLAY_YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018,
] as const;

const CARD_LIST_REQUIRED_FIELDS: (keyof CardList)[] = [
  'img',
  'imgAlt',
  'title',
  'description',
  'buttonText',
  'fullDescription',
  'technologies',
];

/** Timeline years sorted newest-first for display parity checks. */
export function getSortedTimelineYears(timeline: Timeline): number[] {
  return Object.keys(timeline)
    .map(Number)
    .sort((a, b) => b - a);
}

export function isTimelineYearComplete(year: Year): boolean {
  return (
    year.title.trim().length > 0 &&
    year.tech.length > 0 &&
    year.tech.every((tech) => tech.trim().length > 0) &&
    year.events.length > 0 &&
    year.events.every(
      (event) =>
        event.title.trim().length > 0 && event.description.trim().length > 0,
    )
  );
}

export function isCompleteCardListEntry(entry: CardList): boolean {
  return CARD_LIST_REQUIRED_FIELDS.every((field) => {
    const value = entry[field];
    if (field === 'technologies') {
      return (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((tech) => tech.trim().length > 0)
      );
    }
    return typeof value === 'string' && value.trim().length > 0;
  });
}
