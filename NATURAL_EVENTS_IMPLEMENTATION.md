# Natural Events Page Implementation

## Overview
Comprehensive implementation of the Natural Events page for tracking global natural disasters from NASA's Earth Observatory Natural Event Tracker (EONET) API.

## Date: October 5, 2025

---

## 🎯 Implementation Summary

### What Was Fixed
1. **Empty Page Issue**: The Natural Events page was completely empty with only placeholder text
2. **API Integration**: Connected three EONET endpoints (categories, events, category-specific events)
3. **Data Access Bug**: Fixed hooks to properly access response data (axios interceptor pattern)
4. **Missing Features**: Added map visualization, event tracking, filtering, and analytics

---

## 📊 Features Implemented

### 1. Summary Dashboard
- **Total Events Card**: Shows count of all events in current filter
- **Active Events Card**: Events with fresh data (not stale)
- **Stale Data Card**: Events with outdated information
- **Categories Card**: Number of unique event categories

### 2. Interactive Map View
- **Global Event Visualization**: Leaflet map with OpenStreetMap tiles
- **Custom Markers**: Color-coded by event category with size based on magnitude
- **Storm Tracks**: Polyline visualization showing cyclone/hurricane paths
- **Timeline Markers**: Circle markers for each position in storm track
- **Interactive Popups**: Detailed information on marker click
- **Multi-Event Types**: Supports both tracked events (storms) and point events (wildfires)

### 3. Analytics Charts
- **Category Distribution**: Pie chart showing events by category
- **Magnitude Distribution**: Bar chart showing top 10 events by intensity
- **Color Coding**: Severity-based colors for quick risk assessment

### 4. Event List View
- **Expandable Accordions**: Collapsible panels for each event
- **Detailed Information**:
  - Event title and description
  - Categories with color-coded chips
  - Current magnitude (for storms)
  - Status (open/closed)
  - Last update timestamp
  - Location coordinates or track points
  - Data sources with external links
  - Proximity alerts (for regional events)
  - Stale data warnings
  - Track timeline chart (for storms)

### 5. Filtering System
- **Category Filter**: Filter by 13 event categories or view all
- **Status Filter**: Show open events, closed events, or all
- **Real-time Updates**: Filters trigger new API calls

### 6. Event Categories Supported
1. **Drought**: Long-lasting precipitation absence
2. **Dust and Haze**: Air pollution and dust storms
3. **Earthquakes**: Seismic activity
4. **Floods**: Water inundation events
5. **Landslides**: Mudslides and avalanches
6. **Manmade**: Human-induced extreme events
7. **Sea and Lake Ice**: Ice formations
8. **Severe Storms**: Hurricanes, cyclones, tornadoes
9. **Snow**: Extreme snowfall events
10. **Temperature Extremes**: Heat waves and cold snaps
11. **Volcanoes**: Volcanic eruptions
12. **Water Color**: Phytoplankton, algae, sediment
13. **Wildfires**: Forest and wildland fires

---

## 🔧 Technical Implementation

### Files Modified

#### 1. `/src/pages/NaturalEvents.jsx` (900+ lines)
**Before**: Empty placeholder page
**After**: Full-featured event tracking dashboard

**Key Components**:
```javascript
// State Management
const [activeTab, setActiveTab] = useState(0);
const [selectedCategory, setSelectedCategory] = useState('all');
const [statusFilter, setStatusFilter] = useState('open');
const [expandedEvent, setExpandedEvent] = useState(null);

// Data Hooks
const { categories, loading, error } = useEonetCategories();
const { events } = useEonetEvents({ status: statusFilter, limit: 50 });
const { events: categoryEvents } = useEonetEventsByCategory(categoryId, params);
```

**Rendering Functions**:
- `renderSummaryCards()`: 4 gradient cards with statistics
- `renderCharts()`: Pie and bar charts for analytics
- `renderMapView()`: Leaflet map with markers and tracks
- `renderEventList()`: Accordion list with detailed panels

**Utility Functions**:
- `getCategoryColor(categoryId)`: Returns category-specific colors
- `getMagnitudeColor(value, unit)`: Returns severity-based colors
- `createCustomIcon(categoryId, magnitude)`: Creates custom map markers

