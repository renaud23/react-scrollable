import { resolveScrollbar } from "./commons-reducer";

function getWidth({ width }) {
  return width;
}

function reduce(state) {
  const { horizontal, viewportWidth } = state;
  return {
    ...state,
    horizontal: resolveScrollbar(horizontal, viewportWidth, getWidth),
  };
}

export default reduce;
