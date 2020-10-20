import React, { useState } from "react";
import LargeScrollableContainer from "../react-large-scrollable";
import "./custom-scrollable.scss";

function buildScrollableData(nb, size) {
  return {
    max: nb,
    maxSize: nb * size,
    cumulsSize: new Array(nb).fill(null).reduce(
      function (a, _, i) {
        return [...a, i * size];
      },
      [0]
    ),
  };
}

function CustomScrollableComponent({
  verticalStart,
  marginTop,
  verticalNb,
  horizontalStart,
  marginLeft,
  horizontalNb,
}) {
  return (
    <div className="simple-scrollable-example-content">
      <ul>
        <li>horizontal is scroll to {horizontalStart} of logical columns.</li>
        <li>vertical is scroll to {verticalStart} of logical columns.</li>
        <li>
          {verticalNb} elements can be draw vertically with a top margin of{" "}
          {marginTop} px.
        </li>
        <li>
          {horizontalNb} elements can be draw horizontally with a left margin of{" "}
          {marginLeft} px.
        </li>
      </ul>
    </div>
  );
}

export function LargeContainer() {
  const [vertical] = useState(buildScrollableData(1000, 20));
  const [horizontal] = useState(buildScrollableData(1000, 20));
  return (
    <>
      <p>
        Use a scrollable container and inject data in child component for
        creating scrollable components.
      </p>
      <div className="simple-scrollable-example-container">
        <LargeScrollableContainer
          id={"id"}
          vertical={vertical}
          horizontal={horizontal}
        >
          <CustomScrollableComponent />
        </LargeScrollableContainer>
      </div>
    </>
  );
}

export default {
  title: "large-react-scrollable",
  component: LargeScrollableContainer,
  argTypes: {},
};
