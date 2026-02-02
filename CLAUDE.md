# CLAUDE.md - AI Assistant Guide

## Project Overview

This repository contains survey response data from **Bailey Partnership** staff about their software tool usage. The purpose is to analyze software adoption, satisfaction, training needs, and desired tools across different offices and disciplines.

## Repository Structure

```
BaileySoftwareToolsQuestionnaireAnalysis/
├── CLAUDE.md                                           # This file - AI assistant guide
├── README.md                                           # Project readme (minimal)
├── Bailey Software Survey Responses - Survey Responses(8).csv  # Primary data file (latest)
├── update_dashboard.py                                 # Script to regenerate dashboard data
└── dashboard/                                          # Interactive HTML dashboard
    ├── index.html
    ├── css/styles.css
    └── js/
        ├── data.js                                     # Generated survey data
        ├── charts.js                                   # Chart.js visualizations
        ├── app.js                                      # Dashboard application logic
        └── navigation.js                               # Sidebar navigation
```

## Data File Details

### File: `Bailey Software Survey Responses - Survey Responses(8).csv`

- **Format**: CSV with embedded JSON fields
- **Records**: 93 survey responses (as of latest update)
- **Date Range**: Survey data from January 2026

### CSV Schema (25 columns)

| Column | Description |
|--------|-------------|
| `Submission Timestamp` | When the survey was submitted |
| `Survey ID` | Unique identifier for each response |
| `Original Timestamp` | Original survey completion time |
| `Email` | Respondent email (may be empty) |
| `Full Name` | Respondent name (may be empty) |
| `Role Level` | Job level (e.g., "General") |
| `Primary Office` | Office location |
| `Discipline` | Professional discipline/department |
| `Currently Using Count` | Number of software tools currently used |
| `Previously Used Count` | Number of software tools previously used |
| `Would Like to Use Count` | Number of software tools desired |
| `Currently Using Software` | Comma-separated list of current software |
| `Previously Used Software` | Comma-separated list of past software |
| `Would Like to Use Software` | Comma-separated list of desired software |
| `Overall Satisfaction (1-5)` | Satisfaction rating (1-5 scale) |
| `Training Resources` | Opinion on training availability |
| `IT Support` | Opinion on IT support quality |
| `Software Integration` | Opinion on software integration |
| `Improvement Suggestions` | Free-text suggestions |
| `Personal Licences` | Personal license information |
| `Additional Comments` | Free-text comments |
| `Currently Using Details (JSON)` | JSON array with usage frequency, training level, satisfaction |
| `Previously Used Details (JSON)` | JSON array with where used, reasons stopped |
| `Would Like to Use Details (JSON)` | JSON array with expected benefit, interest reason |
| `Full Response (JSON)` | Complete survey response as JSON object |

### Office Locations

- Plymouth (20 responses)
- Maidstone (14 responses)
- Exeter (13 responses)
- Bristol (8 responses)
- Chichester (5 responses)
- Manchester (4 responses)
- Gibraltar (3 responses)
- Edinburgh (1 response)
- Bury St. Edmunds (1 response)

### Professional Disciplines

- Architecture (20 responses)
- Building Surveying (15 responses)
- Project Management (8 responses)
- Structural/Civil Engineering (7 responses)
- Building Services Engineering (5 responses)
- Quantity Surveying (4 responses)
- Admin Support (4 responses)
- Fire Engineering (3 responses)
- Town Planning (2 responses)
- Interior Design (1 response)

## JSON Data Structures

### Currently Using Details (JSON column)

```json
{
  "softwareId": "arch-office-google",
  "frequency": "daily|several-per-week|weekly|monthly",
  "trainingLevel": "very-confident|somewhat-confident|need-more|require-significant",
  "satisfaction": 1-5
}
```

**Note:** This column does NOT contain `customName` - see below for how to get custom names.

### Previously Used Details (JSON column)

