// src/components/Weather.jsx
import React from "react";
import {
  WiSunrise,
  WiSunset,
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSolarEclipse,
} from "react-icons/wi";

const Weather = () => {
  // Static weather data resembling the design you provided
  const weatherData = {
    temperature: 24,
    feelsLike: 22,
    sunrise: "06:37 AM",
    sunset: "08:37 PM",
    condition: "Sunny",
    humidity: 41,
    windSpeed: "2 km/h",
    pressure: "997 hPa",
    uvIndex: 8,
    location: "New York",
  };

  return (
    <div className="bg-gray-700 text-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
      {/* Left Section: Temperature & Sunrise/Sunset */}
      <div className="flex flex-col items-start space-y-4">
        <div>
          <div className="text-5xl font-bold">
            {weatherData.temperature}°C
          </div>
          <div className="text-sm text-gray-300">
            Feels like: {weatherData.feelsLike}°C
          </div>
        </div>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <WiSunrise className="text-yellow-300" size={24} />
            <span>Sunrise: {weatherData.sunrise}</span>
          </div>
          <div className="flex items-center space-x-2">
            <WiSunset className="text-pink-300" size={24} />
            <span>Sunset: {weatherData.sunset}</span>
          </div>
        </div>
      </div>

      {/* Center Section: Weather Icon, Condition & Location */}
      <div className="flex flex-col items-center space-y-2">
        <WiDaySunny className="text-yellow-400" size={80} />
        <div className="text-xl font-semibold">{weatherData.condition}</div>
        <div className="text-sm text-gray-300">{weatherData.location}</div>
      </div>

      {/* Right Section: Additional Metrics */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <WiHumidity size={24} />
          <span>{weatherData.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <WiStrongWind size={24} />
          <span>{weatherData.windSpeed}</span>
        </div>
        <div className="flex items-center space-x-2">
          <WiBarometer size={24} />
          <span>{weatherData.pressure}</span>
        </div>
        <div className="flex items-center space-x-2">
          <WiSolarEclipse size={24} />
          <span>{weatherData.uvIndex} UV</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
