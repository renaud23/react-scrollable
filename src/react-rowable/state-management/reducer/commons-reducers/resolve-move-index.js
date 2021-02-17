function resolve(scrollbar, index) {
  const { size, maxSize, cumulsSize, max } = scrollbar;
  if (index >= 0 && index < max) {
    const percent = cumulsSize[index] / (maxSize - size);
    return { ...scrollbar, start: index, scrollRequest: { percent } };
  }
  return scrollbar;
}

export default resolve;
