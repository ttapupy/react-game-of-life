import { configureStore } from "@reduxjs/toolkit";
import boardSliceReducer from "./boardSlice";
import gameReducer from "./gameSlice";
import savedPatternReducer from "./savedPatternSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    board: boardSliceReducer,
    savedPatterns: savedPatternReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
