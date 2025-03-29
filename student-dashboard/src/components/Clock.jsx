// src/components/Clock.jsx
import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-700 border border-blue-400 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <FaClock size={40} className="text-gray-300 mb-3" />
      <h2 className="text-xl font-semibold text-gray-200 mb-2">Current Time</h2>
      <p className="text-3xl font-mono text-gray-100 drop-shadow-lg transition-colors duration-300">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default Clock;
