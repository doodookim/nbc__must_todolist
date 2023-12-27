import { configureStore } from '@reduxjs/toolkit';
import MustTodoReducer from './MustTodoSlice';
export const store = configureStore({
  reducer: {
    todo: MustTodoReducer
  }
});
