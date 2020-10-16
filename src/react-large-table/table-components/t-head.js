import React from "react";
import { safeCss } from "../../commons-scrollable";

function Thead({ children, height, marginLeft }) {
  return (
    <thead
      className="react-large-table-thead"
      style={{ height: safeCss(height), marginLeft: safeCss(marginLeft) }}
    >
      {children}
    </thead>
  );
}

export default React.memo(Thead);
