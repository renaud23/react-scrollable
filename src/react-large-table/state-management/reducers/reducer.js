import * as actions from "../actions";
import reduceOnRefresData from "./reduce-on-refresh-data";
import reduceOnResizeColumn from "./reduce-on-resize-column";
import reduceOnVerticalScroll from "./reducer-on-vertical-scroll";
import reduceOnResizeRow from "./reduce-on-resize-row";
import onReduceVerticalScrollRequest from "./reduce-on-vertical-scroll-request";
import onReduceOnHorizontalScrollRequest from "./reduce-on-horizontal-scroll-request";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_REFRESH_DATA:
      return reduceOnRefresData(state, action);
    case actions.ON_RESIZE_COLUMN:
      return reduceOnResizeColumn(state, action);
    case actions.ON_RESIZE_ROW:
      return reduceOnResizeRow(state, action);
    case actions.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    case actions.ON_VERTICAL_SCROLL_REQUEST:
      return onReduceVerticalScrollRequest(state, action);
    case actions.ON_HORIZONTAL_SCROLL_REQUEST:
      return onReduceOnHorizontalScrollRequest(state, action);
    default:
      return state;
  }
}

export default reducer;
