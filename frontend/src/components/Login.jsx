import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setUserProfile }) => {
    const navigate = useNavigate()
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
            setUserProfile(data[0])
            navigate("/dashboard")
        } else {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="container">
            <form className='my-3' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="userid" className="form-label">User ID</label>
                    <input required onChange={handleOnChange} value={userData.userid} name='userid' type="number" className="form-control" id="userid" />
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