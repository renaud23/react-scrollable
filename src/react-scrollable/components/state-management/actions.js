export const ON_RESIZE = "react-scrollable/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { width, height },
});

export const ON_INIT = "react-scrollable/on-init";
export const onInit = (maxWidth, maxHeight) => ({
  type: ON_INIT,
  payload: { maxWidth, maxHeight },
});

/* DRAG */

export const ON_VERTICAL_START_DRAG = "react-scrollable/on-vertical-start-drag";
export const onVerticalStartDrag = (clientPos) => ({
  type: ON_VERTICAL_START_DRAG,
  payload: { clientPos },
});

export const ON_VERTICAL_DRAG = "react-scrollable/on-vertical-drag";
export const onVerticalDrag = (clientPos) => ({
  type: ON_VERTICAL_DRAG,
  payload: { clientPos },
});

export const ON_VERTICAL_STOP_DRAG = "react-scrollable/on-vertical-stop-drag";
export const onVerticalStopDrag = () => ({
  type: ON_VERTICAL_STOP_DRAG,
});

export const ON_HORIZONTAL_START_DRAG =
  "react-scrollable/on-horizontal-start-drag";
export const onHorizontalStartDrag = (clientPos) => ({
  type: ON_HORIZONTAL_START_DRAG,
  payload: { clientPos },
});

export const ON_HORIZONTAL_DRAG = "react-scrollable/on-horizontal-drag";
export const onHorizontalDrag = (clientPos) => ({
  type: ON_HORIZONTAL_DRAG,
  payload: { clientPos },
});

export const ON_HORIZONTAL_STOP_DRAG =
  "react-scrollable/on-horizontal-stop-drag";
export const onHorizontalStopDrag = () => ({
  type: ON_HORIZONTAL_STOP_DRAG,
});

export const ON_REFRESH_VIEWPORT = "react-scrollable/on-refresh-viewport";
export const onRefreshViewport = () => ({
  type: ON_REFRESH_VIEWPORT,
});

export const ON_VERTICAL_MOUSE_DOWN = "react-scrollable/on-vertical-mouse-down";
export const onVerticalMouseDown = (clientPos) => ({
  type: ON_VERTICAL_MOUSE_DOWN,
  payload: { clientPos },
});

export const ON_HORIZONTAL_MOUSE_DOWN =
  "react-scrollable/on-horizontal-mouse-down";
export const onHorizontalMouseDown = (clientPos) => ({
  type: ON_HORIZONTAL_MOUSE_DOWN,
  payload: { clientPos },
});
