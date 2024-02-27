import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

const AddTask = () => {
    const navigate = useNavigate()

    const [task, setTask] = useState({
        user_id: parseInt(localStorage.getItem("userid")),
        task_id: "",
        title: "",
        description: "",
        due_date: "",
        status: "pending"
    })

    const handleOnChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const handleCreateTask = async (e) => {
        e.preventDefault()
        const response = await fetch("http://127.0.0.1:8000/addTask", {
            method: "post",
            body: JSON.stringify({ ...task, task_id: parseInt(task.task_id) })
        })
        const data = await response.json()
        if (data.message === "success") {
            toast("Task created successfully!")
            navigate("/dashboard")
        } else {
            toast("Oops, This task id is already assigned to someone!")
        }
    }

    return (
        <div className="container">
            <form className='my-3' onSubmit={handleCreateTask}>
                <div className="mb-3">
                    <label htmlFor="task_id" className="form-label">Task ID (3 digit unique ID)</label>
                    <input max="999" name="task_id" onChange={handleOnChange} value={task.task_id} required type="number" className="form-control" id="task_id" />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input name="title" onChange={handleOnChange} value={task.title} required type="text" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input name="description" onChange={handleOnChange} value={task.description} required type="text" className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="due_date" className="form-label">Due date</label>
                    <input name="due_date" onChange={handleOnChange} value={task.due_date} required type="date" className="form-control" id="due_date" />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select name="status" onChange={handleOnChange} required className="form-control" id="status" >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="marked for review">Mark for review</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Task</button>
            </form>
        </div>
    )
}

export default AddTask