import { initializeScrollable } from "../../commons-scrollable";

const INITIAL_STATE = {
  rows: undefined,
  header: undefined,
  treeSize: false,
  headerHeight: undefined,
  rowNums: { start: undefined, nb: undefined },

  horizontal: initializeScrollable(),
  vertical: initializeScrollable(),
};

export default INITIAL_STATE;
