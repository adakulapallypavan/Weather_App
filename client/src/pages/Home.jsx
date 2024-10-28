import React from "react";
import { useOutletContext } from "react-router-dom";
import CurrentWeather from "../components/CurrentWeather";
import DailyWeatherSummary from "../components/DailyWeatherSummary";

const Home = () => {
  const { darkMode, degUnit, setDegUnit, currentWeatherData, lastUpdated, forecastWeatherData, city } = useOutletContext();

  if (!currentWeatherData) return <div>Loading...</div>;

  const lastUpdatedFormatted = lastUpdated
    ? new Date(lastUpdated).toLocaleString()
    : "Unavailable";

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
      <CurrentWeather
        darkMode={darkMode}
        degUnit={degUnit}
        setDegUnit={setDegUnit}
        currentWeatherData={currentWeatherData}
        lastUpdated={lastUpdatedFormatted}
        forecastWeatherData={forecastWeatherData}
        city={city}
        currentWeatherData={currentWeatherData} // Pass city to CurrentWeather
        
      />
      {/*<DailyWeatherSummary currentWeatherData={currentWeatherData} city={city} /> */}
    </div>
  );
};

export default Home;