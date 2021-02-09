const BIND_KEY = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  home: "Home",
  end: "End",
};

function reduceEnd(state) {
  const { displayedItems } = state;
  const verticalScrollRequest = { index: displayedItems.length - 1 };

  return { ...state, verticalScrollRequest };
}

function reduceHome(state) {
  const verticalScrollRequest = { index: 0 };

  return { ...state, verticalScrollRequest };
}

function reduceArrowUp(state) {
  return state;
}

function reduceArrowDown(state) {
  return state;
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
