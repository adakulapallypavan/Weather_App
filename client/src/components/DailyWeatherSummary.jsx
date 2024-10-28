import React, { useEffect, useState } from 'react';

const DailyWeatherSummary = ({ currentWeatherData, city }) => {
  const [dailySummary, setDailySummary] = useState([]);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    if (currentWeatherData && currentWeatherData.main && currentWeatherData.weather) {
      const today = new Date().toLocaleDateString();
      const temp = currentWeatherData.main.temp;
      const condition = currentWeatherData.weather[0].main;

      // Find the existing summary for the current city and today's date
      const existingSummaryIndex = dailySummary.findIndex(day => day.date === today && day.city === city);

      if (existingSummaryIndex !== -1) {
        const existingSummary = dailySummary[existingSummaryIndex];
        // Update existing summary
        existingSummary.avgTemp = ((existingSummary.avgTemp * existingSummary.count) + temp) / (existingSummary.count + 1);
        existingSummary.maxTemp = Math.max(existingSummary.maxTemp, temp);
        existingSummary.minTemp = Math.min(existingSummary.minTemp, temp);
        existingSummary.count++;
        // Update the state with the modified dailySummary
        setDailySummary([...dailySummary]);
      } else {
        // Create a new summary for the current city and today's date
        const newSummary = {
          city: city,
          date: today,
          avgTemp: temp,
          maxTemp: temp,
          minTemp: temp,
          condition: condition,
          count: 1
        };
        setDailySummary([...dailySummary, newSummary]);
      }

      // Alert Logic
      if (temp > 35) {
        setAlert('Alert: High temperature detected!');
      } else {
        setAlert('');
      }
    }
  }, [currentWeatherData, city]);

  return (
    <div className="daily-summary-widget">
      <h2>Daily Weather Summary for {/*{city}*/}</h2>
      <div className="summary-items">
        {dailySummary.filter(day => day.city === city).map(day => (
          <div key={day.date} className="summary-item">
            <h4>{day.date}</h4>
            <p>Avg Temp: {Math.round(day.avgTemp)}°C</p>
            <p>Max Temp: {Math.round(day.maxTemp)}°C</p>
            <p>Min Temp: {Math.round(day.minTemp)}°C</p>
            <p>Condition: {day.condition}</p>
          </div>
        ))}
      </div>
      {alert && <div className="alert">{alert}</div>}
    </div>
  );
};

export default DailyWeatherSummary;