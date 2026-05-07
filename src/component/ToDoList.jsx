import { useState, useReducer, useCallback, useRef, useEffect } from "react"
import "./ToDoList.css"
import DataTasks from "./DataTasks"
import Modal from "./Modal"
import useMousePosition from "../hooks/useMousePosition"

const ToDoList = () => {
    const reducerTask = (tasks, action) => {
        switch (action.type) {
            case "ADD_TASK":
                // controllo se il campo è vuoto
                if (!action.payload.trim()) return tasks
                const addTask = {
                    id: Date.now(),
                    text: action.payload.trim(),
                    completed: false
                }
                return [...tasks, addTask];

            case "COMPLETE_TASK":
                return tasks.map(task => {
                    if (task.id === action.payload) return { ...task, completed: !task.completed }
                    return task
                })

            case "DELETE_TASK" :
                return tasks.filter(task => {
                    return task.id !== action.payload
                })

            default:
                return tasks;
        }
    }

    const [taskText, setTaskText] = useState("")
    const initialTaskState = JSON.parse(localStorage.getItem("tasks")) || [{
        id: Date.now(),
        text: "andare in palestra",
        completed: false
    }]

    const [tasks, dispatch] = useReducer(reducerTask, initialTaskState)

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const inputRef = useRef()
    const handleAddTask = useCallback(() => {
        dispatch({ type: "ADD_TASK", payload: taskText });
        setTaskText("")
        inputRef.current.select()
    }, [taskText])

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)

    const {x, y} = useMousePosition()

    return (
        <>
            <input type="text"
                placeholder="aggiungi qualcosa"
                ref={inputRef}
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)} />
            <button className="btn-add-task" onClick={handleAddTask}>Aggiungi</button>

            <div className="task-section">
                {tasks.map((task) => (
                <div key={task.id} className="task-item">
                    <p
                    className={task.completed ? "completed" : ""}
                    onClick={() => dispatch({ type: "COMPLETE_TASK", payload: task.id })}>
                    {task.text}
                </p>
                <button className="btn-delete" onClick={() => {
                    setTaskToDelete(task.id)
                    setShowDeleteModal(true)
                }}>
                        Elimina
                    </button>
                </div>
            ))}
            </div>
            {taskToDelete && (
                    <Modal 
                    title= "Conferma eliminazione"
                    content= "sei sicuro di voler cancellare questa task?"
                    show= {showDeleteModal}
                    onClose= {() => setShowDeleteModal(false)}
                    onConfirm= {() => {
                        dispatch({
                            type: "DELETE_TASK",
                            payload: taskToDelete
                        })
                        setShowDeleteModal(false)
                    }}/>
                )}

            {/* data tasks */}
            <div className="data-section">
                <DataTasks tasks={tasks}/>
                <p>X: {x} Y: {y}</p>
            </div>
        </>
    )
}

export default ToDoList