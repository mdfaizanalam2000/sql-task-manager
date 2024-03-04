import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"

const EditProfile = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        user_id: "",
        name: "",
        domain: ""
    })

    useEffect(() => {
        if (!localStorage.getItem("userid")) {
            navigate("/login")
            return
        }

        const loadUser = async () => {
            const response = await fetch(`https://sql-task-manager-backend.onrender.com/getUser?user_id=${localStorage.getItem("userid")}`)
            const data = await response.json()
            setUser({ ...user, user_id: data[0].user_id, name: data[0].name, domain: data[0].domain })
        }
        loadUser()
        //eslint-disable-next-line
    }, [])

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSaveEdit = async (e) => {
        e.preventDefault()
        toast("Saving changes...")
        const response = await fetch(`https://sql-task-manager-backend.onrender.com/updateUser?user_id=${user.user_id}`, {
            method: "put",
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (data.message === "success") {
            toast.success("Changes saved!")
            navigate("/myProfile")
        } else {
            toast.error("Oops, Couldn't update user!")
        }
    }

    return (
        <div className="container">
            <form className='my-3' onSubmit={handleSaveEdit}>
                <div className="mb-3">
                    <label htmlFor="user_id" className="form-label">User ID (cannot be edited)</label>
                    <input disabled name="user_id" onChange={handleOnChange} value={user.user_id} required type="number" className="form-control" id="user_id" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" onChange={handleOnChange} value={user.name} required type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="domain" className="form-label">Domain</label>
                    <input name="domain" onChange={handleOnChange} value={user.domain} required type="text" className="form-control" id="domain" />
                </div>
                <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                <button onClick={() => navigate("/myProfile")} type="reset" className="btn btn-danger">Cancel</button>
            </form>
            <Link to="/updatePassword">Change password?</Link>
        </div>
    )
}

export default EditProfile