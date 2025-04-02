import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  // ✅ Your WeatherAPI Key (replace with actual key)
  const apiKey = "ceccf9ed098b48f8819175630253003"; // Replace with your valid key

  // Fetch weather using latitude and longitude
  const fetchWeatherByLatLon = async (lat, lon) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const weatherResponse = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
      );

      setWeather(weatherResponse.data);
      setLocation(`${weatherResponse.data.location.name}, ${weatherResponse.data.location.country}`);
    } catch (err) {
      console.error("Error fetching weather data:", err.message);
      setError(
        err.response?.data?.error?.message ||
          "Failed to fetch weather data. Check your API key or location."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLatLon(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          setError("Failed to get your location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  // Fetch weather automatically when component loads
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>Weather App 🌦️</h2>

      {loading && <p>Detecting location... 📡</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>Weather in {location} 🌤️</h3>
          <p>🌡 Temperature: {weather.current.temp_c}°C</p>
          <p>🌤 Condition: {weather.current.condition.text}</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
          <p>🌬 Wind Speed: {weather.current.wind_kph} km/h</p>
        </div>
      )}

      {!loading && !weather && (
        <button onClick={getUserLocation} style={{ padding: "8px 12px", marginTop: "10px" }}>
          Detect Location Again 📍
        </button>
      )}
    </div>
  );
}

export default WeatherApp;
