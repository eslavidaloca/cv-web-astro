import { describe, expect, it } from 'vitest';
import type { Book } from '@/interfaces/Book';
import {
	extractBooksFromLibraryData,
	filterLibraryBooks,
	getUniqueGenres,
} from '@/lib/library';

const fantasyBook: Book = {
	title: 'Fantasy Book',
	pages: 300,
	genre: 'Fantasy',
	cover: '/fantasy.jpg',
	synopsis: 'A fantasy story',
	year: 2000,
	ISBN: '978-0000000001',
	author: { name: 'Author A', otherBooks: [] },
};

const sciFiBook: Book = {
	title: 'Sci-Fi Book',
	pages: 500,
	genre: 'Sci-Fi',
	cover: '/scifi.jpg',
	synopsis: 'A sci-fi story',
	year: 2010,
	ISBN: '978-0000000002',
	author: { name: 'Author B', otherBooks: [] },
};

const longFantasyBook: Book = {
	...fantasyBook,
	title: 'Long Fantasy Book',
	pages: 2000,
	ISBN: '978-0000000003',
};

describe('extractBooksFromLibraryData', () => {
	it('maps library items to their book objects', () => {
		const library = [{ book: fantasyBook }, { book: sciFiBook }];

		expect(extractBooksFromLibraryData(library)).toEqual([
			fantasyBook,
			sciFiBook,
		]);
	});

	it('returns an empty array for an empty library', () => {
		expect(extractBooksFromLibraryData([])).toEqual([]);
	});
});

describe('getUniqueGenres', () => {
	it('returns each genre once', () => {
		const books = [fantasyBook, sciFiBook, longFantasyBook];

		expect(getUniqueGenres(books)).toEqual(['Fantasy', 'Sci-Fi']);
	});

	it('returns an empty array when there are no books', () => {
		expect(getUniqueGenres([])).toEqual([]);
	});
});

describe('filterLibraryBooks', () => {
	const books = [fantasyBook, sciFiBook, longFantasyBook];

	it('excludes books already in the lecture list', () => {
		const result = filterLibraryBooks(books, {
			lectureBooks: [fantasyBook],
			selectedGenres: [],
			maxPages: 3000,
		});

		expect(result.filteredBooks).toEqual([sciFiBook, longFantasyBook]);
		expect(result.lectureList).toEqual([fantasyBook]);
	});

	it('filters by selected genres when any are selected', () => {
		const result = filterLibraryBooks(books, {
			lectureBooks: [],
			selectedGenres: ['Sci-Fi'],
			maxPages: 3000,
		});

		expect(result.filteredBooks).toEqual([sciFiBook]);
		expect(result.lectureList).toEqual([]);
	});

	it('includes all genres when no genre filter is selected', () => {
		const result = filterLibraryBooks(books, {
			lectureBooks: [],
			selectedGenres: [],
			maxPages: 3000,
		});

		expect(result.filteredBooks).toEqual(books);
	});

	it('filters out books above the max page count', () => {
		const result = filterLibraryBooks(books, {
			lectureBooks: [],
			selectedGenres: [],
			maxPages: 400,
		});

		expect(result.filteredBooks).toEqual([fantasyBook]);
	});

	it('applies lecture, genre, and page filters together', () => {
		const result = filterLibraryBooks(books, {
			lectureBooks: [sciFiBook],
			selectedGenres: ['Fantasy'],
			maxPages: 1500,
		});

		expect(result.filteredBooks).toEqual([fantasyBook]);
		expect(result.lectureList).toEqual([sciFiBook]);
	});
});
