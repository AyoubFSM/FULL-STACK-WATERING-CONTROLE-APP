import React, { useState, useEffect } from "react";

const Normal = ({ isDarkMode }) => {
  const [zones, setZones] = useState([
    { id: 1, active: false, time: 0 },
    { id: 2, active: false, time: 0 },
    { id: 3, active: false, time: 0 },
    { id: 4, active: false, time: 0 },
  ]);
  const [notifications, setNotifications] = useState([]);
  const intervalRefs = React.useRef({});
  
  const [activeNotifications, setActiveNotifications] = useState(new Set());

  const addNotification = (message, zoneId) => {
    if (!activeNotifications.has(zoneId)) {
      setActiveNotifications((prev) => new Set(prev.add(zoneId)));
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        setActiveNotifications((prev) => {
          const newSet = new Set(prev);
          newSet.delete(zoneId);
          return newSet;
        });
      }, 3000);
    }
  };

  const toggleZone = (zoneId) => {
    setZones((prevZones) =>
      prevZones.map((zone) => {
        if (zone.id === zoneId) {
          if (zone.active) {
            clearInterval(intervalRefs.current[zoneId]);
            delete intervalRefs.current[zoneId];
            addNotification(`Zone ${zoneId} is now OFF. Timer reset.`, zoneId);
            return { ...zone, active: false, time: 0 };
          } else {
            if (!intervalRefs.current[zoneId]) {
              const intervalId = setInterval(() => {
                setZones((prevZones) =>
                  prevZones.map((z) =>
                    z.id === zoneId ? { ...z, time: z.time + 1 } : z
                  )
                );
              }, 1000);
              intervalRefs.current[zoneId] = intervalId;
            }
            addNotification(`Zone ${zoneId} is now ON.`, zoneId);
            return { ...zone, active: true };
          }
        }
        return zone;
      })
    );
  };

  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []);

  const formatTimeParts = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return { hours, mins, secs };
  };

  const SVGNumber = ({ value }) => {
    return (
      <div
        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded shadow-md text-sm font-bold text-gray-800"
        style={{ fontFamily: "monospace" }}
      >
        {value}
      </div>
    );
  };

  const TimerDisplay = ({ time }) => {
    const { hours, mins, secs } = formatTimeParts(time);

    return (
      <div className="flex space-x-1 items-center justify-center">
        <SVGNumber value={hours} />
        <span className="text-sm font-bold text-red-600">:</span>
        <SVGNumber value={mins} />
        <span className="text-sm font-bold text-red-600">:</span>
        <SVGNumber value={secs} />
      </div>
    );
  };

  return (
    <div className={`p-4 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="mb-4 text-xl font-bold text-center">Zone Completion Status</h1>

      <div className="fixed top-4 left-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-2 bg-red-600 text-white text-sm rounded shadow-lg"
          >
            {notif.message}
          </div>
        ))}
      </div>

      <table className="table-auto mx-auto w-full max-w-md border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border-b p-3 text-base text-center w-1/3">Zone</th>
            <th className="border-b p-3 text-base text-center w-1/3">Status</th>
            <th className="border-b p-3 text-base text-center w-1/3">On Time</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id} className="text-center">
              <td className="border-b p-3 text-base align-middle">Zone {zone.id}</td>
              <td className="border-b p-3 text-base align-middle">
                <button
                  onClick={() => toggleZone(zone.id)}
                  className={`px-4 py-2 rounded text-base w-24 ${
                    zone.active ? "bg-red-600 text-white" : "bg-gray-300"
                  }`}
                >
                  {zone.active ? "ON" : "OFF"}
                </button>
              </td>
              <td className="border-b p-3 text-base align-middle">
                <TimerDisplay time={zone.time} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Normal;
