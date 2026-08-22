import { describe, expect, it } from 'vitest';
import { decodeLectureList } from '@/lib/nanostore-decoders';
import type { Book } from '@/interfaces/Book';

const sampleBook: Book = {
	title: 'Sample Book',
	pages: 100,
	genre: 'Fantasy',
	cover: '/sample.jpg',
	synopsis: 'A sample synopsis',
	year: 2020,
	ISBN: '978-0000000099',
	author: { name: 'Sample Author', otherBooks: [] },
};

describe('decodeLectureList', () => {
	it('parses a valid JSON lecture list', () => {
		const value = JSON.stringify([sampleBook]);

		expect(decodeLectureList(value)).toEqual([sampleBook]);
	});

	it('returns an empty array for invalid JSON', () => {
		expect(decodeLectureList('not-json')).toEqual([]);
	});

	it('returns an empty array for an empty string', () => {
		expect(decodeLectureList('')).toEqual([]);
	});
});
