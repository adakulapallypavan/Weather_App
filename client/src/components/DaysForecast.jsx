import React from 'react';

const DaysForecast = ({ forecastWeatherData, darkMode }) => {
  return (
    <div className={`days-forecast ${darkMode ? 'dark-mode' : ''}`}>
      {forecastWeatherData.map((forecast, index) => (
        <div key={index} className="forecast-item">
          <h5>{new Date(forecast.dt * 1000).toLocaleDateString()}</h5>
          <p>Temp: {forecast.main.temp} °C</p>
          <p>Condition: {forecast.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default DaysForecast;