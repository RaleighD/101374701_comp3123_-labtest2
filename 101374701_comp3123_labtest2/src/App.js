import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [locationData, setLocationData] = useState(null);

    const showPlaceholderData = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const placeholderData = {
            temperature: 20,
            wind_speed: 5,
            weather_code: 800,
            lat: lat,
            lon: lon,
            isPlaceholder: true
        };

        setWeatherData(placeholderData);
    };

    const handleError = (error) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
    };

    const fetchWeatherData = async (searchTerm) => {
        const [lat, lon] = searchTerm.split(',').map(coord => parseFloat(coord.trim()));
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=auto&current_weather=true`;


        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setLocationData(data)
            setWeatherData(data.current_weather);
            setForecastData(data.daily.temperature_2m_max.slice(0, 5));
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };




  return (
      <div className="App">
        <SearchBar onSearch={fetchWeatherData} />
          <WeatherDisplay weatherData={weatherData} forecastData={forecastData} locationData={locationData} />
          />
      </div>


  );
}

export default App;
