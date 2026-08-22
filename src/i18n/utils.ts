import { ui, defaultLang, showDefaultLang } from './ui';

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
}

/** Strip a leading `/en` or `/es` locale segment from a pathname. */
export function stripLocalePrefix(pathname: string): string {
    const stripped = pathname.replace(/^\/(en|es)(?=\/|$)/, '');
    return stripped === '' ? '/' : stripped;
}

export interface AlternateLanguageLink {
    title: string;
    href: string;
}

/** Build the alternate-locale link used by mobile and desktop nav language toggles. */
export function getAlternateLanguageLink(
    lang: string,
    currentPath: string,
): AlternateLanguageLink {
    if (lang === 'en') {
        return { title: 'Español', href: `/es${currentPath}` };
    }
    return { title: 'English', href: currentPath };
}