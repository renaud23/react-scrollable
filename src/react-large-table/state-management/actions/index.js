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
