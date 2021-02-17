function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { horizontal } = state;
  const { maxSize, size } = horizontal;
  const margin = -(maxSize - size) * percent;

  return { ...state, horizontal: { ...horizontal, margin } };
}

export default reduce;
