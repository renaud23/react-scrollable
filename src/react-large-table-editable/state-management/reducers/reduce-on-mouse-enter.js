function reduce(state) {
  const { dragOutTask } = state;
  if (dragOutTask) {
    window.clearInterval(dragOutTask);
  }
  return { ...state, dragOutTask: undefined, mouseOut: false };
}

export default reduce;
