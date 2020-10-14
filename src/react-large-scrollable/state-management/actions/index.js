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
export const onRefreshVerticalScrollable = (scrollable) => ({
  type: ON_REFRESH_VERTICAL_SCROLLABLE,
  payload: { scrollable },
});

export const ON_HORIZONTAL_SCROLL =
  "react-large-scrollable/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});

export const ON_REFRESH_HORIZONTAL_SCROLLABLE =
  "react-large-scrollable/on-refresh-horizontal-scrollable";
export const onRefreshHorizontalScrollable = (scrollable) => ({
  type: ON_REFRESH_HORIZONTAL_SCROLLABLE,
  payload: { scrollable },
});

export const ON_KEY_DOWN = "react-large-scrollable/on-keydown";
export const onKeydown = (key) => ({ type: ON_KEY_DOWN, payload: { key } });
