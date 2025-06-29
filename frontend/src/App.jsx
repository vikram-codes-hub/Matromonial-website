import React, {useContext } from 'react';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Membership from './pages/Membership'
import Aboutus from './pages/Aboutus'
import Contactus from './pages/Contactus'
import Profile from './pages/Profile'
import Footer from './pages/Footer'
import MyProfile from './pages/MyProfile'
import Helpandsupprott from './pages/Helpandsupprott'
import { Authcontext } from './context/authcontext'
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Chatpage from './pages/Chatpage';
import Messages from './pages/Messages';
const App = () => {
  const { authuser}=useContext(Authcontext)
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
       <Route path='/' element={authuser?<Home/>:<Navigate to="/login"/>}/>
       <Route path='/login' element={!authuser?<Login/>:<Navigate to="/"/>}/>
       <Route path="/membership" element={authuser?<Membership/>:<Navigate to="/login"/>}/>
       <Route path="/about-us" element={authuser?<Aboutus/>:<Navigate to="/login"/>}/>
       <Route path="/contact-us" element={authuser?<Contactus/>:<Navigate to="/login"/>}/>
       <Route path="/profile/:profileId" element={authuser?<Profile/>:<Navigate to="/login"/>}/>
       <Route path="/myprofile" element={authuser?<MyProfile/> : <Navigate to="/login" />}/>
       <Route path="/helpandsupport" element={authuser?<Helpandsupprott/>:<Navigate to="/login"/>}/>
       <Route path="/chatpage" element={authuser?<Chatpage/>:<Navigate to="/login"/>}/>
       <Route path="/message-box" element={authuser?<Messages/>:<Navigate to="/login"/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
