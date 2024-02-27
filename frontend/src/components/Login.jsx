import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const Login = ({ setLoginStatus }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("userid")) {
            navigate("/dashboard")
        }
    })

    const [userData, setUserData] = useState({
        userid: "",
        password: ""
    })

    const handleOnChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:8000/getUser?user_id=${userData.userid}`)
        const data = await response.json()
        if (!data.message && userData.password === data[0].password) {
            localStorage.setItem("userid", userData.userid)
            localStorage.setItem("username", data[0].name)
            setLoginStatus(true)
            toast("Logged in successfully!")
            navigate("/dashboard")
        } else {
            toast("Invalid credentials!");
        }
    }

    return (
        <div className="container">
            <form className='my-3' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="userid" className="form-label">User ID (3 digit unique ID)</label>
                    <input max="999" required onChange={handleOnChange} value={userData.userid} name='userid' type="number" className="form-control" id="userid" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input required onChange={handleOnChange} value={userData.password} name='password' type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <div className='text-center'>Don't have an account? <Link to="/signup">Signup now</Link></div>
            </form>
        </div>
    )
}

export default Login