#!/usr/bin/env python3
"""
Parse Bailey Software Survey CSV and output analysis data.
"""

import csv
import json
from collections import defaultdict, Counter
from datetime import datetime

CSV_PATH = "Bailey Software Survey Responses - Survey Responses(6).csv"

# Maps for display labels
ROLE_LABELS = {
    'executive-director': 'Executive Director / Director',
    'senior-associate': 'Senior Associate / Associate',
    'general': 'General (Architect / PM / Engineer / etc.)',
    'graduate-apprentice': 'Graduate/Apprentice',
    'intern-trainee': 'Intern/Trainees'
}

DISCIPLINE_LABELS = {
    'admin-support': 'Admin/Support',
    'architecture': 'Architecture',
    'building-services-engineering': 'Building Services Engineering',
    'building-surveying': 'Building Surveying',
    'cdm-principal-designer': 'CDM/Principal Designer',
    'fire-engineering': 'Fire Engineering',
    'project-management': 'Project Management',
    'interior-design': 'Interior Design',
    'quantity-surveying': 'Quantity Surveying',
    'structural-civil-engineering': 'Structural and Civil Engineering',
    'town-planning': 'Town Planning'
}

OFFICE_LABELS = {
    'bristol': 'Bristol',
    'bury-st-edmunds': 'Bury St. Edmunds',
    'chichester': 'Chichester',
    'edinburgh': 'Edinburgh',
    'exeter': 'Exeter',
    'gibraltar': 'Gibraltar',
    'kidderminster': 'Kidderminster',
    'maidstone': 'Maidstone',
    'manchester': 'Manchester',
    'peterborough': 'Peterborough',
    'plymouth': 'Plymouth',
    'st-austell': 'St Austell',
    'torquay': 'Torquay'
}

FREQUENCY_WEIGHTS = {
    'daily': 5,
    'several-per-week': 4,
    'weekly': 3,
    'monthly': 2,
    'less-than-monthly': 1
}

TRAINING_SCORES = {
    'very-confident': 0,
    'somewhat-confident': 0,
    'need-more': 1,
    'require-significant': 2
}

AGREEMENT_SCORES = {
    'strongly-agree': 2,
    'agree': 1,
    'neutral': 0,
    'disagree': -1,
    'strongly-disagree': -2
}

BENEFIT_WEIGHTS = {
    'significant': 3,
    'moderate': 2,
    'slight': 1,
    'unsure': 0
}

def parse_csv():
    """Parse the CSV file and return all responses."""
    responses = []

    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Parse JSON fields
            full_response = json.loads(row['Full Response (JSON)']) if row['Full Response (JSON)'] else {}
            currently_using_details = json.loads(row['Currently Using Details (JSON)']) if row['Currently Using Details (JSON)'] else []
            previously_used_details = json.loads(row['Previously Used Details (JSON)']) if row['Previously Used Details (JSON)'] else []
            would_like_details = json.loads(row['Would Like to Use Details (JSON)']) if row['Would Like to Use Details (JSON)'] else []

            responses.append({
                'timestamp': row['Submission Timestamp'],
                'surveyId': row['Survey ID'],
                'email': row.get('Email', ''),
                'fullName': row.get('Full Name', ''),
                'roleLevel': row['Role Level'].lower().replace(' ', '-') if row['Role Level'] else '',
                'primaryOffice': row['Primary Office'].lower().replace(' ', '-').replace('.', '') if row['Primary Office'] else '',
                'discipline': row['Discipline'].lower().replace(' ', '-').replace('/', '-').replace('and', '').replace('  ', ' ').strip() if row['Discipline'] else '',
                'currentlyUsingCount': int(row['Currently Using Count']) if row['Currently Using Count'] else 0,
                'previouslyUsedCount': int(row['Previously Used Count']) if row['Previously Used Count'] else 0,
                'wouldLikeToUseCount': int(row['Would Like to Use Count']) if row['Would Like to Use Count'] else 0,
                'currentlyUsingSoftware': row['Currently Using Software'],
                'previouslyUsedSoftware': row['Previously Used Software'],
                'wouldLikeToUseSoftware': row['Would Like to Use Software'],
                'overallSatisfaction': int(row['Overall Satisfaction (1-5)']) if row['Overall Satisfaction (1-5)'] else None,
                'trainingResources': row['Training Resources'].lower().replace(' ', '-') if row['Training Resources'] else None,
                'itSupport': row['IT Support'].lower().replace(' ', '-') if row['IT Support'] else None,
                'softwareIntegration': row['Software Integration'].lower().replace(' ', '-') if row['Software Integration'] else None,
                'improvementSuggestions': row['Improvement Suggestions'],
                'personalLicenses': row['Personal Licences'],
                'additionalComments': row['Additional Comments'],
                'currentlyUsingDetails': currently_using_details,
                'previouslyUsedDetails': previously_used_details,
                'wouldLikeToUseDetails': would_like_details,
                'fullResponse': full_response
            })

    return responses

