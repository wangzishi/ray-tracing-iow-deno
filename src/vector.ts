import { EPSILON } from './constants.ts';
import { Scalar } from './scalar.ts';

/**
 * 以三元组形式表示的三维向量。
 */
export type Vector3Tuple = [x: number, y: number, z: number];

/**
 * 用以保存表示 (x, y, z) 向量数据的类。
 * `Vector3` 是三维图像中的主要对象，它既可以表示一个空间内的点，
 * 也可以表示一个方向。
 *
 * ![一个三维向量](https://upload.wikimedia.org/wikipedia/commons/f/fd/3D_Vector.svg)
 *
 * **Note:** Diva 使用左手坐标系。
 */
export class Vector3 {
  /**
   * 创建一个各坐标为 0 的零向量。
   * @returns 创建的新向量
   */
  static Zero(): Vector3 {
    return new Vector3(0.0, 0.0, 0.0);
  }

  /**
   * 对给定的向量执行在各分量上做最小操作，并返回新结果向量。
   *
   * @param vec1 向量1
   * @param vec2 向量2
   * @returns 最小操作结果向量
   */
  static Min(vec1: Vector3, vec2: Vector3): Vector3 {
    return new Vector3(
      vec1.#x < vec2.#x ? vec1.#x : vec2.#x,
      vec1.#y < vec2.#y ? vec1.#y : vec2.#y,
      vec1.#z < vec2.#z ? vec1.#z : vec2.#z,
    );
  }

  /**
   * 对给定的向量执行在各分量上做最大操作，并返回新结果向量。
   *
   * @param vec1 向量1
   * @param vec2 向量2
   * @returns 最大操作结果向量
   */
  static Max(vec1: Vector3, vec2: Vector3): Vector3 {
    return new Vector3(
      vec1.#x > vec2.#x ? vec1.#x : vec2.#x,
      vec1.#y > vec2.#y ? vec1.#y : vec2.#y,
      vec1.#z > vec2.#z ? vec1.#z : vec2.#z,
    );
  }

  #x: number;
  #y: number;
  #z: number;

  /** 获取 x 坐标 */
  get x(): number {
    return this.#x;
  }
  /** 设置 x 坐标 */
  set x(value: number) {
    this.#x = value;
  }

  /** 获取 y 坐标 */
  get y(): number {
    return this.#y;
  }
  /** 设置 y 坐标 */
  set y(value: number) {
    this.#y = value;
  }

  /** 获取 z 坐标 */
  get z(): number {
    return this.#z;
  }
  /** 设置 z 坐标 */
  set z(value: number) {
    this.#z = value;
  }

