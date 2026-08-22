import { describe, expect, it } from 'vitest';
import {
  getAlternateLanguageLink,
  stripLocalePrefix,
  useTranslatedPath,
} from './utils';

describe('useTranslatedPath', () => {
  it('prefixes non-default locale paths', () => {
    const translate = useTranslatedPath('es');
    expect(translate('/about', 'es')).toBe('/es/about');
  });

  it('keeps default locale paths unprefixed when showDefaultLang is false', () => {
    const translate = useTranslatedPath('en');
    expect(translate('/about', 'en')).toBe('/about');
    expect(translate('/skills')).toBe('/skills');
  });

  it('uses the bound locale when none is passed', () => {
    const translate = useTranslatedPath('es');
    expect(translate('/contact')).toBe('/es/contact');
  });

  it('allows overriding the locale per call', () => {
    const translate = useTranslatedPath('es');
    expect(translate('/work', 'en')).toBe('/work');
    expect(translate('/work', 'es')).toBe('/es/work');
  });

  it('handles root paths', () => {
    const translate = useTranslatedPath('en');
    expect(translate('/', 'es')).toBe('/es/');
  });
});

describe('stripLocalePrefix', () => {
  it('removes a leading /es/ segment', () => {
    expect(stripLocalePrefix('/es/work/timeline')).toBe('/work/timeline');
  });

  it('removes a leading /en/ segment', () => {
    expect(stripLocalePrefix('/en/skills/frontend')).toBe('/skills/frontend');
  });

  it('leaves unprefixed paths unchanged', () => {
    expect(stripLocalePrefix('/work')).toBe('/work');
    expect(stripLocalePrefix('/')).toBe('/');
  });

  it('does not strip locale-like segments in the middle of a path', () => {
    expect(stripLocalePrefix('/blog/es/post')).toBe('/blog/es/post');
  });
});

describe('getAlternateLanguageLink', () => {
  it('links English pages to their Spanish equivalent', () => {
    expect(getAlternateLanguageLink('en', '/work/timeline')).toEqual({
      title: 'Español',
      href: '/es/work/timeline',
    });
  });

  it('links Spanish pages back to the unprefixed English path', () => {
    expect(getAlternateLanguageLink('es', '/work/timeline')).toEqual({
      title: 'English',
      href: '/work/timeline',
    });
  });

  it('preserves the root path when switching from English', () => {
    expect(getAlternateLanguageLink('en', '/')).toEqual({
      title: 'Español',
      href: '/es/',
    });
  });
});
