# Nova Mind - Environmental & Space Data Platform

A comprehensive web application for monitoring environmental conditions, space weather, natural events, and astronomical data.

## Features

- 🌤️ **Weather Data**: Real-time weather parameters from NASA POWER API
- 🌍 **Natural Events**: Global natural disaster tracking via EONET
- 🪐 **Space Weather**: Geomagnetic storm monitoring and forecasting
- ☄️ **Asteroids**: Near-Earth Object tracking from NASA NeoWs
- 💨 **Air Quality**: Real-time air quality data from OpenAQ
- 🌌 **APOD**: NASA's Astronomy Picture of the Day

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React (JavaScript)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Framework**: Material-UI (MUI)
- **Maps**: Leaflet + React-Leaflet
- **Charts**: Recharts
- **Icons**: React Icons + MUI Icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env` and update the API base URL if needed.

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## API Endpoints

The application connects to a backend API with the following endpoints:

- `/api/weather/*` - Weather data and parameters
- `/api/geomagnetic/*` - Geomagnetic storms and forecasts
- `/api/asteroids/*` - Near-Earth Object data
- `/api/eonet/*` - Natural events tracking
- `/api/openaq/*` - Air quality measurements
- `/api/apod` - Astronomy Picture of the Day

## Project Structure

```
src/
├── api/              # API service modules
├── components/       # React components
├── pages/           # Page components
├── context/         # React context providers
├── hooks/           # Custom React hooks
└── utils/           # Utility functions
```

## License

MIT
