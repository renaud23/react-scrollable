function compute(scrollbar) {
  const { tPos, size, tSize } = scrollbar;
  const scrollPercent = tPos / (size - tSize);
  return { ...scrollbar, scrollPercent };
}
export default compute;
