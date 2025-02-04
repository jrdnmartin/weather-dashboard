import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="relative w-full max-w-md"> {/* Relative for absolute positioning of icon */}
      <input
        className="bg-white/80 backdrop-blur-sm p-3 rounded-lg w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />
      <button 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500 hover:text-indigo-700 focus:outline-none" 
        onClick={handleSearch}
      >
        <FaSearch className="h-5 w-5" /> {/* Use icon */}
      </button>
    </div>
  );
};

export default SearchBar;