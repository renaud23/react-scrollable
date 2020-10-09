import { countSize } from "./commons-reducer.js";
import { findInTreeSize } from "./commons-reducer.js";

function reduce(state, action) {
  const {
    verticalScrollPercent,
    maxHeight,
    viewportHeight,
    cumulRowsHeight,
    headerHeight,
    rowsTreeSize,
  } = state;

  if (maxHeight && viewportHeight) {
    const miny =
      verticalScrollPercent * (maxHeight - viewportHeight + headerHeight);

    const startRow = findInTreeSize(rowsTreeSize, miny);
    // const startRow = findCumulsSize(cumulRowsHeight, miny);
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
