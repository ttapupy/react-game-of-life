// import { create } from "zustand";
// import { createJSONStorage, devtools, persist, subscribeWithSelector } from "zustand/middleware";
// import type { BoardSliceType } from "src/store/zustandBoardSlice";
// import { createBoardSlice } from "src/store/zustandBoardSlice";
// import type { GameSliceType } from "src/store/zustandGameSlice";
// import { createGameSlice } from "src/store/zustandGameSlice";
// import { createSavedPatternSlice } from "src/store/zustandSavedPatternSlice";
// import type { SavedPatternSliceType } from "src/store/zustandSavedPatternSlice";
//
// export const useBoundStore = create<SavedPatternSliceType & BoardSliceType & GameSliceType>()(
//   devtools(
//     subscribeWithSelector((...props) => ({
//       ...createBoardSlice(...props),
//       ...createGameSlice(...props),
//       ...persist<SavedPatternSliceType>(createSavedPatternSlice, {
//         name: "GOLSavedPatterns",
//         storage: createJSONStorage(() => localStorage),
//         partialize: (state) => ({
//           savedPatterns: state.savedPatterns,
//           savePattern: state.savePattern,
//           deletePattern: state.deletePattern,
//         }),
//       })(...props),
//     })),
//   ),
// );
