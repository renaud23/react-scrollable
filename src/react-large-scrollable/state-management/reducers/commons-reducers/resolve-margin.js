function compute(scrollbar, seuil) {
  const { start, cumulsSize, size, maxSize, fixed, fixedValue } = scrollbar;

  if (fixed) {
    const margin = -(seuil % fixedValue);
    return { ...scrollbar, margin };
  }

  if (cumulsSize && size < maxSize) {
    const margin = cumulsSize[start] - seuil;
    return { ...scrollbar, margin };
  }
  return { ...scrollbar, margin: 0 };
}

export default compute;
