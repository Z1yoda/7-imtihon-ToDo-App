import './App.css'
import btn from "../src/assets/images/btn.create.svg"
import check from "../src/assets/images/check.svg"
import deleteIcon from "../src/assets/images/delete.svg"
import returnIcon from "../src/assets/images/return.svg"
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeToDo, checkToDo } from './redux/toDoSlice'
import { useRef, useState } from 'react'

function App() {
  const todos = useSelector(state => state.todo.todo)
  console.log(todos);
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [toDoCounter, setToDoCounter] = useState(0)

  function handleClick(e) {
    e.preventDefault()

    const todoValue = inputRef.current.value

    if (todoValue) {
      let todo = {
        id: Date.now(),
        toDo: todoValue,
        status: false
      };

      dispatch(addTodo(todo))
      inputRef.current.value = ""

    }
    setToDoCounter(todos.length + 1)


  }


  function handleDelete(toDoId) {
    dispatch(removeToDo(toDoId))


    setToDoCounter(todos.length - 1)
  }

  function handleCheck(id, status) {
    status = true

    dispatch(checkToDo({ id, status }))
    setToDoCounter(todos.length - 1)
  }


  function handleUnChecked(id) {

    dispatch(checkToDo({ id, status: false }));
    setToDoCounter(todos.length + 1);
  }

  return (
    <main>
      <div className="container">
        <form className='form'>
          <input ref={inputRef} className='addInput' type="text" placeholder='Add a new task' />
          <img onClick={handleClick} src={btn} alt="" />
        </form>
        <div className="todos">
          {
            toDoCounter > 0 && (
              <h3>Tasks to do-{toDoCounter}</h3>
            )
          }
          {
            todos.length > 0 && todos.map((el, index) => {
              if (el.status == false) {
                return (
                  <div key={index} className="todo">
                    <h2>{el.toDo}</h2>
                    <div className="actions">
                      <img onClick={() => handleCheck(el.id, el.status)} src={check} alt="" />
                      <img onClick={() => handleDelete(el.id)} src={deleteIcon} alt="" />
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
        <div className="doneTodos">
          <h3>Done-{todos.filter(todo => todo.status).length}</h3>
          {
            todos.length > 0 && todos.map((el, index, id) => {
              if (el.status == true) {
                return (
                  <div className="doneTodo" key={index}>
                    <h2>{el.toDo}</h2>
                    <div className="actions">
                      <img onClick={() => handleUnChecked(el.id)} src={returnIcon} alt="" />
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    </main>
  )
}

export default App
