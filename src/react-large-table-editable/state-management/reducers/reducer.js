import * as actions from "../actions";
import reduceOnUpdateData from "./reduce-on-update-data";
// import reduceOnSelectRow from "./reduce-on-select-row";
// import reduceOnSelectColumn from "./reduce-on-select-column";
import reduceOnResetSelection from "./reduce-on-reset-selection";
import reduceOnStartDrag from "./reduce-on-start-drag";
import reduceOnExpendDrag from "./reduce-on-expend-drag";
import reduceOnStopDrag from "./reduce-on-stop-drag";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_UPDATE_DATA:
      return reduceOnUpdateData(state, action);
    // case actions.ON_SELECT_ROW:
    //   return reduceOnSelectRow(state, action);
    // case actions.ON_SELECT_COLUMN:
    //   return reduceOnSelectColumn(state, action);
    case actions.ON_RESET_SELECTION:
      return reduceOnResetSelection(state, action);
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
