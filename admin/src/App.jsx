import React,{useContext} from 'react'
import {Routes,Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Allprofile from './pages/Allprofile'
import Profile from './pages/Profile'
import { dummyProfiles } from './assets/asset'
import UnapprovedProfiles from './pages/UnapprovedProfiles'
import { Authcontext } from './Context/Authcontext'
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
const App = () => {
  const {authadmin}=useContext(Authcontext)
  return (
    <div className='bg-gray-50 min-h-screen flex'>
      <ToastContainer/>
      <Sidebar/>
     { console.log(dummyProfiles)}
    <div className=" "> 
      <Routes>
      <Route path="/" element={authadmin?<Allprofile/>:<Login/>}/>
      <Route path="/login" element={!authadmin?<Login/>:<Navigate to="/allprofiles"/>}/>
      <Route path="/unaprovedprofiles" element={authadmin?<UnapprovedProfiles/>:<Login/>}/>
      <Route path="/dashboard" element={authadmin?<Dashboard/>:<Login/>}/>
      <Route path="/profile/:profileId" element={authadmin?<Profile/>:<Login/>}/>
     </Routes>
     </div>
    </div>
  )
}

export default App
