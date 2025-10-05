// Temperature conversions
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5/9;
};

// Wind speed conversions
export const mpsToKmh = (mps) => {
  return mps * 3.6;
};

export const mpsToMph = (mps) => {
  return mps * 2.23694;
};

export const mpsToKnots = (mps) => {
  return mps * 1.94384;
};

// Pressure conversions
export const kpaToHpa = (kpa) => {
  return kpa * 10;
};

export const kpaToInHg = (kpa) => {
  return kpa * 0.2953;
};

// Distance conversions
export const kmToMiles = (km) => {
  return km * 0.621371;
};

export const milesToKm = (miles) => {
  return miles * 1.60934;
};

// Format number with units
export const formatValue = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return 'N/A';
  return parseFloat(value).toFixed(decimals);
};

// Format large numbers
export const formatLargeNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
