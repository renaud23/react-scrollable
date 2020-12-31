function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels } = payload;
  const { horizontal } = state;

  return {
    ...state,
    horizontal: { ...horizontal, scrollRequest: { delta, pixels } },
  };
}

export default reduce;
