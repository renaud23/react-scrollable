const TRACK_MIN_SIZE = 10;

function compute(scrollbar) {
  const { size, max, percent, refSize } = scrollbar;
  if (refSize < max) {
    const trackSize = Math.max((refSize / max) * size, TRACK_MIN_SIZE);
    const trackPos = percent * (size - trackSize);
    return { ...scrollbar, trackSize, trackPos };
  }
  return { ...scrollbar, trackSize: undefined, trackPos: undefined };
}

export default compute;
