import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CellValue } from "@/pages/SmartBoard";

const storageKey = "GOLSavedPatterns";

const initialState: CellValue[][][] = window.localStorage.getItem(storageKey)
  ? JSON.parse(window.localStorage.getItem(storageKey) as string)
  : ([] as CellValue[][][]);

const saveToStorage = (state: CellValue[][][]) => {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
};

export const savedPatternSlice = createSlice({
  name: "savedPatterns",
  initialState,
  reducers: {
    savePattern: (state, action: PayloadAction<CellValue[][]>) => {
      state.push(action.payload);
      saveToStorage(state);
    },
    deletePattern: (state, action: PayloadAction<number>) => {
      const newState = state.filter((_: CellValue[][], i: number) => i !== action.payload);
      saveToStorage(newState);
      return newState;
    },
  },
});

export const { savePattern, deletePattern } = savedPatternSlice.actions;

export default savedPatternSlice.reducer;
