import React, { useState, useCallback } from "react";
import { useResizeObserver } from "../commons-scrollable";
import ReactScrollable from "../react-scrollable";
import Content from "./content";
import "./react-large-drawable.scss";

/** */
function ReactLargeDrawble({ backBuffer }) {
  const { width, height } = backBuffer;
  const [offscreenSize, setOffscreenSize] = useState([0, 0]);
  const [offscreenWidth, offscreenHeight] = offscreenSize;
  const [position, setPosition] = useState([0, 0]);
  const [x, y] = position;

  const onResize = useCallback(function (w, h) {
    setOffscreenSize([w, h]);

    return [w, h];
  }, []);

  const onHorizontalScroll = useCallback(
    function (percent) {
      setPosition([Math.trunc((width - offscreenWidth) * percent), y]);
    },
    [offscreenWidth, width, y]
  );

  const onVerticalScroll = useCallback(
    function (percent) {
      setPosition([x, Math.trunc((height - offscreenHeight) * percent)]);
    },
    [offscreenHeight, height, x]
  );

  const containerEl = useResizeObserver(onResize);

  return (
    <div className="react-large-drawable">
      <ReactScrollable
        maxWidth={width}
        maxHeight={height}
        refWidth={offscreenWidth}
        refHeight={offscreenHeight}
        onVerticalScroll={onVerticalScroll}
        onHorizontalScroll={onHorizontalScroll}
      >
        <Content
          ref={containerEl}
          width={width}
          height={height}
          x={x}
          y={y}
          offscreenWidth={offscreenWidth}
          offscreenHeight={offscreenHeight}
          backBuffer={backBuffer}
        />
      </ReactScrollable>
    </div>
  );
}

export default ReactLargeDrawble;
