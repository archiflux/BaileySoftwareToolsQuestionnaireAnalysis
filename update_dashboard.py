#!/usr/bin/env python3
"""
Parse new survey CSV and generate updated data.js for the dashboard
"""

import csv
import json
from collections import defaultdict
from datetime import datetime

# Software ID to human-readable name mapping
SOFTWARE_NAMES = {
    # Architecture
    'arch-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'arch-office-onlyoffice': 'OnlyOffice',
    'arch-ai-gemini': 'Gemini/Notebook LM',
    'arch-collab-acc': 'Autodesk Construction Cloud (ACC/BIM 360)',
    'arch-bim-revit': 'Autodesk Revit',
    'arch-bim-sketchup': 'SketchUp Pro',
    'arch-bim-forma': 'Autodesk Forma',
    'arch-doc-autocad': 'AutoCAD',
    'arch-doc-bluebeam': 'Bluebeam Revu',
    'arch-doc-gimp': 'GIMP',
    'arch-spec-nbs-chorus': 'NBS Chorus',
    'arch-viz-enscape': 'Enscape',
    'arch-viz-twinmotion': 'Twinmotion',
    'arch-comp-dynamo': 'Dynamo (Revit)',
    'arch-comp-pyrevit': 'pyRevit',
    'arch-physics-builddesk': 'BuildDesk U (U-Value/Thermal)',

    # Building Surveying
    'bs-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'bs-office-onlyoffice': 'OnlyOffice',
    'bs-ai-gemini': 'Gemini/Notebook LM',
    'bs-collab-acc': 'Autodesk Construction Cloud (ACC)',
    'bs-survey-autocad': 'AutoCAD',
    'bs-survey-revit': 'Revit (Building Surveying)',
    'bs-survey-recap': 'Autodesk ReCap',
    'bs-survey-leica': 'Leica Cyclone',
    'bs-survey-faro': 'FARO Scene',
    'bs-spec-nbs-chorus': 'NBS Chorus',
    'bs-contracts-jct': 'JCT Contracts (JCT On Demand)',
    'bs-contracts-docusign': 'DocuSign',
    'bs-contracts-gantter': 'Gantter',
    'bs-condition-kykloud': 'Kykloud',
    'bs-condition-monitoring': 'Monitoring Software',
    'bs-pathology-snagr': 'Snag R',

    # Project Management
    'pm-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'pm-office-onlyoffice': 'OnlyOffice',
    'pm-ai-gemini': 'Gemini/Notebook LM',
    'pm-collab-acc': 'Autodesk Construction Cloud (ACC/BIM 360)',
    'pm-collab-4projects': '4Projects',
    'pm-collab-aconex': 'Aconex',
    'pm-doc-bluebeam': 'Bluebeam Revu',
    'pm-software-msproject': 'Microsoft Project',
    'pm-software-gantter': 'Gantter',
    'pm-software-monday': 'Monday.com',
    'pm-software-procore': 'Procore',
    'pm-software-viewpoint': 'Viewpoint',
    'pm-software-asite': 'Asite',
    'pm-software-asta': 'Asta Powerproject',

    # Structural/Civil Engineering
    'struct-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'struct-office-onlyoffice': 'OnlyOffice',
    'struct-ai-gemini': 'Gemini/Notebook LM',
    'struct-collab-acc': 'Autodesk Construction Cloud (ACC/BIM 360)',
    'struct-bim-autocad': 'AutoCAD',
    'struct-bim-revit': 'Revit Structure',
    'struct-bim-tekla': 'Tekla Structures',
    'struct-analysis-tedds': 'Tedds',
    'struct-analysis-tekla-designer': 'Tekla Structural Designer',
    'struct-analysis-robot': 'Autodesk Robot',
    'struct-civil-civil3d': 'Civil 3D',
    'struct-spec-bluebeam': 'Bluebeam Revu',
    'struct-spec-nbs-chorus': 'NBS Chorus',

    # Building Services (MEP)
    'mep-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'mep-ai-gemini': 'Gemini/Notebook LM',
    'mep-collab-acc': 'Autodesk Construction Cloud (ACC/BIM 360)',
    'mep-bim-revit': 'Revit MEP',
    'mep-bim-autocad': 'AutoCAD MEP',
    'mep-bim-magicad': 'MagiCAD',
    'mep-bim-fabrication': 'Autodesk Fabrication',
    'mep-analysis-dialux': 'Dialux (lighting)',
    'mep-analysis-relux': 'Relux (lighting)',
    'mep-analysis-hevacomp': 'Hevacomp',
    'mep-analysis-ies': 'IES VE',
    'mep-analysis-electricalom': 'ElectricalOM (BS 7671)',
    'mep-analysis-amtech': 'Amtech',
    'mep-analysis-trimble': 'Trimble Nova',
    'mep-cfd-ies': 'IES VE (CFD)',
    'mep-cfd-designbuilder': 'DesignBuilder',
    'mep-spec-bluebeam': 'Bluebeam Revu',
    'mep-spec-nbs-chorus': 'NBS Chorus',

    # Quantity Surveying
    'qs-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'qs-office-onlyoffice': 'OnlyOffice',
    'qs-ai-gemini': 'Gemini/Notebook LM',
    'qs-collab-acc': 'Autodesk Construction Cloud (ACC)',
    'qs-bim-acc': 'ACC Takeoff',
    'qs-spec-nbs-chorus': 'NBS Chorus',
    'qs-spec-docusign': 'DocuSign',
    'qs-measure-bluebeam': 'Bluebeam Revu',
    'qs-measure-costx': 'CostX',
    'qs-measure-navisworks': 'Navisworks',

    # Fire Engineering
    'fire-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'fire-ai-gemini': 'Gemini/Notebook LM',
    'fire-collab-acc': 'Autodesk Construction Cloud (ACC)',
    'fire-doc-autocad': 'AutoCAD',
    'fire-doc-bluebeam': 'Bluebeam Revu',
    'fire-sim-pyrosim': 'PyroSim (FDS interface)',
    'fire-sim-pathfinder': 'Pathfinder (evacuation)',

    # Interior Design
    'int-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'int-ai-gemini': 'Gemini/Notebook LM',
    'int-collab-acc': 'Autodesk Construction Cloud (ACC)',
    'int-design-revit': 'Autodesk Revit',
    'int-design-autocad': 'AutoCAD',
    'int-design-sketchup': 'SketchUp Pro',
    'int-spec-nbs-chorus': 'NBS Chorus',
    'int-viz-enscape': 'Enscape',
    'int-viz-twinmotion': 'Twinmotion',
    'int-addins-pyrevit': 'pyRevit',
    'int-graphics-gimp': 'GIMP',

    # Town Planning
    'plan-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'plan-ai-gemini': 'Gemini/Notebook LM',
    'plan-collab-acc': 'Autodesk Construction Cloud (ACC)',
    'plan-gis-magicmaps': 'Magic Maps',
    'plan-gis-google-earth': 'Google Earth Pro',

    # Admin/Support
    'admin-office-google': 'Google Workspace (Docs, Sheets, Slides)',
    'admin-office-onlyoffice': 'OnlyOffice',
    'admin-ai-gemini': 'Gemini/Notebook LM',
    'admin-doc-google-drive': 'Google Drive',
    'admin-doc-bluebeam': 'Bluebeam Revu',
    'admin-doc-docusign': 'DocuSign',
    'admin-comms-google-meet': 'Google Meet',
    'admin-comms-teams': 'Microsoft Teams',
    'admin-comms-slack': 'Slack',
    'admin-comms-zoom': 'Zoom',
    'admin-hr-bamboo': 'BambooHR',
    'admin-hr-breathe': 'Breathe HR',
    'admin-finance-xero': 'Xero',
    'admin-finance-sage': 'Sage',
    'admin-finance-quickbooks': 'QuickBooks',
    'admin-it-freshdesk': 'Freshdesk',
    'admin-it-zendesk': 'Zendesk',
    'admin-it-teamviewer': 'TeamViewer',
    'admin-crm-hubspot': 'HubSpot',
    'admin-crm-salesforce': 'Salesforce',
}

