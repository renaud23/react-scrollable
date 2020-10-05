function resolve(scrollbar, action) {
  const { payload } = action;
  const { clientPos } = payload;
  return { ...scrollbar, clientPos, drag: true };
}

export function reduceOnVerticalStartDrag(state, action) {
  const { vertical } = state;
  return { ...state, vertical: resolve(vertical, action) };
}

export function reduceOnHorizontalStartDrag(state, action) {
  const { horizontal } = state;
  return { ...state, horizontal: resolve(horizontal, action) };
}
