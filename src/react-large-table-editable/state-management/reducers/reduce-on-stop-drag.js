import { getSelection } from "../selection";

function reduce(state) {
  const { anchor, extent } = state;
  return {
    ...state,
    drag: false,
    anchor: undefined,
    extent: undefined,
    selection: getSelection(anchor, extent),
  };
}

export default reduce;
