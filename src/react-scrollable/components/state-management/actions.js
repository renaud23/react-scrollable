export const ON_RESIZE = "react-scrollable/on-resize";
export const onResize = ({ width, height, viewportWidth, viewportHeight }) => ({
  type: ON_RESIZE,
  payload: { width, height, viewportWidth, viewportHeight },
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

export const ON_VERTICAL_SCROLL_PERCENT_REQUEST =
  "react-scrollable/on-vertical-scroll-percent-request";
export const onVerticalScrollPercentRequest = (percent) => ({
  type: ON_VERTICAL_SCROLL_PERCENT_REQUEST,
  payload: { percent },
});

export const ON_HORIZONTAL_SCROLL_PERCENT_REQUEST =
  "react-scrollable/on-horizontal-scroll-percent-request";
export const onHorizontalScrollPercentRequest = (percent) => ({
  type: ON_HORIZONTAL_SCROLL_PERCENT_REQUEST,
  payload: { percent },
});

export const ON_WHEEL = "react-scrollable/on-wheel";
export const onWheel = (delta) => ({ type: ON_WHEEL, payload: { delta } });

export const ON_KEYDOWN = "react-scrollable/on-key-down";
export const onKeyDown = (key) => ({ type: ON_KEYDOWN, payload: { key } });
