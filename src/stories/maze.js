import { createDrawer } from "./rendering";

const NORTH_WALL = 0b0001;
const SOUTH_WALL = 0b0010;
const EAST_WALL = 0b0100;
const WEST_WALL = 0b1000;

export function isNorthWall(code) {
  return NORTH_WALL & code;
}

export function isSouthWall(code) {
  return SOUTH_WALL & code;
}

export function isEastWall(code) {
  return EAST_WALL & code;
}

export function isWestWall(code) {
  return WEST_WALL & code;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function openWall(code, wall) {
  return code & (code ^ wall);
}

function carve(laby) {
  const { width, height, data } = laby;
  const visited = [];

  let current = getRandomInt(width * height);
  const stack = [];
  let end = false;

  while (!end) {
    end = true;
    visited.push(current);
    const possible = [];

    if (
      isNorthWall(data[current]) &&
      current - width >= 0 &&
      visited.indexOf(current - width) === -1
    ) {
      possible.push([current - width, NORTH_WALL, SOUTH_WALL]);
    }

    if (
      isSouthWall(data[current]) &&
      current + width < width * height - 1 &&
      visited.indexOf(current + width) === -1
    ) {
      possible.push([current + width, SOUTH_WALL, NORTH_WALL]);
    }

    if (
      isEastWall(data[current]) &&
      current % width < width - 1 &&
      visited.indexOf(current + 1) === -1
    ) {
      possible.push([current + 1, EAST_WALL, WEST_WALL]);
    }

    if (
      isWestWall(data[current]) &&
      current % width > 0 &&
      visited.indexOf(current - 1) === -1
    ) {
      possible.push([current - 1, WEST_WALL, EAST_WALL]);
    }
    //
    if (!possible.length) {
      if (stack.length) {
        current = stack.pop();

        end = false;
      }
    } else {
      const [next, where, other] = possible[getRandomInt(possible.length)];
      data[current] = openWall(data[current], where);
      data[next] = openWall(data[next], other);
      stack.push(current);
      current = next;
      end = false;
    }
  }

  return laby;
}

export function create(width, height) {
  return carve({
    data: new Array(width * height).fill(
      NORTH_WALL | SOUTH_WALL | EAST_WALL | WEST_WALL
    ),
    width,
    height,
  });
}

function drawPosition(
  code,
  drawer,
  i,
  j,
  width,
  height,
  background = "black",
  wall = "red"
) {
  drawer.fillRect(background, i, j, width, height);
  drawer.fillRect(wall, i, j, 2, 2);
  drawer.fillRect(wall, i + width - 2, j, 2, 2);
  drawer.fillRect(wall, i, j + height - 2, 2, 2);
  drawer.fillRect(wall, i + width - 2, j + height - 2, 2, 2);
  if (isNorthWall(code)) {
    drawer.fillRect(wall, i, j, width, 2);
  }
  if (isSouthWall(code)) {
    drawer.fillRect(wall, i, j + height - 2, width, 2);
  }
  if (isEastWall(code)) {
    drawer.fillRect(wall, i + width - 2, j, 2, height);
  }
  if (isWestWall(code)) {
    drawer.fillRect(wall, i, j, 2, width);
  }
}

export function drawWalker(buffer, maze, position, before) {
  const drawer = createDrawer(buffer);
  const { width, height, data } = maze;
  const { width: buffWidth, height: buffHeight } = buffer;
  const tileHeight = Math.round(buffHeight / height);
  const tileWidth = Math.round(buffWidth / width);

  if (before !== -1) {
    const j = Math.trunc(before / width) * tileHeight;
    const i = (before % width) * tileWidth;

    drawPosition(
      data[before],
      drawer,
      i,
      j,
      tileWidth,
      tileHeight,
      "gold",
      "orange"
    );
  }

  if (position !== -1) {
    const j = Math.trunc(position / width) * tileHeight;
    const i = (position % width) * tileWidth;
    drawPosition(
      data[position],
      drawer,
      i,
      j,
      tileWidth,
      tileHeight,
      "gold",
      "orange"
    );
    drawer.fillRect("green", i + 2, j + 2, tileWidth - 4, tileHeight - 4);
  }
}

export function draw(buffer, maze) {
  const drawer = createDrawer(buffer);
  const { width, height, data } = maze;
  const { width: buffWidth, height: buffHeight } = buffer;
  const tileHeight = Math.round(buffHeight / height);
  const tileWidth = Math.round(buffWidth / width);

  data.forEach(function (code, index) {
    const j = Math.trunc(index / width) * tileHeight;
    const i = (index % width) * tileWidth;

    drawPosition(code, drawer, i, j, tileWidth, tileHeight);
  });
}

function getFreeDirections(maze, position) {
  const { data, width } = maze;
  const possible = [];
  if (!isNorthWall(data[position])) {
    possible.push(position - width);
  }

  if (!isSouthWall(data[position])) {
    possible.push(position + width);
  }

  if (!isEastWall(data[position])) {
    possible.push(position + 1);
  }

  if (!isWestWall(data[position])) {
    possible.push(position - 1);
  }
  return possible;
}

export function createWalker(maze) {
  const { width, height } = maze;
  let old = -1;
  let current = getRandomInt(width * height);
  const visited = [];
  const path = [current];

  return function () {
    visited.push(current);

    const possible = getFreeDirections(maze, current).reduce(function (a, w) {
      return visited.indexOf(w) === -1 && w !== old ? [...a, w] : a;
    }, []);

    old = current;
    if (possible.length) {
      path.push(current);
      current = possible[getRandomInt(possible.length)];
    } else if (path.length) {
      current = path.pop();
    }
    return [current, old];
  };
}