#### 2. `/src/hooks/useEonetData.js`
**Fixed Issues**:
- Changed `setCategories(response.data)` → `setCategories(response)`
- Changed `setEvents(response.data)` → `setEvents(response)`
- Reason: Axios interceptor already returns `response.data`

**Added Hooks**:
```javascript
// Category-specific events
export const useEonetEventsByCategory = (categoryId, params = {})

// Regional events with bounding box
export const useEonetRegionalEvents = (params = {})
```

#### 3. `/src/api/eonet.js`
**Updated**:
```javascript
// Simplified regional events to accept params directly
getRegionalEvents: async (params = {}) => {
  return api.get('/eonet/events/regional', { params });
}
```

---

## 🎨 Visual Design

### Color Schemes

**Category Colors**:
```javascript
drought: '#D4A574'      // Tan
dustHaze: '#B8860B'     // Dark goldenrod
earthquakes: '#8B4513'  // Saddle brown
floods: '#4682B4'       // Steel blue
landslides: '#8B4513'   // Saddle brown
manmade: '#696969'      // Dim gray
seaLakeIce: '#87CEEB'   // Sky blue
severeStorms: '#FF6347' // Tomato red
snow: '#F0F8FF'         // Alice blue
tempExtremes: '#FF4500' // Orange red
volcanoes: '#DC143C'    // Crimson
waterColor: '#20B2AA'   // Light sea green
wildfires: '#FF8C00'    // Dark orange
```

**Magnitude Severity** (for storms in knots):
- 85+ kts: `#d32f2f` (Category 3+ Hurricane - Red)
- 65-84 kts: `#f57c00` (Category 1-2 Hurricane - Orange)
- 50-64 kts: `#ffa726` (Tropical Storm - Light Orange)
- <50 kts: `#ffb74d` (Tropical Depression - Amber)

**Magnitude Severity** (for wildfires in acres):
- 1000+ acres: `#d32f2f` (Severe - Red)
- 500-999 acres: `#f57c00` (Major - Orange)
- <500 acres: `#ffa726` (Moderate - Light Orange)

### Summary Card Gradients
1. Total Events: Purple gradient (`#667eea → #764ba2`)
2. Active Events: Pink gradient (`#f093fb → #f5576c`)
3. Stale Data: Blue gradient (`#4facfe → #00f2fe`)
4. Categories: Warm gradient (`#fa709a → #fee140`)

---

## 🔍 API Endpoints Used

### 1. Get Categories
```bash
GET /api/eonet/categories
```
**Returns**: List of 13 event categories with descriptions

### 2. Get All Events
```bash
GET /api/eonet/events?status=open&limit=50
```
**Parameters**:
- `status`: open | closed | all
- `limit`: Number of events to return

### 3. Get Category Events
```bash
GET /api/eonet/events/category/{categoryId}?status=open&limit=50
```
**Example**: `/api/eonet/events/category/wildfires?status=open&limit=3`

### 4. Get Regional Events
```bash
GET /api/eonet/events/regional?bbox=26.5,38.0,28.0,39.0&userLat=38.5&userLon=27
```
**Parameters**:
- `bbox`: Bounding box (minLon,minLat,maxLon,maxLat)
- `userLat`: User latitude for proximity calculation
- `userLon`: User longitude for proximity calculation

---

## 📦 Response Data Structure

### Event Object
```javascript
{
  id: "EONET_15683",
  title: "Tropical Cyclone 02A",
  description: null,
  link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_15683",
  status: "open",
  closedDate: null,
  categories: [
    { id: "severeStorms", title: "Severe Storms" }
  ],
  sources: [
    { id: "JTWC", url: "https://www.metoc.navy.mil/jtwc/..." }
  ],
  
  // For tracked events (storms)
  geometry: [
    {
      date: "2025-10-03T00:00:00Z",
      type: "Point",
      coordinates: { longitude: 67.2, latitude: 21.5 },
      magnitude: { value: 35, unit: "kts" }
    }
  ],
  currentMagnitude: { value: 65, unit: "kts", label: "65 kts" },
  
  // For point events (wildfires)
  location: { longitude: -114.3345, latitude: 43.7595 },
  magnitude: { value: 512, unit: "acres", label: "512 acres" },
  
  // Common
  lastUpdate: "2025-10-05T06:00:00Z",
  isStaleData: false,
  
  // For regional events
  dataAge: {
    hours: 165,
    isStale: true,
    staleSince: "2025-09-30T16:09:00.000Z"
  },
  proximityToUser: {
    distanceKm: 12.58,
    distanceMiles: 7.82,
    riskLevel: "HIGH",
    riskDescription: "<50 km: High Risk",
    alert: "Nearby active wildfire"
  }
}
```

