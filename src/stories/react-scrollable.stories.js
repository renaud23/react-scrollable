import React, { useCallback, useState } from "react";
import ReactLargeText from "../react-large-text";
import ScrollableContainer from "../react-scrollable";
import TEXT from "./text";
import "./custom-scrollable.scss";

function SimpleScrollable({ width, height }) {
  return (
    <div className="simple-scrollable-example">
      <ScrollableContainer
        maxWidth={width}
        maxHeight={height}
        onHorizontalScroll={() => null}
        onVerticalScroll={() => null}
        verticalScrollPercentRequest={undefined}
        horizontalScrollPercentRequest={undefined}
      >
        <div className="content">{`${width} x ${height}`}</div>
      </ScrollableContainer>
    </div>
  );
}

export function LargeDrawable() {
  return <SimpleScrollable width={2000} height={15000} />;
}

export function SmallDrawable() {
  return <SimpleScrollable width={200} height={200} />;
}

export function CompleteExample() {
  /* */
  const [nb, setNb] = useState(undefined);
  const onCompute = useCallback(function (rows) {
    setNb(rows.length);
  }, []);
  return (
    <>
      <h1>Text with {nb} rows.</h1>
      <div className="large-text-container">
        <ReactLargeText value={TEXT} lineHeight={22} onCompute={onCompute} />
      </div>
      <p>
        It use a custom component and a scrollable div. You can't resize
        horizontally. Too costly.
      </p>
    </>
  );
}

export default {
  title: "react-scrollable",
  component: ScrollableContainer,
  argTypes: {},
};
