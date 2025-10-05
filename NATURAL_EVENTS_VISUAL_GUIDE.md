# Natural Events Page - Visual Guide

## 🎨 Page Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Natural Events Tracker                                          │
│  Real-time global natural disaster tracking from NASA EONET     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────┐  ┌──────────────────────────┐ │
│  │ Category: [All Categories ▼] │  │ Status: [Open Events ▼]  │ │
│  └──────────────────────────────┘  └──────────────────────────┘ │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                     SUMMARY CARDS                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ TOTAL    │ │ ACTIVE   │ │ STALE    │ │CATEGORIES│          │
│  │ EVENTS   │ │ EVENTS   │ │ DATA     │ │          │          │
│  │   50     │ │   35     │ │   15     │ │    5     │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                        ANALYTICS                                 │
│  ┌────────────────────────┐  ┌────────────────────────────┐    │
│  │  Events by Category    │  │  Magnitude Distribution     │    │
│  │  ┌──────────────────┐  │  │  ┌──────────────────────┐  │    │
│  │  │   🥧 PIE CHART   │  │  │  │   📊 BAR CHART       │  │    │
│  │  │                  │  │  │  │                      │  │    │
│  │  └──────────────────┘  │  │  └──────────────────────┘  │    │
│  └────────────────────────┘  └────────────────────────────┘    │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│           [  Map View  ]  [  Event List  ]                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  MAP VIEW:                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🗺️  WORLD MAP                                          │   │
│  │     ● ● ●  Markers (color-coded by category)            │   │
│  │     ━━━━━  Storm tracks (polylines)                     │   │
│  │     ○ ○ ○  Track points (magnitude markers)             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  EVENT LIST VIEW:                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ● Tropical Cyclone 02A  [Severe Storms] [65 kts] [Open]▼│   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │   📅 Last Update: Oct 05, 2025 06:00:00                 │   │
│  │   📍 Track Points: 10 positions tracked                 │   │
│  │   📊 Sources: [JTWC]                                     │   │
│  │   ⚠️  Status: Active                                     │   │
│  │   📈 [Track Timeline Chart]                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ● Wildfire in Idaho  [Wildfires] [512 acres] [Open] ▼   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Coding System

### Summary Cards (Gradient Backgrounds)

```
┌────────────────────┐
│  TOTAL EVENTS      │  Purple → Violet
│  🌍 50             │  (#667eea → #764ba2)
└────────────────────┘

┌────────────────────┐
│  ACTIVE EVENTS     │  Pink → Red
│  ✅ 35             │  (#f093fb → #f5576c)
└────────────────────┘

┌────────────────────┐
│  STALE DATA        │  Cyan → Light Blue
│  ⚠️  15            │  (#4facfe → #00f2fe)
└────────────────────┘

┌────────────────────┐
│  CATEGORIES        │  Pink → Yellow
│  📂 5              │  (#fa709a → #fee140)
└────────────────────┘
```

### Event Category Colors

```
Drought          ██████  #D4A574  Tan
Dust & Haze      ██████  #B8860B  Dark Goldenrod
Earthquakes      ██████  #8B4513  Saddle Brown
Floods           ██████  #4682B4  Steel Blue
Landslides       ██████  #8B4513  Saddle Brown
Manmade          ██████  #696969  Dim Gray
Sea & Lake Ice   ██████  #87CEEB  Sky Blue
Severe Storms    ██████  #FF6347  Tomato Red
Snow             ██████  #F0F8FF  Alice Blue
Temp Extremes    ██████  #FF4500  Orange Red
Volcanoes        ██████  #DC143C  Crimson
Water Color      ██████  #20B2AA  Light Sea Green
Wildfires        ██████  #FF8C00  Dark Orange
```

### Storm Magnitude Colors (Knots)

```
85+ kts     ██████  #d32f2f  Category 3+ Hurricane (RED)
65-84 kts   ██████  #f57c00  Category 1-2 Hurricane (ORANGE)
50-64 kts   ██████  #ffa726  Tropical Storm (LIGHT ORANGE)
<50 kts     ██████  #ffb74d  Tropical Depression (AMBER)
```

### Wildfire Size Colors (Acres)

```
1000+ acres   ██████  #d32f2f  Severe (RED)
500-999 acres ██████  #f57c00  Major (ORANGE)
<500 acres    ██████  #ffa726  Moderate (LIGHT ORANGE)
```

---

## 🗺️ Map View Details

### Map Markers

**Single Location Events (Wildfires, Earthquakes)**
```
    ●  ← Circle marker
    │     Size: Based on magnitude (20-40px)
    │     Color: Category-specific
    │     Border: 3px white
    └──── Shadow effect
```

**Storm Track Events**
```
  Position 1   Position 2   Position 3   Current
     ○────────────○────────────○────────────●
     │            │            │            │
  35 kts      45 kts      55 kts      65 kts
  
  ━━━━ Polyline (category color, 3px width)
  ○ Track point (magnitude color, 4px radius)
  ● Current position (larger marker)
```

