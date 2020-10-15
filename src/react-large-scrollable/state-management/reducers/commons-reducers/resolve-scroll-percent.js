function resolve(scrollbar) {
  const { maxSize, start, cumulsSize, margin, size } = scrollbar;
  if (cumulsSize && cumulsSize.length) {
    const percent = (cumulsSize[start] - margin) / (maxSize - size);
    return { ...scrollbar, scrollPercent: percent, scrollRequest: { percent } };
  }
  return scrollbar;
}

export default resolve;
