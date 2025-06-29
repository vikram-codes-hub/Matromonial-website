import React,{useContext} from 'react'
import { assets } from '../assets/asset'
import { NavLink } from 'react-router-dom'
import { FaUsersLine } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Authcontext } from '../Context/Authcontext';

const Sidebar = () => {
  const {Logout}=useContext(Authcontext)
  return (
    <div className="w-[18%] shadow-xl h-screen flex flex-col justify-between">
      <div>
        <div>
          <img src={assets.logoOrg} className="object-cover w-30 p-3" />
        </div>

        <div className='flex flex-col gap-4 pt-6 pl-[20%]'>
          <NavLink to="/" className="flex items-center gap-3 p-2 px-4 border-gray-300 border rounded-l border-r-0 ">
            <FaUsersLine className='w-5 h-5' />
            <p className="hidden md:block">All profiles</p>
          </NavLink>
        </div>

        <div className='flex flex-col gap-4 pt-6 pl-[20%]'>
          <NavLink to="/unaprovedprofiles" className="flex items-center gap-3 p-2 px-4 border-gray-300 border rounded-l border-r-0 ">
            <FaUserSlash className='w-5 h-5' />
            <p className="hidden md:block text-sm">Unapproved profiles</p>
          </NavLink>
        </div>

        <div className='flex flex-col gap-4 pt-6 pl-[20%]'>
          <NavLink to="/dashboard" className="flex items-center gap-3 p-2 px-4 border-gray-300 border rounded-l border-r-0 ">
            <MdDashboard className='w-5 h-5' />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
        </div>
      </div>

      {/* Logout at the bottom */}
      <div className='flex flex-col gap-4 pb-6 pl-[20%]' onClick={()=>Logout()}>
        <NavLink to="/login" className="flex items-center gap-3 p-2 px-4 border-gray-300 border rounded-l border-r-0 ">
          <MdDashboard className='w-5 h-5' />
          <p className="hidden md:block">Logout</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
