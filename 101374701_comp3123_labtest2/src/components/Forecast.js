import React from 'react';
import './Forecast.css';

const Forecast = ({ forecastData }) => {
    if (!forecastData) {
        return <div>Loading...</div>; // Or any other loading state
    }

    return (
        <div className="forecast-container">
            {forecastData.map((day, index) => (
                <div key={index} className="forecast-day">
                    <p>{new Date(day.time).toLocaleDateString()}</p>
                    <p>Max: {day.temperature_2m_max}°C</p>
                </div>
            ))}
        </div>
    );
};

export default Forecast;