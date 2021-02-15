const BIND_KEY = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  home: "Home",
  end: "End",
  enter: "Enter",
  escape: "Escape",
  tab: "Tab",
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
  const { vertical, selectedIndex, optionsHeight } = state;
  const { start, nb, maxSize, size } = vertical;
  if (selectedIndex !== undefined && selectedIndex >= start + nb) {
    const percent = computePercentAtEnd(
      selectedIndex,
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
  if (selectedIndex < start) {
    const percent = computePercentAtStart(
      selectedIndex,
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
  const { selectedIndex, displayedItems } = state;
  if (displayedItems.length) {
    const index = Math.max(selectedIndex - 1 || 0, 0);

    return validatePanel({
      ...state,
      selectedIndex: index,
      expended: true,
    });
  }
  return { ...state, selectedIndex: undefined };
}

function reduceArrowDown(state) {
  const { selectedIndex, displayedItems } = state;
  if (displayedItems.length) {
    const index = Math.min(selectedIndex + 1 || 0, displayedItems.length - 1);

    return validatePanel({
      ...state,
      selectedIndex: index,
      expended: true,
    });
  }
  return { ...state, selectedIndex: undefined };
}

function reduceEnd(state) {
  const { displayedItems } = state;

  return validatePanel({
    ...state,
    selectedIndex: displayedItems.length
      ? displayedItems.length - 1
      : undefined,
    expended: true,
  });
}

function reduceHome(state) {
  const { displayedItems } = state;
  return validatePanel({
    ...state,
    selectedIndex: displayedItems.length ? 0 : undefined,
    expended: true,
  });
}

function reduceEnter(state) {
  const { expended } = state;

  return {
    ...state,
    expended: !expended,
  };
}

function reduceTab(state) {
  return {
    ...state,
    focused: false,
    expended: false,
    verticalScrollRequest: { percent: 0 },
  };
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
    case BIND_KEY.tab:
      return reduceTab(state);
    default:
      return state;
  }
}

export default reduce;