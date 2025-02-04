"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Dropdown from './components/Dropdown';

export default function Home() {
  const [weather, setWeather] = useState<{ name: string; main: { temp: number; humidity: number; feels_like: number }; weather: { description: string; icon: string }[]; wind: { speed: number } } | null>(null);
  const [city, setCity] = useState("London"); // Default city
  const [unit, setUnit] = useState("metric"); // Default unit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); // New state to check if component is mounted
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError("City not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when component mounts
    fetchWeather(city); // Fetch weather when the city is changed
  }, [city]);

  const convertTemperature = (temp: number, unit: string) => {
    if (unit === 'imperial') {
      return (temp * 9/5) + 32; // Convert Celsius to Fahrenheit
    } else if (unit === 'default') {
      return temp + 273.15; // Convert Celsius to Kelvin
    }
    return temp; // Default is Celsius
  };

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-blue-700 flex flex-col items-center text-white p-4"> {/* Updated Gradient */}
        <header className="w-full py-6 text-center text-5xl font-bold drop-shadow-lg"> {/* Improved Header */}
          <span className="text-yellow-300">Weather</span> Dashboard {/* Highlighted Part of Title */}
        </header>
        <main className="flex flex-col flex-grow gap-8 items-center w-full max-w-3xl mt-8"> {/* Added flex-grow and margin */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <SearchBar onSearch={(city: string) => setCity(city)} />
          <Dropdown onUnitChange={(unit: string) => setUnit(unit)} />
        </div>
        {loading ? (
        <div className="text-center"> {/* Centered loading message */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white-500"></div> {/* Loading Spinner */}
            <p className="text-lg mt-4">Loading...</p>
        </div>        
        ) : error ? (
          <p className="text-lg text-red-500 text-center">{error}</p>
        ) : weather ? (
          <div className="flex justify-center w-full"> {/* Center the WeatherCard */}
            <WeatherCard 
              city={weather.name} 
              temperature={convertTemperature(weather.main.temp, unit)} 
              description={weather.weather[0].description}
              windspd={weather.wind.speed}
              icon={weather.weather[0].icon}
              unit={unit}
              humidity={weather.main.humidity} 
              feelsLike={convertTemperature(weather.main.feels_like, unit)}
            />
          </div>
        ) : (
          <p className="text-lg text-center">Enter a city to get the weather information.</p>
        )}
      </main>
      <footer className="w-full py-4 text-center text-gray-300 mt-8"> {/* Footer */}
        &copy; {new Date().getFullYear()} Weather Dashboard
      </footer>
    </div>
  );
}