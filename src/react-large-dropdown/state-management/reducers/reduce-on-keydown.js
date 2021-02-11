const BIND_KEY = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  home: "Home",
  end: "End",
  enter: "Enter",
};

function computePercentAtEnd(index, size, maxSize, optionsHeight) {
  const nb = Math.ceil(size / optionsHeight);
  const position = index - nb + 1;
  return (position * optionsHeight) / (maxSize - size);
}

function computePercentAtStart(index, size, maxSize, optionsHeight) {
  return (index * optionsHeight) / (maxSize - size);
}

function validatePanel(state) {
  const { vertical, activeIndex, optionsHeight } = state;
  const { start, nb, maxSize, size } = vertical;
  if (activeIndex !== undefined && activeIndex >= start + nb) {
    const percent = computePercentAtEnd(
      activeIndex,
      size,
      maxSize,
      optionsHeight
    );
    const verticalScrollRequest = { percent };
    return {
      ...state,

      verticalScrollRequest,
    };
  }
  if (activeIndex < start) {
    const percent = computePercentAtStart(
      activeIndex,
      size,
      maxSize,
      optionsHeight
    );
    const verticalScrollRequest = { percent };
    return {
      ...state,
      verticalScrollRequest,
    };
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

function reduceEnd(state) {
  const { displayedItems } = state;

  return validatePanel({
    ...state,
    activeIndex: displayedItems.length - 1,
  });
}

function reduceHome(state) {
  return validatePanel({
    ...state,
    activeIndex: 0,
  });
}

function reduceEnter(state) {
  const { activeIndex, expended } = state;
  if (!expended) {
    return {
      ...state,
      expended: true,
    };
  }
  if (activeIndex !== undefined) {
    return validatePanel({ ...state, selectedIndex: activeIndex });
  }
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
    case BIND_KEY.enter:
      return reduceEnter(state);
    default:
      return state;
  }
}

export default reduce;
