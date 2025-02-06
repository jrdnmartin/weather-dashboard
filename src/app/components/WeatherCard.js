import React from 'react';

const WeatherCard = ({ city, temperature, description, windspd, icon, unit, humidity, feelsLike, weatherId }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const unitSymbol = unit === 'metric' ? '°C' : unit === 'imperial' ? '°F' : '°K';

  const roundedTemperature = Math.round(temperature);
  const roundedFeelsLike = Math.round(feelsLike);

  const getBackgroundStyle = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) {
      return 'bg-gradient-to-b from-gray-800 to-gray-500'; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 500) {
      return 'bg-gradient-to-b from-blue-500 to-blue-700'; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return 'bg-gradient-to-b from-blue-600 to-blue-400'; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'bg-gradient-to-b from-cyan-200 to-blue-400'; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'bg-gradient-to-b from-gray-300 to-gray-500'; // Atmosphere (mist, smoke, haze, etc.)
    } else if (weatherId === 800) {
      return 'bg-gradient-to-b from-blue-400 to-orange-200'; // Clear sky
    } else if (weatherId > 800 && weatherId < 900) {
      return 'bg-gradient-to-b from-gray-400 to-gray-200'; // Clouds
    } else {
      return 'bg-gradient-to-b from-gray-300 to-cyan-600'; // Default
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`p-8 rounded-3xl shadow-lg transition duration-300 hover:scale-105 ${getBackgroundStyle(weatherId)}`}> {/* Modern Glassy Look */}
        <div className="flex items-center justify-between mb-4"> {/* City and Icon side by side */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
            <p className="text-sm text-gray-700 capitalize">{description}</p> {/* Description below city */}
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