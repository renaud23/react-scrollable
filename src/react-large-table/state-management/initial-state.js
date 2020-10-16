import { initializeScrollable } from "../../commons-scrollable";

const INITIAL_STATE = {
  row: undefined,
  header: undefined,
  treeSize: false,
  headerHeight: undefined,

  horizontal: initializeScrollable(),
  vertical: initializeScrollable(),
};

export default INITIAL_STATE;
