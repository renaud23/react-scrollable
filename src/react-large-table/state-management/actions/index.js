export const ON_REFRESH_DATA = "react-large-table/on-refresh-data";
export const onRefreshData = (data, headerHeight, rowHeight, treeSize) => ({
  type: ON_REFRESH_DATA,
  payload: { data, headerHeight, rowHeight, treeSize },
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

/* */
export const ON_CLICK_ROW_NUM = "react-large-table/on-click-row-num";
export const onClickRowNum = (index) => ({
  type: ON_CLICK_ROW_NUM,
  payload: { index },
});

export const ON_VERTICAL_SCROLL_REQUEST =
  "react-large-table/on-vertical-scroll-request";
export const onVerticalScrollRequest = ({ delta, pixels }) => ({
  type: ON_VERTICAL_SCROLL_REQUEST,
  payload: { delta, pixels },
});

export const ON_HORIZONTAL_SCROLL_REQUEST =
  "react-large-table/on-horizontal-scroll-request";
export const onHorizontalScrollRequest = ({ delta, pixels }) => ({
  type: ON_HORIZONTAL_SCROLL_REQUEST,
  payload: { delta, pixels },
});

export const ON_START_DRAG = "react-large-table/on-start-drag";
export const onStartDrag = (args) => ({
  type: ON_START_DRAG,
  payload: { ...args },
});

export const ON_DRAG = "react-large-table/on-drag";
export const onDrag = (args) => ({
  type: ON_DRAG,
  payload: { ...args },
});

export const ON_STOP_DRAG = "react-large-table/on-stop-drag";
export const onStopDrag = () => ({
  type: ON_STOP_DRAG,
});

export const ADD_ENTITY = "react-large-table/add-entity";
export const addEntity = (id, type, entity) => ({
  type: ADD_ENTITY,
  payload: { id, type, entity },
});

export const REMOVE_ENTITY = "react-large-table/remove-entity";
export const removeEntity = (id, type) => ({
  type: REMOVE_ENTITY,
  payload: { id, type },
});

export const ON_SWITCH_COLUMNS = "react-large-table/on-switch-columns";
export const onSwitchColumns = (one, two) => ({
  type: ON_SWITCH_COLUMNS,
  payload: { one, two },
});