### Marker Popup Content
```
┌─────────────────────────────┐
│ Tropical Cyclone 02A        │
│ Severe Storms               │
│ Magnitude: 65 kts           │
│ Status: open                │
│ ⚠️ Stale Data (if applicable)│
└─────────────────────────────┘
```

---

## 📊 Charts Visualization

### Pie Chart (Category Distribution)
```
        Severe Storms 40%
       ╱────────────────╲
      ╱    Wildfires    ╲  25%
     │                   │
     │   Earthquakes 15% │
     │                   │
      ╲   Others 20%    ╱
       ╲______________╱
```

### Bar Chart (Magnitude Distribution)
```
Magnitude
    90 │     ▓▓
    80 │  ▓▓ ▓▓
    70 │  ▓▓ ▓▓    ▓▓
    60 │  ▓▓ ▓▓ ▓▓ ▓▓
    50 │  ▓▓ ▓▓ ▓▓ ▓▓ ▓▓
    40 │  ▓▓ ▓▓ ▓▓ ▓▓ ▓▓
    30 │  ▓▓ ▓▓ ▓▓ ▓▓ ▓▓
    20 │  ▓▓ ▓▓ ▓▓ ▓▓ ▓▓
    10 │  ▓▓ ▓▓ ▓▓ ▓▓ ▓▓
     0 └──┴──┴──┴──┴──┴─
        E1 E2 E3 E4 E5   (Events)

Colors: Red (high), Orange (medium), Yellow (low)
```

### Storm Track Timeline (Line Chart)
```
Magnitude
(kts)
 90 │           ╱──╲
 80 │          ╱    ╲
 70 │         ╱      ╲__
 60 │        ╱          ╲
 50 │       ╱            ╲
 40 │    __╱              ╲
 30 │___╱                  ╲__
    └────────────────────────────
    Oct 3   Oct 4   Oct 5   (Time)
```

---

## 🎯 Interactive Elements

### Filter Dropdowns
```
┌──────────────────────────┐
│ Category: All Categories ▼│  ← Click to open
├──────────────────────────┤
│ ● All Categories         │
│ ○ Drought                │
│ ○ Earthquakes            │
│ ○ Severe Storms          │
│ ○ Wildfires              │
│ ○ ... (13 total)         │
└──────────────────────────┘
```

### Accordion (Collapsed)
```
┌────────────────────────────────────────────────┐
│ ● Event Title  [Category] [Magnitude] [Status] ▼│
└────────────────────────────────────────────────┘
```

### Accordion (Expanded)
```
┌────────────────────────────────────────────────┐
│ ● Event Title  [Category] [Magnitude] [Status] ▲│
├────────────────────────────────────────────────┤
│ Description text here...                       │
│                                                │
│ 📅 Last Update: Oct 05, 2025 06:00:00         │
│ 📍 Location: Lat 21.5, Lon 67.2               │
│                                                │
│ Data Sources: [JTWC] [NOAA]                   │
│                                                │
│ ⚠️ Warning: Stale data (165h old)             │
│                                                │
│ Track Timeline:                                │
│ [────────────Line Chart─────────────]         │
└────────────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

### Desktop (>1200px)
```
┌─────────────────────────────────────────────┐
│  [Card] [Card] [Card] [Card]                │  4 cards per row
│  [────Chart────] [────Chart────]            │  2 charts per row
│  [────────────Map/List──────────────]       │  Full width
└─────────────────────────────────────────────┘
```

### Tablet (768-1199px)
```
┌───────────────────────────────┐
│  [Card] [Card]                │  2 cards per row
│  [Card] [Card]                │
│  [─────Chart─────]            │  1 chart per row
│  [─────Chart─────]            │
│  [────Map/List────]           │
└───────────────────────────────┘
```

### Mobile (<768px)
```
┌─────────────┐
│  [Card]     │  1 card per row
│  [Card]     │
│  [Card]     │
│  [Card]     │
│  [─Chart─]  │  Full width chart
│  [─Chart─]  │
│  [─List──]  │  List view recommended
└─────────────┘
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────┐
│  Natural Events Component                   │
│                                             │
│  State:                                     │
│  ├─ activeTab: 0 (Map) or 1 (List)        │
│  ├─ selectedCategory: "all" or categoryId  │
│  ├─ statusFilter: "open", "closed", "all"  │
│  └─ expandedEvent: eventId or null         │
└──────────────┬──────────────────────────────┘
               │
               ├─────> useEonetCategories()
               │       └──> GET /api/eonet/categories
               │            └──> { categories: [...] }
               │
               ├─────> useEonetEvents({ status, limit })
               │       └──> GET /api/eonet/events?status=open&limit=50
               │            └──> { events: [...] }
               │
               └─────> useEonetEventsByCategory(categoryId, params)
                       └──> GET /api/eonet/events/category/{id}
                            └──> { events: [...] }
               
