# Waar zit je logica? 
Eerste ding wat me opvalt is dat je in `App.js` een paar state objecten gebruikt welke je allemaal volledig doorgeeft aan de components.
Je `Todo` component krijgt bijvoorbeeld de volledige lijst met `todos` en volledige controlle om daar mee te doen wat hij wil `setTodos=props.setTodos`.

Het is nergens voor nodig dat je `Todo` de volledige staat van je applicatie kan zien en begrijpen. 
Het enige wat een `Todo` moet weten is is hoe zijn specifieke `todo` er uit ziet en wat er moet gebeuren als je deze verwijderd of complete.

Het is netter om dus bijvoorbeeld de volgende properties voor `Todo` te definieren:
```jsx
<Todo 
 todo={}
 onComplete={}
 onRemove={}
>
```

Stel je applicatie gaat nu iets compleet anders doen om todos bij te houden (niet meer in state maar in een externe database of niet meer in een lijst maar in een object of wat dan ook)
dan hoeft je `Todo` hier niets van te merken. Hou je components dus relatief "dom".

Op dezelfde manier wil je dus ook je `TodoList` dom houden. Een `TodoList` moet een lijst van `todos` krijgen en die laten zien.
Die hoeft niet weten hoe deze tot stand zijn gekomen (bijvoorbeeld filters). 



# Dubbele props
Je geeft aan je `Todo` nu deze props:
```jsx
<Todo
    text={todo.text}
    key={todo.id}
    completed={todo.completed}
    setTodos={props.setTodos}
    todo={todo}
    todos={props.todos}
/>
```
Je geeft bijvoorbeeld `todo` en `todo.text` los door. Dus in feite geef je `todo.text` twee keer door (zit ook in `todo`).

# saveLocalTodos
Mooi gebruik gemaakt van `useEffect`! Perfect :)
