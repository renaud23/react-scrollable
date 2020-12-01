import { computeScrollTo } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { trackPos } = payload;
  const { horizontal } = state;
  return { ...state, horizontal: computeScrollTo(horizontal, trackPos) };
}

export default reduce;
