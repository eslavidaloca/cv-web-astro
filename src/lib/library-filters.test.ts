import { describe, expect, it } from 'vitest';
import { type Book } from '@/interfaces/Book.ts';
import { decodeLectureList } from './decode-lecture-list';
import { filterLibraryBooks, getUniqueGenres } from './library-filters';

const makeBook = (overrides: Partial<Book> = {}): Book => ({
  title: 'Test Book',
  pages: 300,
  genre: 'Fiction',
  cover: '/cover.jpg',
  synopsis: 'A synopsis',
  year: 2020,
  ISBN: '978-0000000000',
  author: { name: 'Author', otherBooks: [] },
  ...overrides,
});

describe('decodeLectureList', () => {
  it('parses valid JSON lecture lists', () => {
    const books = [makeBook({ ISBN: '978-1111111111' })];
    expect(decodeLectureList(JSON.stringify(books))).toEqual(books);
  });

  it('returns an empty array for invalid JSON', () => {
    expect(decodeLectureList('not-json')).toEqual([]);
  });

  it('returns an empty array for empty strings', () => {
    expect(decodeLectureList('')).toEqual([]);
  });
});

describe('getUniqueGenres', () => {
  it('returns each genre once', () => {
    const books = [
      makeBook({ genre: 'Fiction', ISBN: '1' }),
      makeBook({ genre: 'Fiction', ISBN: '2' }),
      makeBook({ genre: 'Sci-Fi', ISBN: '3' }),
    ];

    expect(getUniqueGenres(books)).toEqual(['Fiction', 'Sci-Fi']);
  });

  it('returns an empty array when there are no books', () => {
    expect(getUniqueGenres([])).toEqual([]);
  });
});

describe('filterLibraryBooks', () => {
  const books = [
    makeBook({ ISBN: '1', genre: 'Fiction', pages: 200, title: 'A' }),
    makeBook({ ISBN: '2', genre: 'Sci-Fi', pages: 400, title: 'B' }),
    makeBook({ ISBN: '3', genre: 'Fiction', pages: 800, title: 'C' }),
  ];

  it('excludes books already in the lecture list', () => {
    const lectureBooks = [makeBook({ ISBN: '2' })];
    const { filteredBooks, lectureList } = filterLibraryBooks(
      books,
      lectureBooks,
      [],
      1500,
    );

    expect(filteredBooks.map((book) => book.ISBN)).toEqual(['1', '3']);
    expect(lectureList.map((book) => book.ISBN)).toEqual(['2']);
  });

  it('filters by selected genres when any are selected', () => {
    const { filteredBooks } = filterLibraryBooks(books, [], ['Sci-Fi'], 1500);
    expect(filteredBooks.map((book) => book.ISBN)).toEqual(['2']);
  });

  it('includes all genres when none are selected', () => {
    const { filteredBooks } = filterLibraryBooks(books, [], [], 1500);
    expect(filteredBooks).toHaveLength(3);
  });

  it('filters by maximum page count', () => {
    const { filteredBooks } = filterLibraryBooks(books, [], [], 500);
    expect(filteredBooks.map((book) => book.ISBN)).toEqual(['1', '2']);
  });

  it('applies lecture, genre, and page filters together', () => {
    const lectureBooks = [makeBook({ ISBN: '1' })];
    const { filteredBooks, lectureList } = filterLibraryBooks(
      books,
      lectureBooks,
      ['Fiction'],
      500,
    );

    expect(filteredBooks).toHaveLength(0);
    expect(lectureList.map((book) => book.ISBN)).toEqual(['1']);
  });
});
