import React from "react";
import Scrollbar from "./scrollbar";

export default React.forwardRef(function ScrollbarHorizontal(props, ref) {
  return <Scrollbar ref={ref} className="horizontal" {...props} />;
});

// export default ScrollbarHorizontal;
