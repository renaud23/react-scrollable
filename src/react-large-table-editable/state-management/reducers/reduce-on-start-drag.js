function reduce(state, action) {
  const { payload } = action;
  const { type, column, row } = payload;

  return {
    ...state,
    drag: true,
    anchor: { type, column, row },
    extent: undefined,
    selection: undefined,
  };
}

export default reduce;
