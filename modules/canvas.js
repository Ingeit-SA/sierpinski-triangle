import { CONFIG } from "./config.js";

let ctx;

export const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.id = CONFIG.CANVAS_ID;
  canvas.width = CONFIG.SIZE;
  canvas.height = CONFIG.SIZE;

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
  ctx = canvas.getContext("2d");
};

export const drawPoint = ({ x, y }) =>
  ctx.fillRect(x, y, CONFIG.POINT_SIZE, CONFIG.POINT_SIZE);
