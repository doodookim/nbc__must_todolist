import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// MustTodo 항목의 타입을 지정
interface MustTodo {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}
// MustTodo 상태 타입 지정
interface MustTodoState {
  mustTodos: MustTodo[];
}
// 초기 상태 지정하기
const initialState: MustTodoState = {
  mustTodos: []
};

// MustTodo 리듀서 생성하기
const MustTodoSlice = createSlice({
  name: 'mustTodo',
  initialState,
  reducers: {
    addMustTodo: (state, action: PayloadAction<MustTodo>) => {
      state.mustTodos.push(action.payload);
    }
  }
});
// 액션과 리듀서 내보내기
export const { addMustTodo } = MustTodoSlice.actions;
export default MustTodoSlice.reducer;
