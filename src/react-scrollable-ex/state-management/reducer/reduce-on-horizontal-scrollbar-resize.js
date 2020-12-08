import { updateAll, computeSize, computeTrackSize } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { horizontal } = state;
  return {
    ...state,
    horizontal: computeTrackSize(
      computeSize(updateAll(horizontal, payload, "sizeMax", "ref"))
    ),
  };
}

export default reduce;
