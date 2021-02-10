import { resolveVertical } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { rowHeight, vertical } = state;

  return { ...state, vertical: resolveVertical(vertical, percent, rowHeight) };
}

export default reduce;
