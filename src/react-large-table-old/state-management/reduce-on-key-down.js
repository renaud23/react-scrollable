import {
  resolveNb,
  computeSeuil,
  resolveScrollPercent,
  resolveStart,
  resolveMargin,
} from "./commons-reducer";

const BINDED_KEYS = {
  arrowDown: "ArrowDown",
  arrowUp: "ArrowUp",
  arrowLeft: "ArrowLeft",
  arrowRight: "ArrowRight",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End",
};

function moveScrollbar(scrollbar, delta) {
  const { start, max, nb } = scrollbar;
  const next = resolveScrollPercent({
    ...scrollbar,
    start: Math.max(Math.min(start + delta, max - nb), 0),
    margin: 0,
  });
  const seuil = computeSeuil(next);
  return resolveNb(next, seuil);
}

function moveScrollbarPixels(scrollbar, delta) {
  const { maxSize, size } = scrollbar;
  const seuil = computeSeuil(scrollbar);
  const next = Math.min(Math.max(seuil + delta, 0), maxSize - size);
  return {
    ...resolveScrollPercent(
      resolveNb(resolveMargin(resolveStart(scrollbar, next), next), next)
    ),
  };
}

function forceScrollbar(scrollbar, percent) {
  const { maxSize, size } = scrollbar;
  const seuil = percent * (maxSize - size);
  return {
    ...resolveNb(resolveMargin(resolveStart(scrollbar, seuil), seuil), seuil),
    scrollRequest: { percent },
  };
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
