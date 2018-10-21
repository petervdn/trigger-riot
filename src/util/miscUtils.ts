import { IGridData, IGridItem } from '../data/interface';

export function createGridData(rows = 4, columns = 4, defaultPulseWidth = 0.25): IGridData {
  const items: Array<IGridItem> = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      items.push({
        position: { x, y },
        division: 0,
        pulseWidth: defaultPulseWidth,
      });
    }
  }

  return { items };
}
