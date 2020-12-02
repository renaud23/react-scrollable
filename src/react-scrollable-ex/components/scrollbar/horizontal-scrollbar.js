import React from "react";
import Scrollbar from "./scrollbar";

function HorizontalScrollbar({ buttonProvider }) {
  return <Scrollbar horizontal={true} buttonProvider={buttonProvider} />;
}

export default HorizontalScrollbar;
