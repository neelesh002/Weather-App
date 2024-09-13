import React, { useState } from 'react';
import './App.css';
import { FaSearch, FaSun, FaCloud, FaMoon, FaCloudRain, FaSnowflake, FaBolt, FaWind, FaTint, FaCalendarDay, FaClock, FaCalendarAlt, FaThermometerHalf } from 'react-icons/fa';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }

    const apiKey = 'ebdb19e446mshb2b4d9be1fa659dp18d6bfjsn060ceca85700'; 
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      year: now.getFullYear()
    };
  };

  const dateTime = updateDateTime();

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
        />
        <button onClick={getWeather}><FaSearch /></button>
      </div>
      {loading && <div id="loader" className="loader"></div>}
      {weatherData && !loading && (
        <div id="weather">
          <h2 id="city-name">{weatherData.location.name}</h2>
          <div className="weather-icon">
            {weatherData.current.condition.text.includes("Sunny") || weatherData.current.condition.text.includes("Clear") ? <FaSun /> : null}
            {weatherData.current.condition.text.includes("Cloudy") || weatherData.current.condition.text.includes("Overcast") ? <FaCloud /> : null}
            {weatherData.current.condition.text.includes("Rain") ? <FaCloudRain /> : null}
            {weatherData.current.condition.text.includes("Snow") ? <FaSnowflake /> : null}
            {weatherData.current.condition.text.includes("Thunderstorm") ? <FaBolt /> : null}
            {weatherData.current.condition.text.includes("Night") || weatherData.current.condition.text.includes("Moon") ? <FaMoon /> : null}
            {weatherData.current.wind_kph > 0 ? <FaWind /> : null}
          </div>
          <p id="temperature"><FaThermometerHalf /> <span id="temp-value">{weatherData.current.temp_c}°C</span></p>
          <p id="description">Description: {weatherData.current.condition.text}</p>
          <p id="humidity"><FaTint /> <span id="humidity-value">{weatherData.current.humidity}%</span></p>
          <div className="wind">
            <FaWind /> <p id="wind">Wind Speed: {weatherData.current.wind_kph} kph</p>
          </div>
          <div className="date-time">
            <p id="current-date"><FaCalendarDay /> <span id="date-value">{dateTime.date}</span></p>
            <p id="current-time"><FaClock /> <span id="time-value">{dateTime.time}</span></p>
            <p id="current-year"><FaCalendarAlt /> <span id="year-value">{dateTime.year}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
