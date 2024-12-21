import React, { useEffect, useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';

const Timer = ({ isDarkMode }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [targetDate, setTargetDate] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const startCountdown = () => {
    const totalSeconds = (Number(inputHours) * 3600) + (Number(inputMinutes) * 60) + Number(inputSeconds);
    if (totalSeconds > 0) {
      const now = new Date().getTime();
      setTargetDate(now + totalSeconds * 1000);
      setIsCounting(true);
      setStatusMessage('Mission started');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const resetCountdown = () => {
    setInputHours('');
    setInputMinutes('');
    setInputSeconds('');
    setTargetDate(null);
    setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
    setIsCounting(false);
    setStatusMessage('Mission canceled');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  useEffect(() => {
    if (!targetDate || !isCounting) return;

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdown);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsCounting(false);
        setStatusMessage('Mission finished');
        setShowPopup(true);
        setInputHours('');
        setInputMinutes('');
        setInputSeconds('');
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate, isCounting]);

  return (
    <div className={`min-h-screen flex flex-col justify-between ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="text-center mb-6 pt-6">
        <h1 className="text-3xl font-semibold">Countdown Timer</h1>
        <p className="text-lg">Set your time and start the countdown</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6 space-y-6">
          <div className="flex flex-col items-center">
            {!isCounting ? (
              <div className="flex space-x-4 mb-6">
                <input
                  type="number"
                  value={inputHours}
                  onChange={(e) => setInputHours(e.target.value)}
                  placeholder="H"
                  className="w-16 p-2 border rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(e.target.value)}
                  placeholder="Min"
                  className="w-16 p-2 border rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={inputSeconds}
                  onChange={(e) => setInputSeconds(e.target.value)}
                  placeholder="Sec"
                  className="w-16 p-2 border rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="flex space-x-6 mb-6">
                <div className="text-center">
                  <h2 className="text-4xl">{String(timeLeft.hours).padStart(2, '0')}</h2>
                  <p className="text-sm">Hours</p>
                </div>
                <div className="text-center">
                  <h2 className="text-4xl">{String(timeLeft.minutes).padStart(2, '0')}</h2>
                  <p className="text-sm">Minutes</p>
                </div>
                <div className="text-center">
                  <h2 className="text-4xl">{String(timeLeft.seconds).padStart(2, '0')}</h2>
                  <p className="text-sm">Seconds</p>
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {!isCounting ? (
                <button
                  onClick={startCountdown}
                  className="w-24 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300 flex items-center justify-center"
                >
                  <FaPlay className="mr-2" /> Start
                </button>
              ) : (
                <button
                  onClick={resetCountdown}
                  className="w-24 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300 flex items-center justify-center"
                >
                  <FaStop className="mr-2" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
