import { useState, useReducer } from "react"
import "./ToDoList.css"

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
    const initialTaskState = [{
        id: Date.now(),
        text: "andare in palestra",
        completed: false
    }]
    const [tasks, dispatch] = useReducer(reducerTask, initialTaskState)

    const handleAddTask = () => {
        dispatch({ type: "ADD_TASK", payload: taskText });
        setTaskText("")
    }


    return (
        <>
            <input type="text"
                placeholder="aggiungi qualcosa"
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
                <button className="btn-delete" onClick={() => dispatch({type: "DELETE_TASK", payload: task.id})}>Elimina</button>
                </div>
            ))}
            </div>
        </>
    )
}

export default ToDoList