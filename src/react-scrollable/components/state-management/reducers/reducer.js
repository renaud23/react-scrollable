import * as actions from "../actions";
import reduceOnInit from "./reduce-on-init";
import reduceOnResize from "./reduce-on-resize";
import reduceOnRefreshViewPort from "./reduce-on-refresh-viewport";
import {
  reduceOnVerticalStartDrag,
  reduceOnHorizontalStartDrag,
} from "./reduce-on-start-drag";
import {
  reduceOnVerticalStopDrag,
  reduceOnHorizontalStopDrag,
} from "./reduce-on-stop-drag";
import { reduceOnVerticalDrag, reduceOnHorizontalDrag } from "./reduce-on-drag";
import {
  reduceOnVerticalMouseDown,
  reduceOnHorizontalMouseDown,
} from "./reduce-on-mouse-down";
import {
  reduceOnVerticalScrollPercentRequest,
  reduceOnHorizontalScrollPercentRequest,
} from "./reduce-on-scroll-percent-request";
import reduceOnWheel from "./reduce-on-wheel";
import reduceOnHorizontalTouch from "./reduce-on-horizontal-touch";
import reduceOnVerticalTouch from "./reduce-on-vertical-touch";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_RESIZE:
      return reduceOnResize(state, action);
    case actions.ON_INIT:
      return reduceOnInit(state, action);

    case actions.ON_VERTICAL_START_DRAG:
      return reduceOnVerticalStartDrag(state, action);
    case actions.ON_VERTICAL_STOP_DRAG:
      return reduceOnVerticalStopDrag(state, action);
    case actions.ON_VERTICAL_DRAG:
      return reduceOnVerticalDrag(state, action);

    case actions.ON_HORIZONTAL_START_DRAG:
      return reduceOnHorizontalStartDrag(state, action);
    case actions.ON_HORIZONTAL_STOP_DRAG:
      return reduceOnHorizontalStopDrag(state, action);
    case actions.ON_HORIZONTAL_DRAG:
      return reduceOnHorizontalDrag(state, action);

    case actions.ON_REFRESH_VIEWPORT:
      return reduceOnRefreshViewPort(state, action);

    case actions.ON_VERTICAL_MOUSE_DOWN:
      return reduceOnVerticalMouseDown(state, action);
    case actions.ON_HORIZONTAL_MOUSE_DOWN:
      return reduceOnHorizontalMouseDown(state, action);

    case actions.ON_VERTICAL_SCROLL_PERCENT_REQUEST:
      return reduceOnVerticalScrollPercentRequest(state, action);
    case actions.ON_HORIZONTAL_SCROLL_PERCENT_REQUEST:
      return reduceOnHorizontalScrollPercentRequest(state, action);
    case actions.ON_WHEEL:
      return reduceOnWheel(state, action);

    case actions.ON_HORIZONTAL_TOUCH:
      return reduceOnHorizontalTouch(state, action);
    case actions.ON_VERTICAL_TOUCH:
      return reduceOnVerticalTouch(state, action);
    default:
      return state;
  }
}

export default (state, action) => {
  const next = reducer(state, action);
  // console.log({ action, state, next });
  return next;
};
