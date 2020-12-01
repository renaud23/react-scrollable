function compute(scrollbar, percent) {
  const { size, trackSize } = scrollbar;
  const trackPos = Math.max(
    Math.min(percent * (size - trackSize), size - trackSize),
    0
  );
  return { ...scrollbar, trackPos, percent: Math.max(Math.min(percent, 1), 0) };
}

export default compute;
