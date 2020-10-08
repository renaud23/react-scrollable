function reduce(state, action) {
  const { payload } = action;
  const { headerHeight, rows = [], header = [] } = payload;

  return { ...state, headerHeight, rows, header };
}

export default reduce;
