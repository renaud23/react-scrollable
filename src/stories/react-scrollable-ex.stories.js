import React, { useState, useCallback } from "react";
import ReactScrollableEx from "../react-scrollable-ex";
import "./custom-scrollable.scss";

function CreateOne({ width, height, verticalScrollRequest, onVerticalScroll }) {
  return (
    <div className="simple-scrollable-example">
      <ReactScrollableEx
        maxWidth={width}
        maxHeight={height}
        onHorizontalScroll={() => null}
        onVerticalScroll={onVerticalScroll}
        verticalScrollRequest={verticalScrollRequest}
      >
        <div className="content">{`${width} x ${height}`}</div>
      </ReactScrollableEx>
    </div>
  );
}

export function ScrollableExExample() {
  const [verticalScrollPercent, setVerticalScrollPercent] = useState(0);
  const [verticalScrollRequest, setVerticalScrollRequest] = useState(undefined);
  const onUp = useCallback(
    function () {
      setVerticalScrollRequest({ percent: verticalScrollPercent + 0.1 });
    },
    [verticalScrollPercent]
  );
  const onDown = useCallback(
    function () {
      setVerticalScrollRequest({ percent: verticalScrollPercent - 0.1 });
    },
    [verticalScrollPercent]
  );
  return (
    <>
      <div className="toolbar">
        <button className="fab" onClick={onUp}>
          +
        </button>
        <button className="fab" onClick={onDown}>
          -
        </button>
        <input type="text" disabled={true} value={verticalScrollPercent} />
      </div>
      <CreateOne
        width={6000}
        height={30000}
        verticalScrollRequest={verticalScrollRequest}
        onVerticalScroll={function (percent) {
          setVerticalScrollPercent(percent);
        }}
      />
    </>
  );
}

export default {
  title: "react-scrollable-ex",
  component: ReactScrollableEx,
  argTypes: {},
};