def normalize_discipline(disc):
    """Normalize discipline string to match our keys."""
    disc = disc.lower().strip()
    mappings = {
        'architecture': 'architecture',
        'building-surveying': 'building-surveying',
        'building surveying': 'building-surveying',
        'project-management': 'project-management',
        'project management': 'project-management',
        'fire-engineering': 'fire-engineering',
        'fire engineering': 'fire-engineering',
        'building-services-engineering': 'building-services-engineering',
        'building services engineering': 'building-services-engineering',
        'structural--civil-engineering': 'structural-civil-engineering',
        'structural-civil-engineering': 'structural-civil-engineering',
        'structural and civil engineering': 'structural-civil-engineering',
        'quantity-surveying': 'quantity-surveying',
        'quantity surveying': 'quantity-surveying',
        'cdm-principal-designer': 'cdm-principal-designer',
        'cdm/principal designer': 'cdm-principal-designer',
        'interior-design': 'interior-design',
        'interior design': 'interior-design',
        'town-planning': 'town-planning',
        'town planning': 'town-planning',
        'admin-support': 'admin-support',
        'admin/support': 'admin-support'
    }
    return mappings.get(disc, disc)

def normalize_office(office):
    """Normalize office string to match our keys."""
    office = office.lower().strip()
    mappings = {
        'plymouth': 'plymouth',
        'chichester': 'chichester',
        'bristol': 'bristol',
        'exeter': 'exeter',
        'manchester': 'manchester',
        'torquay': 'torquay',
        'peterborough': 'peterborough',
        'edinburgh': 'edinburgh',
        'gibraltar': 'gibraltar',
        'maidstone': 'maidstone',
        'kidderminster': 'kidderminster',
        'bury-st-edmunds': 'bury-st-edmunds',
        'bury st edmunds': 'bury-st-edmunds',
        'st-austell': 'st-austell',
        'st austell': 'st-austell'
    }
    return mappings.get(office, office)

def normalize_role(role):
    """Normalize role string to match our keys."""
    role = role.lower().strip()
    mappings = {
        'general': 'general',
        'graduate-apprentice': 'graduate-apprentice',
        'graduate/apprentice': 'graduate-apprentice',
        'senior-associate': 'senior-associate',
        'senior associate': 'senior-associate',
        'executive-director': 'executive-director',
        'executive director': 'executive-director',
        'intern-trainee': 'intern-trainee',
        'intern/trainee': 'intern-trainee'
    }
    return mappings.get(role, role)

def analyze_demographics(responses):
    """Analyze respondent demographics."""
    by_discipline = Counter()
    by_role = Counter()
    by_office = Counter()

    for r in responses:
        disc = normalize_discipline(r['discipline'])
        role = normalize_role(r['roleLevel'])
        office = normalize_office(r['primaryOffice'])

        if disc:
            by_discipline[disc] += 1
        if role:
            by_role[role] += 1
        if office:
            by_office[office] += 1

    total = len(responses)

    return {
        'total': total,
        'byDiscipline': [
            {'key': k, 'label': DISCIPLINE_LABELS.get(k, k), 'count': v, 'percentage': round(v/total*100, 1)}
            for k, v in sorted(by_discipline.items(), key=lambda x: -x[1])
        ],
        'byRoleLevel': [
            {'key': k, 'label': ROLE_LABELS.get(k, k), 'count': v, 'percentage': round(v/total*100, 1)}
            for k, v in sorted(by_role.items(), key=lambda x: -x[1])
        ],
        'byOffice': [
            {'key': k, 'label': OFFICE_LABELS.get(k, k), 'count': v, 'percentage': round(v/total*100, 1)}
            for k, v in sorted(by_office.items(), key=lambda x: -x[1])
        ]
    }

