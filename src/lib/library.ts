import { type Book } from '@/interfaces/Book.ts';

export interface LibraryDataItem {
  book: Book;
}

export interface LibraryFilterInput {
  books: Book[];
  lectureBooks: Book[];
  selectedGenres: string[];
  maxPages: number;
}

export interface LibraryFilterResult {
  filteredBooks: Book[];
  lectureList: Book[];
}

/** Unwrap `{ book }` library payload items into `Book` objects. */
export function extractBooksFromLibraryData(library: LibraryDataItem[]): Book[] {
  return library.map((item) => item.book);
}

/** Deduplicate genres while preserving first-seen order. */
export function getUniqueGenres(books: Book[]): string[] {
  return books.reduce((uniqueGenre: string[], item) => {
    if (!uniqueGenre.includes(item.genre)) {
      uniqueGenre.push(item.genre);
    }
    return uniqueGenre;
  }, []);
}

/**
 * Filter catalog books by lecture-list membership, genre, and max page count.
 * Uses a Set for ISBN lookups (from PR #16) while exposing the same semantics
 * as the original Library.svelte filters (PRs #11/#14/#15).
 */
export function filterLibraryBooks({
  books,
  lectureBooks,
  selectedGenres,
  maxPages,
}: LibraryFilterInput): LibraryFilterResult {
  const lectureIsbns = new Set(lectureBooks.map((book) => book.ISBN));
  const genreFilterActive = selectedGenres.length > 0;

  const filteredBooks = books.filter(
    (book) =>
      !lectureIsbns.has(book.ISBN) &&
      (!genreFilterActive || selectedGenres.includes(book.genre)) &&
      book.pages <= maxPages,
  );

  const lectureList = books.filter((book) => lectureIsbns.has(book.ISBN));

  return { filteredBooks, lectureList };
}
