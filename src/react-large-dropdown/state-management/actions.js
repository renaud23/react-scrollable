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
