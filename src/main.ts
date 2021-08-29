// import { createCanvas } from "https://deno.land/x/canvas@v1.2.2/mod.ts?dev";
// import { Vector3 } from "https://esm.sh/@sheencity/diva-sdk-math";
// import { writerFromStreamWriter } from "https://deno.land/std@0.106.0/io/mod.ts";
// const canvas =  createCanvas(200, 200);
// const ctx = canvas.getContext("2d");

// ctx.fillStyle = "red";
// ctx.fillRect(10, 10, 200 - 20, 200 - 20);
// ctx.f
// await Deno.writeFile("image.png", canvas.toBuffer());

// const tes = new TextEncoderStream();

// const out = new WritableStream<Uint8Array>({
//   async write(chunk) {
//     await Deno.stdout.write(chunk);
//   },
//   close: Deno.stdout.close,
// });

// tes.readable.pipeTo(out);
// const writer = tes.writable.getWriter();

// const image_width = 256;
// const image_height = 256;

// const head = `P3
// ${image_width} ${image_height}
// 255
// `;

// await writer.write(head);
// const data = new Uint8Array(256 * 256 * 3);
// for (let j = image_height - 1; j >= 0; --j) {
//   for (let i = 0; i < image_width; ++i) {
//     const r = i / (image_height - 1);
//     const g = j / (image_width - 1);
//     const b = 0.25;
//     const ir = Math.floor(256 * r);
//     const ig = Math.floor(256 * g);
//     const ib = Math.floor(256 * b);
//     data
//     await writer.write(`${ir} ${ig} ${ib}\n`);
//   }
// }

import { Ray } from "./ray.ts";
import { Vector3 } from "./vector.ts";
const ray = new Ray(Vector3.Zero(), new Vector3(1, 1, 1).normalizeInPlace());

console.log(ray.at(1).tuple);
