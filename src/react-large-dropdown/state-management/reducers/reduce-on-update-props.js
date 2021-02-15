let DROPDOWN_ID_INDEX = 1;

function getId(id) {
  return id ? id : `react-large-dropdown-${DROPDOWN_ID_INDEX++}`;
}

function reduce(state, action) {
  const { payload } = action;
  const {
    list,
    disabled,
    writable,
    optionsHeight,
    panelMaxWidth,
    id,
    labelledBy,
    placeHolder,
  } = payload;
  const { vertical, horizontal } = state;

  return {
    ...state,
    list,
    disabled,
    writable,
    displayedItems: list,
    optionsHeight,
    panelMaxWidth,
    labelledBy,
    placeHolder,
    id: getId(id),
    vertical: {
      ...vertical,
      maxSize: list.length * optionsHeight,
      max: list.length,
    },
    horizontal: { ...horizontal, maxSize: panelMaxWidth },
  };
}

export default reduce;