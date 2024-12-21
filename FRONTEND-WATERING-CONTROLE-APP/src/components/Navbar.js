// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../context/ThemeContext';  // Import the useTheme hook

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const { isLoggedIn, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();  // Get dark mode state from context
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout(); 
    setLogoutMessage('You have logged out.');

    setTimeout(() => {
      setLogoutMessage('');
    }, 5000);

    navigate('/login');
  };

  return (
    <nav className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
      {logoutMessage && <Alert type="warning" message={logoutMessage} />}

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold">Système d'Arregation</Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray hover:text-red-700">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/service" className="text-gray hover:text-red-700">Service</Link>
              <button onClick={handleLogout} className="text-gray hover:text-red-700">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray hover:text-gray-300">Login</Link>
          )}
        </div>

        {/* Dark mode toggle button */}
        <button onClick={toggleDarkMode} className="p-2 rounded-full">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
