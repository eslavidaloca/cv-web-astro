export type LectureListDropAction = 'add' | 'remove' | 'none';

export interface LectureListDropInput {
  hasDraggedBook: boolean;
  /** Drag started from the catalog (CardImage), not from an in-drawer book. */
  isCatalogDrag: boolean;
  pointerInsideDrawer: boolean;
  /** In-drawer book was released outside the drawer drop zone. */
  releasedOutsideDrawer: boolean;
}

/** Resolve add vs remove for the lecture-list drawer drop gesture. */
export function resolveLectureListDropAction(
  input: LectureListDropInput,
): LectureListDropAction {
  if (!input.hasDraggedBook) return 'none';
  if (input.pointerInsideDrawer && input.isCatalogDrag) return 'add';
  if (!input.pointerInsideDrawer && input.releasedOutsideDrawer) return 'remove';
  return 'none';
}
