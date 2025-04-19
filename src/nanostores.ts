import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores'
import { type Book } from '@/interfaces/Book.ts';

export const isDarkMode = persistentAtom<"dark" | "light">('isDarkMode', 'dark');

export const lectureListNanoStore = persistentAtom<string[]>(
    'lectureList',
    [],
    {
    encode: JSON.stringify,
    decode: (value) => {
        try {
            const parsed = JSON.parse(value);
            // Aseguramos que sea array de strings
            if (Array.isArray(parsed) && parsed.every((v) => typeof v === 'string')) {
            return parsed;
            }
            return [];
        } catch {
            return [];
        }
    }
}
);
export const selectedGenresNanoStore = persistentAtom<string[]>('selectedGenres', []);
export const noPaginasSliderNanoStore = atom(1500);
export const isDraggingNanoStore = atom(false);
export const draggingBookNanoStore = atom<Book | null>(null);
