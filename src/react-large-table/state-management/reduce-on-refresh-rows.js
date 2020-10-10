import { resolveRefreshData } from "./commons-reducer.js";

function getHeight({ __height }) {
  return __height;
}

function reduce(state) {
  const { vertical, rows } = state;

  return {
    ...state,
    vertical: { ...vertical, ...resolveRefreshData(rows, getHeight) },
  };
}

export default reduce;
