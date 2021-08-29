/**
 * 标量计算类
 */
export class Scalar {
  /**
   * 便于计算的 2π 常量值。
   */
  public static TwoPi = Math.PI * 2;
  /**
   * 当 a 与 b 的差值小于机械极小值（默认 1e-8）时返回 true。
   * @param a 值
   * @param b 值
   * @param epsilon 机械极小值
   * @returns 比较结果
   */
  public static WithinEpsilon(a: number, b: number, epsilon = 1e-8) {
    return Math.abs(a - b) <= epsilon;
  }

  /**
   * 将任意弧度标准化为 -π 到 π 之间的等效的弧度。
   * @param rad 需要进行标准化为弧度值
   * @returns 转换得到的弧度值
   */
  public static NormalizeRadians(rad: number): number {
    rad = rad % Scalar.TwoPi;
    rad = (rad + Scalar.TwoPi) % Scalar.TwoPi;
    if (rad > Math.PI) {
      rad -= Scalar.TwoPi;
    }

    return rad;
  }

  /**
   * 获取指定范围内的一个随机浮点数。
   * @param min 范围下限
   * @param max 范围上限
   * @returns 生成的随机数
   */
  public static RandomRange(min: number, max: number): number {
    if (min === max) return min;
    return Math.random() * (max - min) + min;
  }
}