# Discipline label normalization
DISCIPLINE_LABELS = {
    'architecture': 'Architecture',
    'building-surveying': 'Building Surveying',
    'building surveying': 'Building Surveying',
    'project-management': 'Project Management',
    'project management': 'Project Management',
    'structural-civil-engineering': 'Structural and Civil Engineering',
    'structural/civil engineering': 'Structural and Civil Engineering',
    'building-services-engineering': 'Building Services Engineering',
    'building services engineering': 'Building Services Engineering',
    'quantity-surveying': 'Quantity Surveying',
    'quantity surveying': 'Quantity Surveying',
    'admin-support': 'Admin/Support',
    'admin support': 'Admin/Support',
    'fire-engineering': 'Fire Engineering',
    'fire engineering': 'Fire Engineering',
    'interior-design': 'Interior Design',
    'interior design': 'Interior Design',
    'town-planning': 'Town Planning',
    'town planning': 'Town Planning',
}

# Role level label normalization
ROLE_LABELS = {
    'general': 'General (Architect / PM / Engineer / etc.)',
    'graduate-apprentice': 'Graduate/Apprentice',
    'graduate/apprentice': 'Graduate/Apprentice',
    'senior-associate---associate': 'Senior Associate / Associate',
    'senior associate / associate': 'Senior Associate / Associate',
    'executive-director---director': 'Executive Director / Director',
    'executive director / director': 'Executive Director / Director',
    'intern-trainee': 'Intern/Trainee',
    'intern/trainee': 'Intern/Trainee',
}

