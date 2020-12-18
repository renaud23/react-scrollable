function reduce(state, action) {
  const { payload } = action;
  const { index } = payload;
  return { ...state, draggedColumn: index };
}

export default reduce;
