import { describe, expect, it } from 'vitest';
import { useTranslatedPath } from './utils';

describe('useTranslatedPath', () => {
  it('returns the path unchanged for the default language when showDefaultLang is false', () => {
    const translatePath = useTranslatedPath('en');
    expect(translatePath('/skills')).toBe('/skills');
  });

  it('prefixes non-default locales', () => {
    const translatePath = useTranslatedPath('en');
    expect(translatePath('/skills', 'es')).toBe('/es/skills');
  });

  it('allows overriding the locale per call', () => {
    const translatePath = useTranslatedPath('es');
    expect(translatePath('/work', 'en')).toBe('/work');
    expect(translatePath('/work', 'es')).toBe('/es/work');
  });

  it('handles root paths', () => {
    const translatePath = useTranslatedPath('en');
    expect(translatePath('/', 'es')).toBe('/es/');
  });
});
