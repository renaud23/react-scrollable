import { initializeScrollable } from "../../commons-scrollable";

const INITIAL_STATE = {
  rows: undefined,
  header: undefined,
  treeSize: false,
  headerHeight: undefined,
  rowHeight: undefined,
  rowNums: { start: undefined, nb: undefined },

  horizontal: initializeScrollable(),
  vertical: initializeScrollable(),

  focused: false,
  draggedColumn: undefined,
};

export default INITIAL_STATE;