```json
{
  "softwareId": "pm-software-procore",
  "usedWhere": ["previous-employer", "bailey-partnership"],
  "stoppedReasons": ["company-decision", "personal-preference", "not-required"]
}
```

### Would Like to Use Details (JSON column)

```json
{
  "softwareId": "fire-sim-pyrosim",
  "benefit": "significant|moderate|minor",
  "interest": "Free text describing interest"
}
```

### Full Response (JSON column) - CRITICAL FOR CUSTOM NAMES

The `Full Response (JSON)` column contains the complete survey response including **custom software names**:

```json
{
  "softwareSelections": [
    {
      "softwareId": "qs-measure-other",
      "softwareName": "Other - please specify",
      "usageStatus": "currently-using",
      "customName": "KREO"   // <-- THIS IS WHERE CUSTOM NAMES ARE STORED
    }
  ]
}
```

## CRITICAL: Extracting Custom Software Names

### The Problem

When users select "Other - please specify" options, the `softwareId` will be something like `arch-doc-other`, `qs-measure-other`, etc. The **actual custom name** the user typed is stored in the `Full Response (JSON)` column, NOT in the detail columns.

### Identifying Custom/"Other" Entries

- Software IDs ending in `-other` (e.g., `arch-bim-other`)
- Software IDs containing `-other-` (e.g., `struct-analysis-other-1`)
- Software IDs starting with `other-`

### How to Extract Custom Names Correctly

**WRONG approach** (will show IDs instead of names):
```python
# This will NOT work - customName is not in the detail columns
item = current_details[0]
custom_name = item.get('customName')  # Returns None!
```

**CORRECT approach**:
```python
import json

def build_custom_name_map(record):
    """Build a map of softwareId -> customName from Full Response JSON."""
    custom_names = {}
    full_json = record.get('Full Response (JSON)', '')
    if full_json:
        data = json.loads(full_json)
        for sel in data.get('softwareSelections', []):
            sw_id = sel.get('softwareId', '')
            custom_name = sel.get('customName', '')
            if sw_id and custom_name:
                custom_names[sw_id] = custom_name
    return custom_names

# For each record, first build the map
custom_name_map = build_custom_name_map(record)

# Then when processing detail columns, look up custom names
for item in current_details:
    sw_id = item.get('softwareId', '')
    is_other = sw_id.endswith('-other') or '-other-' in sw_id

    # Get custom name from the map we built
    custom_name = custom_name_map.get(sw_id, '')

    if is_other and custom_name:
        sw_name = custom_name  # e.g., "Kreo", "LibreOffice", "Lumion"
    else:
        sw_name = SOFTWARE_NAMES.get(sw_id, sw_id)  # Standard lookup
```

### Examples of Custom Software Discovered

| Custom Name | Discipline | Count |
|-------------|------------|-------|
| Kreo | Quantity Surveying | 4 |
| LibreOffice | Multiple | 3 |
| Lumion | Architecture | 3 |
| Rhino | Architecture | 3 |
| MS Project | Building Surveying | 3 |
| Adobe Creative Cloud | Architecture | 3 |
| ChatGPT | Multiple | 4 |
| Copilot | Multiple | 2 |
| Site Audit Pro | Building Surveying | 2 |
| Hilti - Profis | Structural | 1 |
| IdeaStatica | Structural | 1 |

## Common Analysis Tasks

When working with this data, AI assistants may be asked to:

1. **Software Usage Analysis**
   - Identify most/least commonly used software
   - Compare usage across offices or disciplines
   - Analyze usage frequency patterns

2. **Training Needs Assessment**
   - Identify software with low confidence ratings
   - Find training gaps by discipline
   - Prioritize training investments

3. **Satisfaction Analysis**
   - Calculate overall satisfaction scores
   - Identify low-satisfaction software
   - Compare satisfaction across offices

4. **Demand Analysis**
   - Identify most-requested software
   - Analyze "would like to use" patterns
   - Find unmet software needs by discipline

5. **Trend Analysis**
   - Why software was abandoned
   - Migration patterns between tools
   - Software integration issues

