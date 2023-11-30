import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weatherData }) {
    return (
        <div className="weather-display">
            {weatherData ? (
                <div>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Wind Speed: {weatherData.windspeed} km/h</p>
                    <p>Wind Direction: {weatherData.winddirection}°</p>
                </div>
            ) : (
                <p>No weather data available. Please search for a location.</p>
            )}
        </div>
    );
}

export default WeatherDisplay;
