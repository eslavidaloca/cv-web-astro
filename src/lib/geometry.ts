export interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** Whether a pointer position lies inside a bounding rectangle (drawer drop target). */
export function isPointInsideRect(
  clientX: number,
  clientY: number,
  rect: Rect,
): boolean {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}
