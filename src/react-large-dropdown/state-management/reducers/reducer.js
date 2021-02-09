import * as actions from "../actions";
import reduceOnUpdateProps from "./reduce-on-update-props";
import reduceOnFocus from "./reduce-on-focus";
import reduceOnBlur from "./reduce-on-blur";
import reduceOnKeyDown from "./reduce-on-keydown";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_UPDATE_PROPS:
      return reduceOnUpdateProps(state, action);
    case actions.ON_FOCUS:
      return reduceOnFocus(state, action);
    case actions.ON_BLUR:
      return reduceOnBlur(state, action);
    case actions.ON_KEYDOWN:
      return reduceOnKeyDown(state, action);
    default:
      return state;
  }
}

export default reducer;
