import { useState, useReducer, useEffect, useCallback } from 'react'
import useBoardDimensions from './hooks/useBoardDimensions.ts';
import { CellValue, ICell } from './pages/Board.tsx'
import useLocalStorage from './hooks/useLocalStorage.ts';
import { calcDrawer } from './drawer.ts';
import { BoardContext } from './BoardContext.ts';
import useDebounce from './hooks/useDebounce.ts';
import boardReducer from './boardReducer.ts';


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


export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useReducer(boardReducer, initialState);
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { width, height }: { width: number, height: number } = useBoardDimensions('board')
  const columns = useDebounce(width, 600, !active)
  const rows = useDebounce(height, 600, !active)
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