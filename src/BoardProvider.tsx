import { useState, useReducer, useEffect, useCallback } from 'react'
import useWindowDimensions from './hooks/useWindowDimensions.ts';
import { CellValue, ICell } from './pages/Board.tsx'
import { nextValue } from './gameRules.ts'
import useLocalStorage from './hooks/useLocalStorage.ts';
import { calcDrawer, isInDrawer } from './drawer.ts';
import { BoardContext } from './BoardContext.ts';
import useDebounce from './hooks/useDebounce.ts';




const initialState: ICell[][] | null = null

export enum BoardActionKind {
  INIT = 'INIT',
  WRITE = 'WRITE',
  STEP = 'STEP',
  LOAD = 'LOAD',
}

export interface BoardAction {
  type: BoardActionKind;
  payload?: {
    width?: number;
    height?: number;
    column?: number;
    row?: number;
    value?: CellValue;
    drawSize?: number;
    boardToLoad?: number[][];
  };
}

function boardReducer(board: ICell[][] | null, action: BoardAction) {
  const { width, height, column, row, value, drawSize, boardToLoad } = action.payload ?? {}

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
  const [loaded, setLoaded] = useState(false)
  const { width, height }: { width: number, height: number } = useWindowDimensions()
  const calcDimension = (size: number) => (Math.floor(size / 30) * 2)
  const columns = useDebounce(calcDimension(width), 600, !started)
  const rows = useDebounce(calcDimension(height), 600, !started)
  const [boardToSave, setBoardToSave] = useState<number[][] | null>(null)
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

  const deletePattern = useCallback((index: number) => {
    setSavedPatterns((prevCollection) => prevCollection.filter((_, i) => i !== index))
  }, [setSavedPatterns])


  const state = { started, active, setActive, setStarted, board, setBoard, columns, rows, savePattern, savedPatterns, round, setRound, maxRounds, drawSize, loaded, setLoaded, deletePattern }

  return (
    <BoardContext.Provider value={state}>
      {children}
    </BoardContext.Provider>
  );
}