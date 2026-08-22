import { describe, expect, it } from 'vitest';
import { useTranslatedPath } from './utils';

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
