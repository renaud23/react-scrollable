import { findCumulsSize, findInTreeSize } from "./compute-tree-size";

function resolve(scrollbar, seuil) {
  const { cumulsSize, treeSize, fixed, fixedValue } = scrollbar;
  if (fixed) {
    return { ...scrollbar, start: Math.trunc(seuil / fixedValue) };
  }

  if (cumulsSize) {
    if (treeSize) {
      return { ...scrollbar, start: findInTreeSize(treeSize, seuil) };
    }
    return { ...scrollbar, start: findCumulsSize(cumulsSize, seuil) };
  }
  return scrollbar;
}

export default resolve;
