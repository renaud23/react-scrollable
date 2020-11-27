const TRACK_MIN_SIZE = 10;

function compute(scrollbar) {
  const { size, max } = scrollbar;
  if (size < max) {
    const trackSize = Math.max((size / max) * size, TRACK_MIN_SIZE);
    return { ...scrollbar, trackSize };
  }
  return scrollbar;
}

export default compute;
