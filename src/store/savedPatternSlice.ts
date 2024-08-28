import { StateCreator } from 'zustand'
import { CellValue } from "../pages/SmartBoard";


export interface SavedPatternSliceType {
  savedPatterns: CellValue[][][];
  savePattern: (pattern: CellValue[][]) => void;
  deletePattern: (patternIndex: number) => void;
}

export const createSavedPatternSlice: StateCreator<SavedPatternSliceType | null, [], [], SavedPatternSliceType> = ((set, get) => ({
    savedPatterns: [],
    savePattern: (pattern) => set({ savedPatterns: [pattern, ...get().savedPatterns] }),
    deletePattern: (patternIndex) => set({ savedPatterns: get().savedPatterns.filter((_, i) => i !== patternIndex) }),
  }
));