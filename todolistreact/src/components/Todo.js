import React from 'react';

const Todo = (props) => {
    return (
        <div className="todo">
            <li className={`todo-item ${props.todo.completed? "completed" : ""}`} >{props.todo.text}</li>
            <button onClick={props.onComplete} className="complete-btn">
                <i className='fas fa-check' />
            </button>

            <button onClick={props.onRemove} className="trash-btn">
                <i className='fas fa-trash' />
            </button>
        </div>

    );
}

export default Todo;
