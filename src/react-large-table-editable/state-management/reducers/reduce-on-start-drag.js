function reduce(state, action) {
  const { payload } = action;
  const { type, column, row, clientX, clientY } = payload;

  return {
    ...state,
    drag: true,
    anchor: { type, column, row, clientX, clientY },
    extent: undefined,
    selection: undefined,
  };
}

export default reduce;
