import { ICell, CellValue } from "./pages/Board";
import { BoardAction } from "./BoardContext";
import { isInDrawer } from "./drawer";
import { nextValue } from "./gameRules";


export default function boardReducer(board: ICell[][] | null, action: BoardAction) {
  const { width, height, column, row, drawSize, boardToLoad } = action.payload ?? {}

  switch (action.type) {
    case 'INIT': {
      return Array.from({ length: height || 0 }, (_, r) => Array.from({ length: width || 0 }, (_, c) => ({ row: r, col: c, value: CellValue.ZERO })));
    }
    case 'LOAD': {
      return Array.from({ length: height || 0 }, (_, r) => Array.from({ length: width || 0 }, (_, c) => {
        const currentValue = isInDrawer({ drawSize, side: height, index: r }) && isInDrawer({ drawSize, side: width, index: c }) ? boardToLoad[r - ((height - drawSize) / 2)][c - ((width - drawSize) / 2)] : CellValue.ZERO

        return ({ row: r, col: c, value: currentValue })
      }
      ));
    }
    case 'WRITE': {
      if (row != null && column != null) {
        const fillCell = [...board]
        const newVal = fillCell[row][column].value === 0 ? 1 : 0
        fillCell[row][column] = { ...fillCell[row][column], value: newVal }
        return fillCell;
      }
      return board;
    }
    case 'STEP': {
      return board.map((currentRow: ICell[]) => {
        return (currentRow.map((cell: ICell) => {
          return ({ ...cell, value: nextValue(cell, board) })
        }));

      })
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}