┌─────────────────────────────────────────────┐
│  Render Flow                                │
│                                             │
│  1. renderSummaryCards()                    │
│     ├─ Total Events Card                    │
│     ├─ Active Events Card                   │
│     ├─ Stale Data Card                      │
│     └─ Categories Card                      │
│                                             │
│  2. renderCharts()                          │
│     ├─ Pie Chart (category distribution)    │
│     └─ Bar Chart (magnitude distribution)   │
│                                             │
│  3. Tab Content (activeTab)                 │
│     ├─ Tab 0: renderMapView()              │
│     │   ├─ MapContainer (Leaflet)          │
│     │   ├─ Markers for single events       │
│     │   └─ Polylines + CircleMarkers (storms)│
│     │                                       │
│     └─ Tab 1: renderEventList()            │
│         └─ Accordions with full details    │
└─────────────────────────────────────────────┘
```

---

## 🎮 User Journey Examples

### Journey 1: Finding Active Wildfires
```
1. User visits page
   ↓
2. Clicks Category dropdown
   ↓
3. Selects "Wildfires"
   ↓
4. System fetches wildfire-specific events
   ↓
5. Map updates with 🔥 orange markers
   ↓
6. Charts show wildfire data only
   ↓
7. User clicks marker on map
   ↓
8. Popup shows "Lake Creek Wildfire - 512 acres"
```

### Journey 2: Tracking Storm Development
```
1. User opens Event List tab
   ↓
2. Sees "Typhoon Matmo" accordion
   ↓
3. Clicks to expand
   ↓
4. Views 15 track points
   ↓
5. Scrolls to timeline chart
   ↓
6. Sees magnitude increase: 35kts → 90kts
   ↓
7. Clicks [JTWC] source button
   ↓
8. Opens official forecast in new tab
```

### Journey 3: Checking Closed Events
```
1. User changes Status filter to "Closed Events"
   ↓
2. System refetches with status=closed
   ↓
3. Summary cards update
   ↓
4. Map shows historical event locations
   ↓
5. Pie chart shows closed event distribution
```

---

## 🏷️ Chip Legend

### Status Chips
```
[Open]   - Red background, white text
[Closed] - Gray background, white text
```

### Category Chips
```
[Severe Storms]  - #FF6347 (Tomato)
[Wildfires]      - #FF8C00 (Dark Orange)
[Earthquakes]    - #8B4513 (Saddle Brown)
[Floods]         - #4682B4 (Steel Blue)
... (color-coded by category)
```

### Magnitude Chips
```
[90 kts]   - Red (Category 3+ Hurricane)
[65 kts]   - Orange (Category 1-2 Hurricane)
[512 acres] - Orange (Major Wildfire)
```

### Warning Chips
```
[⚠️ Stale] - Yellow/warning color
```

---

## 📐 Component Hierarchy

```
NaturalEvents
├── Container
│   ├── Typography (Title)
│   ├── Typography (Subtitle)
│   │
│   ├── Paper (Filters)
│   │   ├── FormControl (Category Select)
│   │   └── FormControl (Status Select)
│   │
│   ├── Grid (Summary Cards)
│   │   ├── Card (Total Events)
│   │   ├── Card (Active Events)
│   │   ├── Card (Stale Data)
│   │   └── Card (Categories)
│   │
│   ├── Grid (Charts)
│   │   ├── Paper (Pie Chart)
│   │   │   └── ResponsiveContainer
│   │   │       └── PieChart
│   │   │
│   │   └── Paper (Bar Chart)
│   │       └── ResponsiveContainer
│   │           └── BarChart
│   │
│   ├── Paper (Tabs)
│   │   ├── Tab (Map View)
│   │   └── Tab (Event List)
│   │
│   └── Tab Content
│       ├── [Tab 0] Paper (Map)
│       │   └── MapContainer
│       │       ├── TileLayer
│       │       ├── Marker (single events)
│       │       ├── Polyline (storm tracks)
│       │       └── CircleMarker (track points)
│       │
│       └── [Tab 1] Box (Event List)
│           └── Accordion (per event)
│               ├── AccordionSummary
│               │   ├── Status dot
│               │   ├── Title
│               │   └── Chips
│               │
│               └── AccordionDetails
│                   ├── Description
│                   ├── Timestamps
│                   ├── Location
│                   ├── Sources
│                   ├── Alerts
│                   └── Timeline Chart
└── (LoadingSpinner | ErrorMessage)
```

---

## 🎨 Design Tokens

### Spacing
- Card padding: `3` (24px)
- Grid spacing: `3` (24px)
- Container padding: `4` (32px)
- Chip gap: `1` (8px)
- Accordion margin: `2` (16px)

### Typography
- Page title: `h4`, weight `700`
- Card title: `h6`, weight `600`
- Card value: `h3`, weight `700`
- Subtitle: `body1`, `text.secondary`
- Chart title: `h6`, weight `600`
- Event title: weight `600`

### Borders & Shadows
- Card border-radius: default (4px)
- Map marker border: `3px solid white`
- Marker shadow: `0 2px 8px rgba(0,0,0,0.3)`
- Custom icon: `border-radius: 50%`

---

**Last Updated**: October 5, 2025
**Purpose**: Visual reference for Natural Events page implementation
