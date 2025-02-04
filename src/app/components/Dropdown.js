import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Import the down chevron icon

const Dropdown = ({ onUnitChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null); // Ref for outside click handling

  const options = [
    { value: 'default', label: 'Kelvin (°K)' },
    { value: 'metric', label: 'Celsius (°C)' },
    { value: 'imperial', label: 'Fahrenheit (°F)' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Add listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Remove listener on unmount
    };
  }, []); // Empty dependency array ensures this runs only once

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onUnitChange(option.value);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}> {/* Added ref here */}
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 font-medium hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption.label : 'Select Unit'}
          <FaChevronDown className="-mr-2 ml-2 h-5 w-5 text-gray-500" /> {/* Use Icon */}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-black/10 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-white/60 hover:text-gray-900 w-full text-left focus:outline-none"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;