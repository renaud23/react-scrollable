import * as actions from "../actions";
import reduceOnUpdateData from "./reduce-on-update-data";
import reduceOnSelectRow from "./reduce-on-select-row";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_UPDATE_DATA:
      return reduceOnUpdateData(state, action);
    case actions.ON_SELECT_ROW:
      return reduceOnSelectRow(state, action);
    default:
      return state;
  }
}

export default reducer;
