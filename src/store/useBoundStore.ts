import { create } from 'zustand'
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'
import { createBoardSlice, BoardSliceType } from './BoardSlice'
import { createGameSlice, GameSliceType } from "./GameSlice";
import { createSavedPatternSlice, SavedPatternSliceType } from "./savedPatternSlice";


export const useBoundStore = create<SavedPatternSliceType & BoardSliceType & GameSliceType>()(subscribeWithSelector((...props) => ({

      ...createBoardSlice(...props),
      ...createGameSlice(...props),
      ...persist<SavedPatternSliceType>(createSavedPatternSlice, {
        name: 'GOLSavedPatterns',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          savedPatterns: state.savedPatterns,
          savePattern: state.savePattern,
          deletePattern: state.deletePattern
        }),
      },)(...props)
    })
  )
)
