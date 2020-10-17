import * as actions from "./actions";

const REACT_SCROLLABLE_KEYDOWN = "react-scrollable/on-key-down";

function create(dispatch) {
  return function (state, action) {
    const { type } = action;
    if (type === REACT_SCROLLABLE_KEYDOWN) {
      const { payload } = action;
      const { key } = payload;
      dispatch(actions.onKeyDown(key));
    }
    return state;
  };
}

export default create;
