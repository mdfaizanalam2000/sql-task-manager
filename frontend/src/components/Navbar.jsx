import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from "react-toastify"

const Navbar = () => {
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useState(localStorage.getItem("userid"))

    useEffect(() => {
        setLoginStatus(localStorage.getItem("userid"))
    })

    const handleLogout = () => {
        localStorage.clear()
        setLoginStatus(false)
        toast.success("User logged out!")
        navigate("/login")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Tasky</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${window.location.pathname === "/about" && "active"}`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="btns">
                        {window.location.pathname !== "/myProfile" && loginStatus && <button onClick={() => navigate("myProfile")} className='btn btn-outline-info me-3'><i className="bi bi-person-circle"></i> My Profile</button>}
                        {loginStatus && <button className='btn btn-danger' onClick={handleLogout}>Logout</button>}
                        {window.location.pathname !== "/login" && !loginStatus && <button className='btn btn-success' onClick={handleLogin}>Login</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar