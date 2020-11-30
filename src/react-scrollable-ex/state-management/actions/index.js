export const ON_HORIZONTAL_SCROLLBAR_RESIZE =
  "react-scrollable-ex/on-horizontal-scrollbar-resize";
export const onHorizontalScrollbarResize = (sizeMax, ref) => ({
  type: ON_HORIZONTAL_SCROLLBAR_RESIZE,
  payload: { sizeMax, ref },
});

export const ON_VERTICAL_SCROLLBAR_RESIZE =
  "react-scrollable-ex/on-vertical-scrollbar-resize";
export const onVerticalScrollbarResize = (sizeMax, ref) => ({
  type: ON_VERTICAL_SCROLLBAR_RESIZE,
  payload: { sizeMax, ref },
});

export const ON_UPDATE_PROPS = "react-scrollable-ex/on-update-props";
export const onUpdateProps = (props) => ({
  type: ON_UPDATE_PROPS,
  payload: { ...props },
});

export const ON_VERTICAL_SCROLL = "react-scrollable-ex/on-vertical-scroll";
export const onVerticalScroll = (delta) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { delta },
});

export const ON_HORIZONTAL_SCROLL = "react-scrollable-ex/on-horizontal-scroll";
export const onHorizontalScroll = (delta) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { delta },
});
