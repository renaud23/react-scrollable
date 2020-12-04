import React from "react";
import ReactRowable from "../react-rowable";
import "./react-rowable.scss";
import "./custom-scrollable.scss";

function CustomRowableComponent({
  verticalStart,
  marginTop,
  verticalNb,
  horizontalStart,
  marginLeft,
  horizontalNb,
}) {
  return (
    <ul className="rowable-example-content">
      <li>horizontal is scroll to {horizontalStart} of logical columns.</li>
      <li>vertical is scroll to {verticalStart} of logical columns.</li>
      <li>
        {verticalNb} elements can be draw vertically with a top margin of
        {marginTop} px.
      </li>
      <li>
        {horizontalNb} elements can be draw horizontally with a left margin of
        {marginLeft} px.
      </li>
    </ul>
  );
}

export function ReactRowableDefault() {
  return (
    <div className="simple-scrollable-example-container">
      <ReactRowable>
        <CustomRowableComponent />
      </ReactRowable>
    </div>
  );
}

export default {
  title: "react-rowable",
  component: ReactRowable,
  argTypes: {},
};