def analyze_currently_using(responses):
    """Analyze currently used software."""
    software_data = defaultdict(lambda: {
        'count': 0,
        'satisfactionSum': 0,
        'frequencySum': 0,
        'trainingNeedScore': 0,
        'trainingLevels': Counter(),
        'byDiscipline': Counter(),
        'details': []
    })

    for r in responses:
        disc = normalize_discipline(r['discipline'])
        full_resp = r['fullResponse']

        # Get software names mapping from full response
        software_names = {}
        if 'softwareSelections' in full_resp:
            for sel in full_resp['softwareSelections']:
                software_names[sel['softwareId']] = sel.get('softwareName', sel['softwareId'])
                # Check for custom names (Other entries)
                if sel.get('customName'):
                    software_names[sel['softwareId']] = sel['customName']

        for detail in r['currentlyUsingDetails']:
            sw_id = detail.get('softwareId', '')
            sw_name = software_names.get(sw_id, sw_id)

            # Check for custom name in the detail itself
            if detail.get('customName'):
                sw_name = detail['customName']

            freq = detail.get('frequency', '')
            training = detail.get('trainingLevel', '')
            satisfaction = detail.get('satisfaction', 0)

            software_data[sw_name]['count'] += 1
            software_data[sw_name]['satisfactionSum'] += satisfaction if satisfaction else 0
            software_data[sw_name]['frequencySum'] += FREQUENCY_WEIGHTS.get(freq, 0)
            software_data[sw_name]['trainingNeedScore'] += TRAINING_SCORES.get(training, 0)
            software_data[sw_name]['trainingLevels'][training] += 1
            software_data[sw_name]['byDiscipline'][disc] += 1
            software_data[sw_name]['softwareId'] = sw_id
            software_data[sw_name]['details'].append({
                'discipline': disc,
                'frequency': freq,
                'training': training,
                'satisfaction': satisfaction
            })

    results = []
    for name, data in software_data.items():
        count = data['count']
        results.append({
            'softwareName': name,
            'softwareId': data.get('softwareId', ''),
            'userCount': count,
            'avgSatisfaction': round(data['satisfactionSum'] / count, 2) if count > 0 else 0,
            'avgFrequency': round(data['frequencySum'] / count, 2) if count > 0 else 0,
            'trainingNeedScore': data['trainingNeedScore'],
            'trainingLevels': dict(data['trainingLevels']),
            'byDiscipline': dict(data['byDiscipline']),
            'isOther': data.get('softwareId', '').endswith('-other')
        })

    return sorted(results, key=lambda x: -x['userCount'])

def analyze_previously_used(responses):
    """Analyze previously used software."""
    software_data = defaultdict(lambda: {
        'count': 0,
        'usedWhere': Counter(),
        'stoppedReasons': Counter(),
        'supersededBy': [],
        'byDiscipline': Counter()
    })

    for r in responses:
        disc = normalize_discipline(r['discipline'])
        full_resp = r['fullResponse']

        software_names = {}
        if 'softwareSelections' in full_resp:
            for sel in full_resp['softwareSelections']:
                software_names[sel['softwareId']] = sel.get('softwareName', sel['softwareId'])

        for detail in r['previouslyUsedDetails']:
            sw_id = detail.get('softwareId', '')
            sw_name = software_names.get(sw_id, sw_id)

            software_data[sw_name]['count'] += 1
            software_data[sw_name]['byDiscipline'][disc] += 1
            software_data[sw_name]['softwareId'] = sw_id

            for where in detail.get('usedWhere', []):
                software_data[sw_name]['usedWhere'][where] += 1

            for reason in detail.get('stoppedReasons', []):
                software_data[sw_name]['stoppedReasons'][reason] += 1

            if detail.get('supersededBy'):
                software_data[sw_name]['supersededBy'].append(detail['supersededBy'])

    results = []
    for name, data in software_data.items():
        results.append({
            'softwareName': name,
            'softwareId': data.get('softwareId', ''),
            'count': data['count'],
            'usedWhere': dict(data['usedWhere']),
            'stoppedReasons': dict(data['stoppedReasons']),
            'supersededBy': data['supersededBy'],
            'byDiscipline': dict(data['byDiscipline'])
        })

    return sorted(results, key=lambda x: -x['count'])

