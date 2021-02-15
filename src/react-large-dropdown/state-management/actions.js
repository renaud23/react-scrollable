export const ON_UPDATE_PROPS = "react-large-dropdown/on-update-props";
export const onUpdateProps = (props) => ({
  type: ON_UPDATE_PROPS,
  payload: { ...props },
});

export const ON_FOCUS = "react-large-dropdown/on-focus";
export const onFocus = () => ({ type: ON_FOCUS });

export const ON_BLUR = "react-large-dropdown/on-blur";
export const onBlur = () => ({ type: ON_BLUR });

export const ON_KEYDOWN = "react-large-dropdown/on-keydown";
export const onKeyDown = (key) => ({ type: ON_KEYDOWN, payload: { key } });

export const ON_RESIZE = "react-large-dropdown/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { width, height },
});

export const ON_VERTICAL_SCROLL = "react-large-dropdown/on-vertical-scroll";
export const onVerticalScroll = (percent) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { percent },
});

export const ON_HORIZONTAL_SCROLL = "react-large-dropdown/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});

export const ON_SELECT = "react-large-dropdown/on-select";
export const onSelect = (index) => ({
  type: ON_SELECT,
  payload: { index },
});

export const ON_CLICK_SELECTION = "react-large-dropdown/on-click-selection";
export const onClickSelection = () => ({ type: ON_CLICK_SELECTION });

export const ON_EXPEND_PANEL = "react-large-dropdown/on-expend-panel";
export const onExpendPanel = () => ({ type: ON_EXPEND_PANEL });

export const ON_CHANGE_DISPLAYED_ITEMS =
  "react-large-dropdown/on-change-displayed-items";
export const onChangeDisplayedItems = (items, search) => ({
  type: ON_CHANGE_DISPLAYED_ITEMS,
  payload: { items, search },
});

export const ON_CHANGE_SEARCH = "react-large-dropdown/on-change-search";
export const onChangeSearch = (search) => ({
  type: ON_CHANGE_SEARCH,
  payload: { search },
});
