import { describe, expect, it } from 'vitest';
import { decodeLectureList } from './nanostore-decoders';

describe('decodeLectureList', () => {
  it('parses a valid lecture list JSON array', () => {
    const books = [{ ISBN: '1', title: 'Book' }];
    expect(decodeLectureList(JSON.stringify(books))).toEqual(books);
  });

  it('returns an empty array for invalid JSON', () => {
    expect(decodeLectureList('not-json')).toEqual([]);
  });

  it('returns an empty array when JSON is not an array', () => {
    expect(decodeLectureList('{"ISBN":"1"}')).toEqual([]);
  });

  it('returns an empty array for an empty string', () => {
    expect(decodeLectureList('')).toEqual([]);
  });
});
