function resolve(scrollbar) {
  const { maxSize, start, cumulsSize, margin, size, max } = scrollbar;
  if (cumulsSize && cumulsSize.length && maxSize > size) {
    const percent = Math.min(
      (cumulsSize[start] - margin) / (maxSize - size),
      1.0
    );

    return { ...scrollbar, scrollPercent: percent, scrollRequest: { percent } };
  }
  return { ...scrollbar, scrollPercent: 0, start: 0, nb: max, margin: 0 };
}

export default resolve;
