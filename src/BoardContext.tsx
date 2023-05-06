import { useState, createContext, useContext, useReducer } from 'react'
import useWindowDimensions from './hooks/useWindowDimensions.js';
import { CellValue, ICell } from './pages/Board.tsx'
import { nextValue } from './gameRules.ts'


export const BoardContext = createContext(null)

export const useBoardContext = () => {
  return useContext(BoardContext);
}

const initialState: ICell[][] | null = null

export enum BoardActionKind {
  INIT = 'INIT',
  WRITE = 'WRITE',
  STEP = 'STEP'
}

export interface BoardAction {
  type: BoardActionKind;
  payload?: {
    width?: number;
    height?: number;
    column?: number;
    row?: number;
    value?: CellValue;
  };
}

function boardReducer(board: ICell[][] | null, action: BoardAction) {
  const { width, height, column, row, value } = action.payload ?? {}
  switch (action.type) {
    case 'INIT': {
      return Array.from({ length: height || 0 }, (_, r) => Array.from({ length: width || 0 }, (_, c) => ({ row: r, col: c, value: CellValue.ZERO })));
    }
    case 'WRITE': {
      if (row != null && column != null && value != null) {
        const fillCell = [...board]
        fillCell[row][column] = { ...fillCell[row][column], value }
        return fillCell;
      }
      return board;
    }
    case 'STEP': {
      return board.map((currentRow: ICell[]) => {
        return (currentRow.map((cell: ICell) => {
          return ({ ...cell, value: nextValue(cell, board) })
        }))
      })
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const BoardProvider = ({ children }) => {

  const [board, setBoard] = useReducer(boardReducer, initialState);

  const [started, setStarted] = useState(false)
  const { width, height }: { width: number, height: number } = useWindowDimensions('board-wrapper')
  const columns = Math.floor(0.9 * width / 15)
  const rows = Math.floor(height / 15)

  const state = { started, setStarted, board, setBoard, columns, rows }

  return (
    <BoardContext.Provider value={state}>
      {children}
    </BoardContext.Provider>
  );
}