function resolve(scrollbar) {
  const { maxSize, start, cumulsSize, margin, size } = scrollbar;
  const percent = (cumulsSize[start] - margin) / (maxSize - size);
  return { ...scrollbar, scrollPercent: percent, scrollRequest: { percent } };
}

export default resolve;
