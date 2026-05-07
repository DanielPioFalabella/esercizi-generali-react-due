import "./DataTasks.css"

const DataTasks = ({tasks}) => {
    const completedTasks = tasks.filter(task => task.completed).length

    return (
        <>
        <div className="data-tasks-section">
            <p> Tasks: {tasks.length}</p>
            <p> Tasks completate: {completedTasks}</p>
        </div>
        </>
    )
}

export default DataTasks