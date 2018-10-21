import { IGridData } from '../data/interface';

// export function getValueAtTime(time: number, divisions: Array<number>): number {}

export function createGridData(rows = 4, columns = 4, defaultPulseWidth = 0.25): IGridData {
  const grid: IGridData = {
    items: [],
  };
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      grid.items.push({
        position: { x, y },
        division: 0,
        pulseWidth: defaultPulseWidth,
      });
    }
  }

  return grid;
}
