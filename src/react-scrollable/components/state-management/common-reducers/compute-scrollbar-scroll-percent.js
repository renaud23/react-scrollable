function compute(scrollbar) {
  const { tPos, size, tSize } = scrollbar;
  if (tSize < size) {
    const scrollPercent = tPos / (size - tSize);
    return { ...scrollbar, scrollPercent };
  }
  return { ...scrollbar, scrollPercent: 1.0 };
}
export default compute;
