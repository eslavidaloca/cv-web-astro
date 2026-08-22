import { describe, expect, it } from 'vitest';
import { isPointInsideRect } from './geometry';

describe('isPointInsideRect', () => {
  const drawer = { left: 100, right: 300, top: 50, bottom: 250 };

  it('returns true when the pointer is inside the drawer bounds', () => {
    expect(isPointInsideRect(200, 150, drawer)).toBe(true);
  });

  it('returns true on the drawer edges (inclusive)', () => {
    expect(isPointInsideRect(100, 50, drawer)).toBe(true);
    expect(isPointInsideRect(300, 250, drawer)).toBe(true);
  });

  it('returns false when the pointer is outside the drawer', () => {
    expect(isPointInsideRect(50, 150, drawer)).toBe(false);
    expect(isPointInsideRect(200, 300, drawer)).toBe(false);
  });

  it('uses neodrag event coordinates instead of relying on window.event', () => {
    // Regression: window.event is undefined in many browsers during onDragEnd.
    const dropInside = { clientX: 180, clientY: 120 };
    const dropOutside = { clientX: 10, clientY: 10 };

    expect(isPointInsideRect(dropInside.clientX, dropInside.clientY, drawer)).toBe(true);
    expect(isPointInsideRect(dropOutside.clientX, dropOutside.clientY, drawer)).toBe(false);
  });
});
