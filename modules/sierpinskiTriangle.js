import { createCanvas, drawPoint } from "./canvas.js";
import { CONFIG } from "./config.js";

const VERTICES = [
  { x: 0, y: CONFIG.SIZE - CONFIG.POINT_SIZE },
  { x: CONFIG.SIZE - CONFIG.POINT_SIZE, y: CONFIG.SIZE - CONFIG.POINT_SIZE },
  { x: (CONFIG.SIZE - CONFIG.POINT_SIZE) / 2, y: 0 },
];

const generateRandomNumber = (max) => Math.floor(Math.random() * (max + 1));

export const generateRandomPoint = () => {
  const x = generateRandomNumber(CONFIG.SIZE);
  const y = generateRandomNumber(CONFIG.SIZE);

  return { x, y };
};

export const getRandomVertice = () => {
  const index = generateRandomNumber(2);
  return VERTICES[index];
};

const drawVertices = () => {
  drawPoint(VERTICES[0]);
  drawPoint(VERTICES[1]);
  drawPoint(VERTICES[2]);
};

const getContainedPoint = () => {
  const [a, b, c] = VERTICES;
  const p = generateRandomPoint();
  //Sea d el segmento ab (b-a).
  const d = { x: b.x - a.x, y: b.y - a.y };
  //Sea e el segmento ac (c-a).
  const e = { x: c.x - a.x, y: c.y - a.y };

  //Variable de ponderación a~b
  const w1 = (e.x * (a.y - p.y) + e.y * (p.x - a.x)) / (d.x * e.y - d.y * e.x);

  //Variable de ponderación a~c
  const w2 = (p.y - a.y - w1 * d.y) / e.y;

  //El punto p se encuentra dentro del triángulo
  //si se cumplen las 3 condiciones:
  if (w1 >= 0.0 && w2 >= 0.0 && w1 + w2 <= 1.0) {
    //Punto dentro del triángulo
    return p;
  }
  //Punto fuera del triángulo
  return getContainedPoint();
};

const getMiddlePoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

export const buildTriangle = () => {
  createCanvas();
  drawVertices();
  const firstPoint = getContainedPoint();
  drawPoint(firstPoint);
  let point = firstPoint;

  for (let index = 0; index < CONFIG.ITERATIONS; index++) {
    const vertice = getRandomVertice();
    point = getMiddlePoint(point, vertice);
    drawPoint(point);
  }
};
