import { computeScrollbarPos } from "../common-reducers";

function safePercent(percent) {
  return Math.min(1.0, Math.max(0, percent));
}

function resolve(scrollbar, action) {
  const { payload } = action;
  const { percent } = payload;
  if (percent !== undefined) {
    return computeScrollbarPos({
      ...scrollbar,
      scrollPercent: safePercent(percent),
    });
  }
  return scrollbar;
}

export function reduceOnVerticalScrollPercentRequest(state, action) {
  const { vertical } = state;
  return { ...state, refresh: false, vertical: resolve(vertical, action) };
}

export function reduceOnHorizontalScrollPercentRequest(state, action) {
  const { horizontal } = state;
  return { ...state, refresh: false, horizontal: resolve(horizontal, action) };
}
