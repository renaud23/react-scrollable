import * as actions from "./actions";
import reduceOnInit from "./reduce-on-init";
import reduceOnRefreshHeader from "./reduce-on-refresh-header";
import reduceOnHorizontalScroll from "./reduce-on-horizontal-scroll";
import reduceOnVerticalScroll from "./reduce-on-vertical-scroll";
import reduceOnResize from "./reduce-on-resize";
import reduceOnRefreshColumns from "./reduce-on-refresh-columns";
import reduceOnRefreshRows from "./reduce-on-refresh-rows";
import reduceOnRefreshLines from "./on-reduce-refresh-lines";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_INIT:
      return reduceOnInit(state, action);
    case actions.ON_REFRESH_HEADER:
      return reduceOnRefreshHeader(state, action);
    case actions.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    case actions.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    case actions.ON_RESIZE:
      return reduceOnResize(state, action);
    case actions.ON_REFRESH_COLUMNS:
      return reduceOnRefreshColumns(state, action);
    case actions.ON_REFRESH_ROWS:
      return reduceOnRefreshRows(state, action);
    case actions.ON_REFRESH_LINES:
      return reduceOnRefreshLines(state, action);
    default:
      return state;
  }
}

export default reducer;
