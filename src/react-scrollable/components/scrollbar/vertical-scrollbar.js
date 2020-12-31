import React from "react";
import Scrollbar from "./scrollbar";

function VerticalScrollbar({ buttonProvider }) {
  return <Scrollbar horizontal={false} buttonProvider={buttonProvider} />;
}

export default VerticalScrollbar;
