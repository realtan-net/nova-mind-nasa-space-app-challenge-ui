export const WEATHER_PARAMETERS = {
  T2M: { name: 'Temperature', unit: '°C', icon: '🌡️', color: '#ef4444' },
  RH2M: { name: 'Humidity', unit: '%', icon: '💧', color: '#3b82f6' },
  WS10M: { name: 'Wind Speed', unit: 'm/s', icon: '💨', color: '#06b6d4' },
  WD10M: { name: 'Wind Direction', unit: '°', icon: '🧭', color: '#8b5cf6' },
  PS: { name: 'Pressure', unit: 'kPa', icon: '📊', color: '#f59e0b' },
  ALLSKY_SFC_SW_DWN: { name: 'Solar Irradiance', unit: 'kW-hr/m²/day', icon: '☀️', color: '#eab308' }
};

export const AQI_LEVELS = {
  GOOD: { max: 12, color: '#10b981', label: 'Good', description: 'Air quality is satisfactory' },
  MODERATE: { max: 35, color: '#f59e0b', label: 'Moderate', description: 'Acceptable for most people' },
  UNHEALTHY_SENSITIVE: { max: 55, color: '#f97316', label: 'Unhealthy for Sensitive Groups', description: 'May affect sensitive individuals' },
  UNHEALTHY: { max: Infinity, color: '#ef4444', label: 'Unhealthy', description: 'Everyone may experience health effects' }
};

export const KP_INDEX_LEVELS = {
  0: { label: 'Quiet', color: '#10b981', description: 'No geomagnetic activity' },
  1: { label: 'Quiet', color: '#10b981', description: 'No geomagnetic activity' },
  2: { label: 'Quiet', color: '#10b981', description: 'No geomagnetic activity' },
  3: { label: 'Unsettled', color: '#f59e0b', description: 'Minor geomagnetic activity' },
  4: { label: 'Active', color: '#f59e0b', description: 'Active geomagnetic field' },
  5: { label: 'Minor Storm', color: '#f97316', description: 'Minor geomagnetic storm (G1)' },
  6: { label: 'Moderate Storm', color: '#ef4444', description: 'Moderate geomagnetic storm (G2)' },
  7: { label: 'Strong Storm', color: '#dc2626', description: 'Strong geomagnetic storm (G3)' },
  8: { label: 'Severe Storm', color: '#b91c1c', description: 'Severe geomagnetic storm (G4)' },
  9: { label: 'Extreme Storm', color: '#7f1d1d', description: 'Extreme geomagnetic storm (G5)' }
};

export const EVENT_CATEGORIES = {
  wildfires: { name: 'Wildfires', icon: '🔥', color: '#ef4444' },
  volcanoes: { name: 'Volcanoes', icon: '🌋', color: '#f97316' },
  earthquakes: { name: 'Earthquakes', icon: '🏔️', color: '#a78bfa' },
  floods: { name: 'Floods', icon: '🌊', color: '#3b82f6' },
  storms: { name: 'Storms', icon: '⛈️', color: '#6366f1' },
  drought: { name: 'Drought', icon: '🏜️', color: '#fbbf24' },
  severeStorms: { name: 'Severe Storms', icon: '🌪️', color: '#8b5cf6' },
  snow: { name: 'Snow', icon: '❄️', color: '#60a5fa' },
  dustHaze: { name: 'Dust & Haze', icon: '🌫️', color: '#9ca3af' },
  seaLakeIce: { name: 'Sea/Lake Ice', icon: '🧊', color: '#06b6d4' },
  tempExtremes: { name: 'Temperature Extremes', icon: '🌡️', color: '#fb923c' },
  waterColor: { name: 'Water Color', icon: '💧', color: '#22d3ee' }
};

export const DATE_FORMATS = {
  API: 'yyyyMMdd',
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_FULL: 'MMMM dd, yyyy',
  API_STANDARD: 'yyyy-MM-dd',
  TIME: 'HH:mm:ss',
  DATETIME: 'MMM dd, yyyy HH:mm'
};

export const DEFAULT_LOCATION = {
  latitude: parseFloat(import.meta.env.VITE_DEFAULT_LATITUDE),
  longitude: parseFloat(import.meta.env.VITE_DEFAULT_LONGITUDE),
  name: import.meta.env.VITE_DEFAULT_LOCATION_NAME
};

export const MAP_CONFIG = {
  defaultZoom: parseInt(import.meta.env.VITE_MAP_DEFAULT_ZOOM),
  maxZoom: 18,
  minZoom: 2,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};
