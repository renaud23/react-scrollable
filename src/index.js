import React from "react";
import ReactDOM from "react-dom";
import ReactLargeText from "./react-large-text";
import OffsetChar from "./offset-char";
import getRandomText from "./random-random-text";
import "./custom-scrollable.scss";

const largeText = getRandomText(10000);

/* **** */
ReactDOM.render(
  <OffsetChar>
    <ReactLargeText value={largeText} lineHeight={22} />
  </OffsetChar>,
  document.getElementById("root")
);
