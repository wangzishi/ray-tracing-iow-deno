import { Ray } from "./ray.ts";
import { Vector3 } from "./vector.ts";
const writeImage = (
  data: Uint8ClampedArray,
  opts: { width: number; height: number },
): void => {
  const dv = new DataView(data.buffer);
  const pixels = opts.width * opts.height;
  const lines = [
    "P3",
    `${opts.width} ${opts.height}`,
    "255",
  ];
  for (let i = 0; i < pixels; i++) {
    const r = dv.getUint8(i * 3 + 0);
    const g = dv.getUint8(i * 3 + 1);
    const b = dv.getUint8(i * 3 + 2);
    lines.push(`${r} ${g} ${b}`);
  }
  const te = new TextEncoder();
  Deno.stdout.writeSync(te.encode(lines.join("\n")));
};

const rayColor = (ray: Ray) => {
  const t = (ray.direction.y + 1) * 0.5;
  return new Vector3(256, 256, 256).scaleInPlace(1 - t).addInPlace(
    new Vector3(256 * 0.5, 256 * 0.7, 255).scaleInPlace(t),
  );
};

const aspectRatio = 16 / 9;
const imageWidth = 400;
const imageHeight = Math.floor(imageWidth / aspectRatio);

const viewportHeight = 2;
const viewportWidth = aspectRatio * viewportHeight;
const focalLength = 1;

const origin = Vector3.Zero();
const horizontal = new Vector3(viewportWidth, 0, 0);
const vertical = new Vector3(0, viewportHeight, 0);
const lowerLeftCorner = origin.subtract(horizontal.scale(0.5)).subtract(
  vertical.scale(0.5),
).subtract(new Vector3(0, 0, focalLength));

const data = new Uint8ClampedArray(imageWidth * imageHeight * 3);

const dv = new DataView(data.buffer);
let k = 0;
for (let j = imageHeight - 1; j >= 0; --j) {
  for (let i = 0; i < imageWidth; ++i) {
    const u = i / (imageWidth - 1);
    const v = j / (imageHeight - 1);
    const direction = lowerLeftCorner.add(horizontal.scale(u)).add(
      vertical.scale(v),
    ).subtract(origin);
    const ray = new Ray(origin, direction);
    const color = rayColor(ray);
    // console.log(color.tuple);
    dv.setUint8(k++, color.x);
    dv.setUint8(k++, color.y);
    dv.setUint8(k++, color.z);
  }
}

// const ray = new Ray(Vector3.Zero(), new Vector3(1, 2, 3));

// console.log(ray.at(-1).tuple);
// console.log(ray.at(0).tuple);
// console.log(ray.at(1).tuple);
// console.log(ray.at(2).tuple);
writeImage(data, { width: imageWidth, height: imageHeight });
