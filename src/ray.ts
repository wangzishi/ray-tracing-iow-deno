// import { Vector3 } from "https://esm.sh/@sheencity/diva-sdk-math?dev";
import { Vector3 } from "./vector.ts";
export class Ray {
  #origin: Vector3;
  #direction: Vector3;
  get origin(): Vector3 {
    return this.#origin;
  }
  get direction(): Vector3 {
    return this.#direction;
  }
  constructor(origin: Vector3, direction: Vector3) {
    this.#origin = origin;
    this.#direction = direction;
  }

  at(t: number): Vector3 {
    return this.direction.scale(t).addInPlace(this.origin);
  }
}
