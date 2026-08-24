import { describe, expect, it } from 'vitest';
import { type Book } from '@/interfaces/Book.ts';
import {
  extractBooksFromLibraryData,
  filterLibraryBooks,
  getUniqueGenres,
} from './library';

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

describe('extractBooksFromLibraryData', () => {
  it('maps library items to their book objects', () => {
    const fantasy = makeBook({ ISBN: '1', title: 'Fantasy Book', genre: 'Fantasy' });
    const sciFi = makeBook({ ISBN: '2', title: 'Sci-Fi Book', genre: 'Sci-Fi' });

    expect(extractBooksFromLibraryData([{ book: fantasy }, { book: sciFi }])).toEqual([
      fantasy,
      sciFi,
    ]);
  });

  it('returns an empty array for an empty library', () => {
    expect(extractBooksFromLibraryData([])).toEqual([]);
  });
});

describe('getUniqueGenres', () => {
  it('returns each genre once in first-seen order', () => {
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
    makeBook({ ISBN: '1', genre: 'Fiction', pages: 100 }),
    makeBook({ ISBN: '2', genre: 'Sci-Fi', pages: 400 }),
    makeBook({ ISBN: '3', genre: 'Fiction', pages: 800 }),
  ];

  it('excludes books already in the lecture list', () => {
    const lectureBooks = [books[0]];
    const { filteredBooks, lectureList } = filterLibraryBooks({
      books,
      lectureBooks,
      selectedGenres: [],
      maxPages: 1500,
    });

    expect(filteredBooks.map((b) => b.ISBN)).toEqual(['2', '3']);
    expect(lectureList.map((b) => b.ISBN)).toEqual(['1']);
  });

  it('filters by selected genres when any are selected', () => {
    const { filteredBooks } = filterLibraryBooks({
      books,
      lectureBooks: [],
      selectedGenres: ['Sci-Fi'],
      maxPages: 1500,
    });

    expect(filteredBooks.map((b) => b.ISBN)).toEqual(['2']);
  });

  it('includes all genres when no genre filter is selected', () => {
    const { filteredBooks } = filterLibraryBooks({
      books,
      lectureBooks: [],
      selectedGenres: [],
      maxPages: 1500,
    });

    expect(filteredBooks).toHaveLength(3);
  });

  it('filters by max page count', () => {
    const { filteredBooks } = filterLibraryBooks({
      books,
      lectureBooks: [],
      selectedGenres: [],
      maxPages: 300,
    });

    expect(filteredBooks.map((b) => b.ISBN)).toEqual(['1']);
  });

  it('includes books at exactly the max page count', () => {
    const atLimit = makeBook({ ISBN: 'at-limit', pages: 300 });
    const { filteredBooks } = filterLibraryBooks({
      books: [atLimit],
      lectureBooks: [],
      selectedGenres: [],
      maxPages: 300,
    });

    expect(filteredBooks).toEqual([atLimit]);
  });

  it('filters by multiple selected genres', () => {
    const { filteredBooks } = filterLibraryBooks({
      books,
      lectureBooks: [],
      selectedGenres: ['Fiction', 'Sci-Fi'],
      maxPages: 1500,
    });

    expect(filteredBooks.map((b) => b.ISBN)).toEqual(['1', '2', '3']);
  });

  it('applies genre, page, and lecture filters together', () => {
    const { filteredBooks, lectureList } = filterLibraryBooks({
      books,
      lectureBooks: [books[0]],
      selectedGenres: ['Fiction'],
      maxPages: 500,
    });

    expect(filteredBooks).toHaveLength(0);
    expect(lectureList.map((b) => b.ISBN)).toEqual(['1']);
  });
});
