function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { horizontal } = state;
  return { ...state, horizontal: { ...horizontal, scrollPercent: percent } };
}

export default reduce;
