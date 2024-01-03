// store.ts
import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../../features/loading/loadingSlice';
import MustTodoReducer from '../modules/MustTodoSlice';

export const store = configureStore({
  reducer: {
    todo: MustTodoReducer,
    loading: loadingReducer // 로딩 리듀서 추가
  }
});

export type RootState = ReturnType<typeof store.getState>;
