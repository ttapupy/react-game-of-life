import { useState, createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import useWindowDimensions from './hooks/useWindowDimensions.js';
import { CellValue, ICell } from './pages/Board.tsx'
import { nextValue } from './gameRules.ts'
import useLocalStorage from './hooks/useLocalStorage.ts';
import { calcDrawer } from './drawer.ts';


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
        }));

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
  const [active, setActive] = useState(false)
  const { width, height }: { width: number, height: number } = useWindowDimensions()
  const calcDimension = (size: number, shrink: boolean) => (Math.floor((shrink ? 0.7 : 0.9) * size / 30) * 2)
  const [columns, setColumns] = useState(() => calcDimension(width, true))
  const [rows] = useState(() => calcDimension(height, false))
  const [boardToSave, setBoardToSave] = useState<ICell[][] | null>(null)
  const [savedPatterns, setSavedPatterns] = useLocalStorage('GOLSavedPatterns', [])
  const [round, setRound] = useState(0)
  const maxRounds = 10;
  const drawSize = 10;

  const drawedBoard = useCallback(() => {
    if (!active && board != null) {
      setBoardToSave(() => calcDrawer({ table: board, rows, columns, drawSize }))
    }
  }, [active, board, columns, rows])

  useEffect(() => {
    if (!active) {
      drawedBoard()
    }
  }, [active, drawedBoard, board])


  const savePattern = useCallback(() => {
    setSavedPatterns((prevCollection) => [boardToSave, ...(prevCollection || [])])
    alert('Pattern has been saved.')
  }, [boardToSave, setSavedPatterns])

  useEffect(() => {
    setColumns(calcDimension(width, true))
  }, [width])

  const state = { started, active, setActive, setStarted, board, setBoard, columns, rows, savePattern, savedPatterns, round, setRound, maxRounds, drawSize }

  return (
    <BoardContext.Provider value={state}>
      {children}
    </BoardContext.Provider>
  );
}