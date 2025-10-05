# Geomagnetic Page Visual Structure

## Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                    GEOMAGNETIC ACTIVITY MONITOR                  │
│            Track geomagnetic storms, space weather...            │
├─────────────────────────────────────────────────────────────────┤
│  ℹ️ INFO: Kp Index Scale: 0-2 (Quiet), 3-4 (Unsettled)...      │
├─────────────────────────────────────────────────────────────────┤
│  [Historical Storms ⚡] [3-Day Forecast 📅] [27-Day Outlook 📡] │
├─────────────────────────────────────────────────────────────────┤
│                         TAB CONTENT AREA                         │
└─────────────────────────────────────────────────────────────────┘
```

## Tab 1: Historical Storms

```
┌─────────────────────────────────────────────────────────────────┐
│  📅 Start Date: [2024-09-05]  📅 End Date: [2024-10-05]        │
│                                              3 storms found      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ ⚡ Total │  │ ⚠️  Max  │  │ 📊 Avg   │  │ 🌩️ Total │       │
│  │ Storms   │  │ Kp Index │  │ Kp Index │  │  Obs.    │       │
│  │    3     │  │   7.67   │  │   6.41   │  │    9     │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  Storm Events (3)                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ▼ Sep 12, 2024 09:00  [Max Kp: 7] [4 observations]     │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │   📈 Kp Index Timeline Chart                             │   │
│  │   [Line chart showing Kp variations over time]           │   │
│  │                                                           │   │
│  │   🔗 Linked Events: CME-001 | IPS-001 | MPC-001         │   │
│  │   🔗 View on NASA DONKI →                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│  [More storms...]                                                │
└─────────────────────────────────────────────────────────────────┘
```

## Tab 2: 3-Day Forecast

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Max Kp   │  │ Avg Kp   │  │ Storm    │  │ Active   │       │
│  │ Expected │  │          │  │ Days     │  │ Days     │       │
│  │   3.25   │  │   3.13   │  │    0     │  │    0     │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  📊 3-Hour Kp Index Forecast                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │     [Area chart showing Kp predictions over 3 days]      │   │
│  │     X-axis: Date/Hour, Y-axis: Kp Index (0-9)           │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  Daily Forecasts                                                 │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐     │
│  │ Oct 05, 2025   │ │ Oct 06, 2025   │ │ Oct 07, 2025   │     │
│  │ [Unsettled]    │ │ [Unsettled]    │ │ [Unsettled]    │     │
│  │                │ │                │ │                │     │
│  │ Avg Kp: 3.25   │ │ Avg Kp: 3.00   │ │ Avg Kp: 3.13   │     │
│  │ Max Kp: 3.67   │ │ Max Kp: 3.67   │ │ Max Kp: 4.67   │     │
│  │                │ │                │ │                │     │
│  │ 3-Hour Values: │ │ 3-Hour Values: │ │ 3-Hour Values: │     │
│  │ [3.67][3.67]   │ │ [3.33][3.67]   │ │ [2.00][2.67]   │     │
│  │ [3.33][3.00]   │ │ [3.33][3.00]   │ │ [3.00][2.33]   │     │
│  │ [3.00][3.00]   │ │ [2.33][2.00]   │ │ [4.33][3.00]   │     │
│  │ [3.33][3.00]   │ │ [3.00][3.33]   │ │ [4.67][3.00]   │     │
│  └────────────────┘ └────────────────┘ └────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## Tab 3: 27-Day Outlook

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Max Kp   │  │ Avg Kp   │  │ Storm    │  │ Notable  │       │
│  │ Expected │  │          │  │ Days     │  │ Events   │       │
│  │    5     │  │   2.85   │  │    2     │  │    2     │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  📊 27-Day Kp Index Outlook                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Dual-axis bar chart: Kp Index (left) & A Index (right)]│   │
│  │  Shows daily Kp and A index predictions                  │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  📡 Solar Radio Flux (10.7 cm)                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Line chart showing solar radio flux over 27 days]      │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  📋 Detailed Outlook Table                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Date       │ Kp │ A Index │ Radio Flux │ Activity Level│   │
│  ├───────────────────────────────────────────────────────┤   │
│  │ Sep 29, 25 │ 4  │   14    │    175     │ [Active]     │   │
│  │ Sep 30, 25 │ 3  │    8    │    180     │ [Unsettled]  │   │
│  │ Oct 01, 25 │ 2  │    5    │    180     │ [Unsettled]  │   │
│  │ ...        │... │   ...   │    ...     │ ...          │   │
│  │ Oct 11, 25 │ 5  │   15    │    145     │ [G1-Minor]   │   │
│  │ ...        │... │   ...   │    ...     │ ...          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Color Coding System

### Kp Index Activity Levels:
- **🟢 Quiet (0-2)**: Gray - Normal conditions
- **🟢 Unsettled (3)**: Light Green - Slightly elevated
- **🟡 Active (4)**: Green - Elevated activity
- **🟠 G1 Minor Storm (5)**: Yellow - Minor storm
- **🟠 G2 Moderate Storm (6)**: Orange - Moderate storm
- **🔴 G3 Strong Storm (7)**: Deep Orange - Strong storm
- **🔴 G4 Severe Storm (8)**: Red - Severe storm
- **🔴 G5 Extreme Storm (9)**: Dark Red - Extreme storm

## Interactive Features

### Historical Storms Tab:
- ✅ Adjustable date range filter
- ✅ Expandable storm accordion panels
- ✅ Interactive line charts for Kp timeline
- ✅ Clickable NASA DONKI links
- ✅ Linked event badges

### 3-Day Forecast Tab:
- ✅ Interactive area chart with tooltips
- ✅ Color-coded daily cards
- ✅ 3-hour value chips with severity colors
- ✅ Automatic data refresh

### 27-Day Outlook Tab:
- ✅ Dual-axis bar chart (Kp + A Index)
- ✅ Radio flux line chart
- ✅ Sortable table view
- ✅ Hover effects on table rows
- ✅ Color-coded activity badges

## Data Sources

```
┌──────────────────────────────────────────────────────────┐
│                     Backend API                          │
├──────────────────────────────────────────────────────────┤
│  1. NASA DONKI Geomagnetic Storm Database               │
│     → Historical storm events                            │
│     → Kp index observations                              │
│     → Linked solar events (CME, IPS, etc.)              │
│                                                           │
│  2. NOAA SWPC 3-Day Forecast                            │
│     → Short-term Kp predictions                          │
│     → 3-hour interval forecasts                          │
│     → Activity level classifications                     │
│                                                           │
│  3. NOAA SWPC 27-Day Outlook                            │
│     → Long-term Kp predictions                           │
│     → A Index values                                     │
│     → Solar radio flux (10.7 cm)                        │
│     → Storm probability assessments                      │
└──────────────────────────────────────────────────────────┘
```

## User Journey

```
1. User lands on Geomagnetic page
   ↓
2. Sees informational alert about Kp scale
   ↓
3. Selects tab based on need:
   - Historical: Review past storm events
   - 3-Day: Check near-term forecast
   - 27-Day: Plan for long-term outlook
   ↓
4. Interacts with data:
   - Adjusts date ranges (Historical)
   - Expands storm details
   - Hovers over charts for details
   - Clicks NASA links for more info
   ↓
5. Makes informed decisions about:
   - Aurora viewing opportunities
   - Satellite operations
   - Radio communications
   - Power grid management
```

## Responsive Design

### Desktop (> 1200px):
- Full 3-column card layout
- Side-by-side forecast cards
- Large interactive charts

### Tablet (768px - 1200px):
- 2-column card layout
- Stacked forecast cards
- Medium-sized charts

### Mobile (< 768px):
- Single column layout
- Stacked cards and content
- Scrollable tables
- Touch-optimized charts
