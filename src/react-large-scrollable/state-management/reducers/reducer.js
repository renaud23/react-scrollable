import * as actions from "../actions";
import reduceOnResize from "./reduce-on-resize";
import reduceOnVerticalScroll from "./reduce-on-vertical-scroll";
import reduceOnHorizontalScroll from "./reduce-on-horizontal-scroll";
import reduceOnRefreshVerticalScrollable from "./reduce-on-refresh-vertical-scrollable";
import reduceOnRefreshHorizontalScrollable from "./reduce-on-refresh-horizontal-scrollable";
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
    case actions.ON_REFRESH_VERTICAL_SCROLLABLE:
      return reduceOnRefreshVerticalScrollable(state, action);
    case actions.ON_REFRESH_HORIZONTAL_SCROLLABLE:
      return reduceOnRefreshHorizontalScrollable(state, action);
    case actions.ON_KEY_DOWN:
      return reduceOnKeydown(state, action);
    default:
      return state;
  }
}

export default function (state, action) {
  const next = reduce(state, action);
  // console.log({ action, next });
  return next;
}
