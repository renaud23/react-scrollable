import React, { useState, useCallback } from "react";
import ReactScrollableEx from "../react-scrollable-ex";
import "./custom-scrollable.scss";

function CreateOne({ width, height }) {
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
      <div className="simple-scrollable-example">
        <ReactScrollableEx
          maxWidth={width}
          maxHeight={height}
          onHorizontalScroll={() => null}
          onVerticalScroll={function (percent) {
            setVerticalScrollPercent(percent);
          }}
          verticalScrollRequest={verticalScrollRequest}
        >
          <div className="content">{`${width}px X ${height}px`}</div>
        </ReactScrollableEx>
      </div>
    </>
  );
}

export function ScrollableExExample() {
  return <CreateOne width={6000} height={30000} />;
}

export function ScrollableSmallExExample() {
  return <CreateOne width={150} height={150} />;
}

export default {
  title: "react-scrollable-ex",
  component: ReactScrollableEx,
  argTypes: {},
};