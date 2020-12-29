import React, { useState } from 'react';

const Form = (props) => {
    const [formValue, setFormValue] = useState("");

    const submitTodoHandler = (e) => {
        e.preventDefault();
        props.onSubmit(formValue)
        setFormValue("")
    }

    return(
        <form>
            <input
                value={formValue}
                onChange={e => setFormValue(e.target.value)}
                type="text"
                className="todo-input"
            />

            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>

            <div className="select">
                <select
                    onChange={e => props.onFilterChange(e.target.value)}
                    name="todos"
                    className="filter-todo"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
}

export default Form;
