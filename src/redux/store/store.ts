import { configureStore } from '@reduxjs/toolkit';
import MustTodoReducer from '../modules/MustTodoSlice';
export const store = configureStore({
  reducer: {
    todo: MustTodoReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
