import { type LinksGroup } from '@/interfaces/LinksGroup';

const SEE_MORE_TITLE = 'See more...';

/** Exclude the catch-all "See more..." entry from mobile nav project links. */
export function filterFeaturedSideProjects(projects: LinksGroup[]): LinksGroup[] {
  return projects.filter((project) => project.title !== SEE_MORE_TITLE);
}
