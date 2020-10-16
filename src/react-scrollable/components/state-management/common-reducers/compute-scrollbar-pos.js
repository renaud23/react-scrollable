function computeScrollbarPos(scrollbar) {
  const { size, tSize, scrollPercent } = scrollbar;
  const tPos = Math.max(
    Math.min(scrollPercent * (size - tSize), size - tSize),
    0
  );
  return { ...scrollbar, tPos };
}

export default computeScrollbarPos;
