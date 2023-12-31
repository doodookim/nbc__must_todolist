import React from "react";
import { Todo } from "../types/global";
import TodoList from "./TodoList";
import ProgressBar from "./ProgressBar";

type Props = {
  todo: Todo[];
  update: (data: Todo) => void;
};
function TodoContainer({ todo, update }: Props) {
  const list = todo.map((data, index) => (
    <TodoList key={index} {...data} update={update} />
  ));

  const today = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedDate = month + "/" + day;
    return formattedDate;
  };

  return (
    <div className="container">
      <div>
        <h1>오늘({today()}) 할일이에요!!!!</h1>
      </div>
      <div className="todo-container">{list}</div>
      <ProgressBar
        total={list.length}
        current={todo.filter((d) => d.complete).length}
      />
    </div>
  );
}

export default TodoContainer;
