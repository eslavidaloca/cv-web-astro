import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores'
import { type Book } from '@/interfaces/Book.ts';

export const isDarkMode = persistentAtom<"dark" | "light">('isDarkMode', 'dark');

export const lectureListNanoStore = persistentAtom<Book[]>(
    'lectureList',
    [],
    {
        encode: JSON.stringify,
        decode: (value) => {
            try {
                return JSON.parse(value) as Book[];
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
