import { computeScrollbarScrollPercent } from "../common-reducers";

function resolve(scrollbar, action) {
  const { payload } = action;
  const { clientPos } = payload;
  const { size, tSize } = scrollbar;
  const tPos = Math.min(clientPos, size - tSize);
  if (size > tSize) {
    return computeScrollbarScrollPercent({ ...scrollbar, tPos });
  }
  return scrollbar;
}

export function reduceOnVerticalMouseDown(state, action) {
  const { vertical } = state;
  return { ...state, refresh: true, vertical: resolve(vertical, action) };
}

export function reduceOnHorizontalMouseDown(state, action) {
  const { horizontal } = state;
  return { ...state, refresh: true, horizontal: resolve(horizontal, action) };
}