import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo)=>{
    setTodos((prev)=> [{id:Date.now(), ...todo }, ...prev] ) 
  }

  const updateTodo = (id, todo)=>{
    setTodos( (prev)=>prev.map((prevTodo)=>(prevTodo.id === id? todo : prevTodo )) ) 
    // setTodos( (prev)=>prev.map((prevTodo)=>{prevTodo.id === id? todo : prevTodo }) ) //wrong as { } is used
  }
  const deleteTodo = (id)=>{
    setTodos( (prev)=> prev.filter(each => each.id !== id) ) 
  }

  const toggleComplete = (id)=>{
    setTodos( (prev)=> prev.map( (each)=> each.id===id? {...each, completed:!each.completed } :each ) )
  } 

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length>0){
      setTodos(todos)
    }
    console.log(todos)
  },[])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)) 
  }, [todos])
  

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}} >
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm/>
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  { todos.map( (each)=> (
                    <div className="w-full" key={each.id} >
                      <TodoItem todo={each} />
                    </div>
                  ) ) }
              </div>
          </div>
      </div> 

    </TodoProvider>
      
  )
}

export default App