def normalize_discipline_label(label):
    """Normalize discipline label to proper case."""
    return DISCIPLINE_LABELS.get(label.lower(), label.title())

def normalize_role_label(label):
    """Normalize role level label."""
    return ROLE_LABELS.get(label.lower(), label)

def get_software_name(software_id, custom_name=None):
    """Get human-readable name for a software ID."""
    if custom_name and software_id.startswith('other-'):
        return custom_name
    if software_id.endswith('-other') or '-other-' in software_id:
        return custom_name if custom_name else software_id
    return SOFTWARE_NAMES.get(software_id, software_id)

def parse_csv(filepath):
    """Parse the CSV file and return list of records."""
    records = []
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            records.append(row)
    return records

def safe_json_parse(s):
    """Safely parse JSON, returning empty list on failure."""
    if not s or s.strip() == '':
        return []
    try:
        return json.loads(s)
    except:
        return []

def calculate_frequency_score(freq):
    """Convert frequency string to numeric score."""
    freq_map = {
        'daily': 5,
        'several-per-week': 4,
        'weekly': 3,
        'monthly': 2,
        'rarely': 1
    }
    return freq_map.get(freq, 3)

def analyze_data(records):
    """Analyze survey data and return structured results."""

    # Demographics
    disciplines = defaultdict(int)
    role_levels = defaultdict(int)
    offices = defaultdict(int)

    # Software tracking
    currently_using = defaultdict(lambda: {
        'count': 0,
        'satisfaction': [],
        'frequency': [],
        'training': defaultdict(int),
        'disciplines': defaultdict(int),
        'is_other': False
    })

    previously_used = defaultdict(lambda: {
        'count': 0,
        'used_where': defaultdict(int),
        'stopped_reasons': defaultdict(int),
        'superseded_by': [],
        'disciplines': defaultdict(int)
    })

    would_like_to_use = defaultdict(lambda: {
        'count': 0,
        'benefits': defaultdict(int),
        'interests': [],
        'disciplines': defaultdict(int)
    })

    # General feedback
    overall_satisfaction = []
    training_resources = defaultdict(int)
    it_support = defaultdict(int)
    software_integration = defaultdict(int)
    improvement_suggestions = []
    personal_licenses = []

    # Custom entries tracking
    custom_entries = defaultdict(lambda: {
        'count': 0,
        'disciplines': set(),
        'statuses': defaultdict(int)
    })

    for record in records:
        # Demographics
        discipline = record.get('Discipline', '').strip()
        if discipline:
            disciplines[discipline] += 1

        role = record.get('Role Level', '').strip()
        if role:
            role_levels[role] += 1

        office = record.get('Primary Office', '').strip()
        if office:
            offices[office] += 1

        # Overall satisfaction
        sat = record.get('Overall Satisfaction (1-5)', '')
        if sat:
            try:
                overall_satisfaction.append(int(sat))
            except:
                pass

        # Training resources
        tr = record.get('Training Resources', '')
        if tr:
            training_resources[tr] += 1

        # IT Support
        its = record.get('IT Support', '')
        if its:
            it_support[its] += 1

        # Software Integration
        si = record.get('Software Integration', '')
        if si:
            software_integration[si] += 1

        # Improvement suggestions
        suggestion = record.get('Improvement Suggestions', '').strip()
        if suggestion:
            improvement_suggestions.append({
                'text': suggestion,
                'discipline': discipline,
                'role': role
            })

        # Personal licenses
        pl = record.get('Personal Licences', '').strip()
        if pl:
            personal_licenses.append({
                'text': pl,
                'discipline': discipline
            })

        # Currently using details
        current_details = safe_json_parse(record.get('Currently Using Details (JSON)', ''))
        for item in current_details:
            sw_id = item.get('softwareId', '')
            if not sw_id:
                continue

            is_other = sw_id.endswith('-other') or '-other-' in sw_id or sw_id.startswith('other-')
            custom_name = item.get('customName', item.get('softwareName', ''))
            sw_name = get_software_name(sw_id, custom_name)

            currently_using[sw_name]['count'] += 1
            currently_using[sw_name]['is_other'] = is_other

            if 'satisfaction' in item and item['satisfaction']:
                try:
                    currently_using[sw_name]['satisfaction'].append(int(item['satisfaction']))
                except:
                    pass

            if 'frequency' in item:
                currently_using[sw_name]['frequency'].append(calculate_frequency_score(item['frequency']))

            if 'trainingLevel' in item:
                currently_using[sw_name]['training'][item['trainingLevel']] += 1

            if discipline:
                disc_key = discipline.lower().replace(' ', '-').replace('/', '-')
                currently_using[sw_name]['disciplines'][disc_key] += 1

            if is_other and sw_name:
                custom_entries[sw_name]['count'] += 1
                custom_entries[sw_name]['disciplines'].add(discipline)
                custom_entries[sw_name]['statuses']['currently-using'] += 1

        # Previously used details
        prev_details = safe_json_parse(record.get('Previously Used Details (JSON)', ''))
        for item in prev_details:
            sw_id = item.get('softwareId', '')
            if not sw_id:
                continue

            is_other = sw_id.endswith('-other') or '-other-' in sw_id or sw_id.startswith('other-')
            custom_name = item.get('customName', item.get('softwareName', ''))
            sw_name = get_software_name(sw_id, custom_name)

            previously_used[sw_name]['count'] += 1

            if 'usedWhere' in item:
                for where in item['usedWhere']:
                    previously_used[sw_name]['used_where'][where] += 1

            if 'stoppedReasons' in item:
                for reason in item['stoppedReasons']:
                    previously_used[sw_name]['stopped_reasons'][reason] += 1

            if 'supersededBy' in item and item['supersededBy']:
                previously_used[sw_name]['superseded_by'].append(item['supersededBy'])

            if discipline:
                disc_key = discipline.lower().replace(' ', '-').replace('/', '-')
                previously_used[sw_name]['disciplines'][disc_key] += 1

            if is_other and sw_name:
                custom_entries[sw_name]['count'] += 1
                custom_entries[sw_name]['disciplines'].add(discipline)
                custom_entries[sw_name]['statuses']['used-previously'] += 1

        # Would like to use details
        want_details = safe_json_parse(record.get('Would Like to Use Details (JSON)', ''))
        for item in want_details:
            sw_id = item.get('softwareId', '')
            if not sw_id:
                continue

            is_other = sw_id.endswith('-other') or '-other-' in sw_id or sw_id.startswith('other-')
            custom_name = item.get('customName', item.get('softwareName', ''))
            sw_name = get_software_name(sw_id, custom_name)

            would_like_to_use[sw_name]['count'] += 1

            if 'benefit' in item:
                would_like_to_use[sw_name]['benefits'][item['benefit']] += 1

            if 'interest' in item and item['interest']:
                would_like_to_use[sw_name]['interests'].append(item['interest'])

            if discipline:
                disc_key = discipline.lower().replace(' ', '-').replace('/', '-')
                would_like_to_use[sw_name]['disciplines'][disc_key] += 1

            if is_other and sw_name:
                custom_entries[sw_name]['count'] += 1
                custom_entries[sw_name]['disciplines'].add(discipline)
                custom_entries[sw_name]['statuses']['would-like-to-use'] += 1

    return {
        'total': len(records),
        'disciplines': dict(disciplines),
        'role_levels': dict(role_levels),
        'offices': dict(offices),
        'currently_using': {k: dict(v) for k, v in currently_using.items()},
        'previously_used': {k: dict(v) for k, v in previously_used.items()},
        'would_like_to_use': {k: dict(v) for k, v in would_like_to_use.items()},
        'overall_satisfaction': overall_satisfaction,
        'training_resources': dict(training_resources),
        'it_support': dict(it_support),
        'software_integration': dict(software_integration),
        'improvement_suggestions': improvement_suggestions,
        'personal_licenses': personal_licenses,
        'custom_entries': {k: {'count': v['count'], 'disciplines': list(v['disciplines']), 'statuses': dict(v['statuses'])} for k, v in custom_entries.items()}
    }

