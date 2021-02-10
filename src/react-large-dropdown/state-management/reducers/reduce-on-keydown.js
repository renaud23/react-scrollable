const BIND_KEY = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  home: "Home",
  end: "End",
};

function reduceEnd(state) {
  const { displayedItems, vertical } = state;
  const activeIndex = displayedItems.length - 1;
  const scrollRequest = { index: activeIndex };
  return { ...state, activeIndex, vertical: { ...vertical, scrollRequest } };
}

function reduceHome(state) {
  const { vertical } = state;
  const scrollRequest = { index: 0 };
  return { ...state, activeIndex: 0, vertical: { ...vertical, scrollRequest } };
}

function validatePanel(state) {
  const { activeIndex, verticalScroll, vertical } = state;
  const { start, nb } = verticalScroll;
  if (activeIndex < start) {
    const scrollRequest = { index: activeIndex, margin: 0 };
    return { ...state, vertical: { ...vertical, scrollRequest } };
  }
  if (activeIndex >= start + nb) {
    const scrollRequest = { index: activeIndex - nb + 1, margin: 0 };
    return { ...state, vertical: { ...vertical, scrollRequest } };
  }
  return state;
}

function reduceArrowUp(state) {
  const { activeIndex } = state;
  const index = Math.max(activeIndex - 1 || 0, 0);

  return validatePanel({
    ...state,
    activeIndex: index,
  });
}

function reduceArrowDown(state) {
  const { activeIndex, displayedItems } = state;
  const index = Math.min(activeIndex + 1 || 0, displayedItems.length);

  return validatePanel({
    ...state,
    activeIndex: index,
  });
}

function reduce(state, action) {
  const { payload } = action;
  const { key } = payload;
  switch (key) {
    case BIND_KEY.arrowUp:
      return reduceArrowUp(state);
    case BIND_KEY.arrowDown:
      return reduceArrowDown(state);
    case BIND_KEY.end:
      return reduceEnd(state);
    case BIND_KEY.home:
      return reduceHome(state);
    default:
      return state;
  }
}

export default reduce;