---

## 🗺️ Map Implementation Details

### Leaflet Configuration
```javascript
<MapContainer
  center={[20, 0]}  // World center
  zoom={2}           // Global view
  style={{ height: '100%', width: '100%' }}
  scrollWheelZoom={true}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; OpenStreetMap contributors'
  />
```

### Storm Track Visualization
```javascript
// Draw polyline for storm path
<Polyline
  positions={trackPoints}
  color={getCategoryColor(categoryId)}
  weight={3}
  opacity={0.6}
/>

// Add circle markers for each position
{geometry.map((point, idx) => (
  <CircleMarker
    center={[point.coordinates.latitude, point.coordinates.longitude]}
    radius={4}
    fillColor={getMagnitudeColor(point.magnitude?.value, point.magnitude?.unit)}
    color="white"
    weight={1}
    fillOpacity={0.8}
  />
))}
```

### Custom Marker Icons
```javascript
const createCustomIcon = (categoryId, magnitude) => {
  const color = getCategoryColor(categoryId);
  const size = magnitude ? Math.min(40, Math.max(20, magnitude / 10)) : 25;
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};
```

---

## 📈 Charts Implementation

### Category Distribution (Pie Chart)
```javascript
const categoryData = {};
events.forEach(event => {
  event.categories?.forEach(cat => {
    categoryData[cat.title] = (categoryData[cat.title] || 0) + 1;
  });
});

const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

<PieChart>
  <Pie
    data={pieData}
    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
    outerRadius={80}
    dataKey="value"
  >
    {pieData.map((entry, index) => (
      <Cell key={index} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
</PieChart>
```

### Magnitude Distribution (Bar Chart)
```javascript
const magnitudeData = events
  .filter(e => e.currentMagnitude?.value)
  .map(e => ({
    title: e.title.substring(0, 20) + '...',
    magnitude: e.currentMagnitude.value,
    unit: e.currentMagnitude.unit,
  }))
  .slice(0, 10);

<BarChart data={magnitudeData}>
  <Bar dataKey="magnitude">
    {magnitudeData.map((entry, index) => (
      <Cell fill={getMagnitudeColor(entry.magnitude, entry.unit)} />
    ))}
  </Bar>
</BarChart>
```

### Storm Track Timeline (Line Chart)
```javascript
<LineChart data={event.geometry.map((g, idx) => ({
  time: format(new Date(g.date), 'MMM dd HH:mm'),
  magnitude: g.magnitude?.value || 0,
  index: idx,
}))}>
  <Line
    type="monotone"
    dataKey="magnitude"
    stroke="#8884d8"
    strokeWidth={2}
  />
</LineChart>
```

---

## 🐛 Bugs Fixed

### 1. Data Access Pattern
**Issue**: Hooks were accessing `response.data` when axios interceptor already returns `response.data`

**Before**:
```javascript
const response = await eonetAPI.getCategories();
setCategories(response.data);  // ❌ Accessing .data.data
```

**After**:
```javascript
const response = await eonetAPI.getCategories();
setCategories(response);  // ✅ Correct access pattern
```

### 2. Missing Hooks
**Issue**: API had methods for category/regional events but no corresponding hooks

**Solution**: Added `useEonetEventsByCategory` and `useEonetRegionalEvents` hooks

### 3. API Parameter Mismatch
**Issue**: Regional events API expected `bbox` parameter, not `latitude, longitude, radius`

**Fixed**: Updated API method to accept generic params object

---

## 🎮 User Interactions

### Filter Changes
1. Select category from dropdown → Triggers new API call with category filter
2. Change status filter → Updates all views with open/closed/all events
3. Filters work independently and can be combined

### Map Interactions
1. Click marker → Show popup with event details
2. Click circle marker on track → Show position-specific information
3. Scroll to zoom, drag to pan
4. Storm tracks show color-coded polylines with magnitude markers

