# 🗓️ Sprint Implementation Guide - Sprints 4-7

## 📋 **Sprint 4: Weather Page Enhancement (Days 8-11)**

### **Goal:** Create comprehensive weather data visualization

### **Components to Create:**

#### 1. **WeatherChart.jsx** (`src/components/weather/WeatherChart.jsx`)
```jsx
// Recharts implementation for each parameter
// Props: parameter, data, unit, chartType
// Chart types: line, bar, area, polar
```

**Implementation Steps:**
- [ ] Create line chart for Temperature (T2M)
- [ ] Create area chart for Humidity (RH2M)
- [ ] Create polar chart for Wind (WS10M + WD10M combined)
- [ ] Create line chart for Pressure (PS)
- [ ] Create bar chart for Solar Irradiance (ALLSKY_SFC_SW_DWN)
- [ ] Add responsive behavior
- [ ] Add tooltips with exact values
- [ ] Add legend and axis labels

#### 2. **WeatherTable.jsx** (`src/components/weather/WeatherTable.jsx`)
```jsx
// MUI Table with historical data
// Sortable columns
// Pagination
// Export to CSV functionality
```

#### 3. **DateRangeSelector.jsx** (`src/components/common/DateRangeSelector.jsx`)
```jsx
// Date picker for start/end dates
// Validation (max 365 days)
// Quick select buttons (Last 7 days, Last 30 days, etc.)
```

#### 4. **Update Weather.jsx**
- [ ] Integrate all weather charts
- [ ] Add date range selector
- [ ] Display data in grid layout
- [ ] Add export functionality
- [ ] Show loading skeletons

---

## 🗺️ **Sprint 5: Events & Maps (Days 12-15)**

### **Goal:** Interactive map with natural events

### **Components to Create:**

#### 1. **EventsMap.jsx** (`src/components/events/EventsMap.jsx`)
```jsx
// Leaflet map with React-Leaflet
// GeoJSON layer for events
// Custom markers per category
// Marker clustering
// Popups with event details
```

**Dependencies:**
```bash
npm install leaflet react-leaflet leaflet.markercluster
```

**Implementation:**
- [ ] Initialize Leaflet map
- [ ] Fetch GeoJSON from `/api/eonet/events/geojson`
- [ ] Render GeoJSON layer
- [ ] Create custom markers based on event category
- [ ] Implement marker clustering for dense areas
- [ ] Create popups with event details
- [ ] Add map controls (zoom, layers)

#### 2. **CategoryFilter.jsx** (`src/components/events/CategoryFilter.jsx`)
```jsx
// Checkbox list of categories
// Filter events by category
// Toggle all/none
```

#### 3. **EventsList.jsx** (`src/components/events/EventsList.jsx`)
```jsx
// Sidebar list of events
// Search functionality
// Click to focus map
```

#### 4. **EventCard.jsx** (`src/components/events/EventCard.jsx`)
```jsx
// Detailed event information
// Images if available
// Related events
// Timeline
```

#### 5. **RegionalSearch.jsx** (`src/components/events/RegionalSearch.jsx`)
```jsx
// Search events within radius
// Use location input + radius slider
// Show results on map
```

---

## 🌪️ **Sprint 6: Remaining Pages (Days 16-19)**

### **A. Geomagnetic Page**

#### Components:
1. **KpIndexGauge.jsx** (`src/components/geomagnetic/KpIndexGauge.jsx`)
   - Circular gauge showing current Kp
   - Color-coded (green, yellow, orange, red)
   - Use Recharts RadialBarChart

2. **StormsList.jsx** (`src/components/geomagnetic/StormsList.jsx`)
   - List of recent storms
   - Storm details (start time, Kp values)
   - Linked events

3. **ForecastChart.jsx** (`src/components/geomagnetic/ForecastChart.jsx`)
   - Line chart for 3-day forecast
   - Bar chart for 27-day outlook
   - Threshold lines

