# Natural Events Quick Reference

## 🚀 Quick Start

### Access the Page
```
http://localhost:5173/natural-events
```

### View Options
- **Map View Tab**: Interactive global map with event markers and storm tracks
- **Event List Tab**: Detailed accordion list with full information

---

## 🎯 Key Features

### 1. Filter Events
**Category Filter**: Select from 13 event types or "All Categories"
- Drought, Dust/Haze, Earthquakes, Floods, Landslides
- Manmade, Sea/Lake Ice, Severe Storms, Snow
- Temperature Extremes, Volcanoes, Water Color, Wildfires

**Status Filter**: 
- Open Events (active/ongoing)
- Closed Events (resolved)
- All Events

### 2. Map Interactions
- **Click markers**: View event details in popup
- **Storm tracks**: Follow polyline paths with magnitude timeline
- **Zoom/Pan**: Navigate the globe
- **Color coding**: Categories have unique colors

### 3. Event Details
Each event shows:
- Title and description
- Category chips (color-coded)
- Magnitude/intensity
- Last update time
- Location coordinates or track points
- Data sources (with links)
- Stale data warnings
- Track timeline chart (storms)

---

## 📊 Dashboard Cards

1. **Total Events**: Count of all filtered events
2. **Active Events**: Events with fresh data
3. **Stale Data**: Events with outdated info
4. **Categories**: Unique category count

---

## 🎨 Color Legend

### Event Categories
- 🟤 Drought/Earthquakes/Landslides: Brown tones
- 🔵 Floods/Sea Ice: Blue tones
- 🔴 Severe Storms/Volcanoes: Red tones
- 🟠 Wildfires/Dust: Orange tones
- ⚪ Snow/Temperature: Light tones
- 🟢 Water Color: Green tones

### Storm Intensity (knots)
- 🔴 85+ kts: Category 3+ Hurricane
- 🟠 65-84 kts: Category 1-2 Hurricane
- 🟡 50-64 kts: Tropical Storm
- 🟨 <50 kts: Tropical Depression

### Wildfire Size (acres)
- 🔴 1000+ acres: Severe
- 🟠 500-999 acres: Major
- 🟡 <500 acres: Moderate

---

## 🔍 API Endpoints

### Get All Events
```bash
curl 'http://localhost:3000/api/eonet/events?status=open&limit=50'
```

### Get Category Events
```bash
curl 'http://localhost:3000/api/eonet/events/category/wildfires?status=open&limit=10'
```

### Get Categories
```bash
curl 'http://localhost:3000/api/eonet/categories'
```

### Get Regional Events
```bash
curl 'http://localhost:3000/api/eonet/events/regional?bbox=26.5,38.0,28.0,39.0&userLat=38.5&userLon=27'
```

---

## 🐛 Common Issues

### Issue: Map not displaying
**Solution**: Check that Leaflet CSS is imported
```javascript
import 'leaflet/dist/leaflet.css';
```

### Issue: No data showing
**Solution**: 
1. Check API is running on port 3000
2. Verify axios interceptor pattern (no double .data access)
3. Check browser console for errors

### Issue: Markers not appearing
**Solution**: Ensure Leaflet default icons are configured
```javascript
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({...});
```

---

## 📁 File Locations

### Main Component
`/src/pages/NaturalEvents.jsx` (900+ lines)

### Hooks
`/src/hooks/useEonetData.js`
- `useEonetCategories()`
- `useEonetEvents(params)`
- `useEonetEventsByCategory(categoryId, params)`
- `useEonetRegionalEvents(params)`

### API Client
`/src/api/eonet.js`
- `getCategories()`
- `getEvents(params)`
- `getEventsByCategory(categoryId, params)`
- `getRegionalEvents(params)`

---

## 💡 Pro Tips

1. **Filter Combination**: Use category + status filters together for specific results
2. **Storm Tracking**: Click accordion to see timeline chart of storm intensity
3. **Data Freshness**: Look for ⚠️ warning chips on stale events
4. **External Sources**: Click source buttons to see official reports
5. **Mobile View**: Accordion layout works better than map on small screens

---

## 🎯 Current Live Data (Oct 5, 2025)

**Active Storms**:
- Tropical Cyclone 02A: 65 kts (Arabian Sea)
- Typhoon Matmo: 90 kts (South China Sea)
- Tropical Storm Octave: 60 kts (Eastern Pacific)

**Categories**: 13 types available
**Events**: ~50 recent events (varies by filter)

---

## 🔧 Customization

### Change Map Center
```javascript
const center = [20, 0]; // [latitude, longitude]
```

### Adjust Event Limit
```javascript
const eventParams = useMemo(() => ({
  status: statusFilter,
  limit: 50, // Change this number
}), [statusFilter]);
```

### Modify Colors
```javascript
const getCategoryColor = (categoryId) => {
  const colors = {
    wildfires: '#FF8C00', // Change to your preference
    // ... other categories
  };
  return colors[categoryId] || '#757575';
};
```

---

## ✅ Verification Steps

1. ✅ Visit http://localhost:5173/natural-events
2. ✅ See 4 summary cards with statistics
3. ✅ View pie chart and bar chart
4. ✅ Click Map View tab - see global map
5. ✅ Click Event List tab - see accordions
6. ✅ Change category filter - data updates
7. ✅ Expand event - see full details
8. ✅ Click map marker - popup appears
9. ✅ No console errors

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify API is running on port 3000
3. Test API endpoints with curl
4. Check network tab for failed requests
5. Verify all dependencies installed: `npm install`

---

**Last Updated**: October 5, 2025
**Status**: ✅ Production Ready
