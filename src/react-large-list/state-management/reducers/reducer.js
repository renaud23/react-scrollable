import * as actions from "../actions";
import reduceOnResize from "./reduce-on-resize";
import reduceOnRefreshData from "./reduce-on-refresh-data";
import reduceOnVerticalScroll from "./reduce-on-vertical-scroll";
import reduceOnHorizontalScroll from "./reduce-on-horizontal-scroll";

function reduce(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_REFRESH_DATA:
      return reduceOnRefreshData(state, action);
    case actions.ON_RESIZE:
      return reduceOnResize(state, action);
    case actions.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    case actions.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    default:
      return state;
  }
}

export default function (state, action) {
  const next = reduce(state, action);
  // console.log({ action, next });
  return next;
}
