import React from "react";
import { someUtility } from '../utils';

const ForecastCard = ({ forecast, unit }) => {
  const unitSymbol = unit === 'metric' ? '°C' : unit === 'imperial' ? '°F' : '°K';

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full">
        {forecast.map((day, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-lg p-4 rounded-3xl text-center text-gray-800 shadow-lg transition duration-300 hover:scale-105">
            <p className="text-lg font-bold">{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} className="w-16 h-16 mx-auto" />
            <p className="text-sm text-gray-600">{day.weather[0].description}</p>
            <p className="text-sm text-indigo-600">Expected Temp: {Math.round(convertTemperature(day.main.temp, unit))}{unitSymbol}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;