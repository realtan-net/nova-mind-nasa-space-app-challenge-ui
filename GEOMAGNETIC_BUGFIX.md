# Geomagnetic Page Bug Fix

## Issue
The Geomagnetic page was failing to fetch data with a 400 Bad Request error:
```
GET http://localhost:3000/api/geomagnetic/storms?startDate=20250905&endDate=20251005 400 (Bad Request)
```

## Root Cause
The date format being sent to the API was incorrect:
- **Sent:** `20250905` (format: `yyyyMMdd` without hyphens)
- **Expected:** `2025-09-05` (format: `yyyy-MM-dd` with hyphens)

The issue was in the Geomagnetic page initialization where it used `formatAPIDate()` which formats dates as `yyyyMMdd` (used by the Weather API), but the Geomagnetic API requires the standard ISO date format `yyyy-MM-dd`.

## Solution

### 1. Added New Helper Function
**File:** `/src/utils/dateFormatter.js`

Added a new function `formatAPIDateStandard()` that uses the `API_STANDARD` date format:

```javascript
// Format date for API standard (YYYY-MM-DD) - used by most APIs
export const formatAPIDateStandard = (date) => {
  return formatDate(date, DATE_FORMATS.API_STANDARD);
};
```

This function uses the existing `DATE_FORMATS.API_STANDARD` constant which is already defined as `'yyyy-MM-dd'` in the constants file.

### 2. Updated Geomagnetic Page
**File:** `/src/pages/Geomagnetic.jsx`

Changed the import and initial state:

**Before:**
```javascript
import { formatAPIDate, formatDisplayDate, getDateDaysAgo, getCurrentDate } from '../utils/dateFormatter';

const [startDate, setStartDate] = useState(formatAPIDate(getDateDaysAgo(30)));
const [endDate, setEndDate] = useState(formatAPIDate(getCurrentDate()));
```

**After:**
```javascript
import { formatAPIDateStandard, formatDisplayDate, getDateDaysAgo, getCurrentDate } from '../utils/dateFormatter';

const [startDate, setStartDate] = useState(formatAPIDateStandard(getDateDaysAgo(30)));
const [endDate, setEndDate] = useState(formatAPIDateStandard(getCurrentDate()));
```

## Why Two Different Date Formats?

The project uses two different date formats for different APIs:

1. **Weather API** (`formatAPIDate`): Uses `yyyyMMdd` format
   - Example: `20251005`
   - Used by NASA POWER API for weather data

2. **Geomagnetic API** (`formatAPIDateStandard`): Uses `yyyy-MM-dd` format
   - Example: `2025-10-05`
   - Used by NASA DONKI API for geomagnetic data
   - This is the ISO 8601 standard date format

## Testing

After the fix, the API calls now work correctly:

```bash
# Test historical storms endpoint
curl -s 'http://localhost:3000/api/geomagnetic/storms?startDate=2024-09-05&endDate=2024-10-05'
# Returns: {"success": true, "data": {...}}

# Test 3-day forecast endpoint
curl -s 'http://localhost:3000/api/geomagnetic/forecast/3-day'
# Returns: {"success": true, "data": {...}}

# Test 27-day outlook endpoint
curl -s 'http://localhost:3000/api/geomagnetic/forecast/27-day'
# Returns: {"success": true, "data": {...}}
```

## Files Modified

1. `/src/utils/dateFormatter.js` - Added `formatAPIDateStandard()` function
2. `/src/pages/Geomagnetic.jsx` - Changed to use `formatAPIDateStandard()`

## Verification Steps

1. ✅ Open browser to http://localhost:5173/geomagnetic
2. ✅ Page should load without errors
3. ✅ Historical storms tab should show data
4. ✅ 3-day forecast tab should show data
5. ✅ 27-day outlook tab should show data
6. ✅ Date range selector should work correctly
7. ✅ No console errors

## Status
**FIXED** ✅

The Geomagnetic page now correctly fetches and displays all three types of data:
- Historical storm events
- 3-day geomagnetic forecast
- 27-day geomagnetic outlook
