export const ON_RESIZE = "react-large-scrollable/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { width, height },
});

export const ON_VERTICAL_SCROLL = "react-large-scrollable/on-vertical-scroll";
export const onVerticalScroll = (percent) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { percent },
});

export const ON_REFRESH_VERTICAL_SCROLLABLE =
  "react-large-scrollable/on-refresh-vertical-scrollable";
export const onRefreshVerticalScrollable = (scrollable, treeSize) => ({
  type: ON_REFRESH_VERTICAL_SCROLLABLE,
  payload: { scrollable, treeSize },
});

export const ON_HORIZONTAL_SCROLL =
  "react-large-scrollable/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});

export const ON_REFRESH_HORIZONTAL_SCROLLABLE =
  "react-large-scrollable/on-refresh-horizontal-scrollable";
export const onRefreshHorizontalScrollable = (scrollable, treeSize) => ({
  type: ON_REFRESH_HORIZONTAL_SCROLLABLE,
  payload: { scrollable, treeSize },
});

export const ON_KEY_DOWN = "react-large-scrollable/on-keydown";
export const onKeydown = (key) => ({ type: ON_KEY_DOWN, payload: { key } });

export const ON_VERTICAL_SCROLL_REQUEST =
  "react-large-scrollable/on-vertical-scroll-request";
export const onVerticalScrollRequest = ({ delta }) => ({
  type: ON_VERTICAL_SCROLL_REQUEST,
  payload: { delta },
});

export const ON_HORIZONTAL_SCROLL_REQUEST =
  "react-large-scrollable/on-horizontal-scroll-request";
export const onHorizontalScrollRequest = ({ delta }) => ({
  type: ON_HORIZONTAL_SCROLL_REQUEST,
  payload: { delta },
});

export const ON_FOCUS = "react-large-scrollable/on-focus";
export const onFocus = () => ({ type: ON_FOCUS });

export const ON_BLUR = "react-large-scrollable/on-blur";
export const onBlur = () => ({ type: ON_BLUR });