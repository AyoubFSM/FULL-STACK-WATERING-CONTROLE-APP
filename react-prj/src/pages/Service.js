import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh, faFaucet, faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import HumidityChart from '../components/HumidityChart'; 
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Service = () => {
  const [humiditySoil, setHumiditySoil] = useState('--');
  const [earth, setEarth] = useState('--');
  const [temperature, setTemperature] = useState('--');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [humidityData, setHumidityData] = useState([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]); // Initialize with default data
  const { isDarkMode } = useTheme();

  const getColorClass = () => {
    if (temperature === '--' || isNaN(temperature)) {
      return "text-gray-600";
    } else if (temperature <= 37) {
      return "text-blue-800";
    } else {
      return "text-red-400";
    }
  };

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const { humidity, earth, temperature, connectionStatus } = response.data;

        setHumiditySoil(humidity ?? '--');
        setEarth(earth ?? '--');
        setTemperature(temperature ?? '--');
        setConnectionStatus(connectionStatus ?? 'Disconnected');
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setHumiditySoil('--');
        setEarth('--');
        setTemperature('--');
        setConnectionStatus('Disconnected');
      }
    };

    // Fetch data every 5 seconds
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run once after component mounts

  return (
    <div className={`min-h-screen p-6 md:p-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold text-center md:text-left ${isDarkMode ? 'font-serif text-white' : 'font-sans text-black'}`}>
          Irrigation System Control
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-wrap gap-4">
            {/* Humidity Soil */}
            <div className={`bg-${isDarkMode ? 'gray-700' : 'gray-200'} border-blue-500 rounded-lg shadow-md p-4 text-center flex-1`}>
              <p className="text-sm py-2 font-medium">Humidity Soil</p>
              <h3 className="text-4xl py-2 font-bold">{humiditySoil} %</h3>
              <FontAwesomeIcon icon={faFaucet} className="text-blue-800 text-3xl mb-2" />
            </div>

            {/* Humidity Air */}
            <div className={`bg-${isDarkMode ? 'gray-700' : 'gray-200'} border-blue-500 rounded-lg shadow-md p-4 text-center flex-1`}>
              <p className="text-sm py-2 font-medium">Humidity Air</p>
              <h3 className="text-4xl py-2 font-bold">{earth} %</h3>
              <FontAwesomeIcon icon={faEarthAsia} className="text-blue-800 text-3xl mb-2" />
            </div>

            {/* Temperature */}
            <div className={`bg-${isDarkMode ? 'gray-700' : 'gray-200'} border-blue-500 rounded-lg shadow-md p-4 text-center flex-1`}>
              <p className="text-sm py-2 font-medium">Temperature</p>
              <h3 className="text-4xl py-2 font-bold">{temperature}°C</h3>
              <FontAwesomeIcon icon={faTemperatureHigh} className={`text-3xl mb-2 ${getColorClass()}`} />
            </div>
          </div>

          {/* Humidity Chart */}
          <div className="flex mb-4 w-full">
            <div className={`bg-${isDarkMode ? 'gray-700' : 'gray-200'} border-blue-500 rounded-lg shadow-md p-4 text-center flex-1`}>
              <HumidityChart humidityData={humidityData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
