import { computeScrollbarScrollPercent } from "../common-reducers";

function resolve(scrollbar, action) {
  const { payload } = action;
  const { clientPos } = payload;
  const { size, tPos, tSize, clientPos: prec } = scrollbar;
  const delta = prec - (clientPos || prec);
  const pos = Math.min(Math.max(tPos - (delta || 0), 0), size - tSize);
  return computeScrollbarScrollPercent({ ...scrollbar, tPos: pos, clientPos });
}

export function reduceOnVerticalDrag(state, action) {
  const { vertical } = state;
  return { ...state, vertical: resolve(vertical, action) };
}

export function reduceOnHorizontalDrag(state, action) {
  const { horizontal } = state;
  return { ...state, horizontal: resolve(horizontal, action) };
}
