// import { drawSize } from "./constants";
// import { isInDrawer } from "./drawer";
// import { nextValue } from "./gameRules";
// import type { ICell } from "./pages/SmartBoard";
// import { Payload } from "@/store/boardSlice";
//
// export type BoardActionKind = "INIT" | "WRITE" | "STEP" | "LOAD";
//
// export interface BoardAction {
//   type: BoardActionKind;
//   payload?: Payload;
// }
//
// export default function boardReducer(
//   board: ICell[][] | null,
//   action: BoardAction,
// ): ICell[][] | null {
//   const {
//     width = 0,
//     height = 0,
//     column = 0,
//     row = 0,
//     boardToLoad = [],
//   } = action.payload ?? {
//     width: 0,
//     height: 0,
//     column: 0,
//     row: 0,
//     boardToLoad: [],
//   };
//
//   switch (action.type) {
//     case "INIT": {
//       return Array.from({ length: height || 0 }, (_, r) =>
//         Array.from({ length: width || 0 }, (_, c) => ({
//           row: r,
//           col: c,
//           value: 0,
//         })),
//       );
//     }
//     case "LOAD": {
//       return Array.from({ length: height || 0 }, (_, r) =>
//         Array.from({ length: width || 0 }, (_, c) => {
//           const currentValue =
//             isInDrawer({ drawSize, side: height || 0, index: r }) &&
//             isInDrawer({
//               drawSize,
//               side: width || 0,
//               index: c,
//             })
//               ? boardToLoad[r - ((height || 0) - drawSize) / 2][c - ((width || 0) - drawSize) / 2]
//               : 0;
//
//           return { row: r, col: c, value: currentValue } as ICell;
//         }),
//       );
//     }
//     case "WRITE": {
//       if (board && row != null && column != null) {
//         const fillCell = [...board];
//         const newVal = fillCell[row][column].value === 0 ? 1 : 0;
//         fillCell[row][column] = { ...fillCell[row][column], value: newVal };
//         return fillCell;
//       }
//       return board;
//     }
//     case "STEP": {
//       return (
//         board?.map((currentRow: ICell[]) => {
//           return currentRow.map((cell: ICell) => {
//             return { ...cell, value: nextValue(cell, board) };
//           });
//         }) || null
//       );
//     }
//     default: {
//       throw Error("Unknown action: " + action.type);
//     }
//   }
// }
