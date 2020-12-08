import { updateAll, computeTrackSize } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { vertical } = state;
  return {
    ...state,
    vertical: computeTrackSize(updateAll(vertical, payload, "size", "ref")),
  };
}

export default reduce;
