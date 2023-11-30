import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';
import Forecast from "./components/Forecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

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

    const transformForecastData = (dailyData) => {
        const { time, temperature_2m_max, weathercode } = dailyData;
        return time.map((date, index) => {
            return {
                date,
                temperatureMax: temperature_2m_max[index],
                weatherCode: weathercode[index]
            };
        });
    };




    const fetchWeatherData = async (searchTerm) => {
        const [lat, lon] = searchTerm.split(',').map(coord => parseFloat(coord.trim()));
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;


        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setWeatherData(data.current_weather);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            // Handle the error state appropriately
        }
    };

    const fetchForecastData = async (searchTerm) => {
        const [lat, lon] = searchTerm.split(',').map(coord => parseFloat(coord.trim()));
        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=auto`;

        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const formattedData = transformForecastData(data.daily);
            setForecastData(formattedData); // Use transformed data
            console.log(forecastData); // Add this line in your App component to check the state

        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    };

  return (
      <div className="App">
        <SearchBar onSearch={fetchWeatherData} />
        <WeatherDisplay weatherData={weatherData}/>
          <Forecast forecastData={forecastData} />
      </div>


  );
}

export default App;
