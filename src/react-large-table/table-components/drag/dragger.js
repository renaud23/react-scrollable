import React, { useState, useCallback, useEffect } from "react";
import { RowablePortal } from "../../../react-rowable";
import { isInBoundingRect } from "../../commons-table";

const PORTAL_SIZE = 18;

export const PORTAL_NAMES = {
  top: "portal/top",
  bottom: "portal/bottom",
  left: "portal/left",
  right: "portal/right",
};

function empty() {}

function checkPortal(clientX, clientY, pRect, onEnter, onExit) {
  if (isInBoundingRect(clientX, clientY, pRect)) {
    const { left: pLeft, width: pWidth, top: pTop, height: pHeight } = pRect;
    if (clientX >= pLeft + pWidth - PORTAL_SIZE) {
      onEnter(PORTAL_NAMES.right);
    } else if (clientX <= pLeft + PORTAL_SIZE) {
      onEnter(PORTAL_NAMES.left);
    } else if (clientY >= pTop + pHeight - PORTAL_SIZE) {
      onEnter(PORTAL_NAMES.bottom);
    } else if (clientY <= pTop + PORTAL_SIZE) {
      onEnter(PORTAL_NAMES.top);
    } else {
      onExit();
    }
  }
}

function Dragger({
  node,
  parent,
  clientX,
  clientY,
  onClose,
  onEnterPortal,
  onExitPortal,
  onDrag,
  children,
}) {
  const [rect, setRect] = useState({});
  const [onPortal, setOnPortal] = useState(false);
  const { top, left, height, width, offsetX, offsetY } = rect;

  const onEnter = useCallback(
    function (where) {
      if (!onPortal) {
        onEnterPortal(where);
        setOnPortal(true);
      }
    },
    [onPortal, onEnterPortal]
  );
  const onExit = useCallback(
    function () {
      if (onPortal) {
        onExitPortal();
        setOnPortal(false);
      }
    },
    [onPortal, onExitPortal]
  );

  const onMouseMove = useCallback(
    function (e) {
      const { clientX, clientY } = e;
      const pRect = parent.getBoundingClientRect();
      checkPortal(clientX, clientY, pRect, onEnter, onExit);
      const top = clientY - offsetY;
      const left = clientX - offsetX;
      setRect({ width, height, offsetX, offsetY, top, left });
      onDrag({ clientX, clientY });
    },
    [parent, width, height, offsetX, offsetY, onEnter, onExit, onDrag]
  );

  const onMouseUp = useCallback(
    function (e) {
      const { clientX, clientY } = e;
      if (onPortal) {
        onExitPortal();
      }
      onClose(true, { target: e.target, clientX, clientY });
    },
    [onClose, onExitPortal, onPortal]
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

Dragger.defaultProps = {
  onClose: empty,
  onEnterPortal: empty,
  onExitPortal: empty,
  onDrag: empty,
};

export default Dragger;
