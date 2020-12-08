function compute(scrollbar, delta) {
  if (delta !== 0) {
    const { trackPos, size, trackSize } = scrollbar;
    const max = size - trackSize;
    const next = Math.min(Math.max(trackPos + delta, 0), max);
    const percent = next / max;
    return { ...scrollbar, trackPos: next, percent };
  }
  return scrollbar;
}

export default compute;
