import resolveScrollableData from "./refresh-scrollable-data";
import { getHeight, setHeight } from "../../commons-table";

const __ROW_MIN_HEIGHT__ = 15;
const __ROW_MAX_HEIGHT__ = 300;

function refillRows(rows, delta, index) {
  const next = [...rows];
  const row = rows[index];
  const height = getHeight(row) || __ROW_MIN_HEIGHT__;
  next[index] = setHeight(
    row,
    Math.max(Math.min(height + delta, __ROW_MAX_HEIGHT__), __ROW_MIN_HEIGHT__)
  );

  return next;
}

function reduce(state, action) {
  const { payload } = action;
  const { delta, index } = payload;
  const { rows } = state;

  if (delta !== 0) {
    const rowsNext = refillRows(rows, delta, index);

    return {
      ...state,
      rows: rowsNext,
      vertical: resolveScrollableData(rowsNext, getHeight),
    };
  }
  return state;
}

export default reduce;
