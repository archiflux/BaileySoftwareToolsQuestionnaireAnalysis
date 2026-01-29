# CLAUDE.md - AI Assistant Guide

## Project Overview

This repository contains survey response data from **Bailey Partnership** staff about their software tool usage. The purpose is to analyze software adoption, satisfaction, training needs, and desired tools across different offices and disciplines.

## Repository Structure

```
BaileySoftwareToolsQuestionnaireAnalysis/
├── CLAUDE.md                                           # This file - AI assistant guide
├── README.md                                           # Project readme (minimal)
└── Bailey Software Survey Responses - Survey Responses(6).csv  # Primary data file
```

## Data File Details

### File: `Bailey Software Survey Responses - Survey Responses(6).csv`

- **Format**: CSV with embedded JSON fields
- **Records**: 80 survey responses (81 lines including header)
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

### Currently Using Details

```json
{
  "softwareId": "arch-office-google",
  "frequency": "daily|several-per-week|weekly|monthly",
  "trainingLevel": "very-confident|somewhat-confident|need-more|require-significant",
  "satisfaction": 1-5
}
```

### Previously Used Details

```json
{
  "softwareId": "pm-software-procore",
  "usedWhere": ["previous-employer", "bailey-partnership"],
  "stoppedReasons": ["company-decision", "personal-preference", "not-required"]
}
```

### Would Like to Use Details

```json
{
  "softwareId": "fire-sim-pyrosim",
  "benefit": "significant|moderate|minor",
  "interest": "Free text describing interest"
}
```

### Handling "Other" Software Entries (Custom User-Specified Software)

**CRITICAL**: "Other" entries require special handling to extract the user's custom software name.

#### Identifying "Other" Entries
- Software IDs ending in `-other` (e.g., `arch-ai-other`, `qs-measure-other`, `bs-contracts-other`)
- These indicate the user selected "Other - please specify" and entered a custom software name

#### Where Custom Names Are Stored
The custom name is **NOT** in the JSON detail columns (`Currently Using Details`, etc.). It's in the `Full Response (JSON)` column's `softwareSelections` array:

```json
{
  "softwareId": "arch-ai-other",
  "softwareName": "Other - please specify",
  "usageStatus": "currently-using",
  "customName": "Midjourney"  // <-- THE ACTUAL USER-ENTERED NAME
}
```

#### How to Extract Custom Names
1. Parse the `Full Response (JSON)` column
2. Access the `softwareSelections` array
3. For entries where `softwareId` ends in `-other`:
   - Use the `customName` field (this is what the user typed)
   - Ignore `softwareName` (it's always "Other - please specify")

#### Example Python Code
```python
def get_custom_name(record, software_id):
    full_response = json.loads(record.get('Full Response (JSON)', '{}'))
    for sw in full_response.get('softwareSelections', []):
        if sw.get('softwareId') == software_id:
            return sw.get('customName', sw.get('softwareName', ''))
    return software_id
```

#### Why Custom Entries Matter
Custom "Other" entries reveal:
- Software tools the survey didn't include as options
- Emerging tools gaining traction (e.g., Midjourney, ChatGPT)
- Niche discipline-specific tools (e.g., Kreo for QS, Site Audit Pro for BS)
- Personal productivity tools staff find valuable
- Potential gaps in standard software provision

The `update_dashboard.py` script handles this automatically via the `build_software_name_lookup()` function.

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

## Notes

- This is a data analysis repository without application code
- The survey appears to be conducted by Bailey Partnership for internal software assessment
- Survey includes both desktop tools (AutoCAD, Revit) and cloud services (Google Workspace, ACC)
