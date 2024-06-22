import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Search from './components/search/search';
import CurrentWeather from './components/weather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState(null);

  const handleSearchChange = (searchData) => {
    console.log('searchData:', searchData);

    const coordinates = searchData.value.split(',').map(coord => coord.trim());
    const lat = coordinates[0];
    const lon = coordinates[1];

    console.log('Latitude:', lat, 'Longitude:', lon);

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        if (!response[0].ok || !response[1].ok) {
          throw new Error('Failed to fetch data');
        }

        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setCity(searchData);
      })
      .catch((err) => {
        console.error('Error fetching weather data:', err);
        // Optional: Show an error message to the user
      });
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      {currentWeather && <CurrentWeather data={currentWeather} />}
      <Search onSearchChange={handleSearchChange} />
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
