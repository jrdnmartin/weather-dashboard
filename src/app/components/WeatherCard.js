import React from 'react';

const WeatherCard = ({ city, temperature, description, windspd, icon, unit, humidity, feelsLike}) => {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const unitSymbol = unit === 'metric' ? '°C' : unit === 'imperial' ? '°F' : '°K';

  const roundedTemperature = Math.round(temperature);
  const roundedFeelsLike = Math.round(feelsLike);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-lg transition duration-300 hover:scale-105"> {/* Modern Glassy Look */}
        <div className="flex items-center justify-between mb-4"> {/* City and Icon side by side */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
            <p className="text-sm text-gray-500 capitalize">{description}</p> {/* Description below city */}
          </div>
          <img src={iconUrl} alt={description} className="w-20 h-20 filter drop-shadow-md" />
        </div>
        <div className="text-center"> {/* Centered Temperature */}
          <p className="text-5xl font-bold text-indigo-600">{roundedTemperature}{unitSymbol}</p> {/* Larger, bolder temperature */}
          <p className="text-lg text-gray-600">Feels Like: {roundedFeelsLike}{unitSymbol}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-gray-600"> {/* Grid for details */}
          <div>
            <p><span className="font-semibold">Wind:</span> {windspd} m/s</p>
            <p><span className="font-semibold">Humidity:</span> {humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;