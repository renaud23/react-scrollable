import React, { useState, useCallback } from "react";
import ReactScrollableEx from "../react-scrollable-ex";
import Switch from "./switch";
import "./custom-scrollable.scss";
import "./cubik-theme.scss";

function CreateOne({ width, height, className }) {
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
        <button className="fab" onClick={onDown}>
          -
        </button>
        <button className="fab" onClick={onUp}>
          +
        </button>
        <input type="text" disabled={true} value={verticalScrollPercent} />
      </div>
      <div className={"simple-scrollable-example"}>
        <ReactScrollableEx
          maxWidth={width}
          maxHeight={height}
          className={className}
          onHorizontalScroll={() => null}
          onVerticalScroll={function (percent) {
            setVerticalScrollPercent(percent || 0);
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

export default {
  title: "react-scrollable-ex",
  component: ReactScrollableEx,
  argTypes: {},
};
