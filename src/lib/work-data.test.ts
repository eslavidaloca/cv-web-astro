import { describe, expect, it } from 'vitest';
import { cardList } from '@/data/pages/work/currentWork-data';
import { timeline } from '@/data/pages/work/timeline-data';
import {
  getSortedTimelineYears,
  isCompleteCardListEntry,
  isTimelineYearComplete,
  TIMELINE_DISPLAY_YEARS,
} from './work-data';

describe('timeline data invariants', () => {
  it('matches the hardcoded years on the timeline page', () => {
    expect(getSortedTimelineYears(timeline)).toEqual([...TIMELINE_DISPLAY_YEARS]);
  });

  it('has a complete entry for every displayed year', () => {
    for (const year of TIMELINE_DISPLAY_YEARS) {
      expect(isTimelineYearComplete(timeline[year])).toBe(true);
    }
  });
});

describe('current work card list invariants', () => {
  it('lists every active project with required card fields', () => {
    expect(cardList.length).toBeGreaterThanOrEqual(6);

    for (const entry of cardList) {
      expect(isCompleteCardListEntry(entry)).toBe(true);
    }
  });

  it('uses unique titles so cards stay distinguishable in the UI', () => {
    const titles = cardList.map((entry) => entry.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
