import { getSelection } from "../selection";

function reduce(state, action) {
  const { payload } = action;
  const { type, column, row, clientX, clientY } = payload;
  const anchor = { type, column, row, clientX, clientY };
  const selection = getSelection(anchor, anchor);
  return {
    ...state,
    drag: true,
    anchor,
    extent: anchor,
    selection: selection,
  };
}

export default reduce;
