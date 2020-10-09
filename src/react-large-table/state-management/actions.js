export const ON_INIT = "react-large-table/on-init";
export const onInit = ({ rows, header, headerHeight }) => ({
  type: ON_INIT,
  payload: { rows, header, headerHeight },
});

export const ON_REFRESH_HEADER = "react-large-table/on-refresh-header";
export const onRefreshHeader = () => ({
  type: ON_REFRESH_HEADER,
});

export const ON_REFRESH_ROWS = "react-large-table/on-rows";
export const onRefreshRows = () => ({
  type: ON_REFRESH_ROWS,
});

export const ON_REFRESH_COLUMNS = "react-large-table/on-refresh-columns";
export const onRefreshColumns = () => ({ type: ON_REFRESH_COLUMNS });

export const ON_REFRESH_LINES = "react-large-table/on-refresh-lines";
export const onRefreshLines = () => ({ type: ON_REFRESH_LINES });

export const ON_HORIZONTAL_SCROLL = "react-large-table/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});

export const ON_VERTICAL_SCROLL = "react-large-table/on-vertical-scroll";
export const onVerticalScroll = (percent) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { percent },
});

export const ON_RESIZE = "react-large-table/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { width, height },
});
