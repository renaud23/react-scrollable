export const ON_INIT = "react-large-text/on-init";
export const onInit = ({ lines, lineHeight, offsetChar }) => ({
  type: ON_INIT,
  payload: { lines, lineHeight, offsetChar },
});

export const ON_RESIZE = "react-large-text/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { width, height },
});

export const ON_REFRESH_VIEWPORT_SIZE = "react-large-text/on-viewport-size";
export const onRefreshViewportSize = () => ({ type: ON_REFRESH_VIEWPORT_SIZE });
