import { resolveScrollbar } from "./commons-reducer.js";

function getHeight({ __height }) {
  return __height;
}

function reduce(state) {
  const { vertical, rows, viewportHeight } = state;
  return {
    ...state,
    vertical: resolveScrollbar(vertical, rows, viewportHeight, getHeight),
  };
}

export default reduce;
