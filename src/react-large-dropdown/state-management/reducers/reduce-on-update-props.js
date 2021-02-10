function reduce(state, action) {
  const { payload } = action;
  const { list, disabled, writable, optionsHeight, panelMaxWidth } = payload;
  const { vertical, horizontal } = state;

  return {
    ...state,
    list,
    disabled,
    writable,
    displayedItems: list,
    optionsHeight,
    panelMaxWidth,
    vertical: {
      ...vertical,
      maxSize: list.length * optionsHeight,
      max: list.length,
    },
    horizontal: { ...horizontal, maxSize: panelMaxWidth },
  };
}

export default reduce;
