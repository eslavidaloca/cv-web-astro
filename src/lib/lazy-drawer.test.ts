import { describe, expect, it } from 'vitest';
import { shouldOpenDrawerOnMount } from './lazy-drawer';

describe('shouldOpenDrawerOnMount', () => {
  it('does not open on silent preload (no drag, no user click)', () => {
    expect(shouldOpenDrawerOnMount(false, false)).toBe(false);
  });

  it('opens when the user starts dragging a book', () => {
    expect(shouldOpenDrawerOnMount(true, false)).toBe(true);
  });

  it('opens when the user explicitly clicks the drawer trigger', () => {
    expect(shouldOpenDrawerOnMount(false, true)).toBe(true);
  });
});
