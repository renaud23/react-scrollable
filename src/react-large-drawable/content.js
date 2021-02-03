import React, { useCallback, useRef, useEffect } from "react";

function Content(
  { backBuffer, offscreenWidth, offscreenHeight, x, y },
  containerEl
) {
  const canvasEl = useRef();
  const { current } = canvasEl;
  const { frame } = backBuffer;

  const render = useCallback(
    function () {
      if (current && backBuffer) {
        const context = current.getContext("2d");
        context.drawImage(
          backBuffer,
          x,
          y,
          offscreenWidth,
          offscreenHeight,
          0,
          0,
          offscreenWidth,
          offscreenHeight
        );
      }
    },
    [backBuffer, current, x, y, offscreenWidth, offscreenHeight]
  );

  useEffect(
    function () {
      render();
    },
    [offscreenWidth, offscreenHeight, x, y, frame, render]
  );

  if (offscreenWidth && offscreenHeight) {
    return (
      <div className="react-large-drawable-content" ref={containerEl}>
        <canvas
          width={offscreenWidth}
          height={offscreenHeight}
          ref={canvasEl}
        />
      </div>
    );
  }
  return <div className="react-large-drawable-content" ref={containerEl}></div>;
}

export default React.forwardRef(Content);
