import type { StateCreator } from "zustand";
import boardReducer from "../boardReducer";
import type { CellValue, ICell } from "@/pages/SmartBoard";

export type BoardActionKind = "INIT" | "WRITE" | "STEP" | "LOAD";

export type Payload = {
  width?: number | null;
  height?: number | null;
  column?: number;
  row?: number;
  value?: CellValue;
  drawSize?: number;
  boardToLoad?: number[][];
};

export interface BoardAction {
  type: BoardActionKind;
  payload?: Payload;
}

export interface BoardSliceType {
  board: ICell[][] | null;
  columns: number | null;
  rows: number | null;
  dispatchBoard: (args: BoardAction) => void;
  setDimensions: ({ columns, rows }: { columns: number; rows: number }) => void;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  getCell: (row: number, column: number) => ICell | null;
}

const initialState: ICell[][] | null = null;

export const initBoard = (
  dispatch: (args: BoardAction) => void,
  payload: Payload,
) => {
  dispatch({ type: "INIT", payload });
};
export const stepBoard = (dispatch: (args: BoardAction) => void) => {
  dispatch({ type: "STEP" });
};
export const writeBoard = (
  dispatch: (args: BoardAction) => void,
  payload: Payload,
) => {
  dispatch({ type: "WRITE", payload });
};
export const loadBoard = (
  dispatch: (args: BoardAction) => void,
  payload: Payload,
) => {
  dispatch({ type: "LOAD", payload });
};

export const createBoardSlice: StateCreator<
  BoardSliceType | null,
  [],
  [],
  BoardSliceType
> = (set, get) => ({
  board: initialState,
  columns: null,
  rows: null,
  dispatchBoard: (args) =>
    set((state) => ({ board: boardReducer(state?.board || null, args) })),
  setDimensions: ({ columns, rows }: { columns: number; rows: number }) =>
    set({ columns, rows }),
  initialized: false,
  setInitialized: (initialized: boolean) => set({ initialized }),
  getCell: (row: number, column: number) => {
    const currentBoard = get()?.board;

    if (currentBoard) {
      return currentBoard[row][column] as ICell;
    }
    return null;
  },
});
