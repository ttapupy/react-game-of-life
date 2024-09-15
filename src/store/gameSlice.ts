import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GameSliceType {
  active: boolean;
  loaded: boolean;
  started: boolean;
  round: number;
  columns: number | null;
  rows: number | null;
  initialized: boolean;
}

const initialState: GameSliceType = {
  active: false,
  loaded: false,
  started: false,
  round: 0,
  columns: null,
  rows: null,
  initialized: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setStarted: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
    },
    setRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload;
    },
    setDimensions: (state, action: PayloadAction<{ columns: number; rows: number }>) => {
      state.columns = action.payload.columns;
      state.rows = action.payload.rows;
    },
    setInitialized: (state, action: PayloadAction<boolean>): void => {
      state.initialized = action.payload;
    },
  },
});

export const { setActive, setLoaded, setStarted, setRound, setInitialized, setDimensions } =
  gameSlice.actions;

export default gameSlice.reducer;
