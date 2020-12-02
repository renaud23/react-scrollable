const TRACK_MIN_SIZE = 10;

function compute(scrollbar) {
  const { size, max, percent } = scrollbar;
  if (size < max) {
    const trackSize = Math.max((size / max) * size, TRACK_MIN_SIZE);
    const trackPos = percent * (size - trackSize);
    return { ...scrollbar, trackSize, trackPos };
  }
  return { ...scrollbar, trackSize: undefined, trackPos: undefined };
}

export default compute;
