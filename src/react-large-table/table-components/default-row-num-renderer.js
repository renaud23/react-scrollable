import React from "react";

function RowRenderer({ index }) {
  return <div className="row">{index + 1}</div>;
}

export default React.memo(RowRenderer);
