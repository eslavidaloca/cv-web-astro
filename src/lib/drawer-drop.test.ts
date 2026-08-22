import { describe, expect, it } from 'vitest';
import { resolveLectureListDropAction } from './drawer-drop';

describe('resolveLectureListDropAction', () => {
  it('adds when a catalog drag ends inside the drawer', () => {
    expect(
      resolveLectureListDropAction({
        hasDraggedBook: true,
        isCatalogDrag: true,
        pointerInsideDrawer: true,
        releasedOutsideDrawer: false,
      }),
    ).toBe('add');
  });

  it('removes when an in-drawer book is released outside the drawer', () => {
    expect(
      resolveLectureListDropAction({
        hasDraggedBook: true,
        isCatalogDrag: false,
        pointerInsideDrawer: false,
        releasedOutsideDrawer: true,
      }),
    ).toBe('remove');
  });

  it('does nothing when no book is being dragged', () => {
    expect(
      resolveLectureListDropAction({
        hasDraggedBook: false,
        isCatalogDrag: true,
        pointerInsideDrawer: true,
        releasedOutsideDrawer: false,
      }),
    ).toBe('none');
  });

  it('does not remove on a later click after release (releasedOutside cleared)', () => {
    expect(
      resolveLectureListDropAction({
        hasDraggedBook: true,
        isCatalogDrag: false,
        pointerInsideDrawer: false,
        releasedOutsideDrawer: false,
      }),
    ).toBe('none');
  });
});
