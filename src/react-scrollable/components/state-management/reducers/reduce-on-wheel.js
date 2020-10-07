import { computeScrollbarScrollPercent } from "../common-reducers";

function resolve(scrollbar, action) {
  const { payload } = action;
  const { delta } = payload;
  const { tPos, size, tSize } = scrollbar;
  const next = Math.min(Math.max(tPos + delta / size, 0), size - tSize);
  return computeScrollbarScrollPercent({ ...scrollbar, tPos: next });
}

function reduce(state, action) {
  const { vertical } = state;
  return { ...state, refresh: true, vertical: resolve(vertical, action) };
}

export default reduce;
