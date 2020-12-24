import React, {useState, useEffect} from 'react';
import './App.css';

//imp
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    //Run once when the app starts:
    useEffect( () => {
        getLocalTodos();
    }, []);

    const filterHandler = () => {
        switch(filter) {
            case "completed":
                setFilteredTodos(todos.filter(todo => todo.completed));
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter(todo => !todo.completed));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
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
        filterHandler();
        saveLocalTodos();
    }, [todos, filter]);

    return (
        <div className="App">
            <header>
                <h1>Ruben's TodoList in React.js!</h1>
            </header>
            <Form
                todos={todos}
                setTodos={setTodos}
                setInputText={setInputText}
                inputText={inputText}
                setFilter={setFilter}
            />
            <TodoList
                todos={todos}
                setTodos={setTodos}
                filteredTodos={filteredTodos}
            />
        </div>
    );
}

export default App;
