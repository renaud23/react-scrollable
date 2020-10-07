function reduce(state, action) {
  const { payload } = action;
  const { maxWidth, maxHeight } = payload;
  const { horizontal, vertical } = state;
  return {
    ...state,
    horizontal: { ...horizontal, max: maxWidth, tPos: 0 },
    vertical: { ...vertical, max: maxHeight, tPos: 0 },
  };
}

export default reduce;
