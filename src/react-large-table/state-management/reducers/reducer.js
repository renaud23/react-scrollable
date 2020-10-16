import * as actions from "../actions";
import reduceOnRefresData from "./reduce-on-refresh-data";
import reduceOnResizeColumn from "./reduce-on-resize-column";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_REFRESH_DATA:
      return reduceOnRefresData(state, action);
    case actions.ON_RESIZE_COLUMN:
      return reduceOnResizeColumn(state, action);
    default:
      return state;
  }
}

export default reducer;
