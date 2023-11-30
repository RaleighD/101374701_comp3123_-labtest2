import React from 'react';
import './WeatherDisplay.css';

function WeatherDisplay({ weatherData, forecastData, locationData }) {
    return (
        <div className="weather-display">
            {weatherData && (
                <div className="current-weather">
                    <p className="location">Current Weather for Longitude: {locationData.longitude}, Latitude: {locationData.latitude}</p>
                    <p className="temperature">Temperature: {weatherData.temperature}°C</p>
                    <p className="wind-speed">Wind Speed: {weatherData.windspeed} km/h</p>
                    <p className="wind-direction">Wind Direction: {weatherData.winddirection}°</p>
                </div>
            )}

            {forecastData && forecastData.length > 0 && (
                <div className="forecast">
                    <h2>5-Day Forecast (Highs)</h2>
                    <div className="forecast-container">
                        {forecastData.map((high, index) => (
                            <div key={index} className="forecast-day">
                                <p>Day {index + 1}: {high}°C</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherDisplay;