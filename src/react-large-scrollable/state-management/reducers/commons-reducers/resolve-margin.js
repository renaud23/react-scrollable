function compute(scrollbar, seuil) {
  const { start, cumulsSize, size, maxSize } = scrollbar;
  if (cumulsSize && size < maxSize) {
    const margin = cumulsSize[start] - seuil;
    return { ...scrollbar, margin };
  }
  return { ...scrollbar, margin: 0 };
}

export default compute;
