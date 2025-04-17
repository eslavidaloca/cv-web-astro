// import { persistentAtom } from '@nanostores/persistent';
// import { atom } from 'nanostores'

// import type { Book } from '@/interfaces/Book';
// export const isDarkMode = persistentAtom<"dark" | "light">('isDarkMode', 'dark');


// // export const allBooksNanoStore = atom<Book[]>([]);
// export const selectedGenresNanoStore = persistentAtom<string>('selectedGenres', JSON.stringify([]));
// export const lectureListNanoStore = persistentAtom<string>('lectureList', JSON.stringify([]));

// // Helper functions to get and set the value as Book[]
// export const getLectureList = (): Book[] => JSON.parse(lectureListNanoStore.get());
// export const setLectureList = (books: Book[]): void => lectureListNanoStore.set(JSON.stringify(books));


// export const noPaginasSliderNanoStore = atom(1500);

import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores'

export const isDarkMode = persistentAtom<"dark" | "light">('isDarkMode', 'dark');

export const lectureListNanoStore = persistentAtom<string[]>('lectureList', []);
export const selectedGenresNanoStore = persistentAtom<string[]>('selectedGenres', []);
export const noPaginasSliderNanoStore = atom(1500);