### List Interactions
1. Click accordion → Expand to see full details
2. Click source button → Open external link in new tab
3. View track timeline chart for storms
4. See proximity alerts for regional events
5. Warning chips for stale data

---

## 📊 Sample Data

### Current Live Events (as of Oct 5, 2025)
1. **Tropical Cyclone 02A**: 65 kts, 10 track points, Arabian Sea
2. **Typhoon Matmo**: 90 kts, 15 track points, South China Sea
3. **Tropical Cyclone 01B**: 35 kts, 6 track points, Bay of Bengal
4. **Tropical Storm Octave**: 60 kts, 20 track points, Eastern Pacific
5. **Tropical Storm Imelda**: 65 kts, 16 track points, Atlantic

### Wildfire Examples
- Lake Creek Wildfire: 512 acres, Idaho (stale data)
- Hayes Wildfire: 747 acres, Montana (stale data)
- Heat Wave Wildfire: 539 acres, Texas (stale data)

---

## 🚀 Performance Optimizations

1. **Memoized Event Params**: Using `useMemo` to prevent unnecessary re-renders
2. **Conditional Hook Execution**: Only fetch category events when category is selected
3. **Limit Parameter**: Default limit of 50 events to prevent data overload
4. **Lazy Loading**: Map markers only render when tab is active

---

## 📱 Responsive Design

- Grid layout adapts to screen size (xs, sm, md breakpoints)
- Cards stack vertically on mobile
- Charts scale with ResponsiveContainer
- Map height fixed at 600px for consistency
- Accordion layout works well on all devices

---

## ✅ Testing Checklist

- [x] Categories endpoint returns 13 categories
- [x] Events endpoint returns open events with limit
- [x] Category filter works (tested with wildfires)
- [x] Regional events endpoint with bbox parameter
- [x] Map renders with OpenStreetMap tiles
- [x] Storm tracks display as polylines with markers
- [x] Point events (wildfires) show single markers
- [x] Charts display category and magnitude data
- [x] Event list shows detailed information
- [x] Stale data warnings appear correctly
- [x] Filters update data in real-time
- [x] No console errors
- [x] No TypeScript/ESLint errors

---

## 🔮 Future Enhancements

1. **Real-time Updates**: WebSocket connection for live event tracking
2. **User Location**: Get browser geolocation for proximity alerts
3. **Date Range Filter**: Filter events by date range
4. **Export Functionality**: Download event data as CSV/JSON
5. **Advanced Filtering**: Multiple categories, magnitude ranges
6. **Notification System**: Alert users to nearby high-risk events
7. **Historical View**: Timeline slider to see past events
8. **3D Visualization**: Cesium.js for globe view with terrain
9. **Heatmap Layer**: Density visualization of event clusters
10. **Predictive Analytics**: ML-based event forecasting

---

## 📚 Dependencies Used

- **@mui/material**: UI components
- **@mui/icons-material**: Icons
- **react-leaflet**: Map integration
- **leaflet**: Mapping library
- **recharts**: Chart components
- **date-fns**: Date formatting
- **axios**: HTTP client

---

## 🎓 Key Learnings

1. **Axios Interceptor Pattern**: Critical to understand response unwrapping
2. **Leaflet Icons**: Need to fix default icon URLs for production
3. **Event Types**: EONET returns two types (tracked geometry, point location)
4. **Stale Data**: Events can have `isStaleData` or `dataAge.isStale` flags
5. **Magnitude Units**: Different units (kts, acres) need different color scales
6. **Responsive Maps**: Fixed height needed to prevent layout issues

---

## 📝 Notes

- Map requires Leaflet CSS import in component
- Custom icons use divIcon to allow dynamic styling
- Storm tracks use latest position for main marker
- Regional events require bbox parameter in specific format
- All dates formatted using date-fns for consistency
- Charts use responsive container for mobile support

---

## 🏆 Implementation Status

**Status**: ✅ COMPLETE

- All API endpoints integrated
- Map visualization working
- Charts displaying correctly
- Filters functioning
- Event details comprehensive
- No errors or warnings
- Responsive design implemented
- Documentation complete

The Natural Events page is now a fully functional, production-ready feature! 🎉
