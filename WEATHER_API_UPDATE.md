# 🌤️ Weather API Update Documentation

## ✅ **What Has Been Updated**

The weather API integration has been completely updated to match the new backend API structure.

---

## 🔄 **Key Changes**

### **1. API Request Format**

**OLD (Previous):**
```javascript
{
  latitude: 41,
  longitude: 29,
  startDate: '20251030',  // YYYYMMDD
  endDate: '20251030',     // YYYYMMDD
  parameters: 'T2M,RH2M,...',
  community: 'RE'
}
```

**NEW (Current):**
```javascript
{
  latitude: 41,
  longitude: 29,
  date: '2025-10-30',     // YYYY-MM-DD
  parameters: 'T2M,RH2M,WS10M,WD10M,PS,ALLSKY_SFC_SW_DWN',
  historicalYears: 20,
  format: 'json'
}
```

---

### **2. API Response Structure**

**OLD (Previous):**
```json
{
  "data": {
    "parameters": {
      "T2M": { "value": 15.5, "unit": "°C" },
      "RH2M": { "value": 65, "unit": "%" }
    }
  }
}
```

**NEW (Current):**
```json
{
  "data": {
    "hourlyData": {
      "T2M": {
        "2025103000": 13.37,
        "2025103001": 13.29,
        ...
      }
    },
    "dailyAggregates": {
      "T2M": {
        "min": 12.58,
        "max": 17.2,
        "mean": 14.37,
        "units": "C",
        "confidence": "very_low",
        "standardDeviation": 1.63
      }
    },
    "dataType": "prediction",
    "predictionMethod": "historical_average",
    "historicalYearsUsed": 20
  }
}
```

---

## 📁 **Updated Files**

### **1. `/src/api/weather.js`**
- Changed from `startDate/endDate` to single `date` parameter
- Added `historicalYears` parameter (default: 20)
- Added `format: 'json'` parameter
- Updated request structure

### **2. `/src/hooks/useWeatherData.js`**
- Updated hook signature from `(latitude, longitude, dateRange)` to `(latitude, longitude, date, historicalYears)`
- Changed `dateRange.start/end` to single `date`
- Updated refetch function

### **3. `/src/utils/dateFormatter.js`**
- Changed `DATE_FORMATS.API` from `'yyyyMMdd'` to `'yyyy-MM-dd'`
- Added new helper functions:
  - `parseHourlyTimestamp(timestamp)` - Parse YYYYMMDDHH format
  - `getCurrentHourTimestamp()` - Get current hour as YYYYMMDDHH

### **4. `/src/components/dashboard/WeatherSummary.jsx`**
- Updated to use new API structure
- Extracts current hour data from `hourlyData` object
- Uses `getCurrentHourTimestamp()` to find current hour
- Falls back to first available hour if exact match not found
- Shows data type (prediction vs historical)

### **5. `/src/pages/Home.jsx`**
- Updated dashboard stats fetching
- Changed from `parameters.T2M.value` to `hourlyData.T2M[timestamp]`
- Uses first available hour for quick stats

### **6. `/src/pages/Weather.jsx`**
- **Complete redesign** with new features:
  - Date picker for selecting any date
  - Tab navigation (Charts / Hourly Table)
  - Daily aggregate cards showing min/max/mean
  - Hourly data table with all 24 hours
  - Color coding (red for max, blue for min)
  - Prediction metadata display
  - Historical date range information

### **7. `/src/components/weather/WeatherChart.jsx` (NEW)**
- Line charts for Temperature, Wind Speed, Pressure
- Area chart for Humidity
- Bar chart for Solar Irradiance
- Uses Recharts library
- Responsive design
- Color-coded by parameter

---

## 🎯 **New Features**

### **Home Page**
- ✅ Shows **current hour** weather data (or closest available)
- ✅ Displays whether it's a **prediction** or **historical** data
- ✅ Automatically finds the right hour from hourly data

### **Weather Page**
- ✅ **Date picker** - Select any past or future date
- ✅ **Tabs** - Switch between Charts and Table view
- ✅ **Daily summaries** - Min, max, and mean for each parameter
- ✅ **6 interactive charts** - One for each weather parameter
- ✅ **Hourly table** - All 24 hours with full data
- ✅ **Color coding** - Highlights min/max values in table
- ✅ **Metadata display** - Shows prediction method, reliability, historical years
- ✅ **Historical range** - Shows which years were used for prediction

---

## 📊 **Hourly Data Format**

The API returns hourly data with timestamps in format: **YYYYMMDDHH**

Example:
```
"2025103000" = October 30, 2025, 00:00 (midnight)
"2025103012" = October 30, 2025, 12:00 (noon)
"2025103023" = October 30, 2025, 23:00 (11 PM)
```

The frontend automatically:
1. Parses these timestamps
2. Converts to readable time (HH:mm format)
3. Finds current hour for dashboard
4. Displays all hours in table/charts

---

## 🔮 **Prediction vs Historical Data**

