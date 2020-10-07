import React from "react";
import ReactLargeText from "../react-large-text";
import getRandomText from "./random-random-text";
import ScrollableContainer from "../react-scrollable";
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

  const largeText = getRandomText(10000);

  return (
    <>
      <h1>Large scrollable text of 10000 lines and a line height of 32px.</h1>
      <div className="custom-large-text">
        <ReactLargeText value={largeText} lineHeight={32} />
      </div>
      <p>It use a custom component and a scrollable div.</p>
    </>
  );
}

export default {
  title: "react-scrollable",
  component: ScrollableContainer,
  argTypes: {},
};
