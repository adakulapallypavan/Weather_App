// api.js

const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const FORECAST_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const geoApiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

export const fetchCurrentWeather = async (query) => {
    const res = await fetch(`${CURRENT_WEATHER_URL}lat=${query.lat}&lon=${query.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch data of current weather",
            status: res.status,
            statusText: res.statusText
        };
    }
    const data = await res.json();
    return { data, lastUpdated: Date.now() };
};

export const fetchForecastWeather = async (query) => {
    const res = await fetch(`${FORECAST_WEATHER_URL}lat=${query.lat}&lon=${query.lon}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`);
    if (!res.ok) throw {
        message: "Failed to fetch data of forecast",
        status: res.status,
        statusText: res.statusText
    }
    const data = await res.json();
    return data;
}

export const fetchCity = async (inputValue) => {
    const res = await fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions);
    if (!res.ok)
        throw {
            message: "City not found or failed to fetch data",
            status: res.status,
            statusText: res.statusText
        }
    const data = await res.json();
    return data;
}
