import { countSize } from "./commons-reducer.js";

function resolveStartColumn(state) {
  const {
    horizontalScrollPercent,
    maxWidth,
    viewportWidth,
    cumulColumnsWidth,
    header,
  } = state;

  if (maxWidth && viewportWidth) {
    const minx = horizontalScrollPercent * (maxWidth - viewportWidth);
    const startColumn = header.reduce(function (sc, column, i) {
      const { width } = column;
      const start = cumulColumnsWidth[i];
      const end = start + width;
      if (start <= minx && end > minx) {
        return i;
      }
      return sc;
    }, 0);
    const marginLeft = cumulColumnsWidth[startColumn] - minx;
    const nbColumns = countSize(
      cumulColumnsWidth,
      startColumn,
      minx + viewportWidth
    );
    return { ...state, startColumn, marginLeft, nbColumns };
  }

  return state;
}

function reduce(state) {
  return resolveStartColumn(state);
}

export default reduce;
