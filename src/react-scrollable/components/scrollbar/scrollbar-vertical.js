import React from "react";
import Scrollbar from "./scrollbar";

export default React.forwardRef(function ScrollbarVertical(props, ref) {
  return <Scrollbar ref={ref} className="vertical" {...props} vertical />;
});

// export default ScrollbarVertical;
