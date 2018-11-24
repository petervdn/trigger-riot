export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

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
  number = number.toString().split('e');
  /* tslint:disable */
  number = Math.round(+(number[0] + 'e' + (number[1] ? +number[1] + precision : precision)));
  // Shift back
  number = number.toString().split('e');
  return +(number[0] + 'e' + (number[1] ? +number[1] - precision : -precision)) * sign;
  /* tslint:enable */
}
