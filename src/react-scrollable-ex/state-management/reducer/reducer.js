import * as actions from "../actions";
import reduceOnVerticalScrollbarResize from "./reduce-on-vertical-scrollbar-resize";
import reduceOnHorizontalScrollbarResize from "./reduce-on-horizontal-scrollbar-resize";
import reduceOnUpdateProps from "./reduce-on-update-props";

function reducer(state, action) {
  const { type } = action;

  switch (type) {
    case actions.ON_VERTICAL_SCROLLBAR_RESIZE:
      return reduceOnVerticalScrollbarResize(state, action);
    case actions.ON_HORIZONTAL_SCROLLBAR_RESIZE:
      return reduceOnHorizontalScrollbarResize(state, action);
    case actions.ON_UPDATE_PROPS:
      return reduceOnUpdateProps(state, action);
    default:
      return state;
  }
}

export default reducer;
