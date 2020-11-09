function reduce(state, action) {
  const { payload } = action;
  const { clientX, clientY } = payload;
  const { anchor, tableRect } = state;

  if (anchor && tableRect) {
    const { clientX: anchorX, clientY: anchorY } = anchor;
    const dx = clientX - anchorX;
    const dy = clientY - anchorY;
    const { width, height } = tableRect;

    if (Math.abs(dx / width) > Math.abs(dy / height)) {
      const delta = Math.abs(dx) / dx;
      return { ...state, dragOutDirection: { dx: delta, dy: 0 } };
    }

    const delta = Math.abs(dy) / dy;
    return { ...state, dragOutDirection: { dx: 0, dy: delta } };
  }
  return state;
}

export default reduce;
