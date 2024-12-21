// src/components/Alert.js
import React from 'react';
import './Alert.css';

const Alert = ({ type, message }) => {
  const alertStyles = {
    success: {
      backgroundColor: 'bg-green-600',
      text: 'text-white'
    },
    error: {
      backgroundColor: 'bg-red-600',
      text: 'text-white'
    },
    warning: {
      backgroundColor: 'bg-yellow-600',
      text: 'text-white'
    }
  };

  return (
    <div
      className={`flex w-64 shadow-lg rounded-lg mt-4 fixed top-16 left-0 z-50 animate-slide-in ${alertStyles[type].backgroundColor} ${alertStyles[type].text} transition-all duration-300`}
      style={{ height: '40px' }} // Set height to 40px
    >
      <div className="px-4 py-2">{message}</div>
    </div>
  );
};

export default Alert;