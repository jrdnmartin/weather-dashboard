export const convertTemperature = (temp: number, unit: string) => {
    if (unit === 'imperial') {
      return (temp * 9/5) + 32; // Convert Celsius to Fahrenheit
    } else if (unit === 'default') {
      return temp + 273.15; // Convert Celsius to Kelvin
    }
    return temp; // Default is Celsius
  };