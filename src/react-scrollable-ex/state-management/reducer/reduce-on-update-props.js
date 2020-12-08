import { computeSize, computeTrackSize } from "./commons-reducer";

function updateOne(scrollbar, max) {
  const { max: current } = scrollbar;
  if (current !== max) {
    return computeTrackSize(computeSize({ ...scrollbar, max }));
  }
  return scrollbar;
}

function reduce(state, action) {
  const { payload } = action;
  const { maxWidth, maxHeight, focused, idContent } = payload;
  const { horizontal, vertical } = state;

  return {
    ...state,
    focused,
    idContent,
    horizontal: updateOne(horizontal, maxWidth),
    vertical: updateOne(vertical, maxHeight),
  };
}

export default reduce;
