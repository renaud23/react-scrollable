export const ON_REFRESH_DATA = "react-large-table/on-refresh-data";
export const onRefreshData = (data, headerHeight, treeSize) => ({
  type: ON_REFRESH_DATA,
  payload: { data, headerHeight, treeSize },
});

export const ON_RESIZE_COLUMN = "react-large-table/on-resize-column";
export const onResizeColumn = (index, delta) => ({
  type: ON_RESIZE_COLUMN,
  payload: { index, delta },
});

export const ON_RESIZE_ROW = "react-large-table/on-resize-row";
export const onResizeRow = (index, delta) => ({
  type: ON_RESIZE_ROW,
  payload: { index, delta },
});

export const ON_VERTICAL_SCROLL = "react-large-table/on-vertical-scroll";
export const onVerticalScroll = (start, nb, margin) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { start, nb, margin },
});
