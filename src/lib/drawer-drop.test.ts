import { describe, expect, it } from 'vitest';
import { type Book } from '@/interfaces/Book.ts';
import {
  addBookToLectureList,
  removeBookFromLectureList,
  resolveLectureListDropAction,
} from './drawer-drop';

function makeBook(overrides: Partial<Book> = {}): Book {
  return {
    title: 'Test Book',
    pages: 200,
    genre: 'Fiction',
    cover: '/cover.jpg',
    synopsis: 'A synopsis',
    year: 2020,
    ISBN: '978-0000000000',
    author: { name: 'Author', otherBooks: [] },
    ...overrides,
  };
}

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

  it('does not remove when a catalog drag misses the drawer', () => {
    expect(
      resolveLectureListDropAction({
        hasDraggedBook: true,
        isCatalogDrag: true,
        pointerInsideDrawer: false,
        releasedOutsideDrawer: true,
      }),
    ).toBe('none');
  });

  it('does not add when an in-drawer book is dropped back inside', () => {
    expect(
      resolveLectureListDropAction({
        hasDraggedBook: true,
        isCatalogDrag: false,
        pointerInsideDrawer: true,
        releasedOutsideDrawer: false,
      }),
    ).toBe('none');
  });
});

describe('addBookToLectureList', () => {
  it('appends a book when the ISBN is not already present', () => {
    const existing = makeBook({ ISBN: '1', title: 'Existing' });
    const incoming = makeBook({ ISBN: '2', title: 'Incoming' });

    expect(addBookToLectureList([existing], incoming)).toEqual([existing, incoming]);
  });

  it('returns the same list reference when the ISBN already exists', () => {
    const existing = makeBook({ ISBN: '1', title: 'Existing' });
    const duplicate = makeBook({ ISBN: '1', title: 'Duplicate title' });
    const books = [existing];

    const result = addBookToLectureList(books, duplicate);

    expect(result).toBe(books);
    expect(result).toHaveLength(1);
  });
});

describe('removeBookFromLectureList', () => {
  it('removes the dragged book by ISBN', () => {
    const keep = makeBook({ ISBN: '1', title: 'Keep' });
    const remove = makeBook({ ISBN: '2', title: 'Remove' });

    expect(removeBookFromLectureList([keep, remove], remove)).toEqual([keep]);
  });

  it('returns an unchanged list when the ISBN is not present', () => {
    const books = [makeBook({ ISBN: '1' })];
    const missing = makeBook({ ISBN: 'missing' });

    expect(removeBookFromLectureList(books, missing)).toEqual(books);
  });
});
