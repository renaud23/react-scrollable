function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels } = payload;
  const { vertical } = state;

  return {
    ...state,
    vertical: { ...vertical, scrollRequest: { delta, pixels } },
  };
}

export default reduce;
