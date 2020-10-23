import { selectRow } from "../selection";

function reduce(state, action) {
  const { payload } = action;
  const { index } = payload;

  return { ...state, selection: selectRow(index) };
}

export default reduce;
