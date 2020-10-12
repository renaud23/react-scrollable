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

function moveScrollbar(scrollbar, delta, viewportSize) {
  const { start, max, nb } = scrollbar;
  const next = resolveScrollPercent(
    {
      ...scrollbar,
      start: Math.max(Math.min(start + delta, max - nb), 0),
      margin: 0,
    },
    viewportSize
  );
  const seuil = computeSeuil(next, viewportSize);

  return resolveNb(next, viewportSize, seuil);
}

function moveScrollbarPixels(scrollbar, delta, viewportSize) {
  const { maxSize } = scrollbar;
  const seuil = computeSeuil(scrollbar, viewportSize);
  const next = Math.min(Math.max(seuil + delta, 0), maxSize - viewportSize);
  return {
    ...resolveScrollPercent(
      resolveNb(
        resolveMargin(resolveStart(scrollbar, next), next),

        viewportSize,
        next
      ),
      viewportSize
    ),
  };
}

function forceScrollbar(scrollbar, percent, viewportSize) {
  const { maxSize } = scrollbar;
  const seuil = percent * (maxSize - viewportSize);
  return {
    ...resolveNb(
      resolveMargin(resolveStart(scrollbar, seuil), seuil),
      viewportSize,
      seuil
    ),
    scrollRequest: { percent },
  };
}

function reduceArrowDown(state) {
  const { vertical, viewportHeight, headerHeight } = state;
  const viewportSize = viewportHeight - headerHeight;
  return { ...state, vertical: moveScrollbar(vertical, 1, viewportSize) };
}

function reduceArrowUp(state) {
  const { vertical, viewportHeight, headerHeight } = state;
  const viewportSize = viewportHeight - headerHeight;
  return { ...state, vertical: moveScrollbar(vertical, -1, viewportSize) };
}

function reduceArrowLeft(state) {
  const { horizontal, viewportWidth } = state;
  return { ...state, horizontal: moveScrollbar(horizontal, -1, viewportWidth) };
}

function reduceArrowRight(state) {
  const { horizontal, viewportWidth } = state;
  return { ...state, horizontal: moveScrollbar(horizontal, 1, viewportWidth) };
}

function reducePageUp(state) {
  const { vertical, viewportHeight, headerHeight } = state;
  const viewportSize = viewportHeight - headerHeight;
  return {
    ...state,
    vertical: moveScrollbarPixels(vertical, -viewportSize, viewportSize),
  };
}

function reducePageDown(state) {
  const { vertical, viewportHeight, headerHeight } = state;
  const viewportSize = viewportHeight - headerHeight;
  return {
    ...state,
    vertical: moveScrollbarPixels(vertical, viewportSize, viewportSize),
  };
}

function reduceHome(state) {
  const { vertical, viewportHeight, headerHeight } = state;
  const viewportSize = viewportHeight - headerHeight;
  return { ...state, vertical: forceScrollbar(vertical, 0, viewportSize) };
}

function reduceEnd(state) {
  const { vertical, viewportHeight, headerHeight } = state;
  const viewportSize = viewportHeight - headerHeight;
  return { ...state, vertical: forceScrollbar(vertical, 1, viewportSize) };
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
