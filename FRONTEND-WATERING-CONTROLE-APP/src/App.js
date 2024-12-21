// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Service from './pages/Service';
import { useAuth } from './AuthContext'; 
import Normal from './pages/sections/Normal';
import Timer from './pages/sections/ByTimer'; 
import { ThemeProvider } from './context/ThemeContext'; // Import the ThemeProvider

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider> {/* Wrap the app in ThemeProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/timer" element={<Timer />} /> 
          <Route path="/normal" element={<Normal />} /> 
          <Route path="/service" element={isLoggedIn ? <Service /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
