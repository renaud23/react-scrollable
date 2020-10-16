import resolveScrollableData from "./refresh-scrollable-data";

const __COLUMN_MIN_WIDTH__ = 20;
const __COLUMN_MAX_WIDTH__ = 800;

function getWidth({ width }) {
  return width;
}

function refillHeader(header, delta, index) {
  const next = [...header];
  const column = header[index];
  const { width } = column || __COLUMN_MIN_WIDTH__;
  next[index] = {
    ...column,
    width: Math.max(
      Math.min(width + delta, __COLUMN_MAX_WIDTH__),
      __COLUMN_MIN_WIDTH__
    ),
  };
  return next;
}

function reduce(state, action) {
  const { payload } = action;
  const { delta, index } = payload;
  const { header } = state;
  const headerNext = refillHeader(header, delta, index);
  if (delta !== 0) {
    return {
      ...state,
      header: headerNext,
      horizontal: resolveScrollableData(headerNext, getWidth),
    };
  }
  return state;
}

export default reduce;
