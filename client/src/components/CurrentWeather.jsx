import React from 'react';
import TimeDate from './TimeDate';
import sunRiseIconDark from '../assets/images/sunrise-icon-dark.png';
import sunSetIconDark from '../assets/images/sunset-icon-dark.png';
import windIconDark from '../assets/images/wind-icon-dark.png';
import uvIconDark from '../assets/images/uv-icon-dark.png';
import humidityIconDark from '../assets/images/humidity-icon-dark.png';
import pressureIconDark from '../assets/images/pressure-icon-dark.png';

import sunRiseIconLight from '../assets/images/sunrise-icon-light.png';
import sunSetIconLight from '../assets/images/sunset-icon-light.png';
import windIconLight from '../assets/images/wind-icon-light.png';
import uvIconLight from '../assets/images/uv-icon-light.png';
import humidityIconLight from '../assets/images/humidity-icon-light.png';
import pressureIconLight from '../assets/images/pressure-icon-light.png';

import { conditionIcon } from '../utils/icon';
import { convertTimestamp } from '../utils/helper';
import DaysForecast from './DaysForecast';

const CurrentWeather = (props) => {
  const { currentWeatherData, lastUpdated, darkMode, degUnit, setDegUnit, forecastWeatherData } = props;

  if (!currentWeatherData || !currentWeatherData.main || !currentWeatherData.sys || !currentWeatherData.weather) {
    return <div>Loading...</div>; // or some loading indicator
  }

  const mainTempInC = Math.round(currentWeatherData.main.temp);
  const mainTempInF = Math.round((currentWeatherData.main.temp * 9) / 5 + 32);
  const feelLikeInC = Math.round(currentWeatherData.main.feels_like);
  const feelLikeInF = Math.round((currentWeatherData.main.feels_like * 9) / 5 + 32);

  const handleTempFormat = () => {
    setDegUnit((oldDegUnit) => !oldDegUnit);
  };

  return (
    <section className={`weather-widget ${darkMode ? 'dark-mode' : ''}`}>
      <TimeDate
        darkMode={darkMode}
        currentWeatherData={currentWeatherData}
      />
      <div className="widget-container">
        <div className="widget temperature-widget">
          <h3 className="temperature" onClick={handleTempFormat}>
            {degUnit ? `${mainTempInC}°C` : `${mainTempInF}°F`}
          </h3>
          <p className="sub-info">Feels like: <span>{degUnit ? `${feelLikeInC}°C` : `${feelLikeInF}°F`}</span></p>
          <p>Last Updated: {lastUpdated}</p>
        </div>

        <div className="widget condition-widget">
          <img
            src={conditionIcon(currentWeatherData.weather[0].icon)}
            alt="Weather Icon"
            className="condition-icon"
          />
          <h4 className="condition">{currentWeatherData.weather[0].main}</h4>
          <p className="updated-info">Last updated: {convertTimestamp(lastUpdated)}</p>
        </div>

        <div className="widget humidity-widget">
          <img src={darkMode ? humidityIconLight : humidityIconDark} alt="Humidity Icon" className="icon" />
          <p className="value">{currentWeatherData.main.humidity}%</p>
          <p className="label">Humidity</p>
        </div>

        <div className="widget wind-speed-widget">
          <img src={darkMode ? windIconLight : windIconDark} alt="Wind Speed Icon" className="icon" />
          <p className="value">{currentWeatherData.wind.speed} km/h</p>
          <p className="label">Wind Speed</p>
        </div>

        <div className="widget pressure-widget">
          <img src={darkMode ? pressureIconLight : pressureIconDark} alt="Pressure Icon" className="icon" />
          <p className="value">{currentWeatherData.main.pressure} hPa</p>
          <p className="label">Pressure</p>
        </div>

        <div className="widget uv-index-widget">
          <img src={darkMode ? uvIconLight : uvIconDark} alt="UV Index Icon" className="icon" />
          <p className="value">8</p>
          <p className="label">UV Index</p>
        </div>

        <DaysForecast forecastWeatherData={forecastWeatherData} />
      </div>
    </section>
  );
};

export default CurrentWeather;
