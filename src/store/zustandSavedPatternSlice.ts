// import { StateCreator } from "zustand";
// import { CellValue } from "@/pages/SmartBoard";
//
// export interface SavedPatternSliceType {
//   savedPatterns: CellValue[][][];
//   savePattern: (pattern: CellValue[][]) => void;
//   deletePattern: (patternIndex: number) => void;
// }
//
// export const createSavedPatternSlice: StateCreator<
//   SavedPatternSliceType | null,
//   [],
//   [],
//   SavedPatternSliceType
// > = (set, get) => ({
//   savedPatterns: [],
//   savePattern: (pattern) => {
//     const savedPatterns = get()?.savedPatterns;
//     if (savedPatterns) {
//       set({ savedPatterns: [pattern, ...savedPatterns] });
//     }
//   },
//   deletePattern: (patternIndex) => {
//     const savedPatterns = get()?.savedPatterns;
//     if (savedPatterns) {
//       set({
//         savedPatterns: savedPatterns.filter((_, i) => i !== patternIndex),
//       });
//     }
//   },
// });
