import { computeTrackSize } from "./commons-reducer";

function updateOne(scrollbar, max, refSize) {
  return computeTrackSize({ ...scrollbar, max, refSize });
}

function reduce(state, action) {
  const { payload } = action;
  const {
    maxWidth,
    maxHeight,
    refWidth,
    refHeight,
    focused,
    idContent,
  } = payload;
  const { horizontal, vertical } = state;

  return {
    ...state,
    focused,
    idContent,
    horizontal: updateOne(horizontal, maxWidth, refWidth),
    vertical: updateOne(vertical, maxHeight, refHeight),
  };
}

export default reduce;
