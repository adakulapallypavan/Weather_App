import React, { useEffect, useState } from "react";
import { fetchCurrentWeather, fetchForecastWeather } from "../utils/api";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [degUnit, setDegUnit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState([]);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  const handleDarkMode = () => {
    setDarkMode((oldDarkMode) => !oldDarkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (!location) return;
      setLoading(true);
      try {
        const { data, lastUpdated: updatedTime } = await fetchCurrentWeather(location);
        setCurrentWeatherData(data);
        setLastUpdated(updatedTime);

        const forecastData = await fetchForecastWeather(location);
        const indicesToSelect = [8, 16, 24, 32, 39];
        setForecastWeatherData(
          forecastData.list.filter((item, index) => indicesToSelect.includes(index))
        );

        setHourlyWeatherData(forecastData.list.slice(0, 5));
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();

    const intervalId = setInterval(() => {
      getData();
    }, 300000);

    return () => clearInterval(intervalId);
  }, [location]);

  const HandleOnSearchChange = (searchData) => {
    setLocation({
      lat: searchData.value.split(" ")[0],
      lon: searchData.value.split(" ")[1],
    });
  };

  return (
    <div className={darkMode ? "App dark-mode" : "App"}>
      <Header
        darkMode={darkMode}
        handleDarkMode={handleDarkMode}
        onSearchChange={HandleOnSearchChange}
        handleGetCurrentLocation={handleGetCurrentLocation}
      />
      <main>
        <Outlet
          context={{
            darkMode,
            currentWeatherData,
            forecastWeatherData,
            hourlyWeatherData,
            degUnit,
            setDegUnit,
            lastUpdated,
            city: location?.city || "Unknown", // Pass city name to context
          }}
        />
      </main>
      
    </div>
  );
};

export default MainLayout;