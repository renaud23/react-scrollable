import * as actions from "../actions";
import reduceOnUpdateProps from "./reduce-on-update-props";
import reduceOnFocus from "./reduce-on-focus";
import reduceOnBlur from "./reduce-on-blur";
import reduceOnKeyDown from "./reduce-on-keydown";
import reduceOnResize from "./reduce-on-resize";
import reduceOnVerticalScroll from "./reduce-on-vertical-scroll";
import reduceOnHorizontalScroll from "./reduce-on-horizontal-scroll";
import reduceOnSelect from "./reduce-on-select";
import reduceOnClickSelection from "./reduce-on-click-selection";
import reduceOnExpendPanel from "./reduce-on-expend-panel";
import reduceOnChangeDisplayedItems from "./reduce-on-change-displayed-items";
import reduceOnChangeSearch from "./reduce-on-change-search";

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
    case actions.ON_RESIZE:
      return reduceOnResize(state, action);
    case actions.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    case actions.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    case actions.ON_SELECT:
      return reduceOnSelect(state, action);
    case actions.ON_CLICK_SELECTION:
      return reduceOnClickSelection(state, action);
    case actions.ON_EXPEND_PANEL:
      return reduceOnExpendPanel(state, action);
    case actions.ON_CHANGE_DISPLAYED_ITEMS:
      return reduceOnChangeDisplayedItems(state, action);
    case actions.ON_CHANGE_SEARCH:
      return reduceOnChangeSearch(state, action);
    default:
      return state;
  }
}

export default reducer;
