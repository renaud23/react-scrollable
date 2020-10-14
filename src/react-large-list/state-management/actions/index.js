export const ON_RESIZE = "react-large-scrollable/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { width, height },
});

export const ON_REFRESH_DATA = "react-large-scrollable/on-refresh-data";
export const onRefreshData = (data) => ({
  type: ON_REFRESH_DATA,
  payload: { data },
});

export const ON_VERTICAL_SCROLL = "react-large-scrollable/on-vertical-scroll";
export const onVerticalScroll = (percent) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { percent },
});

export const ON_HORIZONTAL_SCROLL =
  "react-large-scrollable/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});
