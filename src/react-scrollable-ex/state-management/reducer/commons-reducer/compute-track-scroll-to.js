function compute(scrollbar, trackPos) {
  const { size, trackSize } = scrollbar;
  if (trackSize !== undefined) {
    const max = size - trackSize;
    const next = Math.min(Math.max(trackPos, 0), max);
    const percent = next / max;
    return { ...scrollbar, trackPos: next, percent };
  }
  return { ...scrollbar, trackPos: undefined, percent: 0 };
}

export default compute;
