function compute(scrollbar, trackPos) {
  const { size, trackSize } = scrollbar;
  const max = size - trackSize;
  const next = Math.min(Math.max(trackPos, 0), max);
  const percent = next / max;
  return { ...scrollbar, trackPos: next, percent };
}

export default compute;
