export function drawDial(
  context: CanvasRenderingContext2D,
  value: number,
  rotation: number = 0.25,
  range: number = 0.8,
  color: string = 'orange',
  bgColor: string = 'black',
) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  const pi2 = Math.PI * 2;
  const halfSize = context.canvas.width * 0.5;
  const center = { x: halfSize, y: halfSize };
  const startRadians = rotation * pi2 + (1 - range) * 0.5 * pi2;
  const endRadians = startRadians + range * pi2;
  const valueRadians = startRadians + value * (endRadians - startRadians);
  drawArc(context, startRadians, valueRadians, color, center, halfSize);
  drawArc(context, valueRadians, endRadians, bgColor, center, halfSize);
}

export function drawArc(
  context: CanvasRenderingContext2D,
  startRadians: number,
  endRadians: number,
  color: string,
  center: { x: number; y: number },
  radius: number,
  lineWidth: number = 16,
) {
  context.beginPath();
  context.arc(center.x, center.y, radius - lineWidth * 0.5, startRadians, endRadians);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
  context.closePath();
}
