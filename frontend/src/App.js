import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Footer from './components/Footer';
import About from './components/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("userid"))

  return (
    <>
      <div className='section'>
        <BrowserRouter>
          <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login setLoginStatus={setLoginStatus} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addTask' element={<AddTask />} />
            <Route path='/editTask' element={<EditTask />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={500} theme="dark" />
      </div>
      <Footer />
    </>
  );
}

export default App;
