import { useState } from "react"
import "./styles.css"
import { NewtodoForm } from "./NewTodoForm"

export default function App() {
  const [todoList, setTodolist] = useState([])

  function handleSubmit(title) {
    
    setTodolist((currentTodos) => [...currentTodos, { id: Date.now(), title, completed: false }])
  }

  function toggleTodo(id, checked) {
    setTodolist(currentTodolist => currentTodolist.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    )
    )
  }

  function deleteTodo(id) {
    setTodolist(currentTodolist => currentTodolist.filter(todo => todo.id !== id))
  }

  return (
    <>
      <NewtodoForm onSubmit={handleSubmit}/>
      <h1 className="header">Todo list</h1>
      {todoList.length===0 && "No Todos"}
      <ul className="list">
        {
          todoList.map(todo => {
            return (
              <li key={todo.id}>
                <label>
                  <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
                  {todo.title}
                </label>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}