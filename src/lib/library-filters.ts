import { type Book } from '@/interfaces/Book.ts';

export function getUniqueGenres(books: Book[]): string[] {
  return books.reduce((uniqueGenre: string[], item) => {
    if (!uniqueGenre.includes(item.genre)) {
      uniqueGenre.push(item.genre);
    }
    return uniqueGenre;
  }, []);
}

export function filterLibraryBooks(
  books: Book[],
  lectureBooks: Book[],
  selectedGenres: string[],
  maxPages: number,
): { filteredBooks: Book[]; lectureList: Book[] } {
  const filteredBooks = books
    .filter((book) => !lectureBooks.some((item) => item.ISBN === book.ISBN))
    .filter(
      (book) =>
        selectedGenres.length === 0 || selectedGenres.includes(book.genre),
    )
    .filter((book) => book.pages <= maxPages);

  const lectureList = books.filter((book) =>
    lectureBooks.some((item) => item.ISBN === book.ISBN),
  );

  return { filteredBooks, lectureList };
}
