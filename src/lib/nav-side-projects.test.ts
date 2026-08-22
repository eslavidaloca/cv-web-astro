import { describe, expect, it } from 'vitest';
import { sideProjects } from '@/data/components/navbar-sideProjects';
import { type LinksGroup } from '@/interfaces/LinksGroup';
import { filterFeaturedSideProjects } from './nav-side-projects';

function makeProject(overrides: Partial<LinksGroup> = {}): LinksGroup {
  return {
    title: 'Project',
    href: '/side-projects/example',
    description: 'Example project',
    ...overrides,
  };
}

describe('filterFeaturedSideProjects', () => {
  it('removes the catch-all See more... entry', () => {
    const projects = [
      makeProject({ title: 'BlueXolo', href: '/side-projects/bluexolo' }),
      makeProject({ title: 'See more...', href: '/side-projects/' }),
    ];

    expect(filterFeaturedSideProjects(projects)).toEqual([projects[0]]);
  });

  it('keeps all projects when none are the catch-all entry', () => {
    const projects = [
      makeProject({ title: 'Mexflix' }),
      makeProject({ title: 'This CV' }),
    ];

    expect(filterFeaturedSideProjects(projects)).toEqual(projects);
  });

  it('returns an empty array for an empty input', () => {
    expect(filterFeaturedSideProjects([])).toEqual([]);
  });

  it('filters the production sideProjects list used by MobileNav', () => {
    const featured = filterFeaturedSideProjects(sideProjects);

    expect(featured).toHaveLength(sideProjects.length - 1);
    expect(featured.every((project) => project.title !== 'See more...')).toBe(true);
    expect(featured.some((project) => project.href === '/side-projects/library-store')).toBe(true);
  });
});
