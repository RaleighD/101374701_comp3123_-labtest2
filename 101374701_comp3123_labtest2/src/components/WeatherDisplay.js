import React from 'react';
import './WeatherDisplay.css';

function getWeatherIcon(code) {
    switch (code) {
        case 0:
            return 'sunny.png';

        case 1:
        case 2:
        case 3:
            return '/cloudy.png';

        case 45:
        case 48:
            return 'fog.png';

        case 51:
        case 53:
        case 55:
            return 'drizzler.png';

        case 56:
        case 57:
            return 'freezing-drizzle.png';

        case 61:
        case 63:
        case 65:
            return 'rain.png';

        case 66:
        case 67:
            return 'freezing-rain.jpeg';

        case 71:
        case 73:
        case 75:
            return 'snow.png';

        case 77:
            return 'snow-grains.png';

        case 80:
        case 81:
        case 82:
            return 'rain-showers.png';

        case 85:
        case 86:
            return 'snow-showers.png';

        case 95:
            return 'thunderstorm.png';

        case 96:
        case 99:
            return 'thunderstorm-hail.png';

        default:
            return 'default.png';
    }
}


function WeatherDisplay({weatherData, forecastData, locationData }) {
    return (
        <div className="weather-display">
            {weatherData && (
                <div className="current-weather">
                    <img className="image-container" src={getWeatherIcon(weatherData.weathercode)} alt="Weather Icon" />
                    <p className="location">Current Weather for Longitude: {locationData.longitude}, Latitude: {locationData.latitude}</p>
                    <p className="temperature">Temperature: {weatherData.temperature}°C</p>
                    <p className="wind-speed">Wind Speed: {weatherData.windspeed} km/h</p>
                    <p className="wind-direction">Wind Direction: {weatherData.winddirection}°</p>
                    <p className="wind-direction">Weather Code: {weatherData.weathercode}</p>
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