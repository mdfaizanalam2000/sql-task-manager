import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const ChangePassword = () => {
    const navigate = useNavigate()
    const bcrypt = require("bcryptjs")

    const [password, setPassword] = useState({
        old_password: "",
        new_password: "",
        cnew_password: ""
    })

    useEffect(() => {
        if (!localStorage.getItem("userid")) {
            navigate("/login")
            return
        }
        //eslint-disable-next-line
    }, [])

    const handleOnChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const handleSaveEdit = async (e) => {
        e.preventDefault()
        if (password.new_password !== password.cnew_password) {
            toast.error("New and Confirm passwords are not matching!")
            return
        }

        const response = await fetch(`https://sql-task-manager-backend.onrender.com/getUser?user_id=${localStorage.getItem("userid")}`)
        const data = await response.json()

        if (!data.message && await bcrypt.compare(password.old_password, data[0].password)) {
            toast("Setting new password...")
            delete password.cnew_password
            delete password.old_password
            const hashedPassword = await hashPassword(password.new_password)
            delete password.new_password

            const response = await fetch(`https://sql-task-manager-backend.onrender.com/updatePassword?user_id=${localStorage.getItem("userid")}`, {
                method: "put",
                body: JSON.stringify({ new_password: hashedPassword })
            })
            const data = await response.json()

            if (data.message === "success") {
                toast.success("Password updated successfully!")
                navigate("/myProfile")
            }
            else {
                toast.error("Couldn't set new password!")
            }
        } else {
            toast.error("Old password is incorrect!");
        }
    }

    const hashPassword = async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    }

    return (
        <div className="container">
            <form className='my-3' onSubmit={handleSaveEdit}>
                <div className="mb-3">
                    <label htmlFor="old_password" className="form-label">Enter old password</label>
                    <input name="old_password" onChange={handleOnChange} value={password.old_password} required type="password" className="form-control" id="old_password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="new_password" className="form-label">Set new password</label>
                    <input name="new_password" onChange={handleOnChange} value={password.new_password} required type="password" className="form-control" id="new_password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cnew_password" className="form-label">Confirm new password</label>
                    <input name="cnew_password" onChange={handleOnChange} value={password.cnew_password} required type="password" className="form-control" id="cnew_password" />
                </div>
                <button type="submit" className="btn btn-primary me-2">Save Changes</button>
                <button onClick={() => navigate("/myProfile")} type="reset" className="btn btn-danger">Cancel</button>
            </form>
        </div>
    )
}

export default ChangePassword