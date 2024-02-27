import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const Signup = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("userid")) {
            navigate("/dashboard")
        }
    })

    const [inputData, setInputData] = useState({
        userid: "",
        name: "",
        domain: "",
        password: "",
        cpassword: ""
    })

    const handleOnChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        if (inputData.password !== inputData.cpassword) {
            toast("Passwords are not matching!")
            return
        }
        delete inputData.cpassword;
        const response = await fetch("http://127.0.0.1:8000/addUser", {
            method: "post",
            body: JSON.stringify({ ...inputData, userid: parseInt(inputData.userid) })
        })
        const data = await response.json()
        if (data.message === "success") {
            toast("Signup successful, Login to continue!")
        } else {
            toast("User already exists, please login!")
        }
        navigate("/login")
    }

    return (
        <div className="container">
            <form className='my-3' onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="userid" className="form-label">User ID (3 digit unique ID)</label>
                    <input max="999" name="userid" onChange={handleOnChange} value={inputData.userid} required type="number" className="form-control" id="userid" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" onChange={handleOnChange} value={inputData.name} required type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="domain" className="form-label">Domain</label>
                    <input name="domain" onChange={handleOnChange} value={inputData.domain} required type="text" className="form-control" id="domain" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" onChange={handleOnChange} value={inputData.password} required type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input name="cpassword" onChange={handleOnChange} value={inputData.cpassword} required type="password" className="form-control" id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className='text-center'>Already have an account? <Link to="/login">Login now</Link></div>
            </form>
        </div>
    )
}

export default Signup