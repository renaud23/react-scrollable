import React, { useEffect, useCallback, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./track.scss";

function getStyle(vertical, pos) {
  if (vertical) {
    return { left: pos };
  }
  return { top: pos };
}

function Track({ onTrack, vertical, horizontal, right, left, top, bottom }) {
  const [track, setTrack] = useState(false);
  const [clientPos, setClientPos] = useState(undefined);
  const onmousemove = useCallback(
    function (e) {
      if (track) {
        if (vertical) {
          setClientPos(e.clientX);
          onTrack(e.clientX - clientPos);
        } else {
          setClientPos(e.clientY);
          onTrack(e.clientY - clientPos);
        }
      }
    },
    [track, vertical, clientPos, onTrack]
  );
  const onmousedown = useCallback(
    function (e) {
      setTrack(true);
      e.stopPropagation();

      if (vertical) {
        setClientPos(e.clientX);
      } else {
        setClientPos(e.clientY);
      }
    },
    [vertical]
  );
  const onmouseup = useCallback(
    function (e) {
      if (track) {
        e.stopPropagation();
        setTrack(false);
      }
    },
    [track]
  );

  useEffect(function () {
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("mouseup", onmouseup);
    return function () {
      window.removeEventListener("mousemove", onmousemove);
      window.removeEventListener("mouseup", onmouseup);
    };
  });

  const style = getStyle(vertical, clientPos);
  return (
    <div
      aria-hidden="true"
      className={classnames("react-large-table-track", {
        vertical,
        horizontal: horizontal,
        right,
        left,
        top,
        bottom,
      })}
      onMouseDown={onmousedown}
    >
      {track ? (
        <div
          className={classnames("track-bar", { vertical, horizontal })}
          style={style}
        ></div>
      ) : null}
    </div>
  );
}

Track.propTypes = {
  onTrack: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
};

Track.defaultProps = {
  vertical: false,
  right: false,
  left: false,
  horizontal: false,
  bottom: false,
  top: false,
};

export default Track;
