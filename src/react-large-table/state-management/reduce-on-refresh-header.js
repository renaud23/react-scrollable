import {
  resolveRefreshData,
  resolveScrollPercent,
  computeSeuil,
  resolveNb,
} from "./commons-reducer";

function getWidth({ width }) {
  return width;
}

function reduce(state) {
  const { horizontal, header, treeSize } = state;
  const { start } = horizontal;
  const max = header.length;
  if (start !== undefined) {
    const next = resolveScrollPercent({
      ...horizontal,
      max,
      ...resolveRefreshData(header, getWidth, treeSize),
    });
    const seuil = computeSeuil(next);
    return {
      ...state,
      horizontal: resolveNb(next, seuil),
    };
  }

  return {
    ...state,
    horizontal: {
      ...horizontal,
      max,
      ...resolveRefreshData(header, getWidth, treeSize),
    },
  };
}

export default reduce;
