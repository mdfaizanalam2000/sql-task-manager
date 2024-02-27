import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EditTask = () => {
    const navigate = useNavigate()
    const [task, setTask] = useState({
        task_id: "",
        title: "",
        description: "",
        due_date: "",
        status: ""
    })

    useEffect(() => {
        const loadTask = async () => {
            const response = await fetch(`http://127.0.0.1:8000/getTask?task_id=${localStorage.getItem("taskid")}`)
            const data = await response.json()
            setTask(data[0])
        }
        loadTask()
    }, [])

    const handleOnChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const handleSaveEdit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://127.0.0.1:8000/updateTask?task_id=${task.task_id}`, {
            method: "put",
            body: JSON.stringify(task)
        })
        const data = await response.json()
        if (data.message === "success") {
            toast("Changes saved!")
            navigate("/dashboard")
        } else {
            toast("Oops, Couldn't update task!")
        }
    }

    return (
        <div className="container">
            <form className='my-3' onSubmit={handleSaveEdit}>
                <div className="mb-3">
                    <label htmlFor="task_id" className="form-label">Task ID (cannot be edited)</label>
                    <input disabled name="task_id" onChange={handleOnChange} value={task.task_id} required type="number" className="form-control" id="task_id" />
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
                    <select name="status" onChange={handleOnChange} value={task.status} required className="form-control" id="status" >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="marked for review">Mark for review</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    )
}

export default EditTask