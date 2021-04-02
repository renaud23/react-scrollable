import * as actions from "../actions";
import reduceOnResize from "./reduce-on-resize";
import reduceOnVerticalScroll from "./reduce-on-vertical-scroll";
import reduceOnHorizontalScroll from "./reduce-on-horizontal-scroll";
import reduceOnRefreshVerticalRowable from "./reduce-on-refresh-vertical-rowable";
import reduceOnRefreshHorizontalRowable from "./reduce-on-refresh-horizontal-rowable";
import reduceOnVerticalScrollRequest from "./reduce-on-vertical-scroll-request";
import reduceOnHorizontalScrollRequest from "./reduce-on-horizontal-scroll-request";
import reduceOnKeydown from "./reduce-on-keydown";

function reduce(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_RESIZE:
      return reduceOnResize(state, action);
    case actions.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    case actions.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    case actions.ON_REFRESH_VERTICAL_ROWABLE:
      return reduceOnRefreshVerticalRowable(state, action);
    case actions.ON_REFRESH_HORIZONTAL_ROWABLE:
      return reduceOnRefreshHorizontalRowable(state, action);
    case actions.ON_VERTICAL_SCROLL_REQUEST:
      return reduceOnVerticalScrollRequest(state, action);
    case actions.ON_HORIZONTAL_SCROLL_REQUEST:
      return reduceOnHorizontalScrollRequest(state, action);
    case actions.ON_KEY_DOWN:
      return reduceOnKeydown(state, action);
    default:
      return state;
  }
}

export default reduce;
