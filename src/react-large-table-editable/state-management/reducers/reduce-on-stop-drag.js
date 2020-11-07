import { getSelection } from "../selection";

function reduce(state) {
  const { anchor, extent } = state;
  const { dragOutTask } = state;
  if (dragOutTask) {
    window.clearInterval(dragOutTask);
  }
  return {
    ...state,
    drag: false,
    dragOutTask: undefined,
    anchor: undefined,
    extent: undefined,
    selection: getSelection(anchor, extent),
  };
}

export default reduce;
