interface IPoint {
  x: number;
  y: number;
}

export function drawDial(
  context: CanvasRenderingContext2D,
  valueFactor: number,
  rotation: number = 0.25,
  range: number = 0.7,
  color: string = 'orange',
  bgColor: string = 'black',
) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  const pi2 = Math.PI * 2;
  const halfSize = context.canvas.width * 0.5;
  const center = { x: halfSize, y: halfSize };
  const startRadians = rotation * pi2 + (1 - range) * 0.5 * pi2;
  const endRadians = startRadians + range * pi2;
  const valueRadians = startRadians + valueFactor * (endRadians - startRadians);
  drawArc(context, startRadians, valueRadians, color, center, halfSize);
  drawArc(context, valueRadians, endRadians, bgColor, center, halfSize);

  drawLine(context, valueRadians, center, 1, halfSize);
}

export function drawLine(
  context: CanvasRenderingContext2D,
  radians: number,
  center: IPoint,
  inner: number,
  outer: number,
  width: number = 2,
): void {
  context.strokeStyle = 'color';
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(center.x + Math.cos(radians) * inner, center.y + Math.sin(radians) * inner);
  context.lineTo(center.x + Math.cos(radians) * outer, center.y + Math.sin(radians) * outer);
  context.stroke();
  context.closePath();
}

export function drawArc(
  context: CanvasRenderingContext2D,
  startRadians: number,
  endRadians: number,
  color: string,
  center: { x: number; y: number },
  radius: number,
  lineWidth: number = 12, // todo clean up params, move (all?) to other draw method
  outerMargin: number = 0,
) {
  context.beginPath();
  context.arc(center.x, center.y, radius - lineWidth * 0.5 - outerMargin, startRadians, endRadians);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
  context.closePath();
}
