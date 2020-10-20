import * as actions from "../actions";
import reduceOnRefreshData from "./reduce-on-refresh-data";

function reduce(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_REFRESH_DATA:
      return reduceOnRefreshData(state, action);
    default:
      return state;
  }
}

export default reduce;
