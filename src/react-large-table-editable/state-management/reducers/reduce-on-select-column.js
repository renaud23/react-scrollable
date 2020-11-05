import { selectColumn } from "../selection";

function reduce(state, action) {
  const { payload } = action;
  const { index } = payload;

  return { ...state, selection: selectColumn(index) };
}

export default reduce;
