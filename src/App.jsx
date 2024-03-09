import { useState, useEffect } from "react"
import Navbar from "./Components/Navbar"
import "./index.css"
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))

      setTodos(todos)
    }
   
  }, [])


  const toggleFinished = (e) =>{
    setshowFinished(!showFinished)
  }
  



  const saveToLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  } 


  const handleAdd = ()=>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS();
  }

  const handleDelete = (e, id) =>{
   
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS();
  }

  const handleEdit = (e, id) =>{
       let t = todos.filter(i=>i.id === id)
       setTodo(t[0].todo)
       let newTodos = todos.filter(item=>{
        return item.id!==id
      });
      setTodos(newTodos)
      saveToLS();
  }

  const handleChange = (e) =>{
   setTodo(e.target.value)
   saveToLS();
  }

  const handleCheckbox =(e) =>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
        return item.id === id;
    })
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted
      setTodos(newTodos)
      saveToLS();
  }

 

  return (
    <>
    <Navbar/>
     <div className=" md:container mx-auto my-5 rounded-x1 p-5 bg-violet-100 min-h-screen md:w-1/2">
      <h1 className="font-bold text-center text-x1">MyTodo - Manage your task at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className="text-lg font-bold ">Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" name="text" className="w-full px-2 py-1" />
        <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6">Add</button>
      </div>

      <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
   
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className="mx-5">No Todo to display</div> }
          {todos.map(item=>{


          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-3">

            <div className="flex gap-5">

            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>

            </div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2">Edit</button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2">Delete</button>
              
            </div>
          </div>
          })}
        </div>
     </div>
    </>
  )
}

export default App
