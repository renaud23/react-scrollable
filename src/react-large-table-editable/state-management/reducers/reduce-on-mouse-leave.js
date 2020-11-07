function reduce(state, action) {
  const { payload } = action;
  const { dragOutTask } = payload;

  return { ...state, dragOutTask, mouseOut: true };
}

export default reduce;
