import { useEffect, useState } from "react"
import { NewTodoForm } from "./components/NewTodoForm"
import { TodoList } from "./components/TodoList"
import "./style/styles.css"
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Index from './pages/index.jsx';
import Teste from './pages/teste.jsx';
import Login from "./Pages/Login";
import Register from "./Pages/Register";




export default function App() {

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  return (
    <>
      <Outlet />
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/register" element={< Register />} />
          <Route path="/index"
            element={
              <>
                <NewTodoForm onSubmit={addTodo} />
                <h1 className="header">Todo List</h1>
                <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
              </>
            } />
          <Route path="/teste" element={<Teste />} />
        </Routes>
      </Router>
    </>
  )
}
