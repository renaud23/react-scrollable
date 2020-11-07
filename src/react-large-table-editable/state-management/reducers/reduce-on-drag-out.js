function reduce(state, action) {
  const { anchor } = state;
  if (anchor) {
    const { clientX: anchorX, clientY: anchorY } = anchor;
    const { payload } = action;
    const { clientX, clientY } = payload;
    const dx = clientX - anchorX;
    const dy = clientY - anchorY;

    if (Math.abs(dx) > Math.abs(dy)) {
      return { ...state, dragOutDirection: { dx: Math.abs(dx) / dx, dy: 0 } };
    }
    return { ...state, dragOutDirection: { dx: 0, dy: Math.abs(dy) / dy } };
  }
  return state;
}

export default reduce;
