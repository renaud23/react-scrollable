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

export const ON_VERTICAL_SCROLL = "react-large-text/on-vertical-scroll";
export const onVerticalScroll = (percent) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { percent },
});

export const ON_HORIZONTAL_SCROLL = "react-large-text/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});

export const ON_REFRESH_VIEWPORT_SIZE = "react-large-text/on-viewport-size";
export const onRefreshViewportSize = () => ({ type: ON_REFRESH_VIEWPORT_SIZE });

export const ON_ARROW_DOWN = "react-large-text/on-arrow-down";
export const onArrowDown = () => ({ type: ON_ARROW_DOWN });

export const ON_ARROW_UP = "react-large-text/on-arrow-up";
export const onArrowUp = () => ({ type: ON_ARROW_UP });

export const ON_ARROW_LEFT = "react-large-text/on-arrow-left";
export const onArrowLeft = () => ({ type: ON_ARROW_LEFT });

export const ON_ARROW_RIGHT = "react-large-text/on-arrow-right";
export const onArrowRight = () => ({ type: ON_ARROW_RIGHT });

export const ON_PAGE_DOWN = "react-large-text/on-page-down";
export const onPageDown = () => ({ type: ON_PAGE_DOWN });

export const ON_PAGE_UP = "react-large-text/on-page-up";
export const onPageUp = () => ({ type: ON_PAGE_UP });
