import { type Book } from '@/interfaces/Book.ts';

export function decodeLectureList(value: string): Book[] {
  try {
    return JSON.parse(value) as Book[];
  } catch {
    return [];
  }
}
