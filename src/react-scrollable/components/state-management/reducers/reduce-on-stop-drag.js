function resolve(scrollbar) {
  return { ...scrollbar, drag: false, clientPos: undefined };
}

export function reduceOnVerticalStopDrag(state) {
  const { vertical } = state;
  return {
    ...state,
    vertical: resolve(vertical),
  };
}

export function reduceOnHorizontalStopDrag(state) {
  const { horizontal } = state;
  return {
    ...state,
    horizontal: resolve(horizontal),
  };
}
