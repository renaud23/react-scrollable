import countSize from "./count-size";
import { findCumulsSize } from "./compute-tree-size";

function resolve(scrollbar, data, viewportSize, getSize) {
  const { scrollPercent, maxSize, cumulsSize } = scrollbar;
  if (maxSize && viewportSize) {
    const seuil = scrollPercent * (maxSize - viewportSize);
    const start = findCumulsSize(cumulsSize, seuil);
    const margin = cumulsSize[start] - seuil;
    const nb = countSize(cumulsSize, start, seuil + viewportSize);
    return { ...scrollbar, start, margin, nb };
  }

  return scrollbar;
}

export default resolve;
