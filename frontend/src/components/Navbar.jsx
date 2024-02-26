import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("userid")) {
            setLoginStatus(true)
        }
    })

    const handleLogout = () => {
        localStorage.removeItem("userid")
        setLoginStatus(false)
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
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                    {loginStatus && <button className='btn btn-danger' onClick={handleLogout}>Logout</button>}
                    {window.location.pathname !== "/login" && !loginStatus && <button className='btn btn-success' onClick={handleLogin}>Login</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar