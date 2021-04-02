import React, { useState, useCallback } from "react";
import ReactScrollable from "../react-scrollable";
import { useResizeObserver } from "../commons-scrollable";
import { Switch } from "./commons-stories";
import "./custom-scrollable.scss";
import "../theme/scrollbar/cubik-theme.scss";

function CreateOne({ width, height, className }) {
  const [verticalScrollPercent, setVerticalScrollPercent] = useState(0);
  const [verticalScrollRequest, setVerticalScrollRequest] = useState(undefined);
  const [refSize, setRefSize] = useState({
    refWidth: undefined,
    refHeight: undefined,
  });
  const { refWidth, refHeight } = refSize;

  const onResize = function (width, height) {
    setRefSize({ refWidth: width, refHeight: height });
  };
  const containerEl = useResizeObserver(onResize);

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
        <button className="fab" onClick={onDown}>
          -
        </button>
        <button className="fab" onClick={onUp}>
          +
        </button>
        <input type="text" disabled={true} value={verticalScrollPercent} />
      </div>
      <div className={"simple-scrollable-example"}>
        <ReactScrollable
          maxWidth={width}
          maxHeight={height}
          refWidth={refWidth}
          refHeight={refHeight}
          className={className}
          onHorizontalScroll={() => null}
          onVerticalScroll={function (percent) {
            setVerticalScrollPercent(percent);
          }}
          verticalScrollRequest={verticalScrollRequest}
          tabIndex="-1"
        >
          <div
            className="scrollable-content-example"
            ref={containerEl}
          >{`${width}px X ${height}px`}</div>
        </ReactScrollable>
      </div>
    </>
  );
}

export function ScrollableExample() {
  return <CreateOne width={6000} height={30000} />;
}

export function ScrollableSmallExExample() {
  return <CreateOne width={150} height={150} />;
}

export function ScrollableCustomTheme() {
  const [withButtons, setWithButtons] = useState(false);
  return (
    <>
      <Switch label="With buttons" onChange={(on) => setWithButtons(on)} />
      <CreateOne
        className={withButtons ? "cubik-with-button" : "cubik-without-button"}
        width={1500}
        height={8000}
      />
    </>
  );
}

const STORY = {
  title: "react-scrollable-ex",
  component: ReactScrollable,
  argTypes: {},
};

export default STORY;
