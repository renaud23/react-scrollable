import { computeScrollTo, computeTrackPosFromPercent } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { trackPos, percent } = payload;
  const { horizontal } = state;
  if (percent !== undefined) {
    return {
      ...state,
      horizontal: computeTrackPosFromPercent(horizontal, percent),
    };
  }
  if (trackPos) {
    return { ...state, horizontal: computeScrollTo(horizontal, trackPos) };
  }
  return state;
}

export default reduce;
