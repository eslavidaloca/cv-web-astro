import { type Book } from '@/interfaces/Book.ts';

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
