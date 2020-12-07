import { resolveFromStart, resolveFromScrollPercent } from "./commons-reducers";
import BINDED_KEYS from "../../binded-key";

function moveScrollbar(scrollbar, delta) {
  const { start, max, nb } = scrollbar;
  return resolveFromStart({
    ...scrollbar,
    start: Math.max(Math.min(start + delta, max - nb), 0),
  });
}

function moveScrollbarPixels(scrollbar, delta) {
  const { maxSize, size, scrollPercent } = scrollbar;
  const percent = Math.min(
    Math.max(scrollPercent + delta / (maxSize - size), 0),
    1
  );
  return resolveFromScrollPercent({
    ...scrollbar,
    scrollPercent: percent,
    scrollRequest: { percent },
  });
}

function forceScrollbar(scrollbar, percent) {
  return resolveFromScrollPercent({
    ...scrollbar,
    scrollPercent: percent,
    scrollRequest: { percent },
  });
}

function reduceArrowDown(state) {
  const { vertical } = state;
  return { ...state, vertical: moveScrollbar(vertical, 1) };
}

function reduceArrowUp(state) {
  const { vertical } = state;
  return { ...state, vertical: moveScrollbar(vertical, -1) };
}

function reduceArrowLeft(state) {
  const { horizontal } = state;
  return { ...state, horizontal: moveScrollbar(horizontal, -1) };
}

function reduceArrowRight(state) {
  const { horizontal } = state;
  return { ...state, horizontal: moveScrollbar(horizontal, 1) };
}

function reducePageUp(state) {
  const { vertical } = state;
  const { size } = vertical;
  return {
    ...state,
    vertical: moveScrollbarPixels(vertical, -size),
  };
}

function reducePageDown(state) {
  const { vertical } = state;
  const { size } = vertical;
  return {
    ...state,
    vertical: moveScrollbarPixels(vertical, size),
  };
}

function reduceHome(state) {
  const { vertical } = state;
  return { ...state, vertical: forceScrollbar(vertical, 0) };
}

function reduceEnd(state) {
  const { vertical } = state;
  return { ...state, vertical: forceScrollbar(vertical, 1) };
}

function reduce(state, action) {
  const { payload } = action;
  const { key } = payload;
  switch (key) {
    case BINDED_KEYS.arrowDown:
      return reduceArrowDown(state);
    case BINDED_KEYS.arrowUp:
      return reduceArrowUp(state);
    case BINDED_KEYS.arrowLeft:
      return reduceArrowLeft(state);
    case BINDED_KEYS.arrowRight:
      return reduceArrowRight(state);
    case BINDED_KEYS.pageUp:
      return reducePageUp(state);
    case BINDED_KEYS.pageDown:
      return reducePageDown(state);
    case BINDED_KEYS.home:
      return reduceHome(state);
    case BINDED_KEYS.end:
      return reduceEnd(state);
    default:
      return state;
  }
}

export default reduce;
