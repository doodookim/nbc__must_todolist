import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMustTodo } from '../redux/modules/MustTodoSlice';
import { RootState } from '../redux/store/store';

const MustTodoList = () => {
  const mustTodo = useSelector((state: RootState) => state.todo.mustTodos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddMustTodo = () => {
    dispatch(
      addMustTodo({
        id: Date.now(),
        title,
        content,
        isDone: false
      })
    );
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>Must TodoList</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleAddMustTodo}>일정 등록하기</button>
      <ul>
        {mustTodo.map((todo) => {
          return (
            <div key={todo.id}>
              <li>{todo.title}</li>
              <li>{todo.content}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default MustTodoList;
