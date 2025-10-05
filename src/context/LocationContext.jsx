import { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_LOCATION } from '../utils/constants';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('currentLocation');
    return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
  });

  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem('savedLocations');
    return saved ? JSON.parse(saved) : [DEFAULT_LOCATION];
  });

  useEffect(() => {
    localStorage.setItem('currentLocation', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const addSavedLocation = (newLocation) => {
    setSavedLocations(prev => {
      const exists = prev.some(loc => 
        loc.latitude === newLocation.latitude && 
        loc.longitude === newLocation.longitude
      );
      if (exists) return prev;
      return [...prev, newLocation];
    });
  };

  const removeSavedLocation = (locationToRemove) => {
    setSavedLocations(prev => 
      prev.filter(loc => 
        loc.latitude !== locationToRemove.latitude || 
        loc.longitude !== locationToRemove.longitude
      )
    );
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            name: 'Current Location'
          };
          setLocation(newLocation);
          resolve(newLocation);
        },
        error => reject(error)
      );
    });
  };

  const value = {
    location,
    savedLocations,
    updateLocation,
    addSavedLocation,
    removeSavedLocation,
    getCurrentPosition
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
