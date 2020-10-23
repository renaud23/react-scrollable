export const ON_UPDATE_DATA = "editable-table/on-update-large-table-editable";
export const onUpdateData = (data) => ({
  type: ON_UPDATE_DATA,
  payload: { data },
});

export const ON_SELECT_ROW = "editable-table/on-select-row";
export const onSelectRow = (index) => ({
  type: ON_SELECT_ROW,
  payload: { index },
});