#### Update Geomagnetic.jsx:
- [ ] Add Kp gauge at top
- [ ] Show current storm status
- [ ] Display 3-day forecast
- [ ] Display 27-day forecast
- [ ] Historical storms table

---

### **B. Air Quality Page**

#### Components:
1. **AQIGauge.jsx** (`src/components/airquality/AQIGauge.jsx`)
   - Large AQI value display
   - Color-coded background
   - Health recommendation

2. **AQICard.jsx** (`src/components/airquality/AQICard.jsx`)
   - Current readings summary
   - Station information
   - Last updated time

3. **PollutantsList.jsx** (`src/components/airquality/PollutantsList.jsx`)
   - Individual cards for each pollutant
   - PM2.5, PM10, NO2, O3, etc.
   - Value + health level

4. **AQIHistoryChart.jsx** (`src/components/airquality/AQIHistoryChart.jsx`)
   - Historical trend (if available)
   - Time series chart

#### Update AirQuality.jsx:
- [ ] Add location input
- [ ] Display AQI gauge
- [ ] Show all pollutants
- [ ] Display nearest station info
- [ ] Add health recommendations

---

### **C. Asteroids Page**

#### Components:
1. **AsteroidList.jsx** (`src/components/asteroids/AsteroidList.jsx`)
   - List/grid of asteroids
   - Next 7 days
   - Sortable by date/distance/size

2. **AsteroidCard.jsx** (`src/components/asteroids/AsteroidCard.jsx`)
   - Name, ID, size range
   - Close approach date
   - Miss distance
   - Velocity
   - Hazard indicator

3. **HazardIndicator.jsx** (`src/components/asteroids/HazardIndicator.jsx`)
   - Visual indicator (red badge if hazardous)
   - Warning icon

4. **ApproachVisualization.jsx** (`src/components/asteroids/ApproachVisualization.jsx`)
   - Optional: Simple visualization of approach
   - Timeline view

#### Update Asteroids.jsx:
- [ ] Fetch asteroid feed
- [ ] Display asteroid cards/list
- [ ] Add date filter
- [ ] Show hazardous asteroids prominently
- [ ] Add sorting and filtering

---

### **D. APOD Archive Page**

#### Components:
1. **APODDatePicker.jsx** (`src/components/apod/APODDatePicker.jsx`)
   - Calendar to select date
   - Fetch APOD for selected date

2. **APODGallery.jsx** (`src/components/apod/APODGallery.jsx`)
   - Grid view of multiple APODs
   - Lazy loading
   - Click to expand

3. **RandomAPOD.jsx** (`src/components/apod/RandomAPOD.jsx`)
   - Button to fetch random APOD
   - Display random image

#### Update APOD.jsx:
- [ ] Add date picker
- [ ] Fetch APOD by date
- [ ] Add "Random APOD" button
- [ ] Create gallery view (optional)
- [ ] Add favorites system (localStorage)

---

## 🎨 **Sprint 7: Polish & Testing (Days 20-21)**

