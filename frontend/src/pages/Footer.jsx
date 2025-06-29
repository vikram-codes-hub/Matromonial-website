import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600">VivahSetu</h2>
          <p className="text-sm mt-2">Connecting hearts, building futures.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profiles">Profiles</Link></li>
            <li><Link to="/membership">Membership</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media or Contact */}
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 text-xl text-pink-500">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
          <p className="text-xs mt-4">&copy; 2025 VivahSetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer
