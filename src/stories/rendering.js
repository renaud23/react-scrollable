export function createBackBuffer(width, height) {
  const backBuffer = document.createElement("canvas");
  backBuffer.width = width;
  backBuffer.height = height;
  return backBuffer;
}

export function createContext(buffer) {
  return buffer.getContext("2d");
}

export const createFillRect = (context) =>
  function (color, x, y, w, h) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  };

export const createDrawImage = (context) =>
  function (texture, tx, ty, tw, th, x, y, w, h) {
    context.drawImage(texture, tx, ty, tw, th, x, y, w, h);
  };

export function createDrawLine(context) {
  return function (x1, y1, x2, y2, size = 1, color = "black") {
    context.beginPath();
    context.lineWidth = size;
    context.strokeStyle = color;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };
}

function createDrawCircle(context) {
  return function (x, y, radius, size, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    // context.fillStyle = 'green';
    // context.fill();
    context.lineWidth = size;
    context.strokeStyle = color;
    context.stroke();
  };
}

export const createDrawer = function (buffer) {
  const context = createContext(buffer);
  const { width, height } = buffer;
  const drawImage = createDrawImage(context);
  const fillRect = createFillRect(context);
  const drawLine = createDrawLine(context);
  const drawCircle = createDrawCircle(context);
  const clear = function () {
    context.clearRect(0, 0, width, height);
  };
  const drawInContext = function (ctx, x, y, w, h) {
    ctx.drawImage(buffer, x, y, w, h, 0, 0, w, h);
  };

  return {
    drawImage,
    fillRect,
    drawInContext,
    clear,
    drawLine,
    drawCircle,
    width,
    height,
  };
};

// function createRenderer(canvas, width = 512, height = 512) {
//   const backBuffer = document.createElement("canvas");
//   canvas.width = width;
//   canvas.height = height;
//   backBuffer.width = width;
//   backBuffer.height = height;
//   const bufferContext = backBuffer.getContext("2d");
//   const canvasContext = canvas.getContext("2d");

//   function render() {
//     canvasContext.drawImage(backBuffer, 0, 0);
//   }

//   const fillRect = createFillRect(bufferContext);

//   function clear(color = "#000000") {
//     fillRect(color, 0, 0, backBuffer.width, backBuffer.height);
//   }

//   const drawTexture = createTextureDrawer(bufferContext);

//   function resize(w, h) {
//     canvas.width = w;
//     canvas.height = h;
//     backBuffer.width = w;
//     backBuffer.height = h;
//   }

//   function revoke() {
//     backBuffer.remove();
//   }

//   return {
//     render,
//     drawTexture,
//     fillRect,
//     clear,
//     revoke,
//     resize,
//   };
// }

// export const createTexture = (url) => {
//   const texture = document.createElement("img");
//   texture.src = url;
//   return texture;
// };

// export const createTextureDrawer = (context) => (
//   texture,
//   tx,
//   ty,
//   tw,
//   th,
//   x,
//   y,
//   w,
//   h
// ) => {
//   context.drawImage(texture, tx, ty, tw, th, x, y, w, h);
// };

// const createFillRect = (context) => (color, x, y, w, h) => {
//   context.fillStyle = color;
//   context.fillRect(x, y, w, h);
// };

// export default createRenderer;
