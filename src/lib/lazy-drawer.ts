/** Drawer should only auto-open when the user drags a book or explicitly opens it — not on silent preload. */
export function shouldOpenDrawerOnMount(
  isDragging: boolean,
  userRequestedOpen: boolean,
): boolean {
  return isDragging || userRequestedOpen;
}
