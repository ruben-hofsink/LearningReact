import React from 'react';

import Todo from "./Todo";

const TodoList = (props) => {
    return(
        <div className="todo-container">
            <ul className="todo-list">
                {props.todos.map(todo => (
                    <Todo
                        key={todo.id}
                        onComplete={() => props.onCompleteTodo(todo)}
                        onRemove={() => props.onRemoveTodo(todo)}
                        todo={todo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
