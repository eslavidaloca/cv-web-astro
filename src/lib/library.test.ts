import { describe, expect, it } from 'vitest';
import { type Book } from '@/interfaces/Book.ts';
import { filterLibraryBooks } from './library';

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

  it('filters by max page count', () => {
    const { filteredBooks } = filterLibraryBooks({
      books,
      lectureBooks: [],
      selectedGenres: [],
      maxPages: 300,
    });

    expect(filteredBooks.map((b) => b.ISBN)).toEqual(['1']);
  });

  it('applies genre, page, and lecture filters together', () => {
    const { filteredBooks } = filterLibraryBooks({
      books,
      lectureBooks: [books[0]],
      selectedGenres: ['Fiction'],
      maxPages: 500,
    });

    expect(filteredBooks).toHaveLength(0);
  });
});
