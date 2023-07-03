import { useState, useReducer, useEffect, useCallback, createContext, useContext } from 'react'
import useBoardDimensions from './hooks/useBoardDimensions';
import { CellValue, ICell } from './pages/Board'
import useLocalStorage from './hooks/useLocalStorage';
import { calcDrawer } from './drawer';
import useDebounce from './hooks/useDebounce';
import boardReducer from './boardReducer';
import * as React from "react";


const initialState: ICell[][] | null = null

enum BoardActionKind {
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

const BoardContext = createContext(null)


const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useReducer(boardReducer, initialState);
  const [started, setStarted] = useState(false)
  const [active, setActive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { width, height }: { width: number | null, height: number | null } = useBoardDimensions('board')
  const columns: number | null = useDebounce(width, 600, !active)
  const rows: number | null = useDebounce(height, 600, !active)
  const [boardToSave, setBoardToSave] = useState<number[][] | null>(null)
  const [savedPatterns, setSavedPatterns] = useLocalStorage('GOLSavedPatterns', [])
  const [round, setRound] = useState(0)
  const maxRounds = 10;
  const drawSize = 10;


  const drawedBoard = useCallback(() => {
    if (!active && [board, rows, columns].every(e => e != null)) {
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

const useBoardContext = () => {
  return useContext(BoardContext);
}
const initBoard = (dispatch: React.Dispatch<BoardAction>, payload: BoardAction["payload"]) => {
  dispatch({ type: BoardActionKind.INIT, payload })
}
const stepBoard = (dispatch: React.Dispatch<BoardAction>) => {
  dispatch({ type: BoardActionKind.STEP })
}
const writeBoard = (dispatch: React.Dispatch<BoardAction>, payload: BoardAction["payload"]) => {
  dispatch({ type: BoardActionKind.WRITE, payload })
}
const loadBoard = (dispatch: React.Dispatch<BoardAction>, payload: BoardAction["payload"]) => {
  dispatch({ type: BoardActionKind.LOAD, payload })
}

export { BoardContext, BoardProvider, useBoardContext, initBoard, stepBoard, writeBoard, loadBoard }