def analyze_would_like_to_use(responses):
    """Analyze software people would like to use."""
    software_data = defaultdict(lambda: {
        'count': 0,
        'benefitScoreSum': 0,
        'benefits': Counter(),
        'wouldReplace': [],
        'interests': [],
        'byDiscipline': Counter()
    })

    for r in responses:
        disc = normalize_discipline(r['discipline'])
        full_resp = r['fullResponse']

        software_names = {}
        if 'softwareSelections' in full_resp:
            for sel in full_resp['softwareSelections']:
                software_names[sel['softwareId']] = sel.get('softwareName', sel['softwareId'])

        for detail in r['wouldLikeToUseDetails']:
            sw_id = detail.get('softwareId', '')
            sw_name = software_names.get(sw_id, sw_id)

            benefit = detail.get('benefit', '')

            software_data[sw_name]['count'] += 1
            software_data[sw_name]['benefitScoreSum'] += BENEFIT_WEIGHTS.get(benefit, 0)
            software_data[sw_name]['benefits'][benefit] += 1
            software_data[sw_name]['byDiscipline'][disc] += 1
            software_data[sw_name]['softwareId'] = sw_id

            if detail.get('wouldReplace'):
                software_data[sw_name]['wouldReplace'].append(detail['wouldReplace'])

            if detail.get('interest'):
                software_data[sw_name]['interests'].append({
                    'discipline': disc,
                    'interest': detail['interest']
                })

    results = []
    for name, data in software_data.items():
        count = data['count']
        results.append({
            'softwareName': name,
            'softwareId': data.get('softwareId', ''),
            'count': count,
            'avgBenefitScore': round(data['benefitScoreSum'] / count, 2) if count > 0 else 0,
            'benefits': dict(data['benefits']),
            'wouldReplace': data['wouldReplace'],
            'interests': data['interests'],
            'byDiscipline': dict(data['byDiscipline'])
        })

    return sorted(results, key=lambda x: -x['count'])

def analyze_general_feedback(responses):
    """Analyze general feedback responses."""
    overall_satisfaction = []
    training_resources = Counter()
    it_support = Counter()
    software_integration = Counter()

    improvement_suggestions = []
    personal_licenses = []
    additional_comments = []

    for r in responses:
        if r['overallSatisfaction']:
            overall_satisfaction.append(r['overallSatisfaction'])

        if r['trainingResources']:
            training_resources[r['trainingResources']] += 1

        if r['itSupport']:
            it_support[r['itSupport']] += 1

        if r['softwareIntegration']:
            software_integration[r['softwareIntegration']] += 1

        if r['improvementSuggestions']:
            improvement_suggestions.append({
                'text': r['improvementSuggestions'],
                'discipline': normalize_discipline(r['discipline']),
                'role': normalize_role(r['roleLevel'])
            })

        if r['personalLicenses']:
            personal_licenses.append({
                'text': r['personalLicenses'],
                'discipline': normalize_discipline(r['discipline']),
                'role': normalize_role(r['roleLevel'])
            })

        if r['additionalComments']:
            additional_comments.append({
                'text': r['additionalComments'],
                'discipline': normalize_discipline(r['discipline']),
                'role': normalize_role(r['roleLevel'])
            })

    def calc_net_score(counter):
        total = sum(counter.values())
        score = sum(AGREEMENT_SCORES.get(k, 0) * v for k, v in counter.items())
        return round(score / total, 2) if total > 0 else 0

    return {
        'overallSatisfaction': {
            'avg': round(sum(overall_satisfaction) / len(overall_satisfaction), 2) if overall_satisfaction else 0,
            'count': len(overall_satisfaction),
            'distribution': Counter(overall_satisfaction)
        },
        'trainingResources': {
            'netScore': calc_net_score(training_resources),
            'distribution': dict(training_resources)
        },
        'itSupport': {
            'netScore': calc_net_score(it_support),
            'distribution': dict(it_support)
        },
        'softwareIntegration': {
            'netScore': calc_net_score(software_integration),
            'distribution': dict(software_integration)
        },
        'improvementSuggestions': improvement_suggestions,
        'personalLicenses': personal_licenses,
        'additionalComments': additional_comments
    }

