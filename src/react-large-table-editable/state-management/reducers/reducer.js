import * as actions from "../actions";
import reduceOnUpdateData from "./reduce-on-update-data";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_UPDATE_DATA:
      return reduceOnUpdateData(state, action);
    default:
      return state;
  }
}

export default reducer;
