import React, { useState } from "react";
import LargeScrollableContainer from "../react-large-scrollable";
import RowableScrollableContent from "./rowable-scrollable-content";
import "./custom-scrollable.scss";

function buildScrollableData(nb, size) {
  return {
    max: nb,
    maxSize: nb * size,
    cumulsSize: new Array(nb).fill(null).reduce(
      function (a, _, i) {
        return [...a, (i + 1) * size];
      },
      [0]
    ),
  };
}

export function LargeContainer() {
  const [vertical] = useState(buildScrollableData(1000, 40));
  const [horizontal] = useState(buildScrollableData(1000, 200));
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
          <RowableScrollableContent
            vertical={vertical}
            horizontal={horizontal}
          />
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
