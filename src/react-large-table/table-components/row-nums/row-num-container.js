import React from "react";
import { safeCss } from "../../../commons-scrollable";

function RowNumContainer({ children, headerHeight, margin }) {
  return (
    <div className="row-nums">
      <div
        className="header-corner-container"
        style={{ height: safeCss(headerHeight) }}
        aria-hidden={true}
      >
        <div className="header-corner"></div>
      </div>
      <div className="row-nums-body">
        <div className="row-nums-list" style={{ marginTop: safeCss(margin) }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default RowNumContainer;
