import React from 'react';
import { Line } from 'react-chartjs-2';

const WeatherVisualization = ({ dailySummary }) => {
  const data = {
    labels: dailySummary.map(day => day.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: dailySummary.map(day => Math.round(day.avgTemp)),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Max Temperature',
        data: dailySummary.map(day => Math.round(day.maxTemp)),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'Min Temperature',
        data: dailySummary.map(day => Math.round(day.minTemp)),
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Weather Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default WeatherVisualization;
