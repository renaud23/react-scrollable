function resolve(scrollbar) {
  const { maxSize, start, cumulsSize, margin, size, max } = scrollbar;
  if (cumulsSize && cumulsSize.length && maxSize > size) {
    const percent = (cumulsSize[start] - margin) / (maxSize - size);
    return { ...scrollbar, scrollPercent: percent, scrollRequest: { percent } };
  }
  return { ...scrollbar, scrollPercent: 0, start: 0, nb: max, margin: 0 };
}

export default resolve;
