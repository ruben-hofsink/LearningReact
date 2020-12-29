import React from 'react';

const Todo = (props) => {

    const deleteHandler = () => {
        props.setTodos(props.todos.filter((item) => item.id !== props.todo.id));
    }

    const completedHandler = () => {
        props.setTodos(props.todos.map((item) => {
            if(item.id === props.todo.id) {
                return {
                    ...item, completed: !item.completed
                }
            }
            return item;
        }));
    }

    return (
        <div className="todo">
            <li className={`todo-item ${props.todo.completed? "completed" : ""}`} >{props.text}</li>
            <button onClick={completedHandler} className="complete-btn"><i className='fas fa-check'></i></button>
            <button onClick={deleteHandler} className="trash-btn"><i className='fas fa-trash'></i></button>
        </div>

    );
}

export default Todo;