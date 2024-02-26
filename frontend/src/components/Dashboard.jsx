import React, { useEffect, useState } from 'react'

const Dashboard = ({ userProfile }) => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const loadTasks = async () => {
            const response = await fetch(`http://127.0.0.1:8000/getAllTasksByUser?user_id=${localStorage.getItem("userid")}`)
            const data = await response.json()
            setTasks(data.tasks)
        }
        loadTasks()
    }, [])


    return (
        <>
            <h3 className='text-center my-3'>Hello and welcome {userProfile.name}, find your list of tasks below:-</h3>
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">SNo</th>
                        <th scope="col">TaskID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
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
                            <td>{task.status}</td>
                        </tr>
                    }) : <tr><td colSpan={6} className='text-center'>No task for this user</td></tr>}
                </tbody>
            </table>
        </>
    )
}

export default Dashboard