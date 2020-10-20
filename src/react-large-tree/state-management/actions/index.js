export const ON_REFRESH_DATA = "react-large-tree/on-refresh-data";
export const onRefreshData = (root) => ({
  type: ON_REFRESH_DATA,
  payload: { root },
});
