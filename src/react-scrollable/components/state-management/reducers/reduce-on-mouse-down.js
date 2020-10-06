import { computeScrollbarScrollPercent } from "../common-reducers";

function resolve(scrollbar, action) {
  const { payload } = action;
  const { clientPos } = payload;
  const { size, tSize } = scrollbar;
  const tPos = Math.min(clientPos, size - tSize);

  return computeScrollbarScrollPercent({ ...scrollbar, tPos });
}

export function reduceOnVerticalMouseDown(state, action) {
  const { vertical } = state;
  return { ...state, vertical: resolve(vertical, action) };
}

export function reduceOnHorizontalMouseDown(state, action) {
  const { horizontal } = state;
  return { ...state, horizontal: resolve(horizontal, action) };
}
