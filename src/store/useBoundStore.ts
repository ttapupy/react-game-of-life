import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import type { BoardSliceType } from "./BoardSlice";
import { createBoardSlice } from "./BoardSlice";
import type { GameSliceType } from "./GameSlice";
import { createGameSlice } from "./GameSlice";
import type { SavedPatternSliceType } from "./savedPatternSlice";
import { createSavedPatternSlice } from "./savedPatternSlice";

export const useBoundStore = create<
  SavedPatternSliceType & BoardSliceType & GameSliceType
>()(
  devtools(
    subscribeWithSelector((...props) => ({
      ...createBoardSlice(...props),
      ...createGameSlice(...props),
      ...persist<SavedPatternSliceType>(createSavedPatternSlice, {
        name: "GOLSavedPatterns",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          savedPatterns: state.savedPatterns,
          savePattern: state.savePattern,
          deletePattern: state.deletePattern,
        }),
      })(...props),
    })),
  ),
);
