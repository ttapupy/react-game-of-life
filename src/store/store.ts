import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardSliceReducer from "./boardSlice";
import gameReducer from "./gameSlice";
import savedPatternReducer from "./savedPatternSlice";

export const rootReducer = combineReducers({
  game: gameReducer,
  board: boardSliceReducer,
  savedPatterns: savedPatternReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
