import { describe, expect, it } from 'vitest';
import { useTranslatedPath } from '@/i18n/utils';

describe('useTranslatedPath', () => {
	it('prefixes non-default locales', () => {
		const translatePath = useTranslatedPath('en');

		expect(translatePath('/skills', 'es')).toBe('/es/skills');
	});

	it('prefixes the configured locale when no override is provided', () => {
		const translatePath = useTranslatedPath('es');

		expect(translatePath('/skills')).toBe('/es/skills');
	});

	it('keeps default-locale paths unprefixed when showDefaultLang is false', () => {
		const translatePath = useTranslatedPath('en');

		expect(translatePath('/skills', 'en')).toBe('/skills');
		expect(translatePath('/skills')).toBe('/skills');
	});
});
