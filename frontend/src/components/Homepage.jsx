import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import slide1 from "../assets/slide1.jpg"
import slide2 from "../assets/slide2.jpg"
import slide3 from "../assets/slide3.jpg"

const Homepage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("userid")) {
            navigate("/dashboard")
        }
    })

    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slide1} className="d-block w-100" alt="slide1" />
                    </div>
                    <div className="carousel-item">
                        <img src={slide2} className="d-block w-100" alt="slide2" />
                    </div>
                    <div className="carousel-item">
                        <img src={slide3} className="d-block w-100" alt="slide3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container my-3">
                <h2 className="text-center">Hello and welcome to online task manager tool</h2>
                <h4 className="text-center"><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> now to use the tool!</h4>
            </div>
        </>
    )
}

export default Homepage