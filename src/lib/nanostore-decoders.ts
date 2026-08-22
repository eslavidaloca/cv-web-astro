import { type Book } from '@/interfaces/Book.ts';

export function decodeLectureList(value: string): Book[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as Book[]) : [];
  } catch {
    return [];
  }
}
