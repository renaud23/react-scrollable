import React from "react";
import { OffsetChar } from "../commons-scrollable";
import "./react-large-text.scss";

function ReactLargeText() {
  return null;
}

export default ({ value, lineHeight }) => {
  return (
    <OffsetChar>
      <ReactLargeText value={value} lineHeight={lineHeight} />
    </OffsetChar>
  );
};
