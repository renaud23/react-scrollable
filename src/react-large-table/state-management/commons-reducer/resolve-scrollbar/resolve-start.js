import { findCumulsSize, findInTreeSize } from "../compute-tree-size";

function resolve(scrollbar, seuil) {
  const { cumulsSize, treeSize } = scrollbar;
  if (treeSize) {
    return { ...scrollbar, start: findInTreeSize(treeSize, seuil) };
  }
  return { ...scrollbar, start: findCumulsSize(cumulsSize, seuil) };
}

export default resolve;
