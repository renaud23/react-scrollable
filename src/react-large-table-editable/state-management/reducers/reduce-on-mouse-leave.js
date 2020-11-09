function reduce(state, action) {
  const { payload } = action;
  const { dragOutTask, tableRect } = payload;

  return { ...state, dragOutTask, tableRect, mouseOut: true };
}

export default reduce;
