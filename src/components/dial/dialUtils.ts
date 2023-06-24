interface IPoint {
  x: number;
  y: number;
}

/*
context: CanvasRenderingContext2D,
  valueFactor: number, // [0, 1]
  rotation: number = 0.25,
  range: number = 0.7,
  arcWidth: number = 10,
  lineInnerMargin: number = 5,
  color: string = "deepskyblue",
  bgColor: string = "black"
 */
type DrawDialProps = {
  context: CanvasRenderingContext2D;
  valueFactor: number;
  rotation?: number;
  range?: number;
  arcWidth?: number;
  lineInnerMargin?: number;
  color?: string;
  bgColor?: string;
};
export function drawDial({
  bgColor = "#555",
  color = "deepskyblue",
  context,
  valueFactor,
  lineInnerMargin = 30,
  arcWidth = 5,
  rotation = 0.25,
  range = 0.7,
}: DrawDialProps) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  const pi2 = Math.PI * 2;
  const halfSize = context.canvas.width * 0.5;
  const center = { x: halfSize, y: halfSize };
  const startRadians = rotation * pi2 + (1 - range) * 0.5 * pi2;
  const endRadians = startRadians + range * pi2;
  const valueRadians = startRadians + valueFactor * (endRadians - startRadians);
  drawArc(
    context,
    startRadians,
    valueRadians,
    color,
    center,
    halfSize,
    arcWidth
  );
  drawArc(
    context,
    valueRadians,
    endRadians,
    bgColor,
    center,
    halfSize,
    arcWidth
  );

  drawLine(context, valueRadians, center, lineInnerMargin, halfSize, "#ccc");
}

export function drawLine(
  context: CanvasRenderingContext2D,
  radians: number,
  center: IPoint,
  inner: number,
  outer: number,
  color: string,
  width: number = 4
): void {
  const inner2 = window.devicePixelRatio * inner;
  context.strokeStyle = color;
  context.lineWidth = width * window.devicePixelRatio;
  context.beginPath();
  context.moveTo(
    center.x + Math.cos(radians) * inner2,
    center.y + Math.sin(radians) * inner2
  );
  context.lineTo(
    center.x + Math.cos(radians) * outer * 0.7,
    center.y + Math.sin(radians) * outer * 0.7
  );
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
  arcWidth: number,
  outerMargin: number = 0
) {
  const width = arcWidth * window.devicePixelRatio;
  context.beginPath();
  context.arc(
    center.x,
    center.y,
    radius - width * 0.5 - outerMargin,
    startRadians,
    endRadians
  );
  context.strokeStyle = color;
  context.lineWidth = width;
  context.stroke();
  context.closePath();
}
