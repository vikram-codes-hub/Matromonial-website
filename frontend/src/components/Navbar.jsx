import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/asset';
import { IoPersonOutline } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Authcontext } from '../context/authcontext';
import { AiFillMessage } from "react-icons/ai";

const Navbar = () => {
  const { logout, authuser, getCurrentUserData } = useContext(Authcontext);
  const [notifications, setNotifications] = useState([]);
  const [profiles, setProfiles] = useState([]); // added missing state for profiles
  const [visible, setVisible] = React.useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Membership", path: "/membership" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" }
  ];

 

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!authuser) return;
      setNotifications(authuser.notifications || []);
    };
    fetchNotifications();
  }, [authuser, getCurrentUserData]);

  const hasNotifications = notifications.length > 0;

  return (
    <div className="flex items-center justify-between py-4 px-4 sm:px-8 lg:px-12 bg-white shadow-md z-50 relative">
  {/* Logo */}
  <div className="flex-shrink-0">
    <img src={assets.logoOrg} alt="Logo" className="h-20 w-25" />
  </div>

  {/* Desktop Navigation */}
  <nav className="hidden sm:flex space-x-6">
    {navLinks.map(({ name, path }) => (
      <NavLink
        key={name}
        to={path}
        className={({ isActive }) =>
          `relative text-sm font-medium transition-all duration-200
           after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-indigo-600 after:transition-all after:duration-300
           ${isActive ? 'text-indigo-600 after:w-full' : 'text-gray-600 hover:text-indigo-500 after:w-0'}`
        }
      >
        {name}
      </NavLink>
    ))}
  </nav>

  {/* Right Icons */}
  <div className="flex items-center gap-4">
    {/* Desktop Profile Dropdown */}
    <div className="relative group hidden sm:block">
      <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-500">
        <IoPersonOutline className="w-6 h-6 text-gray-600 group-hover:text-indigo-500" />
      </button>
      {authuser && (
        <div className="absolute right-0 border w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 hidden group-hover:block">
          <NavLink
            to="/myprofile"
            className="block mt-1 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            My Profile
          </NavLink>
          <button
            onClick={logout}
            className="block mb-1 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>

    {/* Desktop Hamburger Menu */}
    <div className="relative group hidden sm:block">
      <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-500">
        <GiHamburgerMenu className="w-6 h-6 text-gray-600" />
      </button>
      {authuser && (
        <div className="absolute right-0 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 hidden group-hover:block">
          <div className="py-1">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
              🌗 Theme Toggle
            </button>
            <NavLink
              to="/message-box"
              className="relative block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <div className="flex items-center gap-3">
                <AiFillMessage />
                Messages
                {hasNotifications && (
                  <span className="absolute top-1 right-3 w-3 h-3 bg-red-600 rounded-full" />
                )}
              </div>
            </NavLink>
            <NavLink
              to="/membership"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              💎 Membership Info
            </NavLink>
            <NavLink
              to="/helpandsupport"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              ❓ Help / Support
            </NavLink>
          </div>
        </div>
      )}
    </div>

    {/* Mobile menu open button */}
    <button
      onClick={() => setVisible(true)}
      className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition"
    >
      <GiHamburgerMenu className="w-6 h-6 text-gray-600" />
    </button>

    {/* Mobile Sidebar */}
    <div
  className={`fixed top-0 right-0 h-full w-full bg-white transition-transform duration-300 ease-in-out z-50 transform ${
    visible ? 'translate-x-0' : 'translate-x-full'
  }`}
>

      <div className="flex flex-col text-gray-600 p-4">
        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
          <img src={assets.menu_icon} className="w-5" alt="menu" />
          <p>Back</p>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <NavLink onClick={() => setVisible(false)} className="pl-6" to="/">Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className="pl-6" to="/membership">Membership</NavLink>
          <NavLink onClick={() => setVisible(false)} className="pl-6" to="/about-us">About Us</NavLink>
          <NavLink onClick={() => setVisible(false)} className="pl-6" to="/contact-us">Contact Us</NavLink>
          <NavLink onClick={() => setVisible(false)} className="pl-6 relative" to="/message-box">
            <div className="flex items-center gap-2">
              <AiFillMessage />
              Messages
              {hasNotifications && (
                <span className="absolute top-1 right-4 w-3 h-3 bg-red-600 rounded-full" />
              )}
            </div>
          </NavLink>
          {authuser && (
            <>
              <NavLink onClick={() => setVisible(false)} className="pl-6" to="/myprofile">My Profile</NavLink>
              <button onClick={() => { logout(); setVisible(false); }} className="text-left pl-6 cursor-pointer text-red-600">Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Navbar;
