import * as actions from "../actions";
import reduceOnInit from "./reduce-on-init";
import reduceOnResize from "./reduce-on-resize";
import {
  reduceOnVerticalStartDrag,
  reduceOnHorizontalStartDrag,
} from "./reduce-on-start-drag";
import {
  reduceOnVerticalStopDrag,
  reduceOnHorizontalStopDrag,
} from "./reduce-on-stop-drag";
import { reduceOnVerticalDrag, reduceOnHorizontalDrag } from "./reduce-on-drag";

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
    default:
      return state;
  }
}

export default (state, action) => {
  const next = reducer(state, action);
  // console.log({ action, state, next });
  return next;
};
