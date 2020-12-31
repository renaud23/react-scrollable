import { computeScrollTo, computeTrackPosFromPercent } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { trackPos, percent } = payload;
  const { vertical } = state;
  if (percent !== undefined) {
    return {
      ...state,
      vertical: computeTrackPosFromPercent(vertical, percent),
    };
  }
  if (trackPos) {
    return { ...state, vertical: computeScrollTo(vertical, trackPos) };
  }
  return state;
}

export default reduce;