  /** 获取向量长度（模） */
  get length(): number {
    return Math.sqrt(this.#x * this.#x + this.#y * this.#y + this.#z * this.#z);
  }

  /**
   * 获取元组形式的向量数组。
   * @returns `[x:number, y:number, z:number]`
   */
  get tuple(): Vector3Tuple {
    return [this.x, this.y, this.z];
  }

  /**
   * 根据给定的 x, y, z 坐标创建一个三位向量。
   * @param x x 轴坐标
   * @param y y 轴坐标
   * @param z z 轴坐标
   */
  constructor(x = 0, y = 0, z = 0) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  /**
   * 从当前向量克隆创建新向量。
   * @returns 新的向量
   */
  public clone(): Vector3 {
    return new Vector3(this.#x, this.#y, this.#z);
  }

  /**
   * 从源向量复制更新当前向量。
   * @param source 复制源向量或者向量坐标元组
   * @returns 当前更新后的向量
   */
  public copyFrom(source: Vector3Tuple): this;
  public copyFrom(source: Vector3): this;
  public copyFrom(source: Vector3 | Vector3Tuple): this {
    if (source instanceof Vector3) {
      this.#x = source.#x;
      this.#y = source.#y;
      this.#z = source.#z;
    } else {
      this.#x = source[0];
      this.#y = source[1];
      this.#z = source[2];
    }

    return this;
  }

  public min(vec: Vector3): Vector3 {
    return Vector3.Min(this, vec);
  }

  public minInPlace(vec: Vector3): this {
    return this.copyFrom(Vector3.Min(this, vec));
  }

  public max(vec: Vector3): Vector3 {
    return Vector3.Max(this, vec);
  }

  public maxInPlace(vec: Vector3): this {
    return this.copyFrom(Vector3.Max(this, vec));
  }

  /**
   * 使当前坐标加上目标坐标。
   * @param vector 加和向量坐标
   * @returns 当前计算更新后的向量
   */
  public addInPlace(vector: Vector3): this {
    this.#x += vector.#x;
    this.#y += vector.#y;
    this.#z += vector.#z;
    return this;
  }

  /**
   * 获取一个新的坐标，表示当前坐标与目标坐标的向量和。
   * @param vector 加和向量坐标
   * @returns 新的向量
   */
  public add(vector: Vector3): Vector3 {
    return new Vector3(this.#x + vector.#x, this.#y + vector.#y, this.#z + vector.#z);
  }

  /**
   * 使当前坐标减去目标坐标。
   * @param vector 做差向量坐标
   * @returns 当前计算更新后的向量
   */
  public subtractInPlace(vector: Vector3): this {
    this.#x -= vector.#x;
    this.#y -= vector.#y;
    this.#z -= vector.#z;
    return this;
  }

  /**
   * 获取一个新的坐标，表示当前坐标与目标坐标的向量差。
   * @param vector 做差向量坐标
   * @returns 新的向量
   */
  public subtract(vector: Vector3): Vector3 {
    return new Vector3(this.#x - vector.#x, this.#y - vector.#y, this.#z - vector.#z);
  }

  /**
   * 将当前坐标作为原点向量进行缩放。
   * @param scalar 缩放比例
   * @returns 当前更新后的向量
   */
  public scaleInPlace(scalar: number): this {
    this.#x *= scalar;
    this.#y *= scalar;
    this.#z *= scalar;

    return this;
  }

  /**
   * 用一个新的坐标表示当前坐标作为原点向量进行缩放后的位置。
   * @param scale 缩放比例
   * @returns 一个缩放后新的向量
   */
  public scale(scale: number): Vector3 {
    return new Vector3(this.#x * scale, this.#y * scale, this.#z * scale);
  }

  /**
   * 计算距离目标向量的距离值。
   * @param target
   */
  public distanceFrom(target: Vector3): number {
    const x = this.#x - target.#x;
    const y = this.#y - target.#y;
    const z = this.#z - target.#z;
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  /**
   * 将当前向量标准化（归一化）。
   * @returns 当前更新后的向量
   */
  public normalizeInPlace(): this {
    const length = this.length;
    if (length === 0.0 || length === 1.0) return this;
    return this.scaleInPlace(1.0 / length);
  }

  /**
   * 获取当前向量标准化的单位向量。
   * @returns 一个标准化的新向量
   */
  public normalize(): Vector3 {
    return new Vector3().copyFrom(this).normalizeInPlace();
  }

  /**
   * 计算当前向量与另一个向量的叉乘乘积。
   *
   * @param vector 计算叉乘的另一个向量。
   * @returns 两向量的叉乘乘积向量。
   */
  public crossProduct(vector: Vector3): Vector3 {
    return new Vector3(
      this.#y * vector.#z - this.#z * vector.#y,
      this.#z * vector.#x - this.#x * vector.#z,
      this.#x * vector.#y - this.#y * vector.#x,
    );
  }

  /**
   * 判断当前向量与指定向量是否严格相等。
   * @param vector 指定相比较的向量
   * @returns 判断结果
   */
  public equals(vector: Vector3): boolean {
    return vector && vector.#x === this.#x && vector.#y === this.#y && vector.#z === this.#z;
  }

  /**
   * 判断当前向量与指定向量是否在机械极小值（默认 0.001）误差范围内相等。
   * @param vector 指定相比较的向量
   * @param epsilon 机械极小值（默认 0.001）
   * @returns 判断结果
   */
  public equalsWithEpsilon(vector: Vector3, epsilon = EPSILON): boolean {
    return (
      vector &&
      Scalar.WithinEpsilon(vector.#x, this.#x, epsilon) &&
      Scalar.WithinEpsilon(vector.#y, this.#y, epsilon) &&
      Scalar.WithinEpsilon(vector.#z, this.#z, epsilon)
    );
  }

  /**
   * 以自身为起始状态，参数传入的向量为终止状态，按指定浮点梯度进行线性插值。
   * @param end 终止状态的向量
   * @param gradient 插值梯度，取值 0~1
   * @returns 新的插值向量
   */
  public lerpTo(end: Vector3, gradient: number): Vector3 {
    return new Vector3(
      this.#x + (end.#x - this.#x) * gradient,
      this.#y + (end.#y - this.#y) * gradient,
      this.#z + (end.#z - this.#z) * gradient,
    );
  }
}
