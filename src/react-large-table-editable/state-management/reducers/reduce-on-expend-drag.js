import { getSelection } from "../selection";

function reduce(state, action) {
  const { payload } = action;
  const { type, column, row } = payload;
  const { anchor } = state;
  const extent = { type, column, row };
  const selection = getSelection(anchor, extent);

  return { ...state, extent, selection };
}

export default reduce;
