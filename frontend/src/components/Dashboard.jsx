import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

const Dashboard = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [refreshData, setRefreshData] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem("userid")) {
            navigate("/login")
            return
        }
        setRefreshData(false)
        const loadTasks = async () => {
            const response = await fetch(`http://127.0.0.1:8000/getAllTasksByUser?user_id=${localStorage.getItem("userid")}`)
            const data = await response.json()
            setTasks(data.tasks)
        }
        loadTasks()
        //eslint-disable-next-line
    }, [refreshData])

    const handleDeleteTask = async (task_id) => {
        const response = await fetch(`http://127.0.0.1:8000/deleteTask?task_id=${task_id}`, {
            method: "delete"
        })
        const data = await response.json()
        if (data.message === "success") {
            toast("Task deleted!")
            setRefreshData(true)
        } else {
            toast("Oops, Couldn't delete task")
        }
    }

    const handleEditTask = (task_id) => {
        localStorage.setItem("taskid", task_id)
        navigate("/editTask")
    }

    const getColour = (status) => {
        if (status === "completed")
            return <span className="badge text-bg-success">Completed</span>
        if (status === "pending")
            return <span className="badge text-bg-danger">Pending</span>
        if (status === "marked for review")
            return <span className="badge text-bg-warning">Marked for review</span>
    }

    return (
        <>
            <h3 className='text-center my-3'>Hello and welcome {localStorage.getItem("username")}, find your list of tasks below:-</h3>
            <div className="text-center">
                <button onClick={() => navigate("/addTask")} className='btn btn-success'>Create new task</button>
            </div>
            <div className="container table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SNo</th>
                            <th scope="col">TaskID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? tasks.map((task, index) => {
                            return <tr key={task.task_id}>
                                <th scope="row">{index + 1}</th>
                                <td>{task.task_id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.due_date}</td>
                                <td>{getColour(task.status)}</td>
                                <td><i title='edit' onClick={() => handleEditTask(task.task_id)} className="bi bi-pencil-square me-3"></i><i title='delete' onClick={() => handleDeleteTask(task.task_id)} className='bi bi-trash3 '></i></td>
                            </tr>
                        }) : <tr><td colSpan={7} className='text-center'>No task for this user</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Dashboard