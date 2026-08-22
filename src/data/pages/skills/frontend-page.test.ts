import { describe, expect, it } from 'vitest';
import {
  type FrontendPageContent,
  frontendPageEn,
  frontendPageEs,
  flatStackItems,
} from './frontend-page';

const CRAFT_DEMO_IDS = ['islands', 'focus', 'glass'] as const;
const CASE_LAYOUTS = ['split', 'feature', 'stack'] as const;
const METRIC_SPANS = ['hero', 'wide', 'default'] as const;

function collectInternalHrefs(content: FrontendPageContent): string[] {
  const hrefs = [
    content.hero.primaryCta.href,
    content.hero.secondaryCta.href,
    content.cta.primary.href,
    ...content.cta.links.map((l) => l.href),
  ];
  return hrefs;
}

describe('flatStackItems', () => {
  it('flattens all stack groups into a single ordered list', () => {
    const items = flatStackItems(frontendPageEn);

    expect(items.length).toBe(
      frontendPageEn.stack.groups.reduce((n, g) => n + g.items.length, 0),
    );
    expect(items[0]).toEqual({ title: 'Astro', icon: 'astro' });
    expect(items.at(-1)).toEqual({ title: 'HTML5', icon: 'html5' });
  });

  it('preserves group order and item order within each group', () => {
    const fromFlat = flatStackItems(frontendPageEn).map((i) => i.icon);
    const fromGroups = frontendPageEn.stack.groups.flatMap((g) =>
      g.items.map((i) => i.icon),
    );

    expect(fromFlat).toEqual(fromGroups);
  });

  it('returns an empty array when there are no stack groups', () => {
    const empty: FrontendPageContent = {
      ...frontendPageEn,
      stack: { headline: '', subtext: '', groups: [] },
    };

    expect(flatStackItems(empty)).toEqual([]);
  });

  it('returns the same icon slugs for English and Spanish content', () => {
    const enIcons = flatStackItems(frontendPageEn).map((i) => i.icon);
    const esIcons = flatStackItems(frontendPageEs).map((i) => i.icon);

    expect(esIcons).toEqual(enIcons);
  });
});

describe('frontend page content parity', () => {
  it('keeps matching case-study ids and layouts across locales', () => {
    const enCases = frontendPageEn.cases.items;
    const esCases = frontendPageEs.cases.items;

    expect(esCases.length).toBe(enCases.length);
    expect(esCases.map((c) => c.id)).toEqual(enCases.map((c) => c.id));
    expect(esCases.map((c) => c.layout)).toEqual(enCases.map((c) => c.layout));
    for (const layout of enCases.map((c) => c.layout)) {
      expect(CASE_LAYOUTS).toContain(layout);
    }
  });

  it('keeps matching craft demo ids across locales', () => {
    const enIds = frontendPageEn.craft.demos.map((d) => d.id);
    const esIds = frontendPageEs.craft.demos.map((d) => d.id);

    expect(esIds).toEqual(enIds);
    for (const id of enIds) {
      expect(CRAFT_DEMO_IDS).toContain(id);
    }
  });

  it('uses valid metric span values in both locales', () => {
    for (const metric of frontendPageEn.metrics) {
      expect(METRIC_SPANS).toContain(metric.span);
    }
    for (const metric of frontendPageEs.metrics) {
      expect(METRIC_SPANS).toContain(metric.span);
    }
  });

  it('prefixes Spanish internal routes with /es/', () => {
    const esHrefs = collectInternalHrefs(frontendPageEs);

    for (const href of esHrefs) {
      if (href.startsWith('http')) continue;
      expect(
        href.startsWith('/es/') || href.startsWith('/eslavi'),
        href,
      ).toBe(true);
    }
  });

  it('keeps English internal routes without a /es/ locale prefix', () => {
    const enHrefs = collectInternalHrefs(frontendPageEn);

    for (const href of enHrefs) {
      if (href.startsWith('http')) continue;
      expect(href.startsWith('/es/'), href).toBe(false);
    }
  });
});

describe('frontend page marquee loop', () => {
  it('duplicates flat stack items for seamless marquee scrolling', () => {
    const base = flatStackItems(frontendPageEn);
    const marqueeLoop = [...base, ...base];

    expect(marqueeLoop.length).toBe(base.length * 2);
    expect(marqueeLoop.slice(0, base.length)).toEqual(base);
    expect(marqueeLoop.slice(base.length)).toEqual(base);
  });
});
