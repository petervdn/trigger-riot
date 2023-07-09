/**
 * Makes sure a value stays between certain bounds.
 *
 * @param value
 * @param min
 * @param max
 */
export function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// todo: what does this do
export function round(value: any, decimals: number) {
  let number: any = +value;
  const precision = decimals ? +decimals : 0;
  if (precision === 0) {
    return Math.round(number);
  }
  let sign = 1;
  if (number < 0) {
    sign = -1;
    number = Math.abs(number);
  }

  // Shift
  number = number.toString().split("e");
  /* tslint:disable */
  number = Math.round(
    +(number[0] + "e" + (number[1] ? +number[1] + precision : precision))
  );
  // Shift back
  number = number.toString().split("e");
  return (
    +(number[0] + "e" + (number[1] ? +number[1] - precision : -precision)) *
    sign
  );
  /* tslint:enable */
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number): number {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);
  return Math.floor(Math.random() * (flooredMax - ceiledMin + 1)) + ceiledMin;
}
