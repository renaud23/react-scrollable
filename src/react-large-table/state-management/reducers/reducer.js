import * as actions from "../actions";
import reduceOnRefreshData from "./reduce-on-refresh-data";
import reduceOnResizeColumn from "./reduce-on-resize-column";
import reduceOnVerticalScroll from "./reducer-on-vertical-scroll";
import reduceOnResizeRow from "./reduce-on-resize-row";
import onReduceVerticalScrollRequest from "./reduce-on-vertical-scroll-request";
import onReduceOnHorizontalScrollRequest from "./reduce-on-horizontal-scroll-request";
import reduceAddEntity from "./reduce-add-entity";
import reduceRemoveEntity from "./reduce-remove-entity";
import reduceOnDrag from "./reduce-on-drag";
import reduceOnStartDrag from "./reduce-on-start-drag";
import reduceOnStopDrag from "./reduce-on-stop-drag";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_REFRESH_DATA:
      return reduceOnRefreshData(state, action);
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
    case actions.ON_START_DRAG:
      return reduceOnStartDrag(state, action);
    case actions.ON_DRAG:
      return reduceOnDrag(state, action);
    case actions.ON_STOP_DRAG:
      return reduceOnStopDrag(state, action);
    case actions.ADD_ENTITY:
      return reduceAddEntity(state, action);
    case actions.REMOVE_ENTITY:
      return reduceRemoveEntity(state, action);

    default:
      return state;
  }
}

export default reducer;
