# Dashboard Design System - Style Guide

This document describes the complete visual design system for the Bailey Partnership Software Survey Dashboard. Use this as a reference to create dashboards with a consistent professional look and feel.

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout Architecture](#layout-architecture)
5. [Component Library](#component-library)
6. [Chart & Visualization Styling](#chart--visualization-styling)
7. [Spacing & Sizing System](#spacing--sizing-system)
8. [Interactive States](#interactive-states)
9. [Responsive Design](#responsive-design)
10. [Implementation Notes](#implementation-notes)

---

## Design Philosophy

**Core Principles:**
- **Professional & Clean**: Corporate aesthetic suitable for business reporting
- **Information Density**: Maximize data visibility without overwhelming users
- **Scannable Hierarchy**: Clear visual hierarchy with numbered sections (1.0, 2.0, etc.)
- **Accessible**: Good contrast ratios, readable fonts, clear labels
- **Print-Ready**: Designed to work well both on-screen and printed

**Visual Style:**
- Minimalist with restrained use of color
- Heavy use of whitespace to separate content
- Consistent rounded corners (8px)
- Subtle shadows for depth
- Dark headers with light content areas

---

## Color System

### Primary Colors

```css
/* Main brand colors */
--color-primary-band: #143644     /* Dark teal - used for headers, navigation */
--color-accent: #d1c800           /* Bright yellow - used for highlights, CTAs */
--color-background: #FFFFFF       /* Pure white - card backgrounds */
--color-bg-light: #f8f9fa         /* Off-white - page background */
```

**Usage:**
- **Primary Band (#143644)**: Section headers, navigation sidebar headers, metric values
- **Accent (#d1c800)**: Active states, highlighted metrics, important data points
- **Background**: White for cards/widgets, light gray for page background

### Semantic Colors

```css
--color-success: #22c55e          /* Green - positive metrics, success states */
--color-warning: #f59e0b          /* Orange - warnings, medium priority */
--color-danger: #ef4444           /* Red - errors, critical issues */
--color-neutral: #9ca3af          /* Gray - neutral information */
```

**Usage:**
- Use semantic colors for status indicators and data visualization
- Red for low satisfaction (<3.5), yellow for medium (3.5-4.0), green for high (>4.0)
- Status badges: green for "Approved", yellow for "Draft", red for "Urgent"

### Text Colors

```css
--color-text-primary: #1a1a1a     /* Near-black - main content */
--color-text-secondary: #666666   /* Medium gray - labels, captions */
--color-text-inverse: #FFFFFF     /* White - text on dark backgrounds */
```

### Border & Divider Colors

```css
--color-border: #e5e5e5           /* Light gray - borders, dividers */
--color-bg-hover: #f1f5f9         /* Hover state for rows/links */
```

### Chart Color Palette

```javascript
chartColors.palette = [
  '#143644',  // Primary
  '#d1c800',  // Accent
  '#4a7c8c',  // Secondary (lighter teal)
  '#7ba3b0',  // Tertiary (even lighter teal)
  '#a8c5ce',  // Quaternary (very light teal)
  '#2d5a6b',  // Variants for additional data series...
  '#e8d84d',
  '#5c8c9c',
  '#8db3c0',
  '#b8d5de'
]
```

**Chart Color Rules:**
- Use primary teal for single-series charts
- Use accent yellow to highlight custom/special entries
- Use semantic colors (red/yellow/green) for satisfaction/quality metrics
- For multi-category charts, cycle through the palette array

---

## Typography

### Font Family

**Primary Font:** [Inter](https://fonts.google.com/specimen/Inter)
- Google Fonts import: `Inter:wght@400;500;600;700`
- Fallback stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Why Inter?**
- Excellent screen readability
- Professional, modern appearance
- Wide range of weights
- Optimized for UI design

### Type Scale

```css
--text-h1: 2rem        /* 32px - Page titles */
--text-h2: 1.5rem      /* 24px - Section titles */
--text-h3: 1.25rem     /* 20px - Subsection titles, widget titles */
--text-body: 1rem      /* 16px - Body text, default */
--text-small: 0.875rem /* 14px - Table text, small labels */
--text-micro: 0.75rem  /* 12px - Metadata, badges, chart labels */
```

### Font Weights

```css
--weight-normal: 400    /* Body text */
--weight-medium: 500    /* Emphasized text */
--weight-semibold: 600  /* Headings, important labels */
--weight-bold: 700      /* Strong emphasis, large metrics */
```

### Typography Rules

**Headings:**
- H1: 2rem, bold (700), dark teal color
- H2: 1.5rem, semibold (600), used in section bands (white on dark teal)
- H3: 1.25rem, medium (500), subsection titles
- Line height: 1.3 for headings, 1.6 for body text

**Body Text:**
- Default: 1rem (16px), normal weight (400), primary text color
- Labels: 0.75rem, uppercase, semibold, with letter-spacing: 0.5px
- Muted text: Same size as context, but use `color-text-secondary`

**Tables:**
- Headers: 0.875rem, semibold (600)
- Body: 0.875rem, normal (400)
- Use `font-variant-numeric: tabular-nums` for numeric columns

**Metric Cards:**
- Value: 2rem (h1 size), bold (700), primary color
- Label: 0.875rem, normal, secondary text color

---

## Layout Architecture

### Grid Structure

```
┌─────────────────────────────────────────────────┐
│ Metadata Bar (fixed top, 50px height)          │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │  Main Content Area                   │
│ (280px)  │  (flex: 1, padding: 2rem)           │
│          │                                      │
│ Fixed    │  Scrollable                          │
│ Left     │                                      │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### Layout Constants

```css
--sidebar-width: 280px
--metadata-height: 50px
--border-radius: 8px
--border-radius-sm: 4px
```

### Metadata Bar

**Style:**
- Fixed position at top (z-index: 1000)
- Background: `--color-primary-band` (dark teal)
- Height: 50px
- White text with box-shadow for depth

**Structure:**
```html
<header class="metadata-bar">
  <div class="metadata-bar__inner">
    <div class="metadata-item">
      <span class="metadata-label">Label</span>
      <span class="metadata-value">Value</span>
    </div>
    <!-- Repeat metadata items -->
  </div>
</header>
```

**Metadata Items:**
- Display as flex columns (stacked label/value)
- Gap between items: 2rem (32px)
- Labels: 0.75rem, uppercase, 70% opacity
- Values: 0.875rem, semibold

**Badges in Metadata:**
- Inline badge: `class="metadata-badge metadata-badge--approved"`
- Small padding (2px 8px), rounded (4px), semibold
- Colors: Green for "Final/Approved", yellow for "Draft"

### Navigation Sidebar

**Style:**
- Fixed left position, full height below metadata bar
- Width: 280px
- Background: white
- Border-right: 1px solid light gray
- Overflow-y: auto

**Navigation Logo Area:**
```html
<div class="nav-logo">
  <h1>Project Name</h1>
  <p style="font-size: 0.75rem; color: #666;">Subtitle</p>
</div>
```
- Border-bottom separator
- Small gray subtitle

**Navigation Links:**

Structure:
```html
<div class="nav-section">
  <a href="#1.0" class="nav-link nav-link--section">1.0 Section Title</a>
  <a href="#1.1" class="nav-link nav-link--subsection">1.1 Subsection</a>
</div>
```

Link Styles:
- Section links: 0.875rem, semibold, full width, 8px padding vertical
- Subsection links: 0.75rem, indented 1.5rem, secondary text color
- Hover: light background (#f1f5f9)
- Active: light background + 3px left border (accent yellow) + primary text color
- Left border (transparent normally, yellow when active)

### Main Content Area

**Style:**
- Margin-left: 280px (sidebar width)
- Padding: 2rem (32px)
- Background: light gray (#f8f9fa)
- Flex: 1 (takes remaining space)

**Scroll Behavior:**
```css
scroll-margin-top: calc(50px + 1.5rem);  /* Offset for fixed metadata bar */
scroll-behavior: smooth;
```

---

## Component Library

### Section Bands

**Purpose:** Major section headers (1.0, 2.0, 3.0, etc.)

**HTML Structure:**
```html
<section id="1.0" class="report-section">
  <div class="section-band">
    <span class="section-number">1.0</span>
    <h2 class="section-title">Section Title</h2>
  </div>
  <div class="section-content">
    <!-- Content here -->
  </div>
</section>
```

**Styling:**
- **Band**: Dark teal background, white text, 1rem vertical padding, 1.5rem horizontal
- **Number**: 1.25rem size, bold, 80% opacity
- **Title**: 1.5rem, semibold, margin: 0
- **Content Box**: White background, 2rem padding, rounded bottom corners, 1px border (no top border)

**Visual Effect:**
- Dark header "band" sitting on top of white content card
- Rounded corners on top of band, bottom of content

### Subsections

**Purpose:** Subsections within major sections (2.1, 2.2, etc.)

**HTML:**
```html
<div id="2.1" class="subsection">
  <div class="subsection-header">
    <span class="subsection-number">2.1</span>
    <h3 class="subsection-title">Subsection Title</h3>
  </div>
  <!-- Subsection content -->
</div>
```

**Styling:**
- Top border (1px, light gray) to separate from previous subsection
- Margin-top: 2rem
- Number: 1rem, semibold, primary teal color
- Title: 1.25rem (h3), normal weight
- First subsection in a section: no top border or margin

### Widget Grid System

**Purpose:** Responsive grid for organizing cards/widgets

**Grid Classes:**
```css
.widget-grid               /* Base grid */
.widget-grid--2col         /* 2 column grid */
.widget-grid--3col         /* 3 column grid */
.widget-grid--4col         /* 4 column grid */
```

**Properties:**
- Display: grid
- Gap: 1.5rem
- Margin-bottom: 1.5rem
- Columns: `repeat(N, 1fr)` for equal-width columns

**Responsive Behavior:**
- 4-col → 2-col at 1200px
- 3-col → 2-col at 1200px
- 2-col → 1-col at 992px

**Full-Width Widget:**
```html
<div class="widget widget--full">
  <!-- Spans all columns -->
</div>
```

### Widget/Card Component

**Purpose:** Reusable card container for content, charts, tables

**HTML Structure:**
```html
<div class="widget">
  <div class="widget__header">
    <h3 class="widget__title">Widget Title</h3>
  </div>
  <div class="widget__body">
    <!-- Content -->
  </div>
</div>
```

**Styling:**
- **Container**: White background, 1px border, 8px border-radius
- **Header**: Light gray background (#f8f9fa), 1rem vertical padding, 1.5rem horizontal, bottom border
- **Title**: 1rem, semibold, no margin, primary text color
- **Body**: 1.5rem padding on all sides

**Body Variants:**
```css
.widget__body--no-padding   /* For tables that need edge-to-edge rendering */
```

### Metric Cards

**Purpose:** Display key numbers/statistics prominently

**HTML Structure:**
```html
<div class="metric-row">
  <div class="metric-card metric-card--accent">
    <span class="metric-card__value">4.12</span>
    <span class="metric-card__label">Avg Satisfaction</span>
  </div>
  <!-- More metric cards -->
</div>
```

**Metric Row:**
- Grid layout: `repeat(auto-fit, minmax(180px, 1fr))`
- Gap: 1.5rem
- Margin-bottom: 2rem
- Auto-fits cards, minimum 180px width

**Metric Card:**
- White background, 1px border, 8px border-radius
- Padding: 1.5rem
- Text-align: center
- Hover effect: slight lift (-2px translateY) + medium shadow

**Value:**
- Font-size: 2rem (h1)
- Font-weight: bold (700)
- Color: primary teal
- Line-height: 1.2

**Label:**
- Font-size: 0.875rem
- Color: secondary text color
- Margin-top: 0.25rem

**Card Modifiers:**

```css
.metric-card--accent        /* Yellow background */
.metric-card--success       /* Left border: green (4px) */
.metric-card--warning       /* Left border: orange (4px) */
.metric-card--danger        /* Left border: red (4px) */
```

### Data Tables

**Purpose:** Tabular data display with sorting

**HTML Structure:**
```html
<div class="data-table-wrapper">
  <table class="data-table">
    <thead>
      <tr>
        <th class="sortable">Column 1</th>
        <th class="data-table__cell--numeric">Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data</td>
        <td class="data-table__cell--numeric">123</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Table Wrapper:**
- Overflow-x: auto (horizontal scroll on small screens)
- Border: 1px solid border-color
- Border-radius: 8px

**Table:**
- Width: 100%
- Border-collapse: collapse
- Font-size: 0.875rem

**Headers:**
- Background: light gray (#f8f9fa)
- Font-weight: semibold (600)
- Padding: 0.5rem 1rem
- Position: sticky, top: 0 (for scrollable tables)
- White-space: nowrap

**Sortable Headers:**
- Cursor: pointer
- Hover: slightly darker background
- `::after` content: ' ↕' (opacity 0.3)
- When sorted: ' ↑' or ' ↓' (opacity 1)

**Table Cells:**
- Padding: 0.5rem 1rem
- Border-bottom: 1px solid border-color
- Text-align: left (default)

**Row Hover:**
- Background: light hover color (#f1f5f9)

**Cell Modifiers:**
```css
.data-table__cell--numeric  /* Right-aligned, tabular numbers */
.data-table__cell--center   /* Center-aligned */
```

### Insight Boxes

**Purpose:** Highlight important information, recommendations, warnings

**HTML Structure:**
```html
<div class="insight-box insight-box--highlight">
  <div class="insight-box__icon">📚</div>
  <div class="insight-box__content">
    <strong>Title</strong>
    <p>Content here</p>
    <ul>
      <li>List items</li>
    </ul>
  </div>
</div>
```

**Base Style:**
- Display: flex
- Gap: 1rem
- Padding: 1.5rem
- Border-radius: 8px
- Margin-bottom: 1rem
- Border: 1px solid (varies by type)

**Icon:**
- Font-size: 1.25rem (emoji or icon font)
- Line-height: 1
- Fixed width for alignment

**Content:**
- Flex: 1
- Strong tag for titles (display: block, margin-bottom: 0.25rem)

**Variants:**

```css
.insight-box--highlight       /* Yellow background, yellow border */
.insight-box--warning         /* Light orange bg, orange border */
.insight-box--success         /* Light green bg, green border */
.insight-box--danger          /* Light red bg, red border */
.insight-box--recommendation  /* Light gray bg, left: 4px teal border */
```

**Colors:**
- Highlight: Background #fef9c3, Border #facc15
- Warning: Background #fef3c7, Border #f59e0b
- Success: Background #dcfce7, Border #22c55e
- Danger: Background #fee2e2, Border #ef4444
- Recommendation: Background #f8f9fa, Border #e5e5e5 + 4px left border #143644

**Priority Label (for recommendations):**
```html
<div class="insight-box__priority">[PRIORITY]</div>
```
- Font-size: 0.75rem, bold, primary teal color, margin-bottom: 0.25rem

### Status Badges

**Purpose:** Small inline status indicators

**HTML:**
```html
<span class="status-badge status-badge--success">Active</span>
```

**Base Style:**
- Display: inline-flex
- Padding: 2px 8px
- Border-radius: 12px (pill shape)
- Font-size: 0.75rem
- Font-weight: medium (500)
- Text-transform: uppercase
- Letter-spacing: 0.3px

**Variants:**
- **Success**: Background #dcfce7, Text #166534 (dark green)
- **Warning**: Background #fef3c7, Text #92400e (dark orange)
- **Danger**: Background #fee2e2, Text #991b1b (dark red)
- **Neutral**: Background #f3f4f6, Text #374151 (dark gray)
- **Info**: Background #dbeafe, Text #1e40af (dark blue)

### Quote Blocks

**Purpose:** Display user quotes or feedback

**HTML:**
```html
<div class="quote-block">
  <div class="quote-block__text">
    "This is a quote from a user."
  </div>
  <div class="quote-block__attribution">
    — User Name, Discipline
  </div>
</div>
```

**Styling:**
- Padding: 1rem 1.5rem
- Border-left: 4px solid accent yellow
- Background: light gray
- Margin-bottom: 1rem
- Font-style: italic (text only)

**Attribution:**
- Font-size: 0.875rem
- Font-style: normal
- Color: secondary text
- Margin-top: 0.5rem (within quote-block__text margin)

### Progress Bars

**Purpose:** Show proportional data (e.g., survey response distribution)

**HTML:**
```html
<div class="progress-bar">
  <div class="progress-bar__segment progress-bar__segment--success" style="width: 45%">
    45%
  </div>
  <div class="progress-bar__segment progress-bar__segment--neutral" style="width: 55%">
    55%
  </div>
</div>
```

**Base Style:**
- Height: 24px
- Background: light gray
- Border-radius: 12px (fully rounded ends)
- Overflow: hidden
- Display: flex

**Segments:**
- Height: 100%
- Display: flex, align-items: center, justify-content: center
- Font-size: 0.75rem, semibold, white text
- Transition: width 0.3s ease
- Width set via inline style (percentage)

**Segment Colors:**
- `--success`: Green (#22c55e)
- `--warning`: Orange (#f59e0b)
- `--danger`: Red (#ef4444)
- `--neutral`: Gray (#9ca3af)
- `--primary`: Teal (#143644)
- `--accent`: Yellow (#d1c800) with dark teal text

---

## Chart & Visualization Styling

**Library:** [Chart.js 4.4.1](https://www.chartjs.org/)

### Chart.js Global Configuration

```javascript
const chartColors = {
  primary: '#143644',
  accent: '#d1c800',
  secondary: '#4a7c8c',
  tertiary: '#7ba3b0',
  quaternary: '#a8c5ce',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  neutral: '#9ca3af',
  palette: [
    '#143644', '#d1c800', '#4a7c8c', '#7ba3b0', '#a8c5ce',
    '#2d5a6b', '#e8d84d', '#5c8c9c', '#8db3c0', '#b8d5de'
  ]
};

const chartDefaults = {
  font: {
    family: "'Inter', sans-serif",
    size: 12
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        font: { family: "'Inter', sans-serif", size: 11 }
      }
    },
    title: { display: false },
    tooltip: {
      backgroundColor: 'rgba(20, 54, 68, 0.95)',  // Dark teal, 95% opacity
      titleFont: {
        family: "'Inter', sans-serif",
        size: 13,
        weight: 'bold'
      },
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 12
      },
      padding: 12,
      cornerRadius: 6
    }
  }
};

// Apply to all charts
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#666666';
```

### Chart Containers

**HTML:**
```html
<div class="chart-container">
  <canvas id="myChart"></canvas>
</div>
```

**Sizing Classes:**
```css
.chart-container              /* min-height: 300px */
.chart-container--small       /* min-height: 200px */
.chart-container--large       /* min-height: 400px */
```

**Behavior:**
- Position: relative
- Width: 100%
- Chart.js handles responsive resizing via `maintainAspectRatio: false`

### Bar Chart Styling

**Horizontal Bars (most common for rankings):**
```javascript
{
  type: 'bar',
  data: {
    labels: ['Item 1', 'Item 2'],
    datasets: [{
      data: [10, 20],
      backgroundColor: chartColors.primary,
      borderRadius: 4  // Rounded bar ends
    }]
  },
  options: {
    indexAxis: 'y',  // Horizontal bars
    plugins: {
      legend: { display: false }  // Hide legend for single series
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: '#e5e5e5' },
        title: { display: true, text: 'Label' }
      },
      y: {
        grid: { display: false }  // No vertical grid lines
      }
    }
  }
}
```

**Key Features:**
- Border-radius: 4px (rounded bar ends)
- No vertical grid lines (cleaner look)
- Horizontal grid lines in light gray (#e5e5e5)
- Axis titles when needed

**Color Strategy:**
- Single series: Primary teal
- Highlight special entries: Accent yellow
- Quality/satisfaction metrics: Red/yellow/green gradient

### Doughnut Chart Styling

```javascript
{
  type: 'doughnut',
  data: {
    labels: ['Category 1', 'Category 2'],
    datasets: [{
      data: [30, 70],
      backgroundColor: chartColors.palette,
      borderWidth: 2,
      borderColor: '#ffffff'  // White borders between segments
    }]
  },
  options: {
    cutout: '50%',  // Hole size (50% = doughnut, 0% = pie)
    plugins: {
      legend: {
        position: 'right',
        labels: { padding: 15, font: { size: 11 } }
      }
    }
  }
}
```

**Key Features:**
- White borders (2px) between segments for separation
- Legend on right side for better layout
- Cutout 40-50% for doughnut style

### Stacked Bar Chart

**Purpose:** Show proportional data (e.g., agreement levels)

```javascript
{
  type: 'bar',
  data: {
    labels: ['Category 1', 'Category 2'],
    datasets: [
      {
        label: 'Strongly Disagree',
        data: [5, 10],
        backgroundColor: chartColors.danger
      },
      {
        label: 'Neutral',
        data: [30, 40],
        backgroundColor: chartColors.neutral
      },
      {
        label: 'Strongly Agree',
        data: [65, 50],
        backgroundColor: chartColors.success
      }
    ]
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        stacked: true,
        max: 100,  // For percentage data
        ticks: { callback: (value) => value + '%' }
      },
      y: {
        stacked: true
      }
    }
  }
}
```

**Color Order (for Likert scales):**
1. Strongly Disagree: Red (#ef4444)
2. Disagree: Orange (#f97316)
3. Neutral: Gray (#9ca3af)
4. Agree: Light green (#84cc16)
5. Strongly Agree: Green (#22c55e)

### Scatter Plot Styling

**Purpose:** Two-dimensional data relationships

```javascript
{
  type: 'scatter',
  data: {
    datasets: [{
      data: [
        { x: 4.2, y: 3.8, name: 'Software A', users: 25 }
      ],
      backgroundColor: chartColors.primary,
      pointRadius: 8,  // Or calculated: Math.max(5, Math.min(15, users / 3))
      pointHoverRadius: 10
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = data[context.dataIndex];
            return [
              point.name,
              `Y-axis: ${point.y.toFixed(2)}`,
              `X-axis: ${point.x.toFixed(2)}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        min: 1, max: 5,
        title: { display: true, text: 'X-axis Label' },
        grid: { color: '#e5e5e5' }
      },
      y: {
        min: 1, max: 5,
        title: { display: true, text: 'Y-axis Label' },
        grid: { color: '#e5e5e5' }
      }
    }
  }
}
```

**Key Features:**
- Variable point sizes based on additional metric (e.g., user count)
- Color-coded points by quality (red/yellow/green)
- Both X and Y axis labels
- Custom tooltips showing multiple data points

### Chart Best Practices

1. **Colors:**
   - Use primary teal for general data
   - Use semantic colors (red/yellow/green) for quality metrics
   - Use accent yellow to highlight special entries
   - Cycle through palette for multi-category data

2. **Labels:**
   - Truncate long labels: `label.substring(0, maxLength - 3) + '...'`
   - Show full name in tooltips
   - Rotate X-axis labels 45° if needed

3. **Interactivity:**
   - Always include tooltips with relevant data
   - Disable legends for single-series charts
   - Use hover states (slightly larger radius for scatter plots)

4. **Typography:**
   - All text in Inter font
   - Labels: 11-12px
   - Tooltips: 12-13px
   - Semibold for emphasis

5. **Grid Lines:**
   - Light gray (#e5e5e5)
   - Only show grid on one axis for bar charts (usually horizontal)
   - Show grid on both axes for scatter plots

---

## Spacing & Sizing System

### Spacing Scale

```css
--space-xs: 0.25rem    /* 4px  - minimal spacing, gaps */
--space-sm: 0.5rem     /* 8px  - small padding, margins */
--space-md: 1rem       /* 16px - default padding, margins */
--space-lg: 1.5rem     /* 24px - section spacing, card padding */
--space-xl: 2rem       /* 32px - major section spacing */
--space-2xl: 3rem      /* 48px - large section separations */
```

### Application Guidelines

**Component Internal Spacing:**
- Widget padding: `--space-lg` (1.5rem)
- Card header padding: `--space-md` vertical, `--space-lg` horizontal
- Table cells: `--space-sm` vertical, `--space-md` horizontal
- Buttons/badges: `--space-xs` to `--space-sm`

**Component Margins:**
- Between widgets in grid: `--space-lg` (1.5rem gap)
- Between sections: `--space-2xl` (3rem)
- Between subsections: `--space-xl` (2rem)
- Paragraph margins: `--space-md` (1rem)

**List Spacing:**
- Padding-left: `--space-lg` (1.5rem) on desktop
- Padding-left: `--space-md` (1rem) on mobile
- List item margin-bottom: `--space-xs` (0.25rem)

### Utility Classes

```css
.mb-0    { margin-bottom: 0; }
.mb-sm   { margin-bottom: var(--space-sm); }
.mb-md   { margin-bottom: var(--space-md); }
.mb-lg   { margin-bottom: var(--space-lg); }
.mb-xl   { margin-bottom: var(--space-xl); }

.mt-0    { margin-top: 0; }
.mt-sm   { margin-top: var(--space-sm); }
.mt-md   { margin-top: var(--space-md); }
.mt-lg   { margin-top: var(--space-lg); }
```

### Shadow System

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)      /* Subtle depth */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)  /* Cards, dropdowns */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1) /* Modals, popovers */
```

**Usage:**
- Metadata bar: `--shadow-md`
- Metric cards on hover: `--shadow-md`
- Generally: use sparingly, most cards have just borders

---

## Interactive States

### Hover States

**Navigation Links:**
```css
.nav-link:hover {
  background: var(--color-bg-hover);  /* #f1f5f9 */
  color: var(--color-primary-band);
}
```

**Table Rows:**
```css
.data-table tbody tr:hover {
  background: var(--color-bg-hover);
}
```

**Metric Cards:**
```css
.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

**General Links:**
```css
a:hover {
  color: var(--color-accent);  /* Yellow highlight */
}
```

### Active States

**Navigation Active Link:**
```css
.nav-link.active {
  background: var(--color-bg-hover);
  border-left-color: var(--color-accent);  /* 3px yellow border */
  color: var(--color-primary-band);
  font-weight: var(--weight-medium);
}
```

### Focus States

**Form Elements:**
```css
.filter-select:focus {
  outline: none;
  border-color: var(--color-primary-band);
  box-shadow: 0 0 0 2px rgba(20, 54, 68, 0.1);  /* Primary color with 10% opacity */
}
```

### Transition Timing

```css
transition: all 0.2s ease;         /* General hover/active states */
transition: transform 0.2s ease;   /* Movement */
transition: width 0.3s ease;       /* Progress bars */
```

---

## Responsive Design

### Breakpoints

```css
/* Desktop-first approach */
@media (max-width: 1200px)  /* Large tablets, small desktops */
@media (max-width: 992px)   /* Tablets */
@media (max-width: 768px)   /* Large phones, small tablets */
@media (max-width: 480px)   /* Small phones */
```

### Responsive Behaviors

**Navigation (at 992px):**
- Sidebar slides off-screen (translateX(-100%))
- Main content expands to full width (margin-left: 0)
- Optional: Add hamburger menu to toggle sidebar

**Grid Layouts:**
- 4-column → 2-column at 1200px
- 3-column → 2-column at 1200px
- 2-column → 1-column at 992px

**Metric Cards:**
- 2-column grid at 768px
- 1-column grid at 480px

**Typography (at 768px):**
```css
--text-h1: 1.5rem;    /* 24px, down from 32px */
--text-h2: 1.25rem;   /* 20px, down from 24px */
--text-h3: 1.125rem;  /* 18px, down from 20px */
```

**Spacing (at 480px):**
- Main content padding: 1rem (down from 2rem)
- Section content padding: 0.5rem (down from 2rem)
- Widget body padding: 1rem (down from 1.5rem)

**Insight Boxes (at 768px):**
- Flex-direction: column (icon above content)
- Reduced padding-left for lists

**Mobile Overflow Prevention:**
```css
.insight-box__content li {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.insight-box__content strong {
  word-break: break-word;  /* For long software names */
}
```

### Mobile-First Considerations

**Touch Targets:**
- Minimum 44x44px for interactive elements
- Navigation links have adequate padding (8px vertical)

**Horizontal Scrolling:**
- Tables: wrapper with overflow-x: auto
- Metadata bar: horizontal scroll for overflow items

**Chart Responsiveness:**
- Chart.js `maintainAspectRatio: false` allows height control
- Containers have min-height to prevent squishing

---

## Implementation Notes

### CSS Architecture

**Organization:**
1. CSS Custom Properties (variables)
2. Base reset & typography
3. Layout structure (grid, sidebar, header)
4. Component styles (alphabetically)
5. Responsive design
6. Print styles
7. Utility classes

**Naming Convention:**
- BEM-inspired: `.block__element--modifier`
- Examples: `.widget__header`, `.metric-card--accent`, `.nav-link--subsection`

### HTML Structure Best Practices

**Semantic HTML:**
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Use `<h1>` - `<h3>` in proper hierarchy
- Use `<table>` for tabular data

**Accessibility:**
- All interactive elements have hover/focus states
- Semantic color isn't the only indicator (use text labels too)
- Tables have `<thead>` and proper headers
- Links have descriptive text

**IDs for Navigation:**
- Section IDs: `id="1.0"`, `id="2.0"`
- Subsection IDs: `id="2.1"`, `id="2.2"`
- Smooth scrolling with offset for fixed header

### JavaScript Integration

**Chart Initialization:**
```javascript
// Initialize all charts after DOM load
function initializeCharts() {
  createDisciplineChart('disciplineChart');
  createTopSoftwareChart('topSoftwareChart');
  // ... more charts
}

// Call on page load
window.addEventListener('DOMContentLoaded', initializeCharts);
```

**Data Population:**
- Store data in separate `data.js` file
- Use JavaScript to populate dynamic content (tables, lists, quotes)
- Keep HTML template clean, inject data via JS

**Navigation Active State:**
```javascript
// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.report-section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      // Update active class on corresponding nav link
    }
  });
});
```

### Print Styling

```css
@media print {
  /* Hide interactive elements */
  .nav-sidebar, .filter-bar { display: none !important; }

  /* Remove fixed positioning */
  .metadata-bar { position: relative; }

  /* Expand content */
  .main-content { margin-left: 0; padding: 0; }

  /* Preserve colors */
  .section-band {
    background: var(--color-primary-band) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Avoid page breaks inside components */
  .widget, .report-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

---

## Quick Reference Checklist

When creating a new dashboard in this style:

**Colors:**
- [ ] Primary: Dark teal (#143644)
- [ ] Accent: Bright yellow (#d1c800)
- [ ] Background: White cards on light gray (#f8f9fa)
- [ ] Semantic: Green/yellow/red for quality metrics

**Typography:**
- [ ] Font: Inter (Google Fonts)
- [ ] Scale: 2rem / 1.5rem / 1.25rem / 1rem / 0.875rem / 0.75rem
- [ ] Weights: 400 / 500 / 600 / 700

**Layout:**
- [ ] Fixed metadata bar (50px, dark teal, white text)
- [ ] Fixed left sidebar (280px, white, scrollable)
- [ ] Main content (padding: 2rem, light gray background)

**Components:**
- [ ] Section bands (dark teal, numbered)
- [ ] White content cards (8px border-radius)
- [ ] Widget grid system (2/3/4 columns)
- [ ] Metric cards (centered, large numbers)
- [ ] Data tables (light headers, hover rows)
- [ ] Insight boxes (colored backgrounds, left borders)

**Charts:**
- [ ] Chart.js 4.4.1
- [ ] Inter font, 12px default
- [ ] Primary teal for data, accent yellow for highlights
- [ ] Rounded bars (4px), white doughnut borders (2px)
- [ ] Dark teal tooltips with white text

**Responsive:**
- [ ] 2-col grid → 1-col at 992px
- [ ] Sidebar hidden at 992px
- [ ] Reduced heading sizes at 768px
- [ ] Word-wrap for mobile overflow

**Accessibility:**
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Focus states on interactive elements
- [ ] Adequate color contrast

---

## Example Component Combinations

### Dashboard Header Section

```html
<!-- Metadata Bar -->
<header class="metadata-bar">
  <div class="metadata-bar__inner">
    <div class="metadata-item">
      <span class="metadata-label">Project</span>
      <span class="metadata-value">My Dashboard</span>
    </div>
    <div class="metadata-item">
      <span class="metadata-label">Date</span>
      <span class="metadata-value">2026-02-03</span>
    </div>
    <div class="metadata-item">
      <span class="metadata-label">Status</span>
      <span class="metadata-badge metadata-badge--approved">Final</span>
    </div>
  </div>
</header>
```

### Navigation Sidebar

```html
<nav class="nav-sidebar">
  <div class="nav-logo">
    <h1>Project Name</h1>
    <p style="font-size: 0.75rem; color: #666;">Subtitle Here</p>
  </div>

  <div class="nav-section">
    <a href="#1.0" class="nav-link nav-link--section">1.0 Overview</a>
  </div>
  <div class="nav-section">
    <a href="#2.0" class="nav-link nav-link--section">2.0 Analysis</a>
    <a href="#2.1" class="nav-link nav-link--subsection">2.1 Details</a>
  </div>
</nav>
```

### Section with Metrics and Charts

```html
<section id="1.0" class="report-section">
  <div class="section-band">
    <span class="section-number">1.0</span>
    <h2 class="section-title">Overview</h2>
  </div>
  <div class="section-content">

    <!-- Metric Cards -->
    <div class="metric-row">
      <div class="metric-card metric-card--accent">
        <span class="metric-card__value">4.12</span>
        <span class="metric-card__label">Average Score</span>
      </div>
      <div class="metric-card metric-card--success">
        <span class="metric-card__value">93</span>
        <span class="metric-card__label">Total Responses</span>
      </div>
    </div>

    <!-- Widget Grid -->
    <div class="widget-grid widget-grid--2col">
      <div class="widget">
        <div class="widget__header">
          <h3 class="widget__title">Chart Title</h3>
        </div>
        <div class="widget__body">
          <div class="chart-container">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>

      <div class="widget">
        <div class="widget__header">
          <h3 class="widget__title">Data Table</h3>
        </div>
        <div class="widget__body widget__body--no-padding">
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="data-table__cell--numeric">Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item 1</td>
                  <td class="data-table__cell--numeric">25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
```

---

## Conclusion

This design system creates a **professional, clean, and data-dense dashboard** suitable for business reporting. The key characteristics are:

1. **Strong visual hierarchy** through numbered sections and dark header bands
2. **Restrained color palette** with strategic use of accent color
3. **Excellent typography** using Inter font with clear size scale
4. **Flexible component system** with reusable widgets and grids
5. **Chart.js integration** with consistent styling
6. **Responsive design** that works from mobile to desktop
7. **Print-ready** styling for report generation

Use this guide to create consistent, professional dashboards for any data visualization project.
