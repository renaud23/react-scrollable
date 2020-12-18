import React, { useState, useCallback, useEffect } from "react";
import { RowablePortal } from "../../react-rowable";

// function empty() {}

function Dragger({ node, parent, clientX, clientY, onClose, children }) {
  const [rect, setRect] = useState({});
  const { top, left, height, width, offsetX, offsetY } = rect;

  const onMouseMove = useCallback(
    function (e) {
      const { clientX, clientY } = e;

      const top = clientY - offsetY;
      const left = clientX - offsetX;
      setRect({ width, height, offsetX, offsetY, top, left });
    },
    [width, height, offsetX, offsetY]
  );

  const onMouseUp = useCallback(
    function (e) {
      const { clientX, clientY } = e;
      onClose(true, { target: e.target, clientX, clientY });
    },
    [onClose]
  );

  useEffect(
    function () {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    },
    [onMouseMove, onMouseUp]
  );

  useEffect(
    function () {
      if (node) {
        const {
          width,
          height,
          top: nTop,
          left: nLeft,
        } = node.getBoundingClientRect();
        const { top: pTop, left: pLeft } = parent.getBoundingClientRect();

        const top = nTop - pTop;
        const left = nLeft - pLeft;
        const offsetX = clientX - left;
        const offsetY = clientY - top;
        setRect({ width, height, top, left, offsetX, offsetY });
      }
    },
    [node, parent, clientX, clientY]
  );

  if (width && height) {
    return (
      <RowablePortal>
        <div className="dragger" style={{ top, left, width, height }}>
          {children}
        </div>
      </RowablePortal>
    );
  }
  return null;
}

export default Dragger;