## Development Guidelines

### Working with the CSV File

1. **Large File Handling**: The CSV file is ~376KB. Use streaming or chunked reading for analysis.

2. **JSON Parsing**: Several columns contain JSON arrays. Parse carefully:
   ```python
   import json
   import pandas as pd

   df = pd.read_csv('Bailey Software Survey Responses - Survey Responses(6).csv')
   df['Currently Using Details (JSON)'] = df['Currently Using Details (JSON)'].apply(json.loads)
   ```

3. **Empty Values**: Email and Full Name fields are often empty (anonymous responses).

4. **Discipline Normalization**: Discipline names have inconsistent casing (e.g., "architecture" vs "Building Surveying"). Normalize when comparing.

### Recommended Tools for Analysis

- **Python**: pandas, json, matplotlib/seaborn for visualization
- **Command Line**: csvkit, jq for quick queries
- **Jupyter Notebooks**: For exploratory analysis

### Git Workflow

- Main branch contains the raw data
- Create feature branches for analysis scripts
- Keep data files unchanged; create derived outputs separately

## Key Conventions for AI Assistants

1. **Data Privacy**: Some responses may contain identifying information. Avoid exposing individual response details unless specifically requested.

2. **Statistical Rigor**: When presenting statistics:
   - Always note sample sizes
   - Use appropriate aggregations for small groups
   - Caveat findings for disciplines with few responses

3. **Output Formats**: Default to:
   - Markdown tables for summaries
   - CSV for exportable data
   - JSON for programmatic access

4. **Analysis Scripts**: When creating analysis code:
   - Use Python with pandas as the default
   - Include error handling for malformed JSON
   - Handle missing/empty values gracefully

5. **Visualizations**: If creating charts:
   - Use clear titles and labels
   - Include source notes
   - Consider colorblind-friendly palettes

## Quick Reference Commands

```bash
# Count total responses
wc -l "Bailey Software Survey Responses - Survey Responses(6).csv"

# Get unique offices
cut -d',' -f7 "Bailey Software Survey Responses - Survey Responses(6).csv" | sort | uniq -c

# Get unique disciplines
cut -d',' -f8 "Bailey Software Survey Responses - Survey Responses(6).csv" | sort | uniq -c
```

## Dashboard Data Format (data.js)

### Key Format Conventions

The `data.js` file uses **Title Case with spaces** for feedback distribution keys:

```javascript
// CORRECT format in data.js:
trainingResources: {
  distribution: {
    "Strongly Agree": 12,
    "Agree": 42,
    "Neutral": 33,
    "Disagree": 5,
    "Strongly Disagree": 1
  }
}
```

When writing chart code, use these exact key strings:
- `"Strongly Agree"` (not `"strongly-agree"`)
- `"Agree"` (not `"agree"`)
- `"Neutral"` (not `"neutral"`)
- `"Disagree"` (not `"disagree"`)
- `"Strongly Disagree"` (not `"strongly-disagree"`)

### Personal Licenses Filtering

The `Personal Licences` column often contains "no" responses. Filter these out:

```python
pl_lower = pl.lower().strip()
is_negative = pl_lower in ['no', 'no.', 'n/a', 'none', 'none.', 'na', '-', 'nil']
is_negative_statement = pl_lower.startswith('no.') or pl_lower.startswith('no ')

# Only include if it mentions actual software
if not is_negative and not is_negative_statement:
    # Include this entry
```

### Updating the Dashboard

To regenerate `data.js` from a new CSV file:

1. Update the CSV path in `update_dashboard.py`
2. Run: `python3 update_dashboard.py`
3. Commit changes to both `data.js` and `update_dashboard.py`

## Notes

- This is a data analysis repository with an interactive HTML dashboard
- The survey is conducted by Bailey Partnership for internal software assessment
- Survey includes both desktop tools (AutoCAD, Revit) and cloud services (Google Workspace, ACC)
- Custom "Other" entries are valuable discoveries - always extract them properly from `Full Response (JSON)`
