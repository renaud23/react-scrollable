export const ON_RESIZE = "react-rowable/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { width, height },
});

export const ON_REFRESH_HORIZONTAL_ROWABLE =
  "react-rowable/on-refresh-horizontal-rowable";
export const onRefreshHorizontalRowable = (rowable, treeSize) => ({
  type: ON_REFRESH_HORIZONTAL_ROWABLE,
  payload: { rowable, treeSize },
});

export const ON_REFRESH_VERTICAL_ROWABLE =
  "react-rowable/on-refresh-vertical-rowable";
export const onRefreshVerticalRowable = (rowable, treeSize) => ({
  type: ON_REFRESH_VERTICAL_ROWABLE,
  payload: { rowable, treeSize },
});

export const ON_VERTICAL_SCROLL = "react-rowable/on-vertical-scroll";
export const onVerticalScroll = (percent) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { percent },
});

export const ON_HORIZONTAL_SCROLL = "react-rowable/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});

export const ON_VERTICAL_SCROLL_REQUEST =
  "react-rowable/on-vertical-scroll-request";
export const onVerticalScrollRequest = ({ delta }) => ({
  type: ON_VERTICAL_SCROLL_REQUEST,
  payload: { delta },
});

export const ON_HORIZONTAL_SCROLL_REQUEST =
  "react-rowable/on-horizontal-scroll-request";
export const onHorizontalScrollRequest = ({ delta }) => ({
  type: ON_HORIZONTAL_SCROLL_REQUEST,
  payload: { delta },
});
