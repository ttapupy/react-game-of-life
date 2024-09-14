import { ICell } from "../pages/SmartBoard";

const emptyCell: ICell = { value: 0, row: 0, col: 0 };
export const emptyBoard: ICell[][] = Array.from({ length: 20 }, () =>
  Array.from({ length: 20 }, () => emptyCell),
);
const hasOneAliveCellBoard = [...emptyBoard];
hasOneAliveCellBoard[0][1] = { value: 1, row: 0, col: 1 };
export { hasOneAliveCellBoard };
