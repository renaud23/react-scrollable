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

function reduceArrowDown(state) {
  return state;
}

function reduceArrowUp(state) {
  return state;
}

function reduceArrowLeft(state) {
  return state;
}

function reduceArrowRight(state) {
  return state;
}

function reducePageUp(state) {
  return state;
}

function reducePageDown(state) {
  return state;
}

function reduceHome(state) {
  return state;
}

function reduceEnd(state) {
  return state;
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
