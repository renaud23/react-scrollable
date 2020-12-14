function compute(scrollbar, delta) {
  if (delta !== 0) {
    const { trackPos, size, trackSize } = scrollbar;
    if (trackSize) {
      const disp = size - trackSize;
      const next = Math.min(Math.max(trackPos + delta, 0), disp);
      const percent = next / disp;
      return { ...scrollbar, trackPos: next, percent };
    }
  }
  return scrollbar;
}

export default compute;