def calculate_net_score(distribution):
    """Calculate net score from agreement distribution."""
    positive = distribution.get('Strongly Agree', 0) + distribution.get('Agree', 0)
    negative = distribution.get('Disagree', 0) + distribution.get('Strongly Disagree', 0)
    total = sum(distribution.values())
    if total == 0:
        return 0
    return round((positive - negative) / total * 2, 2)

def generate_data_js(analysis):
    """Generate the data.js content from analysis."""

    total = analysis['total']

    # Calculate discipline breakdown
    disc_list = []
    for disc, count in sorted(analysis['disciplines'].items(), key=lambda x: -x[1]):
        disc_list.append({
            'key': disc.lower().replace(' ', '-').replace('/', '-'),
            'label': normalize_discipline_label(disc),
            'count': count,
            'percentage': round(count / total * 100, 1)
        })

    # Calculate role level breakdown
    role_list = []
    for role, count in sorted(analysis['role_levels'].items(), key=lambda x: -x[1]):
        role_list.append({
            'key': role.lower().replace(' ', '-').replace('/', '-'),
            'label': normalize_role_label(role),
            'count': count,
            'percentage': round(count / total * 100, 1)
        })

    # Calculate office breakdown
    office_list = []
    for office, count in sorted(analysis['offices'].items(), key=lambda x: -x[1]):
        office_list.append({
            'key': office.lower().replace(' ', '-').replace('.', ''),
            'label': office,
            'count': count,
            'percentage': round(count / total * 100, 1)
        })

    # Process currently using software
    current_sw_list = []
    for sw_name, data in sorted(analysis['currently_using'].items(), key=lambda x: -x[1]['count']):
        if data['count'] < 1:
            continue

        avg_sat = round(sum(data['satisfaction']) / len(data['satisfaction']), 2) if data['satisfaction'] else 0
        avg_freq = round(sum(data['frequency']) / len(data['frequency']), 2) if data['frequency'] else 0

        # Calculate training need score
        training = data['training']
        training_score = training.get('need-more', 0) + training.get('require-significant', 0) * 2

        current_sw_list.append({
            'softwareName': sw_name,
            'userCount': data['count'],
            'avgSatisfaction': avg_sat,
            'avgFrequency': avg_freq,
            'trainingNeedScore': training_score,
            'trainingLevels': dict(training),
            'byDiscipline': dict(data['disciplines']),
            'isOther': data.get('is_other', False)
        })

    # Process previously used software
    prev_sw_list = []
    for sw_name, data in sorted(analysis['previously_used'].items(), key=lambda x: -x[1]['count']):
        if data['count'] < 2:
            continue

        prev_sw_list.append({
            'softwareName': sw_name,
            'count': data['count'],
            'usedWhere': dict(data['used_where']),
            'stoppedReasons': dict(data['stopped_reasons']),
            'supersededBy': list(set(data['superseded_by']))[:3],
            'byDiscipline': dict(data['disciplines'])
        })

    # Process would like to use software
    want_sw_list = []
    for sw_name, data in sorted(analysis['would_like_to_use'].items(), key=lambda x: -x[1]['count']):
        if data['count'] < 2:
            continue

        # Calculate average benefit score
        benefits = data['benefits']
        benefit_scores = {'significant': 3, 'moderate': 2, 'slight': 1, 'unsure': 0}
        total_benefit = sum(benefits.get(k, 0) * v for k, v in benefit_scores.items())
        benefit_count = sum(benefits.values())
        avg_benefit = round(total_benefit / benefit_count, 2) if benefit_count > 0 else 0

        want_sw_list.append({
            'softwareName': sw_name,
            'count': data['count'],
            'avgBenefitScore': avg_benefit,
            'benefits': dict(benefits),
            'byDiscipline': dict(data['disciplines']),
            'interests': data['interests'][:4]
        })

    # Calculate overall satisfaction
    sat_dist = defaultdict(int)
    for s in analysis['overall_satisfaction']:
        sat_dist[s] += 1
    avg_satisfaction = round(sum(analysis['overall_satisfaction']) / len(analysis['overall_satisfaction']), 2) if analysis['overall_satisfaction'] else 0

    # Calculate net scores
    training_net = calculate_net_score(analysis['training_resources'])
    it_net = calculate_net_score(analysis['it_support'])
    integration_net = calculate_net_score(analysis['software_integration'])

    # Build custom entries list
    custom_list = []
    for name, data in sorted(analysis['custom_entries'].items(), key=lambda x: -x[1]['count']):
        if data['count'] >= 1:
            custom_list.append({
                'customName': name,
                'count': data['count'],
                'disciplines': data['disciplines'],
                'usageStatuses': data['statuses']
            })

    # Generate the JavaScript
    js_content = f'''/**
 * Bailey Partnership Software Survey - Processed Data
 * Generated: {datetime.now().strftime('%Y-%m-%d')}
 * Survey Period: January 2026
 */

const surveyData = {{
  metadata: {{
    totalResponses: {total},
    generatedDate: '{datetime.now().strftime('%Y-%m-%d')}',
    surveyPeriod: 'January 2026',
    jobNumber: 'IIET-2026-001',
    status: 'Final'
  }},

  demographics: {{
    total: {total},
    byDiscipline: {json.dumps(disc_list, indent=6)},
    byRoleLevel: {json.dumps(role_list, indent=6)},
    byOffice: {json.dumps(office_list, indent=6)}
  }},

  softwareUsage: {{
    currentlyUsing: {json.dumps(current_sw_list[:50], indent=6)},
    previouslyUsed: {json.dumps(prev_sw_list[:15], indent=6)},
    wouldLikeToUse: {json.dumps(want_sw_list[:20], indent=6)}
  }},

  customEntries: {json.dumps(custom_list[:25], indent=4)},

  generalFeedback: {{
    overallSatisfaction: {{
      avg: {avg_satisfaction},
      count: {total},
      distribution: {json.dumps(dict(sat_dist))}
    }},
    trainingResources: {{
      netScore: {training_net},
      distribution: {json.dumps(analysis['training_resources'])}
    }},
    itSupport: {{
      netScore: {it_net},
      distribution: {json.dumps(analysis['it_support'])}
    }},
    softwareIntegration: {{
      netScore: {integration_net},
      distribution: {json.dumps(analysis['software_integration'])}
    }},
    improvementSuggestions: {json.dumps(analysis['improvement_suggestions'][:20], indent=6)},
    personalLicenses: {json.dumps(analysis['personal_licenses'][:10], indent=6)}
  }},

  byDiscipline: {generate_discipline_insights(analysis, disc_list)},

  insights: {generate_insights(current_sw_list, prev_sw_list, want_sw_list, avg_satisfaction, it_net, training_net)},

  executiveSummary: {{
    keyMetrics: {{
      totalResponses: {total},
      overallSatisfaction: {avg_satisfaction},
      itSupportScore: {it_net},
      trainingResourcesScore: {training_net},
      softwareIntegrationScore: {integration_net}
    }},
    highlights: [
      'High overall satisfaction ({avg_satisfaction}/5) with Bailey Partnership software provision',
      'Excellent IT support perception (strongly positive net score)',
      'Google Workspace near-universal adoption with high satisfaction',
      'Strong uptake of Gemini/Notebook LM across disciplines',
      'ACC widely adopted but needs standardization and training'
    ],
    concerns: [
      'ACC training gap - significant proportion of users need more training',
      'Affinity Suite dissatisfaction - Adobe alternatives requested',
      'Inconsistent software usage across disciplines and offices',
      'Building Surveying lacking dedicated site inspection tools',
      'Fire Engineering needs simulation software (PyroSim, Pathfinder)',
      'Training resources rated neutral by a significant proportion of respondents'
    ],
    topPriorities: [
      'Implement comprehensive ACC training program',
      'Evaluate site inspection software for Building Surveying',
      'Address Adobe/Affinity Suite concerns with floating licenses',
      'Procure fire simulation software for Fire Engineering',
      'Create structured Revit and pyRevit training programs'
    ]
  }}
}};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = surveyData;
}}
'''

    return js_content

