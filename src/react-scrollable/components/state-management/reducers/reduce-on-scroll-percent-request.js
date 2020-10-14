import { computeScrollbarPos } from "../common-reducers";

function resolve(scrollbar, action) {
  const { payload } = action;
  const { percent } = payload;
  if (percent !== undefined) {
    return computeScrollbarPos({ ...scrollbar, scrollPercent: percent });
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
