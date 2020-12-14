import React, { useCallback, useState } from "react";
import ReactLargeText from "../react-large-text";
import TEXT from "./text";
import "./custom-scrollable.scss";

export function LargeText() {
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
  title: "react-large-text",
  component: ReactLargeText,
  argTypes: {},
};
