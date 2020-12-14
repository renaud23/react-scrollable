export const ON_HORIZONTAL_SCROLLBAR_RESIZE =
  "react-scrollable-ex/on-horizontal-scrollbar-resize";
export const onHorizontalScrollbarResize = (size, ref) => ({
  type: ON_HORIZONTAL_SCROLLBAR_RESIZE,
  payload: { size, ref },
});

export const ON_VERTICAL_SCROLLBAR_RESIZE =
  "react-scrollable-ex/on-vertical-scrollbar-resize";
export const onVerticalScrollbarResize = (size, ref) => ({
  type: ON_VERTICAL_SCROLLBAR_RESIZE,
  payload: { size, ref },
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

export const ON_VERTICAL_SCROLL_TO =
  "react-scrollable-ex/on-vertical-scroll-to";
export const onVerticalScrollTo = ({ trackPos, percent }) => ({
  type: ON_VERTICAL_SCROLL_TO,
  payload: { trackPos, percent },
});

export const ON_HORIZONTAL_SCROLL_TO =
  "react-scrollable-ex/on-horizontal-scroll-to";
export const onHorizontalScrollTo = ({ trackPos, percent }) => ({
  type: ON_HORIZONTAL_SCROLL_TO,
  payload: { trackPos, percent },
});
