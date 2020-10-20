import { computeScrollbarScrollPercent } from "../common-reducers";

const __DELTA__ = 100;

function getDirection(delta) {
  if (delta !== undefined && delta !== 0) {
    return Math.abs(delta) / delta;
  }
  return 0;
}

function resolve(scrollbar, action) {
  const { payload } = action;
  const { delta } = payload;
  const { tPos, size, tSize, max } = scrollbar;
  const next = Math.min(
    Math.max(tPos + getDirection(delta) * __DELTA__ * (size / (1 + max)), 0),
    size - tSize
  );
  return computeScrollbarScrollPercent({ ...scrollbar, tPos: next });
}

function reduce(state, action) {
  const { vertical } = state;
  return { ...state, refresh: true, vertical: resolve(vertical, action) };
}

export default reduce;
