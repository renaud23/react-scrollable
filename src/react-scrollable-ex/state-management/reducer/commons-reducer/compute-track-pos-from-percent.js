function compute(scrollbar, percent) {
  const { size, trackSize } = scrollbar;
  const trackPos = percent * (size - trackSize);
  return { ...scrollbar, trackPos };
}

export default compute;
