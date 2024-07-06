import { useEffect, useState } from "react"
import "./styles.css"
import { NewtodoForm } from "./NewTodoForm"
import { sendRequest } from "./request-helper"

type Todo = {
  id: number,
  title: string,
  checked: boolean
}

export default function App() {
  const [todoList, setTodolist] = useState<Todo[] | null>(null)

  function handleSubmit(title: string) {
    let newTodo = { title, checked: false }
    sendRequest(
      "/api/todo",
      (data) => {
        setTodolist((currentTodos) => (currentTodos ? [...currentTodos, data] : [data]) as Todo[])
      },
      () => console.log("Error occured while adding todo"),
      "POST",
      JSON.stringify(newTodo)
    )
  }

  useEffect(() => {
    sendRequest(
      "api/todo/all",
      data => {console.log("Data is " + JSON.stringify(data));setTodolist(() => data as Todo[])},
      () => console.log("Couldn't fetch todos")
    )
  }, [true])

  function toggleTodo(id: number, checked: boolean) {
    sendRequest(
      `/api/todo/check?id=${id}`,
      (data) => {
        let updatedTodo = data as Todo
        setTodolist(
          currentTodolist => currentTodolist!!.map(
            (todo) => todo.id === id ? updatedTodo : todo
          )
        )
      },
      () => console.log("Failed to toggle Todo"),
      "PUT"
    )
    
  }

  function deleteTodo(id: number) {
    sendRequest(
      `/api/todo?id=${id}`,
      () => {
        setTodolist(currentTodolist => currentTodolist!!.filter(todo => todo.id !== id))
      },
      () => console.log("Failed to delete Todo"),
      "DELETE"
    )
  }

  return (
    <>
      {todoList!==null ? <NewtodoForm onSubmit={handleSubmit}/> : null}
      <h1 className="header">Todo list</h1>
      {todoList===null && "Loading..."}
      {todoList!==null && todoList.length===0 && "No Todos"}
      <ul className="list">
        {
          todoList!==null ? todoList.map(todo => {
            return (
              <li key={todo.id}>
                <label>
                  <input type="checkbox" checked={todo.checked} onChange={e => toggleTodo(todo.id!!, e.target.checked)} />
                  {todo.title}
                </label>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            )
          }) : null
        }
      </ul>
    </>
  )
}