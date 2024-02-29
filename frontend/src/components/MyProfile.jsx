import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const MyProfile = () => {
    const [userProfile, setUserProfile] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("userid")) {
            navigate("/login")
            return
        }

        const fetchProfile = async () => {
            const response = await fetch(`https://sql-task-manager-backend.onrender.com/getUser?user_id=${localStorage.getItem("userid")}`)
            const data = await response.json()
            setUserProfile(data[0])
        }
        fetchProfile()
    }, [])

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure? Delete account permanently.")) {
            const response = await fetch(`https://sql-task-manager-backend.onrender.com/deleteUser?user_id=${userProfile.user_id}`, {
                method: "delete"
            })
            const data = await response.json()
            if (data.message === "success") {
                toast.success("Account deleted securely")
                localStorage.clear()
                navigate("/")
            } else {
                console.log(data);
                toast.error("You have atleast one active task")
            }
        }
    }

    return (
        <div className="container mt-5">
            {userProfile &&
                <div className='profile p-4'>
                    <p><b>User ID (3 digit unique ID):</b> {userProfile.user_id}</p>
                    <p><b>Name:</b> {userProfile.name}</p>
                    <p><b>Domain:</b> {userProfile.domain}</p>
                    <button onClick={handleDeleteAccount} className="btn btn-danger">Delete Account Permanently <i className="bi bi-exclamation-triangle"></i></button>
                    <p><small>You cannot delete your account if you have any assigned task</small></p>
                </div>
            }
        </div>
    )
}

export default MyProfile