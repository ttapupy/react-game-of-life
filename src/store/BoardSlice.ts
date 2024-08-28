import { StateCreator } from 'zustand';
import { CellValue, ICell } from "../pages/SmartBoard";
import boardReducer from "../boardReducer";


export enum BoardActionKind {
  INIT = "INIT",
  WRITE = "WRITE",
  STEP = "STEP",
  LOAD = "LOAD",
}

export type Payload = {
  width?: number;
  height?: number;
  column?: number;
  row?: number;
  value?: CellValue;
  drawSize?: number;
  boardToLoad?: number[][];
}

export interface BoardAction {
  type: BoardActionKind;
  payload?: Payload;
}

export interface BoardSliceType {
  board: ICell[][] | null;
  columns: number | null;
  rows: number | null;
  dispatchBoard: (args: BoardAction) => void;
  setDimensions: ({ columns, rows }: { columns: number, rows: number }) => void;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  getCell: (row: number, column: number) => ICell;
}

const initialState: ICell[][] | null = null;

export const initBoard = (dispatch: (args: BoardAction) => void, payload: Payload) => {
  dispatch({ type: BoardActionKind.INIT, payload });
};
export const stepBoard = (dispatch: (args: BoardAction) => void) => {
  dispatch({ type: BoardActionKind.STEP });
};
export const writeBoard = (dispatch: (args: BoardAction) => void, payload: Payload) => {
  dispatch({ type: BoardActionKind.WRITE, payload });
};
export const loadBoard = (dispatch: (args: BoardAction) => void, payload: Payload) => {
  dispatch({ type: BoardActionKind.LOAD, payload });
};

export const createBoardSlice: StateCreator<BoardSliceType | null, [], [], BoardSliceType> = ((set, get) => {
    return (
      {
        board: initialState,
        columns: null,
        rows: null,
        dispatchBoard: (args) =>
          set((state) => ({ board: boardReducer(state.board, args) })),
        setDimensions: ({ columns, rows }: { columns: number, rows: number }) => set({ columns, rows }),
        initialized: false,
        setInitialized: (initialized: boolean) => set({ initialized }),
        getCell: (row: number, column: number) => {
          if (get().board?.[row] != null && get().board[row][column] != null) {
            return get().board[row][column]
          }
          return {
            row: 0, col: 0, value: CellValue.NONE
          }
        }
      }
    )
  }
)
