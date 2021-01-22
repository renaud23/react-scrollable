import React, { useState, useCallback, useEffect, useRef } from "react";
import { createBackBuffer, createDrawer } from "./rendering";
import { useResizeObserver } from "../commons-scrollable";
import ReactScrollable from "../react-scrollable";
import "./react-large-drawable.scss";

function filled(drawer) {
  const { width, height, fillRect } = drawer;
  const size = 30;
  const dw = Math.ceil(width / size);
  const dh = Math.ceil(height / size);

  new Array(dw * dh).fill(null).forEach(function (_, i) {
    const x = i % dw;
    const y = Math.trunc(i / dw);
    const color =
      (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)
        ? "#ff00ff"
        : "#ffff00";

    fillRect(color, x * size, y * size, size, size);
  });
}

const Content = React.forwardRef(function (
  { width, height, offscreenWidth, offscreenHeight, x, y },
  containerEl
) {
  const canvasEl = useRef();
  const [drag, setDrag] = useState(false);
  const [drawer, setDrawer] = useState(undefined);
  const { current } = canvasEl;

  useEffect(
    function () {
      let buff;
      if (width && height) {
        buff = createBackBuffer(width, height);
        const drawer = createDrawer(buff);
        filled(drawer);
        setDrawer(drawer);
      }
    },
    [width, height]
  );

  const render = useCallback(
    function () {
      if (drawer && current) {
        const ctx = current.getContext("2d");
        drawer.drawInContext(ctx, x, y, offscreenWidth, offscreenHeight);
      }
    },
    [drawer, current, x, y, offscreenWidth, offscreenHeight]
  );

  useEffect(
    function () {
      render();
    },
    [offscreenWidth, offscreenHeight, x, y, render]
  );

  function onMouseDown() {
    setDrag(true);
  }

  const onMouseUp = useCallback(function () {
    setDrag(false);
  }, []);

  const onMouseMove = useCallback(
    function (e) {
      if (drag) {
        const { clientX, clientY } = e;
        const { top, left } = current.getBoundingClientRect();
        const nx = x + clientX - left;
        const ny = y + clientY - top;
        drawer.fillRect("black", nx, ny, 2, 2);
        render();
      }
    },
    [drag, drawer, current, x, y, render]
  );

  useEffect(
    function () {
      document.addEventListener("mouseup", onMouseUp);
      return () => document.removeEventListener("mouseup", onMouseUp);
    },
    [onMouseUp]
  );

  if (offscreenWidth && offscreenHeight) {
    return (
      <div className="react-large-drawable-content" ref={containerEl}>
        <canvas
          width={offscreenWidth}
          height={offscreenHeight}
          ref={canvasEl}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
        />
      </div>
    );
  }
  return <div className="react-large-drawable-content" ref={containerEl}></div>;
});

/** */
function ReactLargeDrawble({ width, height }) {
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
        />
      </ReactScrollable>
    </div>
  );
}

export default ReactLargeDrawble;
