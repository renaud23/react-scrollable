import { resolveScrollbar } from "./commons-reducer";

function getHeight({ __height }) {
  return __height;
}

function reduce(state) {
  const { vertical, rows, viewportHeight, headerHeight } = state;
  return {
    ...state,
    vertical: resolveScrollbar(
      vertical,
      rows,
      viewportHeight - headerHeight,
      getHeight
    ),
  };
}

export default reduce;
