import { persistentAtom } from '@nanostores/persistent';

export const isDarkMode = persistentAtom<"dark" | "light">('isDarkMode', 'dark');