def find_custom_entries(responses):
    """Find all custom 'Other' entries."""
    custom_entries = []

    for r in responses:
        disc = normalize_discipline(r['discipline'])
        full_resp = r['fullResponse']

        if 'softwareSelections' in full_resp:
            for sel in full_resp['softwareSelections']:
                sw_id = sel.get('softwareId', '')
                if sw_id.endswith('-other') or sel.get('customName'):
                    custom_name = sel.get('customName', sel.get('softwareName', ''))
                    if custom_name and custom_name != 'Other - please specify':
                        custom_entries.append({
                            'customName': custom_name,
                            'softwareId': sw_id,
                            'discipline': disc,
                            'usageStatus': sel.get('usageStatus', '')
                        })

    # Aggregate by custom name
    aggregated = defaultdict(lambda: {
        'count': 0,
        'disciplines': set(),
        'usageStatuses': Counter()
    })

    for entry in custom_entries:
        name = entry['customName']
        aggregated[name]['count'] += 1
        aggregated[name]['disciplines'].add(entry['discipline'])
        aggregated[name]['usageStatuses'][entry['usageStatus']] += 1

    results = []
    for name, data in aggregated.items():
        results.append({
            'customName': name,
            'count': data['count'],
            'disciplines': list(data['disciplines']),
            'usageStatuses': dict(data['usageStatuses'])
        })

    return sorted(results, key=lambda x: -x['count'])

def analyze_by_discipline(responses):
    """Create discipline-specific analysis."""
    discipline_data = defaultdict(lambda: {
        'count': 0,
        'currentlyUsing': [],
        'previouslyUsed': [],
        'wouldLikeToUse': [],
        'overallSatisfaction': [],
        'trainingNeeds': defaultdict(int),
        'suggestions': []
    })

    for r in responses:
        disc = normalize_discipline(r['discipline'])
        if not disc:
            continue

        discipline_data[disc]['count'] += 1

        if r['overallSatisfaction']:
            discipline_data[disc]['overallSatisfaction'].append(r['overallSatisfaction'])

        if r['improvementSuggestions']:
            discipline_data[disc]['suggestions'].append(r['improvementSuggestions'])

        # Add software details
        full_resp = r['fullResponse']
        software_names = {}
        if 'softwareSelections' in full_resp:
            for sel in full_resp['softwareSelections']:
                software_names[sel['softwareId']] = sel.get('softwareName', sel['softwareId'])

        for detail in r['currentlyUsingDetails']:
            sw_id = detail.get('softwareId', '')
            sw_name = software_names.get(sw_id, sw_id)
            discipline_data[disc]['currentlyUsing'].append(sw_name)

            training = detail.get('trainingLevel', '')
            if training in ['need-more', 'require-significant']:
                discipline_data[disc]['trainingNeeds'][sw_name] += 1

    results = {}
    for disc, data in discipline_data.items():
        sw_counts = Counter(data['currentlyUsing'])
        results[disc] = {
            'label': DISCIPLINE_LABELS.get(disc, disc),
            'responseCount': data['count'],
            'avgSatisfaction': round(sum(data['overallSatisfaction']) / len(data['overallSatisfaction']), 2) if data['overallSatisfaction'] else 0,
            'topSoftware': [{'name': k, 'count': v} for k, v in sw_counts.most_common(10)],
            'trainingNeeds': [{'name': k, 'count': v} for k, v in sorted(data['trainingNeeds'].items(), key=lambda x: -x[1])[:5]],
            'suggestions': data['suggestions'][:3]  # Top 3 suggestions
        }

    return results

def main():
    """Main function to run all analysis."""
    print("Parsing CSV file...")
    responses = parse_csv()
    print(f"Parsed {len(responses)} responses")

    print("\nAnalyzing demographics...")
    demographics = analyze_demographics(responses)

    print("Analyzing currently used software...")
    currently_using = analyze_currently_using(responses)

    print("Analyzing previously used software...")
    previously_used = analyze_previously_used(responses)

    print("Analyzing desired software...")
    would_like_to_use = analyze_would_like_to_use(responses)

    print("Analyzing general feedback...")
    general_feedback = analyze_general_feedback(responses)

    print("Finding custom entries...")
    custom_entries = find_custom_entries(responses)

    print("Analyzing by discipline...")
    by_discipline = analyze_by_discipline(responses)

    # Compile full data
    full_data = {
        'metadata': {
            'totalResponses': len(responses),
            'generatedDate': datetime.now().strftime('%Y-%m-%d'),
            'surveyPeriod': 'February 2026'
        },
        'demographics': demographics,
        'softwareUsage': {
            'currentlyUsing': currently_using,
            'previouslyUsed': previously_used,
            'wouldLikeToUse': would_like_to_use
        },
        'customEntries': custom_entries,
        'generalFeedback': general_feedback,
        'byDiscipline': by_discipline
    }

    # Output as JSON for further processing
    print("\n\n=== SURVEY ANALYSIS DATA ===\n")
    print(json.dumps(full_data, indent=2, default=str))

if __name__ == '__main__':
    main()
