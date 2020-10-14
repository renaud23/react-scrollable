function reduce(state, action) {
  const { payload } = action;
  const { scrollable } = payload;
  const { vertical } = state;
  return { ...state, vertical: { ...vertical, ...scrollable } };
}

export default reduce;
