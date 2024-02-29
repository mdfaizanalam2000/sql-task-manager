import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"

const Dashboard = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem("userid")) {
            navigate("/login")
            return
        }
        setRefreshData(false)
        const loadTasks = async () => {
            const response = await fetch(`https://sql-task-manager-backend.onrender.com/getAllTasksByUser?user_id=${localStorage.getItem("userid")}`)
            const data = await response.json()
            setTasks(data.tasks)
            setLoading(false)
        }
        loadTasks()
        //eslint-disable-next-line
    }, [refreshData])

    const handleDeleteTask = async (task_id) => {
        toast("Deleting task...")
        const response = await fetch(`https://sql-task-manager-backend.onrender.com/deleteTask?task_id=${task_id}`, {
            method: "delete"
        })
        const data = await response.json()
        if (data.message === "success") {
            toast.success("Task deleted!")
            setRefreshData(true)
        } else {
            toast.error("Oops, Couldn't delete task")
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
            <div className="container">
                <h3 className='text-center my-3'>Hello and welcome {localStorage.getItem("username")}</h3>
                <h5 className='text-center my-3'>Find your list of tasks below:-</h5>
                <div className="text-center">
                    <button onClick={() => navigate("/addTask")} className='btn btn-success'>Create new task</button>
                </div>
                {loading && <Spinner />}
                {!loading && <div className="container table-responsive">
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
                </div>}
            </div>
        </>
    )
}

export default Dashboard