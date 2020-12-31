function reduce(state, action) {
  const { draggedColumn } = state;
  const { payload } = action;
  const { target } = payload;
  return { ...state, draggedColumn: { ...draggedColumn, target } };
}

export default reduce;
