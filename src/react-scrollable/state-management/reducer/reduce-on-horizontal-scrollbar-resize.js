import { updateAll, computeTrackSize } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { horizontal } = state;
  return {
    ...state,
    horizontal: computeTrackSize(updateAll(horizontal, payload, "size", "ref")),
  };
}

export default reduce;
