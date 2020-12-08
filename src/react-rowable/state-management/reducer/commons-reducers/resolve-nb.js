function count(cumTab, index, max) {
  if (index < cumTab.length - 1) {
    let how = 1;
    while (how + index < cumTab.length - 1 && cumTab[how + index] < max) {
      how++;
    }
    return how;
  }
  return 0;
}

function countFixed(scrollbar, seuil) {
  const { fixedValue, start, size } = scrollbar;
  return Math.ceil((seuil + size) / fixedValue) - start;
}

function compute(scrollbar, seuil) {
  const { cumulsSize, start, size, fixed } = scrollbar;
  if (fixed) {
    const nb = countFixed(scrollbar, seuil);
    return { ...scrollbar, nb };
  }
  if (cumulsSize) {
    const nb = count(cumulsSize, start, seuil + size);
    return { ...scrollbar, nb };
  }
  return scrollbar;
}

export default compute;
