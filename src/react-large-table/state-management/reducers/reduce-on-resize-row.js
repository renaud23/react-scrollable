import resolveScrollableData from "./refresh-scrollable-data";
import { getHeight, setHeight } from "../../commons-table";

const __ROW_MIN_HEIGHT__ = 15;
const __ROW_MAX_HEIGHT__ = 300;

function refillRows(rows, delta, index) {
  const next = [...rows];
  const row = rows[index];
  const height = getHeight(row) || __ROW_MIN_HEIGHT__;
  const nHeight = Math.max(
    Math.min(height + delta, __ROW_MAX_HEIGHT__),
    __ROW_MIN_HEIGHT__
  );
  next[index] = setHeight(row, nHeight);

  return next;
}

function reduce(state, action) {
  const { payload } = action;
  const { delta, index } = payload;
  const { rows, vertical } = state;
  const { fixed } = vertical;
  if (!fixed) {
    if (delta !== 0) {
      const nRows = refillRows(rows, delta, index);

      return {
        ...state,
        rows: nRows,
        vertical: resolveScrollableData(nRows, getHeight),
      };
    }
  }
  return state;
}

export default reduce;
