export function drawStopButton(context: CanvasRenderingContext2D): void {
  const size = context.canvas.width;
  context.clearRect(0, 0, size, size);

  drawStartStopButtonCircle(context, size);
  const halfSize = size * 0.5;
  const dist = 0.3 * halfSize;
  context.beginPath();
  context.moveTo(halfSize + dist, halfSize + dist);
  context.lineTo(halfSize - dist, halfSize + dist);
  context.lineTo(halfSize - dist, halfSize - dist);
  context.lineTo(halfSize + dist, halfSize - dist);
  context.lineTo(halfSize + dist, halfSize + dist);

  context.fillStyle = "white";
  context.fill();
}

export function drawStartButton(context: CanvasRenderingContext2D): void {
  const size = context.canvas.width;
  context.clearRect(0, 0, size, size);

  drawStartStopButtonCircle(context, size);

  const halfSize = size * 0.5;
  context.beginPath();
  context.moveTo(halfSize + 0.5 * halfSize, halfSize);
  context.lineTo(halfSize - 0.3 * halfSize, halfSize - 0.5 * halfSize);
  context.lineTo(halfSize - 0.3 * halfSize, halfSize + 0.5 * halfSize);

  context.fillStyle = "white";
  context.fill();
}

function drawStartStopButtonCircle(
  context: CanvasRenderingContext2D,
  size: number
): void {
  const halfSize = size * 0.5;
  const lineWidth = 2;
  const margin = 2;
  const pi2 = Math.PI * 2;
  context.beginPath();
  context.arc(halfSize, halfSize, halfSize - 0.5 * lineWidth - margin, 0, pi2);
  context.strokeStyle = "white";
  context.lineWidth = lineWidth;
  context.stroke();
}