def generate_discipline_insights(analysis, disc_list):
    """Generate discipline-specific insights section."""
    insights = {}

    for disc_info in disc_list:
        disc_key = disc_info['key']
        disc_label = disc_info['label']
        disc_count = disc_info['count']

        # Find top software for this discipline
        top_sw = []
        for sw_name, data in analysis['currently_using'].items():
            disc_count_sw = data['disciplines'].get(disc_key, 0)
            if disc_count_sw > 0:
                top_sw.append({'name': sw_name, 'count': disc_count_sw})
        top_sw.sort(key=lambda x: -x['count'])

        # Calculate average satisfaction for discipline
        sats = []
        for sw_name, data in analysis['currently_using'].items():
            if disc_key in data['disciplines'] and data['satisfaction']:
                sats.extend(data['satisfaction'])
        avg_sat = round(sum(sats) / len(sats), 2) if sats else 0

        # Find training needs
        training_needs = []
        for sw_name, data in analysis['currently_using'].items():
            if disc_key in data['disciplines']:
                training = data['training']
                need_count = training.get('need-more', 0) + training.get('require-significant', 0)
                if need_count > 0:
                    training_needs.append({'name': sw_name, 'count': need_count})
        training_needs.sort(key=lambda x: -x['count'])

        insights[disc_key] = {
            'label': disc_label,
            'responseCount': disc_count,
            'avgSatisfaction': avg_sat,
            'topSoftware': top_sw[:6],
            'trainingNeeds': training_needs[:4],
            'keyInsights': f'Analysis for {disc_label} team based on {disc_count} responses.'
        }

    return json.dumps(insights, indent=4)

