import React from "react";
import ReactScrollableEx from "../react-scrollable-ex";

function CreateOne({ width, height }) {
  return (
    <div className="simple-scrollable-example">
      <ReactScrollableEx
        maxWidth={width}
        maxHeight={height}
        onHorizontalScroll={() => null}
        onVerticalScroll={() => null}
        verticalScrollPercentRequest={undefined}
        horizontalScrollPercentRequest={undefined}
      >
        <div className="content">{`${width} x ${height}`}</div>
      </ReactScrollableEx>
    </div>
  );
}

export function ScrollableExExample() {
  return <CreateOne width={6000} height={30000} />;
}

export default {
  title: "react-scrollable-ex",
  component: ReactScrollableEx,
  argTypes: {},
};
