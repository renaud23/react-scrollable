import { resolveRefreshData } from "./commons-reducer.js";

function getWidth({ width }) {
  return width;
}

function reduce(state) {
  const { horizontal, header, treeSize } = state;

  return {
    ...state,
    horizontal: {
      ...horizontal,
      ...resolveRefreshData(header, getWidth, treeSize),
    },
  };
}

export default reduce;
