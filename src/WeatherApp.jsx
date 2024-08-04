import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const apiKey = '8eb54485c06644e8b1a210701240208'; 

    const getWeather = async (e) => {
        e.preventDefault();
        setError('');
        setWeather(null);

        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            setWeather(response.data);
        } catch (err) {
            setError('City not found. Please try again.');
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <form onSubmit={getWeather}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2>{weather.location.name}</h2>
                    <p>{weather.current.condition.text}</p>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Humidity: {weather.current.humidity}%</p>
                    <p>Wind Speed: {weather.current.wind_kph} kph</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
