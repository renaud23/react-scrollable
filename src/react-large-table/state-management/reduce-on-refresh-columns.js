import { resolveScrollbar } from "./commons-reducer.js";

function getWidth({ width }) {
  return width;
}

function reduce(state) {
  const { horizontal, header, viewportWidth } = state;
  return {
    ...state,
    horizontal: resolveScrollbar(horizontal, header, viewportWidth, getWidth),
  };
}

export default reduce;
