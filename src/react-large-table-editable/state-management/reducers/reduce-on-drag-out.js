function reduce(state, action) {
  const { anchor } = state;
  const { clientX: anchorX, clientY: anchorY } = anchor;
  const { payload } = action;
  const { clientX, clientY } = payload;
  const dx = clientX - anchorX;
  const dy = clientY - anchorY;

  if (Math.abs(dx) > Math.abs(dy)) {
    const delta = Math.abs(dx) / dx;
    return { ...state, horizontalScrollRequest: { delta } };
  }

  const delta = Math.abs(dy) / dy;
  return { ...state, verticalScrollRequest: { delta } };
}

export default reduce;
