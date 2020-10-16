import * as actions from "../actions";
import reduceOnRefresData from "./reduce-on-refresh-data";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_REFRESH_DATA:
      return reduceOnRefresData(state, action);
    default:
      return state;
  }
}

export default reducer;
