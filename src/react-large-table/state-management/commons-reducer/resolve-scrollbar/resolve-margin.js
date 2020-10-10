function compute(scrollbar, seuil) {
  const { start, cumulsSize } = scrollbar;
  const margin = cumulsSize[start] - seuil;
  return { ...scrollbar, margin };
}

export default compute;
