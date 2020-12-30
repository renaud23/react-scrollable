import { computeTrackPos } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const { horizontal } = state;

  if (delta !== 0) {
    return { ...state, horizontal: computeTrackPos(horizontal, delta) };
  }

  return state;
}

export default reduce;
