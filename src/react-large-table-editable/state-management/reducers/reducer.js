import * as actions from "../actions";
import reduceOnUpdateData from "./reduce-on-update-data";
import reduceOnStartDrag from "./reduce-on-start-drag";
import reduceOnExpendDrag from "./reduce-on-expend-drag";
import reduceOnStopDrag from "./reduce-on-stop-drag";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_UPDATE_DATA:
      return reduceOnUpdateData(state, action);
    case actions.ON_START_DRAG:
      return reduceOnStartDrag(state, action);
    case actions.ON_EXPEND_DRAG:
      return reduceOnExpendDrag(state, action);
    case actions.ON_STOP_DRAG:
      return reduceOnStopDrag(state, action);
    default:
      return state;
  }
}

export default reducer;
