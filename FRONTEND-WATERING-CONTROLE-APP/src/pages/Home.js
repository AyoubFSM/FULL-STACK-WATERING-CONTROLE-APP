import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const { isDarkMode } = useTheme();
  const { isLoggedIn } = useAuth(); // Use the auth context
  const [selectedOption, setSelectedOption] = useState('Normal'); // State for dropdown
  const navigate = useNavigate(); // For programmatic navigation

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionSelect = () => {
    switch (selectedOption) {
      case 'Normal':
        navigate('/normal');
        break;
      case 'By Timer':
        navigate('/timer');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} `} style={{ backgroundImage: "url('4.png')" }}>
      {/* Overlay for background opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Our Earth Information Hub</h1>
        <p className="text-lg text-white mb-6">
          Discover the beauty of our planet and learn how to protect it. Join us on a journey to understand the Earth we live on!
        </p>

        <div className="mt-4">
          {isLoggedIn ? (
            <>
              <Link to="/service">
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
                  Go to Services
                </button>
              </Link>
              
              {/* Dropdown for selecting options */}
              <div className={`mt-10 p-4 rounded-lg shadow-lg text-center max-w-lg mx-auto relative z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-400'} opacity-80`}>
                <label htmlFor="option-select" className={`block text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Select an Option:</label>
                <select
                  id="option-select"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className={`p-2 border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-10 text-lg`}
                >
                  <option value="Normal">Normal</option>
                  <option value="By Timer">By Timer</option>
                </select>
                <button
                  onClick={handleOptionSelect}
                  className="mt-2 px-6 py-2 z-100 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 text-lg w-full"
                >
                  Go
                </button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
                Please log in to access services
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
