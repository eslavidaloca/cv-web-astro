import { describe, expect, it } from 'vitest';
import { backendPageEn, backendPageEs } from './backend-page';
import { deployPageEn, deployPageEs } from './deploy-page';
import { frontendPageEn, frontendPageEs } from './frontend-page';

type SkillsSlug = 'backend' | 'frontend' | 'deploy';

const SKILLS_ROUTES = {
  en: {
    backend: '/skills/backend',
    frontend: '/skills/frontend',
    deploy: '/skills/deploy',
  },
  es: {
    backend: '/es/skills/backend',
    frontend: '/es/skills/frontend',
    deploy: '/es/skills/deploy',
  },
} as const satisfies Record<'en' | 'es', Record<SkillsSlug, string>>;

function ctaHrefs(page: { cta: { links: { href: string }[] } }): string[] {
  return page.cta.links.map((link) => link.href);
}

function expectSkillsCrossLinks(
  page: { cta: { links: { href: string }[] } },
  locale: keyof typeof SKILLS_ROUTES,
  self: SkillsSlug,
) {
  const hrefs = ctaHrefs(page);
  const expected = Object.entries(SKILLS_ROUTES[locale])
    .filter(([slug]) => slug !== self)
    .map(([, href]) => href);

  for (const href of expected) {
    expect(hrefs).toContain(href);
  }
}

describe('skills page CTA cross-links', () => {
  it('links backend EN to frontend and deploy', () => {
    expectSkillsCrossLinks(backendPageEn, 'en', 'backend');
  });

  it('links backend ES to frontend and deploy with locale prefix', () => {
    expectSkillsCrossLinks(backendPageEs, 'es', 'backend');
  });

  it('links frontend EN to backend and deploy', () => {
    expectSkillsCrossLinks(frontendPageEn, 'en', 'frontend');
  });

  it('links frontend ES to backend and deploy with locale prefix', () => {
    expectSkillsCrossLinks(frontendPageEs, 'es', 'frontend');
  });

  it('links deploy EN to backend and frontend', () => {
    expectSkillsCrossLinks(deployPageEn, 'en', 'deploy');
  });

  it('links deploy ES to backend and frontend with locale prefix', () => {
    expectSkillsCrossLinks(deployPageEs, 'es', 'deploy');
  });

  it('keeps LinkedIn on every skills page CTA', () => {
    const linkedIn = 'https://www.linkedin.com/in/eslavi/';
    for (const page of [
      backendPageEn,
      backendPageEs,
      frontendPageEn,
      frontendPageEs,
      deployPageEn,
      deployPageEs,
    ]) {
      expect(ctaHrefs(page)).toContain(linkedIn);
    }
  });
});