### **A. Responsive Design**
- [ ] Test on mobile devices (320px, 375px, 414px)
- [ ] Test on tablets (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Add hamburger menu for mobile
- [ ] Optimize touch targets (min 44x44px)
- [ ] Test landscape/portrait orientations

### **B. Loading States**
- [ ] Add skeleton loaders to all components
- [ ] Replace CircularProgress with skeleton screens
- [ ] Smooth transitions between loading and loaded states

### **C. Error Handling**
- [ ] Add error boundaries
- [ ] Implement retry logic with exponential backoff
- [ ] Add fallback UI for critical errors
- [ ] Log errors to console in dev mode

### **D. Performance**
- [ ] Implement React.memo for heavy components
- [ ] Use useMemo for expensive calculations
- [ ] Use useCallback for event handlers
- [ ] Lazy load routes with React.lazy
- [ ] Optimize images (use WebP, lazy loading)
- [ ] Analyze bundle size with `npm run build -- --analyze`

### **E. Accessibility**
- [ ] Add ARIA labels to all interactive elements
- [ ] Ensure keyboard navigation works
- [ ] Test with screen reader
- [ ] Check color contrast ratios (WCAG AA)
- [ ] Add focus indicators
- [ ] Ensure form labels are associated

### **F. SEO**
- [ ] Add meta tags to index.html
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create sitemap
- [ ] Add robots.txt

### **G. Browser Testing**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### **H. Documentation**
- [ ] Update README with final features
- [ ] Create user guide
- [ ] Document API integration
- [ ] Add inline code comments
- [ ] Create deployment guide

---

## 🔧 **Helper Code Snippets**

### **Recharts Line Chart Template:**
```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherLineChart = ({ data, parameter, unit, color }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis label={{ value: unit, angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={parameter} stroke={color} strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);
```

### **Leaflet Map Template:**
```jsx
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const EventsMap = ({ geoJSON }) => (
  <MapContainer center={[20, 0]} zoom={2} style={{ height: '600px', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; OpenStreetMap contributors'
    />
    {geoJSON && <GeoJSON data={geoJSON} />}
  </MapContainer>
);
```

### **AQI Gauge Template:**
```jsx
import { Box, Typography, CircularProgress } from '@mui/material';

const AQIGauge = ({ value, level }) => (
  <Box sx={{ 
    position: 'relative', 
    display: 'inline-flex',
    backgroundColor: level.color,
    borderRadius: '50%',
    padding: 4,
  }}>
    <Box sx={{ 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: 200,
      height: 200,
      backgroundColor: 'white',
      borderRadius: '50%',
    }}>
      <Typography variant="h2" component="div" color="text.primary">
        {value}
      </Typography>
    </Box>
  </Box>
);
```

### **Date Range Selector Template:**
```jsx
import { TextField, Box, Button } from '@mui/material';

const DateRangeSelector = ({ startDate, endDate, onChange }) => {
  const quickSelects = [
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => onChange({ start: e.target.value, end: endDate })}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => onChange({ start: startDate, end: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      {quickSelects.map(qs => (
        <Button key={qs.days} variant="outlined" size="small">
          {qs.label}
        </Button>
      ))}
    </Box>
  );
};
```

---

## 📦 **Additional Dependencies for Sprints 4-7:**

```bash
# For maps (Sprint 5)
npm install leaflet react-leaflet leaflet.markercluster

# Already installed:
# - recharts (for charts)
# - date-fns (for dates)
# - react-icons (for icons)
# - @mui/material (for UI)
```

---

## ✅ **Testing Checklist:**

### **Functionality:**
- [ ] All API calls work correctly
- [ ] Location input updates all pages
- [ ] Theme persists across sessions
- [ ] Saved locations work
- [ ] Navigation works
- [ ] Charts render correctly
- [ ] Map displays events
- [ ] Date pickers work
- [ ] Filters work

### **UI/UX:**
- [ ] Consistent spacing
- [ ] Proper alignment
- [ ] Good color contrast
- [ ] Clear typography
- [ ] Intuitive navigation
- [ ] Smooth animations
- [ ] Responsive on all devices

### **Performance:**
- [ ] Fast initial load
- [ ] Smooth interactions
- [ ] No unnecessary re-renders
- [ ] Optimized images
- [ ] Code splitting

### **Accessibility:**
- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] Focus indicators
- [ ] Color contrast
- [ ] ARIA labels

---

## 🎯 **Final Deliverables:**

By end of Sprint 7, you should have:

✅ Fully functional environmental & space data platform
✅ Beautiful, responsive UI
✅ All 13 API endpoints integrated
✅ Interactive maps
✅ Data visualizations (charts, gauges)
✅ Location-based data
✅ Theme switching
✅ Error handling
✅ Loading states
✅ Documentation

---

**Ready to continue? Start with Sprint 4!** 🚀
