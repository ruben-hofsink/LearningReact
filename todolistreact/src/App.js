import React, {useState, useEffect} from 'react';
import './App.css';

//imp
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    //Run once when the app starts:
    useEffect( () => {
        getLocalTodos();
    }, []);

    const todoMatchesFilter = (todo) => {
        return filter === "all" || ((filter === "completed") === todo.completed)
    }

    const addTodo = (value) => {
        setTodos([
            ...todos,
            {
                text: value,
                completed: false,
                id: Math.random() * 1000 // gevaarlijk :)
            }
        ])
    }

    const removeTodo = (todo) => {
        setTodos(todos.filter(t => t.id !== todo.id))
    }

    const completeTodo = (todo) => {
        setTodos(todos.map(t => {
            if (t.id === todo.id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }

            return  t
        }))
    }

    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    const getLocalTodos = () => {
        if (localStorage.getItem("todos") === null) {
            setTodos([]);
        } else {
            setTodos(JSON.parse(localStorage.getItem('todos')));
        }
    }

    useEffect( () => {
        saveLocalTodos();
    }, [todos]);

    return (
        <div className="App">
            <header>
                <h1>Ruben's TodoList in React.js!</h1>
            </header>
            <Form
                onSubmit={addTodo}
                onFilterChange={setFilter}
            />
            <TodoList
                todos={todos.filter(todoMatchesFilter)}
                onCompleteTodo={completeTodo}
                onRemoveTodo={removeTodo}
            />
        </div>
    );
}

export default App;
