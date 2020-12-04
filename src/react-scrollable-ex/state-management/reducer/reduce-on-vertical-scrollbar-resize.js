import { updateAll, computeSize, computeTrackSize } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { vertical } = state;
  return {
    ...state,
    vertical: computeTrackSize(
      computeSize(updateAll(vertical, payload, "sizeMax", "ref"))
    ),
  };
}

export default reduce;
