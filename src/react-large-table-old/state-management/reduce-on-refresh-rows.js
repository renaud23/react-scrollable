import { resolveRefreshData } from "./commons-reducer";

function getHeight({ __height }) {
  return __height;
}

function reduce(state) {
  const { vertical, rows, treeSize } = state;
  const max = rows.length;
  return {
    ...state,
    vertical: {
      ...vertical,
      max,
      ...resolveRefreshData(rows, getHeight, treeSize),
    },
  };
}

export default reduce;
