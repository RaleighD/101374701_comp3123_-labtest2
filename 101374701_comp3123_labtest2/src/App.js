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

        // Here you can fetch real weather data or use placeholder data
        // For placeholder, we'll create a mock object
        const placeholderData = {
            temperature: 20, // Example data
            wind_speed: 5,
            weather_code: 800,
            lat: lat,
            lon: lon,
            isPlaceholder: true // You can use this flag to indicate placeholder data
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
            // Handle the error state appropriately
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
