import { describe, expect, it } from 'vitest';
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
});
