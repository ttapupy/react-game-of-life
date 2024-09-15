// import { StateCreator } from "zustand";
//
// export interface GameSliceType {
//   active: boolean;
//   setActive: (active: boolean) => void;
//   loaded: boolean;
//   setLoaded: (loaded: boolean) => void;
//   started: boolean;
//   setStarted: (started: boolean) => void;
//   round: number;
//   setRound: (round: number) => void;
// }
//
// export const createGameSlice: StateCreator<
//   GameSliceType | null,
//   [],
//   [],
//   GameSliceType
// > = (set) => ({
//   active: false,
//   setActive: (active: boolean) => set({ active }),
//   loaded: false,
//   setLoaded: (loaded: boolean) => set({ loaded }),
//   started: false,
//   setStarted: (started: boolean) => set({ started }),
//   round: 0,
//   setRound: (round: number) => set({ round }),
// });
