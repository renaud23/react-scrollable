function getScroll(start, scrollbar) {
  const { margin, maxSize, size } = scrollbar;
  return Math.min((start - margin) / (maxSize - size), 1.0);
}

function resolve(scrollbar) {
  const {
    maxSize,
    start,
    cumulsSize,
    size,
    max,
    fixed,
    fixedValue,
  } = scrollbar;

  if (fixed && maxSize > size) {
    const percent = getScroll(start * fixedValue, scrollbar);
    return { ...scrollbar, scrollPercent: percent, scrollRequest: { percent } };
  }
  if (cumulsSize && cumulsSize.length && maxSize > size) {
    const percent = getScroll(cumulsSize[start], scrollbar);
    return { ...scrollbar, scrollPercent: percent, scrollRequest: { percent } };
  }
  return { ...scrollbar, scrollPercent: 0, start: 0, nb: max, margin: 0 };
}

export default resolve;
