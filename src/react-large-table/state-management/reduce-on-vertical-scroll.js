function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { vertical } = state;
  return { ...state, vertical: { ...vertical, scrollPercent: percent } };
}

export default reduce;
