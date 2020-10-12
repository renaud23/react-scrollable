import { resolveRefreshData } from "./commons-reducer";

function getWidth({ width }) {
  return width;
}

function reduce(state) {
  const { horizontal, header, treeSize } = state;
  const max = header.length;

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
