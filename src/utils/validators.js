export const validateLatitude = (lat) => {
  const numLat = parseFloat(lat);
  return !isNaN(numLat) && numLat >= -90 && numLat <= 90;
};

export const validateLongitude = (lon) => {
  const numLon = parseFloat(lon);
  return !isNaN(numLon) && numLon >= -180 && numLon <= 180;
};

export const validateDateRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate <= endDate && !isNaN(startDate) && !isNaN(endDate);
};

export const validateCoordinates = (latitude, longitude) => {
  return validateLatitude(latitude) && validateLongitude(longitude);
};

export const validateRadius = (radius) => {
  const numRadius = parseFloat(radius);
  return !isNaN(numRadius) && numRadius > 0 && numRadius <= 100000; // Max 100km
};
