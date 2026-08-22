import { type Book } from '@/interfaces/Book.ts';

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
  if (
    !input.pointerInsideDrawer &&
    input.releasedOutsideDrawer &&
    !input.isCatalogDrag
  ) {
    return 'remove';
  }
  return 'none';
}

/** Append a book unless its ISBN is already in the lecture list. */
export function addBookToLectureList(currentList: Book[], newBook: Book): Book[] {
  if (currentList.some((book) => book.ISBN === newBook.ISBN)) {
    return currentList;
  }
  return [...currentList, newBook];
}

/** Remove a book from the lecture list by ISBN. */
export function removeBookFromLectureList(currentList: Book[], book: Book): Book[] {
  return currentList.filter((entry) => entry.ISBN !== book.ISBN);
}
