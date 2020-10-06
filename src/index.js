import React from "react";
import ReactDOM from "react-dom";
import ReactLargeText from "./react-large-text";
import getRandomText from "./random-random-text";
import "./custom-scrollable.scss";

const largeText = getRandomText(10);

/* **** */
ReactDOM.render(
  <div className="custom-large-text">
    <ReactLargeText value={largeText} lineHeight={66} />
  </div>,
  document.getElementById("root")
);
