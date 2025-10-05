import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { FaMapMarkerAlt, FaCrosshairs, FaSave } from 'react-icons/fa';
import { useLocation } from '../../context/LocationContext';
import { validateLatitude, validateLongitude } from '../../utils/validators';

const LocationInput = ({ onLocationChange }) => {
  const { location, savedLocations, updateLocation, addSavedLocation, getCurrentPosition } = useLocation();
  
  const [latitude, setLatitude] = useState(location.latitude.toString());
  const [longitude, setLongitude] = useState(location.longitude.toString());
  const [locationName, setLocationName] = useState(location.name || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateLatitude(latitude)) {
      setError('Invalid latitude. Must be between -90 and 90.');
      return;
    }

    if (!validateLongitude(longitude)) {
      setError('Invalid longitude. Must be between -180 and 180.');
      return;
    }

    const newLocation = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      name: locationName || `${latitude}, ${longitude}`,
    };

    updateLocation(newLocation);
    if (onLocationChange) {
      onLocationChange(newLocation);
    }
  };

  const handleCurrentLocation = async () => {
    setLoading(true);
    setError('');

    try {
      const pos = await getCurrentPosition();
      setLatitude(pos.latitude.toString());
      setLongitude(pos.longitude.toString());
      setLocationName('Current Location');
      if (onLocationChange) {
        onLocationChange(pos);
      }
    } catch (err) {
      setError('Failed to get current location. Please check permissions.');
      console.error('Geolocation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLocation = () => {
    if (validateLatitude(latitude) && validateLongitude(longitude)) {
      addSavedLocation({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        name: locationName || `${latitude}, ${longitude}`,
      });
    }
  };

  const handleSelectSaved = (savedLocation) => {
    setLatitude(savedLocation.latitude.toString());
    setLongitude(savedLocation.longitude.toString());
    setLocationName(savedLocation.name);
    updateLocation(savedLocation);
    if (onLocationChange) {
      onLocationChange(savedLocation);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FaMapMarkerAlt style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
        <Typography variant="h6">Location</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            type="number"
            inputProps={{ step: 'any', min: -90, max: 90 }}
            sx={{ flex: 1, minWidth: '150px' }}
            required
          />
          <TextField
            label="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            type="number"
            inputProps={{ step: 'any', min: -180, max: 180 }}
            sx={{ flex: 1, minWidth: '150px' }}
            required
          />
          <TextField
            label="Location Name (Optional)"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            sx={{ flex: 1, minWidth: '150px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<FaMapMarkerAlt />}
          >
            Update Location
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaCrosshairs />}
            onClick={handleCurrentLocation}
            disabled={loading}
          >
            {loading ? 'Getting Location...' : 'Use Current Location'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaSave />}
            onClick={handleSaveLocation}
          >
            Save Location
          </Button>
        </Box>
      </Box>

      {savedLocations.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Saved Locations</InputLabel>
            <Select
              value=""
              label="Saved Locations"
              onChange={(e) => {
                const selected = savedLocations.find(
                  (loc) => loc.name === e.target.value
                );
                if (selected) handleSelectSaved(selected);
              }}
            >
              {savedLocations.map((loc, index) => (
                <MenuItem key={index} value={loc.name}>
                  {loc.name} ({loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Paper>
  );
};

export default LocationInput;
