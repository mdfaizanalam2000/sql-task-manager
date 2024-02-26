import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import { useState } from 'react';

function App() {
  const [userProfile, setUserProfile] = useState({})

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login setUserProfile={setUserProfile} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard userProfile={userProfile} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
