import { useContext } from "react";
import ReactDOM from "react-dom";
import { RowableContext } from "./state-management";

function RowablePortal({ children }) {
  const domNode = useContext(RowableContext)[2];
  return ReactDOM.createPortal(children, domNode.current);
}

export default RowablePortal;