def generate_insights(current_sw, prev_sw, want_sw, avg_sat, it_net, training_net):
    """Generate insights section."""

    # Find red flags (low satisfaction or high training needs)
    red_flags = []
    for sw in current_sw:
        if sw['avgSatisfaction'] > 0 and sw['avgSatisfaction'] < 3.0 and sw['userCount'] >= 3:
            red_flags.append({
                'software': sw['softwareName'],
                'issue': f"Satisfaction of {sw['avgSatisfaction']} with {sw['userCount']} users. Training score: {sw['trainingNeedScore']}.",
                'priority': 'Critical' if sw['avgSatisfaction'] < 2.5 else 'High'
            })
        elif sw['trainingNeedScore'] >= 10 and sw['userCount'] >= 5:
            red_flags.append({
                'software': sw['softwareName'],
                'issue': f"High training need score ({sw['trainingNeedScore']}) with {sw['userCount']} users.",
                'priority': 'High'
            })

    # Find success stories (high satisfaction)
    success_stories = []
    for sw in current_sw:
        if sw['avgSatisfaction'] >= 4.5 and sw['userCount'] >= 3:
            success_stories.append({
                'software': sw['softwareName'],
                'metric': f"{sw['avgSatisfaction']} satisfaction, {sw['userCount']} users",
                'insight': 'High satisfaction tool working well.'
            })

    insights = {
        'redFlags': red_flags[:7],
        'successStories': success_stories[:7],
        'recommendations': {
            'immediate': [
                {'action': 'Implement ACC training program', 'detail': 'Address training gap in ACC. Create standardized company-wide protocol.', 'priority': 'Critical'},
                {'action': 'Evaluate Gantter vs Microsoft Project', 'detail': 'Multiple users requesting MS Project. Consider providing floating licenses.', 'priority': 'High'},
                {'action': 'Address Affinity Suite complaints', 'detail': 'Consider floating Adobe license for occasional Photoshop needs.', 'priority': 'High'},
                {'action': 'pyRevit training initiative', 'detail': 'Many need training. Schedule workshops for Architecture team.', 'priority': 'High'},
                {'action': 'Gemini/AI training sessions', 'detail': 'Create workflow integration guides for AI tools.', 'priority': 'Medium'}
            ],
            'shortTerm': [
                {'action': 'Evaluate site inspection tools', 'detail': 'Building Surveying requesting Snag R and Kykloud. High potential ROI.', 'priority': 'High'},
                {'action': 'Fire Engineering software procurement', 'detail': 'PyroSim and Pathfinder essential for fire simulation work.', 'priority': 'High'},
                {'action': 'BuildDesk U access for Architecture', 'detail': 'Users requesting for thermal calculations.', 'priority': 'Medium'},
                {'action': 'Investigate Kreo/ACC Takeoff integration', 'detail': 'QS team interested in streamlining takeoff workflow.', 'priority': 'Medium'},
                {'action': 'Revit training program', 'detail': 'Create structured training path for beginners through intermediate.', 'priority': 'Medium'}
            ],
            'longTerm': [
                {'action': 'Standardize CDE usage', 'detail': 'Inconsistent ACC usage across business. Create clear protocols.', 'priority': 'High'},
                {'action': 'Evaluate Rhino.Inside.Revit', 'detail': 'Staff already using Rhino/Grasshopper. Consider official support.', 'priority': 'Medium'},
                {'action': 'Microsoft Office vs Google decision', 'detail': 'Some staff struggling with client compatibility. Review strategy.', 'priority': 'Medium'},
                {'action': 'AI tools standardization', 'detail': 'Multiple AI tools in use. Consider approved list.', 'priority': 'Low'}
            ]
        }
    }

    return json.dumps(insights, indent=4)

def main():
    csv_path = '/home/user/BaileySoftwareToolsQuestionnaireAnalysis/Bailey Software Survey Responses - Survey Responses(7).csv'
    output_path = '/home/user/BaileySoftwareToolsQuestionnaireAnalysis/dashboard/js/data.js'

    print(f"Parsing CSV: {csv_path}")
    records = parse_csv(csv_path)
    print(f"Found {len(records)} records")

    print("Analyzing data...")
    analysis = analyze_data(records)

    print("Generating data.js...")
    js_content = generate_data_js(analysis)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"Updated {output_path}")
    print(f"\nSummary:")
    print(f"  Total responses: {analysis['total']}")
    print(f"  Disciplines: {len(analysis['disciplines'])}")
    print(f"  Software currently used: {len(analysis['currently_using'])}")
    print(f"  Avg satisfaction: {round(sum(analysis['overall_satisfaction'])/len(analysis['overall_satisfaction']), 2) if analysis['overall_satisfaction'] else 'N/A'}")

if __name__ == '__main__':
    main()
