import { countSize } from "./commons-reducer.js";

function reduce(state, action) {
  const {
    verticalScrollPercent,
    maxHeight,
    viewportHeight,
    cumulRowsHeight,
    rows,
    headerHeight,
  } = state;

  if (maxHeight && viewportHeight) {
    const miny = verticalScrollPercent * (maxHeight - viewportHeight);
    const startRow = rows.reduce(function (sc, row, i) {
      const { __height } = row;
      const start = cumulRowsHeight[i];
      const end = start + __height;
      if (start <= miny && end > miny) {
        return i;
      }
      return sc;
    }, 0);
    const marginTop = cumulRowsHeight[startRow] - miny;
    const nbRows = countSize(
      cumulRowsHeight,
      startRow,
      miny + viewportHeight - headerHeight
    );
    return { ...state, startRow, marginTop, nbRows };
  }
  return state;
}

export default reduce;
