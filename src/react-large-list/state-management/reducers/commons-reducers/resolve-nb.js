function count(cumTab, index, max) {
  if (index < cumTab.length - 1) {
    const start = cumTab[index];
    if (start < max) {
      return 1 + count(cumTab, index + 1, max);
    }
  }
  return 0;
}

function compute(scrollbar, seuil) {
  const { cumulsSize, start, size } = scrollbar;
  if (cumulsSize) {
    const nb = count(cumulsSize, start, seuil + size);
    return { ...scrollbar, nb };
  }
  return scrollbar;
}

export default compute;
