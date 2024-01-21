import * as React from "react";
import useBoardRect, { DimensionsType } from "./hooks/useBoardRect";
import { CellValue, ICell } from "./pages/Board";
import useLocalStorage from "./hooks/useLocalStorage";
import { calcDrawer } from "./drawer";
import boardReducer from "./boardReducer";
import usePrevious from "./hooks/usePrevious";

const initialState: ICell[][] | null = null;

enum BoardActionKind {
  INIT = "INIT",
  WRITE = "WRITE",
  STEP = "STEP",
  LOAD = "LOAD",
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

const BoardContext = React.createContext(null);

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = React.useReducer(boardReducer, initialState);
  const [started, setStarted] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const previousLoaded = usePrevious(loaded);
  const {
    dimensions,
    setDisabledDimensions,
    boardRef,
  }: {
    dimensions: DimensionsType;
    setDisabledDimensions: React.Dispatch<React.SetStateAction<boolean>>;
    boardRef: React.MutableRefObject<HTMLDivElement | HTMLFieldSetElement>;
  } = useBoardRect(active);
  const { width: columns, height: rows } = dimensions;
  const [boardToSave, setBoardToSave] = React.useState<number[][] | null>(null);
  const [savedPatterns, setSavedPatterns] = useLocalStorage("GOLSavedPatterns", []);
  const [round, setRound] = React.useState(0);
  const maxRounds = 20;
  const drawSize = 20;

  const drawedBoard = React.useCallback(() => {
    if (!active && [board, rows, columns].every((e) => e != null)) {
      setBoardToSave(() => calcDrawer({ table: board, rows, columns, drawSize }));
    }
  }, [active, board, columns, rows]);

  React.useEffect(() => {
    if (!active) {
      drawedBoard();
    }
  }, [active, drawedBoard, board]);

  React.useEffect(() => {
    if (started || (loaded && previousLoaded) || active) {
      setDisabledDimensions(true);
    } else {
      setDisabledDimensions(false);
    }
  }, [started, active, loaded, previousLoaded, setDisabledDimensions]);

  const savePattern = React.useCallback(() => {
    setSavedPatterns((prevCollection) => [boardToSave, ...(prevCollection || [])]);
    alert("Pattern has been saved.");
  }, [boardToSave, setSavedPatterns]);

  const deletePattern = React.useCallback(
    (index: number) => {
      setSavedPatterns((prevCollection) => prevCollection.filter((_, i) => i !== index));
    },
    [setSavedPatterns]
  );

  const state = {
    boardRef,
    started,
    active,
    setActive,
    setStarted,
    board,
    setBoard,
    columns,
    rows,
    savePattern,
    savedPatterns,
    round,
    setRound,
    maxRounds,
    drawSize,
    loaded,
    setLoaded,
    deletePattern,
  };

  return <BoardContext.Provider value={state}>{children}</BoardContext.Provider>;
};

const useBoardContext = () => {
  const context = React.useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};
const initBoard = (dispatch: React.Dispatch<BoardAction>, payload: BoardAction["payload"]) => {
  dispatch({ type: BoardActionKind.INIT, payload });
};
const stepBoard = (dispatch: React.Dispatch<BoardAction>) => {
  dispatch({ type: BoardActionKind.STEP });
};
const writeBoard = (dispatch: React.Dispatch<BoardAction>, payload: BoardAction["payload"]) => {
  dispatch({ type: BoardActionKind.WRITE, payload });
};
const loadBoard = (dispatch: React.Dispatch<BoardAction>, payload: BoardAction["payload"]) => {
  dispatch({ type: BoardActionKind.LOAD, payload });
};

export { BoardContext, BoardProvider, useBoardContext, initBoard, stepBoard, writeBoard, loadBoard };
