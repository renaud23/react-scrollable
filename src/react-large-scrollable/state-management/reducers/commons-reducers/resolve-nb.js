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

function compute(scrollbar, seuil) {
  const { cumulsSize, start, size } = scrollbar;
  if (cumulsSize) {
    const nb = count(cumulsSize, start, seuil + size);
    return { ...scrollbar, nb };
  }
  return scrollbar;
}

export default compute;