### **Future Dates (Predictions):**
- `dataType: "prediction"`
- Based on historical averages from past years
- Shows `predictionMethod: "historical_average"`
- Includes confidence levels and standard deviation
- Shows which historical years were used

### **Past Dates (Historical):**
- `dataType: "historical"` (or actual recorded data)
- Real observed data from NASA POWER
- More accurate than predictions
- No prediction metadata

---

## 🎨 **UI Improvements**

### **Charts:**
- **Temperature (T2M)**: Line chart (red) - Shows temperature variations
- **Humidity (RH2M)**: Area chart (blue) - Shows humidity trends
- **Wind Speed (WS10M)**: Line chart (cyan) - Shows wind patterns
- **Pressure (PS)**: Line chart (amber) - Shows pressure changes
- **Solar Irradiance (ALLSKY_SFC_SW_DWN)**: Bar chart (yellow) - Shows solar power
- **Wind Direction (WD10M)**: Line chart (purple) - Shows wind direction in degrees

### **Daily Aggregate Cards:**
- Shows icon for each parameter
- Displays mean value prominently
- Min/Max chips for quick reference
- Color-coded by parameter

### **Hourly Table:**
- Scrollable for small screens
- Alternating row colors
- Hover effects
- Min values in blue
- Max values in red
- All 24 hours displayed

---

## 📝 **Example Usage**

### **Get Weather for Today:**
```javascript
const today = formatAPIDate(new Date());
const { data, loading, error } = useWeatherData(
  41,      // latitude
  29,      // longitude
  today,   // '2025-10-05'
  20       // historicalYears
);
```

### **Get Weather for Future Date:**
```javascript
const futureDate = '2025-10-30';
const { data } = useWeatherData(41, 29, futureDate, 20);
// Returns prediction based on 20 years of historical data
```

### **Get Weather for Past Date:**
```javascript
const pastDate = '2024-06-15';
const { data } = useWeatherData(41, 29, pastDate);
// Returns actual historical data
```

---

## 🔍 **Data Access Examples**

### **Get Current Hour Temperature:**
```javascript
const currentHourKey = getCurrentHourTimestamp(); // "2025100512"
const currentTemp = data.hourlyData.T2M[currentHourKey];
```

### **Get All Hours for Temperature:**
```javascript
const allHours = Object.entries(data.hourlyData.T2M);
// Returns array of [timestamp, value] pairs
```

### **Get Daily Average:**
```javascript
const avgTemp = data.dailyAggregates.T2M.mean;
const minTemp = data.dailyAggregates.T2M.min;
const maxTemp = data.dailyAggregates.T2M.max;
```

---

## 🧪 **Testing the Updates**

### **Test Scenario 1: Current Weather on Home Page**
1. Open http://localhost:5173/
2. Check "Current Weather Conditions" card
3. Verify it shows temperature, humidity, wind, and pressure
4. Verify it says "Forecast" or "Historical"

### **Test Scenario 2: Weather Page Charts**
1. Navigate to Weather page
2. See 6 interactive charts
3. Hover over data points to see exact values
4. Check that all parameters are displayed

### **Test Scenario 3: Future Date Prediction**
1. Go to Weather page
2. Select a future date (e.g., 2025-10-30)
3. Verify it shows "Prediction" metadata
4. Check prediction method and reliability

### **Test Scenario 4: Historical Data**
1. Select a past date (e.g., 2024-06-15)
2. Verify it shows actual historical data
3. Check hourly table has all 24 hours

### **Test Scenario 5: Hourly Table**
1. Switch to "Hourly Table" tab
2. Verify all 24 hours are shown
3. Check min/max values are color-coded
4. Verify all 6 parameters are displayed

---

## ✅ **Verification Checklist**

- [x] Weather API uses new endpoint format
- [x] Single date instead of date range
- [x] Hourly data structure supported
- [x] Daily aggregates displayed
- [x] Current hour extracted correctly
- [x] Charts render all parameters
- [x] Hourly table shows 24 hours
- [x] Prediction metadata displayed
- [x] Date picker works
- [x] Tab navigation works
- [x] Color coding applied
- [x] Responsive design maintained
- [x] Error handling works
- [x] Loading states work

---

## 🚀 **Next Steps**

The weather functionality is now complete with:
- ✅ Current hour display on home page
- ✅ Full hourly data on weather page
- ✅ Interactive charts
- ✅ Detailed table view
- ✅ Prediction vs historical support
- ✅ Date selection

**Ready for production!** 🎉

---

## 📞 **API Request Example**

```bash
curl -X 'GET' \
  'http://localhost:3000/api/weather/data?latitude=41&longitude=29&date=2025-10-30&parameters=T2M%2CRH2M%2CWS10M%2CWD10M%2CPS%2CALLSKY_SFC_SW_DWN&historicalYears=20&format=json' \
  -H 'accept: application/json'
```

**Frontend automatically handles:**
- ✅ Parameter encoding
- ✅ Date formatting
- ✅ Response parsing
- ✅ Hourly data extraction
- ✅ Current hour detection
- ✅ Chart data transformation
