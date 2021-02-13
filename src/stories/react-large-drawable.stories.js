import React, { useEffect, useState } from "react";
import ReactLargeDrawable from "../react-large-drawable";
import { createBackBuffer } from "./rendering";
import { create, draw, drawWalker, createWalker } from "./maze.js";

const SPEED = 10;
const BUFFER_WIDTH = 2000;
const BUFFER_HEIGHT = 1000;
const MAZE_WIDTH = 200;
const MAZE_HEIGHT = 100;

export function Example() {
  const [buffer, setBuffer] = useState(undefined);
  const [maze, setMaze] = useState(undefined);
  const [before, setBefore] = useState(-1);
  const [position, setPosition] = useState(-1);
  const [end, setEnd] = useState(true);

  useEffect(
    function () {
      if (end) {
        setMaze(create(MAZE_WIDTH, MAZE_HEIGHT));
        setPosition(-1);
        setBefore(-1);
        setEnd(false);
      }
    },
    [end]
  );

  useEffect(
    function () {
      let task;
      if (maze) {
        const walk = createWalker(maze);
        task = window.setInterval(function () {
          const [current, old] = walk();
          if (current !== old && buffer) {
            buffer.frame = new Date().getTime();
            setBefore(old);
            setPosition(current);
          } else {
            setEnd(true);
          }
        }, SPEED);
      }
      return function () {
        if (task) {
          window.clearInterval(task);
        }
      };
    },
    [maze, buffer]
  );

  useEffect(
    function () {
      if (maze && buffer) {
        drawWalker(buffer, maze, position, before);
      }
    },
    [buffer, maze, position, before]
  );

  useEffect(
    function () {
      if (maze) {
        const buff = createBackBuffer(BUFFER_WIDTH, BUFFER_HEIGHT);
        draw(buff, maze);
        setBuffer(buff);
      }
    },
    [maze]
  );

  useEffect(function () {}, [buffer, position]);

  if (!buffer) {
    return null;
  }
  return <ReactLargeDrawable backBuffer={buffer} />;
}

export default {
  title: "react-large-drawable",
  component: ReactLargeDrawable,
  argTypes: {},
};
