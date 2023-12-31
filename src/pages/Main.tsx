import React, { useEffect, useState } from 'react'
import { Todo } from '../types/global';
import TodoList from '../components/TodoList';
import NoList from '../components/NoList';
import Header from '../components/Header';
import TodoContainer from '../components/TodoContainer';

const dummyData:Todo[] = [
    {
        id: "todo1",
        title: "Lorem Ipsum 1",
        complete: false
    },
    {
        id: "todo2",
        title: "Lorem Ipsum 2",
        complete: false
    },
    {
        id: "todo3",
        title: "Lorem Ipsum 3",
        complete: false
    },
]

function Home() {
    const [todo, setTodo] = useState<Todo[]>([]);

    const updateTodo = (data: Todo) => {
      
    }

    useEffect(() => {
        // setTodo(dummyData);
    }, []);

    return (
        <div className='container'>
            <div className='section'>
                <Header />
            </div>
            <div className='section main'>
                {todo.length > 0 ? <TodoContainer todo={todo} update={updateTodo}/> : <NoList />}
            </div>
        </div>
    )
}

export default Home