import { computeScrollTo } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { trackPos } = payload;
  const { vertical } = state;
  return { ...state, vertical: computeScrollTo(vertical, trackPos) };
}

export default reduce;
