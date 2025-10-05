# 🚀 Quick Start Guide - Nova Mind Frontend

## ⚡ **Getting Started in 3 Steps:**

### **Step 1: Install Dependencies**
```bash
cd /home/altan/Desktop/nova-mind-ui
npm install
```

### **Step 2: Configure Environment**
The `.env` file is already configured with default values:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_DEFAULT_LATITUDE=41.0082
VITE_DEFAULT_LONGITUDE=28.9784
VITE_DEFAULT_LOCATION_NAME=Istanbul
```

### **Step 3: Start Development Server**
```bash
npm run dev
```

✅ **The app is now running at:** http://localhost:5173/

---

## 🌐 **What You'll See:**

### **Home Page (http://localhost:5173/)**
- 🌌 **NASA APOD** - Astronomy Picture of the Day (large hero section)
- 🌡️ **Temperature Card** - Current weather for Istanbul
- 🌍 **Geomagnetic Card** - Current Kp index
- 💨 **Air Quality Card** - PM2.5 readings
- ⚠️ **Active Events Card** - Count of natural disasters
- 📋 **Recent Events List** - Last 7 days of natural events

### **Navigation Menu:**
- Home - Dashboard overview
- Weather - Weather data visualization
- Geomagnetic - Space weather monitoring
- Asteroids - Near-Earth Objects tracking
- Events - Natural disasters map
- Air Quality - Air pollution data
- APOD - Astronomy picture archive

---

## 🎨 **Features to Try:**

### **1. Theme Toggle**
- Click the sun/moon icon in the navbar
- Switches between dark and light modes
- Preference is saved automatically

### **2. Location Input**
- Go to Weather or Air Quality page
- Enter custom latitude/longitude
- Or click "Use Current Location" for GPS
- Save favorite locations for quick access

### **3. Saved Locations**
- Add multiple locations
- Quick switch from dropdown
- Automatically persisted in browser

---

## 🔌 **Backend Requirements:**

The frontend expects a backend API at `http://localhost:3000/api`

### **If Backend is NOT Running:**
- You'll see error messages with "Retry" buttons
- The UI structure will still work
- Theme and navigation will function normally

### **If Backend IS Running:**
- All data will load automatically
- Real-time weather, events, and space data
- Full dashboard functionality

---

## 📱 **Responsive Design:**

The app works on:
- 💻 Desktop (optimal experience)
- 📱 Tablet (responsive layout)
- 📱 Mobile (responsive layout, hamburger menu coming in Sprint 7)

---

## 🛠️ **Development Commands:**

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install <package-name>
```

---

## 🎯 **Current Status:**

### ✅ **Working Features:**
- ✨ Beautiful dark/light theme
- 🏠 Fully functional home page
- 📍 Location management system
- 🧭 Navigation and routing
- 🌌 APOD integration
- 📊 Dashboard stats cards
- ⚠️ Recent events display
- 🔄 Loading and error states

### 🚧 **Coming Soon (Sprints 4-7):**
- 📈 Weather charts and visualizations
- 🗺️ Interactive maps with events
- 🌪️ Geomagnetic storm visualization
- ☄️ Asteroid tracking
- 💨 Air quality detailed view
- 📅 APOD archive browser

---

## 🐛 **Troubleshooting:**

### **Port 5173 Already in Use?**
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### **API Errors?**
- Check if backend is running at http://localhost:3000
- Verify `.env` file has correct API URL
- Check browser console for detailed errors

### **Module Not Found?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### **Blank Page?**
- Check browser console for errors
- Verify all files in `src/` exist
- Try clearing browser cache

---

## 📚 **Project Structure Quick Reference:**

```
src/
├── api/              → API calls to backend
├── components/       → Reusable React components
│   ├── common/      → Navbar, Footer, Loading, etc.
│   └── dashboard/   → Home page components
├── context/          → React Context (Theme, Location)
├── hooks/            → Custom React hooks
├── pages/            → Page components (routes)
├── utils/            → Helper functions
├── App.jsx           → Main app component
└── main.jsx          → Entry point
```

---

## 💡 **Tips for Development:**

1. **Hot Reload:** Changes to files auto-refresh the browser
2. **React DevTools:** Install browser extension for debugging
3. **Console:** Check browser console for logs and errors
4. **Network Tab:** Monitor API calls in DevTools
5. **Component Inspector:** Use React DevTools to inspect component state

---

## 🎨 **Customization:**

### **Change Default Location:**
Edit `.env`:
```env
VITE_DEFAULT_LATITUDE=40.7128
VITE_DEFAULT_LONGITUDE=-74.0060
VITE_DEFAULT_LOCATION_NAME=New York
```

### **Change Theme Colors:**
Edit `src/context/ThemeContext.jsx` and modify the color palette.

### **Add New Route:**
1. Create page in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/common/Navbar.jsx`

---

## 📊 **API Endpoints Used:**

Currently integrated:
- ✅ `/api/apod` - APOD data
- ✅ `/api/weather/data` - Weather parameters
- ✅ `/api/geomagnetic/forecast/3-day` - Kp index
- ✅ `/api/openaq/airquality` - Air quality
- ✅ `/api/eonet/events` - Natural events

Ready for integration (Sprints 4-6):
- 🔜 `/api/asteroids/feed`
- 🔜 `/api/eonet/events/geojson`
- 🔜 `/api/geomagnetic/storms`
- 🔜 `/api/geomagnetic/forecast/27-day`

---

## 🎉 **You're All Set!**

The frontend is fully functional for Phase 1-3. 

**Next Steps:**
1. ✅ Verify the app loads at http://localhost:5173
2. ✅ Test theme switching
3. ✅ Try location input
4. ✅ Navigate between pages
5. 🚧 Continue with Sprint 4-7 (charts, maps, etc.)

---

## 📞 **Need Help?**

- 📖 Check `PROJECT_STATUS.md` for detailed documentation
- 🐛 Look in browser console for error messages
- 🔍 Verify backend API is running
- 📝 Review the main `README.md`

**Happy Coding! 🚀**
