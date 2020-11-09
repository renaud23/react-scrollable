import * as actions from "../actions";
import reduceOnUpdateData from "./reduce-on-update-data";
import reduceOnStartDrag from "./reduce-on-start-drag";
import reduceOnDrag from "./reduce-on-drag";
import reduceOnDragOut from "./reduce-on-drag-out";
import reduceOnStopDrag from "./reduce-on-stop-drag";
import reduceOnMouseLeave from "./reduce-on-mouse-leave";
import reduceOnMouseEnter from "./reduce-on-mouse-enter";
import reduceOndragOutTaskPulse from "./reduce-on-drag-out-task-pulse";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_UPDATE_DATA:
      return reduceOnUpdateData(state, action);
    case actions.ON_START_DRAG:
      return reduceOnStartDrag(state, action);
    case actions.ON_DRAG:
      return reduceOnDrag(state, action);
    case actions.ON_DRAG_OUT:
      return reduceOnDragOut(state, action);
    case actions.ON_STOP_DRAG:
      return reduceOnStopDrag(state, action);
    case actions.ON_MOUSE_LEAVE:
      return reduceOnMouseLeave(state, action);
    case actions.ON_MOUSE_ENTER:
      return reduceOnMouseEnter(state, action);
    case actions.ON_DRAG_OUT_TASK_PULSE:
      return reduceOndragOutTaskPulse(state, action);
    default:
      return state;
  }
}

export default reducer;
