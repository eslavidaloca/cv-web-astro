import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores'

export const isDarkMode = persistentAtom<"dark" | "light">('isDarkMode', 'dark');

export const lectureListNanoStore = persistentAtom<string[]>('lectureList', []);
export const selectedGenresNanoStore = persistentAtom<string[]>('selectedGenres', []);
export const noPaginasSliderNanoStore = atom(1500);
export const isDraggingNanoStore = atom(false);
