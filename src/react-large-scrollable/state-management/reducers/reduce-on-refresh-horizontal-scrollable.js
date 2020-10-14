function reduce(state, action) {
  const { payload } = action;
  const { scrollable } = payload;
  const { horizontal } = state;
  return { ...state, horizontal: { ...horizontal, ...scrollable } };
}

export default reduce;
