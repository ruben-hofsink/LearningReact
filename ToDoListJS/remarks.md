# Opmerkingen
Nog even wat opmerkingen over deze TODO list :)

Grootste probleem wat ik hier zie is dat je de **state** van je applicatie in HTML en CSS bewaart.
In je Javascript leeft momenteel nergens een lijstje met TODOS. 

HTML is de weergave laag van je applicatie. Javascript heeft de logica. Deze haal je nu wat door elkaar.
- Wanneer je nu nu bijvoorbeeld wil gaan filteren over je todos moet je in je HTML zoeken in de DOM en kijken welke TODOS gerendered zijn en welke classes daar momenteel
op zijn toegepast.
- Je localstorage probeer je nu per 'event' synchroon te houden. Dus als er een TODO word gemaakt probeer je parallel deze toe te voegen aan je HTML en aan je localstorage object. Omdat je die twee nu volledig los gekoppeld hebt van elkaar moet je deze twee acties volledig los van elkaar synchroon proberen te houden wat makkelijk tot fouten en ongewenst gedrag kan leiden (zoals je al had ervaren). 
- Je hebt nu code moeten dupliceren voor het renderen van een TODO. In zowel de `addTodo(event)` functie als in de `getTodos()` functie heb je nu dezelfde code staan om een TODO te renderen.
- Op het moment dat je een TODO voltooid heeft dit alleen als gevolg dat je een CSS class toevoegt. Deze data is verder nergens meer terug te vinden (bijvoorbeeld in je localstorage). Daardoor in een voltooide TODO ook niet meer terug te zien na een page refresh.

Hier een vluchtige opzet over een andere manier om het te doen
```js
document.addEventListener('DOMContentLoaded', () => {
    //Selectors
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');
    const todoList = document.querySelector('.todo-list');
    const filterOption = document.querySelector('.filter-todo');

    todoButton.addEventListener('click', addTodo);
    filterOption.addEventListener('click', filterTodo);

    const todoData = JSON.parse(localStorage.getItem("todos") || '[]');
    onTodosUpdated();

    function onTodosUpdated() {
        // Remove all painted todos
        todoList.innerHTML = ''

        // append all TODOS to the todoList
        todoData.forEach((todo, index) => todoList.appendChild(todoDiv(todo, index)))

        // update the cache
        localStorage.setItem('todos', JSON.stringify(todoData))
    }

    function todoDiv(todo, index) {
        //MyTodo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo.value;
        newTodo.classList.add("todo-item");
        if (todo.completed) newTodo.classList.add("completed")
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        completedButton.addEventListener('click', () => completeTodo(index))
        todoDiv.appendChild(completedButton);

        //Trashcan button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        trashButton.addEventListener('click', () => removeTodo(index))
        todoDiv.appendChild(trashButton);

        return todoDiv
    }

    function removeTodo(index) {
        todoData.splice(index, 1)
        
        onTodosUpdated(todoData)
    }

    function completeTodo(index) {
        todoData[index].completed = !todoData[index].completed

        onTodosUpdated()
    }

    function addTodo(event) {
        //Prevent form from submitting
        event.preventDefault();

        todoData.push({
            value: todoInput.value,
            completed: false
        })

        //Clear the input
        todoInput.value = "";

        onTodosUpdated()
    }

    function filterTodo(e) {
        const todos = todoList.childNodes;
        todos.forEach(function (todo) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'none';
                    } else {
                        todo.style.display = 'flex';
                    }
                    break;
            }
        })
    }
});

```


Dus we houden in de applicatie op een plek bij wat de huidige staat is 
```js
const todoData = JSON.parse(localStorage.getItem("todos") || '[]');
```

Elke keer dat we een update doen op onze staat doen we een 'render' van deze staat en updated we de cache in localstorage:
```js
function onTodosUpdated() {
    // Remove all painted todos
    todoList.innerHTML = ''

    // append all TODOS to the todoList
    todoData.forEach((todo, index) => todoList.appendChild(todoDiv(todo, index)))

    // update the cache
    localStorage.setItem('todos', JSON.stringify(todoData))
}
```

We isoleren netjes de logica die bepaalt hoe een todo er uit komt te zien op ons scherm:
```js
function todoDiv(todo, index) {
        //MyTodo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // ... de rest :)

        return todoDiv
    }
```

We hangen niet een globale event listener op elke 'click' in ons hele document maar zetten netjes de juiste listeners op de juiste elementen:
```js
completedButton.addEventListener('click', () => completeTodo(index))
```

Je filter zou je nu ook netjes kunnen afhandelen in je 'onTodosUpdated()' functie door te kijken welk filter actief is en deze uit de lijst van TODOS die je laat zien te filteren.

Je bent nu wel je animatie kwijt op een delete. Dit zou je in deze opzet anders moeten opzetten, heb even niet paraat wat daar nu het handigst voor is maar dat is zeker op te lossen. Functionaliteit en logische code moet voorang hebben op het visuele :) 
