import { actions as tableActions } from "../../react-large-table";
import * as actions from "./actions";

const create = (dispatch) => (next) => (action) => {
  const { type, payload } = action;
  switch (type) {
    case tableActions.ON_CLICK_ROW_NUM:
      const { index } = payload;
      dispatch(actions.onSelectRow(index));
      break;
    default:
      return next(action);
  }
};

export default create;
