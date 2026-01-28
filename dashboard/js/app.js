/**
 * Bailey Partnership Software Survey - Main Application
 * Handles data rendering and interactive features
 */

(function() {
  'use strict';

  /**
   * Initialize the dashboard
   */
  function initDashboard() {
    // Populate all data sections
    populateMetadata();
    populateExecutiveSummary();
    populateDemographics();
    populateSoftwareUsage();
    populateSatisfactionAnalysis();
    populateTrainingNeeds();
    populateChurnAnalysis();
    populateDemandAnalysis();
    populateCustomEntries();
    populateGeneralFeedback();
    populateDisciplineInsights();
    populateRecommendations();

    // Initialize charts
    if (typeof initializeCharts === 'function') {
      initializeCharts();
    }

    // Set up filter functionality
    initFilters();
  }

  /**
   * Populate metadata bar
   */
  function populateMetadata() {
    const elements = {
      'metaDate': surveyData.metadata.generatedDate,
      'metaResponses': `${surveyData.metadata.totalResponses} responses`,
      'metaJobNo': surveyData.metadata.jobNumber,
      'demographicsTotal': `${surveyData.metadata.totalResponses} responses`
    };

    Object.entries(elements).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    });
  }

  /**
   * Populate executive summary
   */
  function populateExecutiveSummary() {
    const summary = surveyData.executiveSummary;
    const metrics = summary.keyMetrics;

    // Key metrics
    setMetricValue('metricTotal', metrics.totalResponses);
    setMetricValue('metricSatisfaction', metrics.overallSatisfaction.toFixed(2));
    setMetricValue('metricITSupport', `+${metrics.itSupportScore.toFixed(2)}`);
    setMetricValue('metricTraining', `+${metrics.trainingResourcesScore.toFixed(2)}`);

    // Highlights list
    const highlightsList = document.getElementById('highlightsList');
    if (highlightsList) {
      highlightsList.innerHTML = summary.highlights
        .map(h => `<li>${h}</li>`)
        .join('');
    }

    // Concerns list
    const concernsList = document.getElementById('concernsList');
    if (concernsList) {
      concernsList.innerHTML = summary.concerns
        .map(c => `<li>${c}</li>`)
        .join('');
    }

    // Top priorities
    const prioritiesList = document.getElementById('prioritiesList');
    if (prioritiesList) {
      prioritiesList.innerHTML = summary.topPriorities
        .map((p, i) => `<li><strong>${i + 1}.</strong> ${p}</li>`)
        .join('');
    }
  }

  /**
   * Populate demographics tables
   */
  function populateDemographics() {
    // Discipline table
    populateTable('disciplineTable', surveyData.demographics.byDiscipline, [
      { key: 'label', header: 'Discipline' },
      { key: 'count', header: 'Responses', class: 'data-table__cell--numeric' },
      { key: 'percentage', header: '%', class: 'data-table__cell--numeric', format: v => v.toFixed(1) + '%' }
    ]);

    // Role level table
    populateTable('roleLevelTable', surveyData.demographics.byRoleLevel, [
      { key: 'label', header: 'Role Level' },
      { key: 'count', header: 'Responses', class: 'data-table__cell--numeric' },
      { key: 'percentage', header: '%', class: 'data-table__cell--numeric', format: v => v.toFixed(1) + '%' }
    ]);

    // Office table
    populateTable('officeTable', surveyData.demographics.byOffice, [
      { key: 'label', header: 'Office' },
      { key: 'count', header: 'Responses', class: 'data-table__cell--numeric' },
      { key: 'percentage', header: '%', class: 'data-table__cell--numeric', format: v => v.toFixed(1) + '%' }
    ]);
  }

  /**
   * Populate software usage section
   */
  function populateSoftwareUsage() {
    const software = surveyData.softwareUsage.currentlyUsing;

    // Top software table
    populateTable('topSoftwareTable', software.slice(0, 20), [
      { key: 'softwareName', header: 'Software' },
      { key: 'userCount', header: 'Users', class: 'data-table__cell--numeric sortable' },
      { key: 'avgSatisfaction', header: 'Avg Satisfaction', class: 'data-table__cell--numeric', format: v => v.toFixed(2) },
      { key: 'avgFrequency', header: 'Avg Frequency', class: 'data-table__cell--numeric', format: v => v.toFixed(2) },
      { key: 'isOther', header: 'Type', format: v => v ? '<span class="status-badge status-badge--info">Custom</span>' : '<span class="status-badge status-badge--neutral">Standard</span>' }
    ]);

    // Low satisfaction software
    const lowSat = software.filter(s => s.avgSatisfaction < 3.5 && s.userCount >= 2);
    populateTable('lowSatisfactionTable', lowSat, [
      { key: 'softwareName', header: 'Software' },
      { key: 'userCount', header: 'Users', class: 'data-table__cell--numeric' },
      { key: 'avgSatisfaction', header: 'Satisfaction', class: 'data-table__cell--numeric', format: v => `<span class="text-danger">${v.toFixed(2)}</span>` }
    ]);

    // High satisfaction software
    const highSat = software.filter(s => s.avgSatisfaction >= 4.5 && s.userCount >= 2);
    populateTable('highSatisfactionTable', highSat, [
      { key: 'softwareName', header: 'Software' },
      { key: 'userCount', header: 'Users', class: 'data-table__cell--numeric' },
      { key: 'avgSatisfaction', header: 'Satisfaction', class: 'data-table__cell--numeric', format: v => `<span class="text-success">${v.toFixed(2)}</span>` }
    ]);
  }

  /**
   * Populate satisfaction analysis
   */
  function populateSatisfactionAnalysis() {
    const feedback = surveyData.generalFeedback;

    // Overall satisfaction
    setMetricValue('overallSatValue', feedback.overallSatisfaction.avg.toFixed(2));
    setMetricValue('satCount', `${feedback.overallSatisfaction.count} responses`);

    // Agreement scores
    setMetricValue('trainingScore', formatScore(feedback.trainingResources.netScore));
    setMetricValue('itSupportScore', formatScore(feedback.itSupport.netScore));
    setMetricValue('integrationScore', formatScore(feedback.softwareIntegration.netScore));
  }

  /**
   * Populate training needs section
   */
  function populateTrainingNeeds() {
    const software = surveyData.softwareUsage.currentlyUsing
      .filter(s => s.trainingNeedScore > 0)
      .sort((a, b) => b.trainingNeedScore - a.trainingNeedScore);

    populateTable('trainingNeedsTable', software.slice(0, 15), [
      { key: 'softwareName', header: 'Software' },
      { key: 'userCount', header: 'Users', class: 'data-table__cell--numeric' },
      { key: 'trainingNeedScore', header: 'Training Score', class: 'data-table__cell--numeric', format: v => {
        const color = v >= 10 ? 'danger' : v >= 5 ? 'warning' : 'neutral';
        return `<span class="status-badge status-badge--${color}">${v}</span>`;
      }},
      { key: 'trainingLevels', header: 'Need More Training', class: 'data-table__cell--numeric', format: levels => {
        const needMore = (levels['need-more'] || 0) + (levels['require-significant'] || 0);
        const total = Object.values(levels).reduce((a, b) => a + b, 0);
        return `${needMore}/${total} (${Math.round(needMore/total*100)}%)`;
      }}
    ]);
  }

  /**
   * Populate churn analysis
   */
  function populateChurnAnalysis() {
    const previously = surveyData.softwareUsage.previouslyUsed;

    populateTable('previouslyUsedTable', previously.slice(0, 15), [
      { key: 'softwareName', header: 'Software' },
      { key: 'count', header: 'Count', class: 'data-table__cell--numeric' },
      { key: 'stoppedReasons', header: 'Top Reason', format: reasons => {
        const top = Object.entries(reasons).sort((a, b) => b[1] - a[1])[0];
        if (!top) return '-';
        const labels = {
          'not-required': 'Not Required',
          'superseded': 'Superseded',
          'company-decision': 'Company Decision',
          'personal-preference': 'Personal Pref.',
          'other': 'Other'
        };
        return labels[top[0]] || top[0];
      }},
      { key: 'supersededBy', header: 'Replaced By', format: v => v.length > 0 ? v[0] : '-' }
    ]);
  }

  /**
   * Populate demand analysis
   */
  function populateDemandAnalysis() {
    const demand = surveyData.softwareUsage.wouldLikeToUse;

    populateTable('demandTable', demand.slice(0, 15), [
      { key: 'softwareName', header: 'Software' },
      { key: 'count', header: 'Requests', class: 'data-table__cell--numeric' },
      { key: 'avgBenefitScore', header: 'Benefit Score', class: 'data-table__cell--numeric', format: v => v.toFixed(2) },
      { key: 'byDiscipline', header: 'Disciplines', format: d => Object.keys(d).length }
    ]);

    // Interest quotes
    const interestQuotes = document.getElementById('interestQuotes');
    if (interestQuotes) {
      const quotes = demand
        .filter(d => d.interests && d.interests.length > 0)
        .slice(0, 5)
        .map(d => {
          const interest = d.interests[0];
          return `
            <div class="quote-block">
              <p class="quote-block__text">"${typeof interest === 'string' ? interest : interest.interest}"</p>
              <p class="quote-block__attribution">- Re: ${d.softwareName}</p>
            </div>
          `;
        })
        .join('');
      interestQuotes.innerHTML = quotes;
    }
  }

  /**
   * Populate custom entries section
   */
  function populateCustomEntries() {
    const custom = surveyData.customEntries;

    populateTable('customEntriesTable', custom, [
      { key: 'customName', header: 'Software' },
      { key: 'count', header: 'Mentions', class: 'data-table__cell--numeric' },
      { key: 'disciplines', header: 'Disciplines', format: d => d.join(', ') },
      { key: 'usageStatuses', header: 'Status', format: s => {
        const parts = [];
        if (s['currently-using']) parts.push(`<span class="status-badge status-badge--success">Using: ${s['currently-using']}</span>`);
        if (s['would-like-to-use']) parts.push(`<span class="status-badge status-badge--info">Want: ${s['would-like-to-use']}</span>`);
        if (s['used-previously']) parts.push(`<span class="status-badge status-badge--neutral">Previous: ${s['used-previously']}</span>`);
        return parts.join(' ');
      }}
    ]);

    // AI tools discovery insight
    const aiTools = custom.filter(c =>
      c.customName.toLowerCase().includes('gpt') ||
      c.customName.toLowerCase().includes('copilot') ||
      c.customName.toLowerCase().includes('claude') ||
      c.customName.toLowerCase().includes('midjourney') ||
      c.customName.toLowerCase().includes('grammarly')
    );

    const aiInsight = document.getElementById('aiToolsInsight');
    if (aiInsight && aiTools.length > 0) {
      aiInsight.innerHTML = `
        <div class="insight-box insight-box--highlight">
          <div class="insight-box__icon">🤖</div>
          <div class="insight-box__content">
            <strong>AI Tools Discovery</strong>
            Staff are using various AI tools beyond Gemini: ${aiTools.map(t => t.customName).join(', ')}.
            Consider developing an approved AI tools policy.
          </div>
        </div>
      `;
    }
  }

  /**
   * Populate general feedback section
   */
  function populateGeneralFeedback() {
    const feedback = surveyData.generalFeedback;

    // Improvement suggestions
    const suggestionsContainer = document.getElementById('improvementSuggestions');
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = feedback.improvementSuggestions
        .slice(0, 10)
        .map(s => `
          <div class="quote-block">
            <p class="quote-block__text">"${s.text}"</p>
            <p class="quote-block__attribution">- ${s.discipline}, ${s.role}</p>
          </div>
        `)
        .join('');
    }

    // Personal licenses
    const licensesContainer = document.getElementById('personalLicenses');
    if (licensesContainer) {
      const meaningful = feedback.personalLicenses.filter(l =>
        !l.text.toLowerCase().includes('no') &&
        !l.text.toLowerCase().includes('n/a') &&
        !l.text.toLowerCase().includes('none')
      );

      if (meaningful.length > 0) {
        licensesContainer.innerHTML = `
          <div class="insight-box insight-box--warning">
            <div class="insight-box__icon">💰</div>
            <div class="insight-box__content">
              <strong>Staff Paying Personally</strong>
              <ul>
                ${meaningful.map(l => `<li>${l.text} <em>(${l.discipline})</em></li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }
    }
  }

  /**
   * Populate discipline insights
   */
  function populateDisciplineInsights() {
    const container = document.getElementById('disciplineCards');
    if (!container) return;

    const cards = Object.entries(surveyData.byDiscipline)
      .filter(([, data]) => data.responseCount > 0)
      .sort((a, b) => b[1].responseCount - a[1].responseCount)
      .map(([key, data]) => `
        <div class="discipline-card">
          <div class="discipline-card__header">
            <h4 class="discipline-card__title">${data.label}</h4>
            <span class="discipline-card__count">${data.responseCount} responses</span>
          </div>
          <div class="discipline-card__body">
            <div class="discipline-card__metric">
              <span>Avg Satisfaction</span>
              <strong>${data.avgSatisfaction.toFixed(2)}/5</strong>
            </div>
            <div class="discipline-card__metric">
              <span>Top Software</span>
              <strong>${data.topSoftware[0]?.name || '-'}</strong>
            </div>
            ${data.trainingNeeds.length > 0 ? `
              <div class="discipline-card__metric">
                <span>Top Training Need</span>
                <strong>${data.trainingNeeds[0]?.name || '-'}</strong>
              </div>
            ` : ''}
            <p class="text-muted mt-md" style="font-size: 0.875rem;">${data.keyInsights}</p>
          </div>
        </div>
      `)
      .join('');

    container.innerHTML = cards;
  }

  /**
   * Populate recommendations
   */
  function populateRecommendations() {
    const recs = surveyData.insights.recommendations;

    // Immediate actions
    populateRecommendationsList('immediateActions', recs.immediate);

    // Short-term initiatives
    populateRecommendationsList('shortTermActions', recs.shortTerm);

    // Long-term strategy
    populateRecommendationsList('longTermActions', recs.longTerm);

    // Red flags
    const redFlagsContainer = document.getElementById('redFlags');
    if (redFlagsContainer) {
      redFlagsContainer.innerHTML = surveyData.insights.redFlags
        .map(r => `
          <div class="insight-box insight-box--${r.priority === 'Critical' ? 'danger' : 'warning'}">
            <div class="insight-box__priority">[${r.priority.toUpperCase()}]</div>
            <div class="insight-box__content">
              <strong>${r.software}</strong>
              <p>${r.issue}</p>
            </div>
          </div>
        `)
        .join('');
    }

    // Success stories
    const successContainer = document.getElementById('successStories');
    if (successContainer) {
      successContainer.innerHTML = surveyData.insights.successStories
        .map(s => `
          <div class="insight-box insight-box--success">
            <div class="insight-box__content">
              <strong>${s.software}</strong>
              <p>${s.metric}</p>
              <p class="text-muted">${s.insight}</p>
            </div>
          </div>
        `)
        .join('');
    }
  }

  /**
   * Populate a recommendations list
   */
  function populateRecommendationsList(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = items
      .map(item => `
        <div class="insight-box insight-box--recommendation">
          <div class="insight-box__priority">[${item.priority.toUpperCase()}]</div>
          <div class="insight-box__content">
            <strong>${item.action}</strong>
            <p>${item.detail}</p>
          </div>
        </div>
      `)
      .join('');
  }

  /**
   * Initialize filter functionality
   */
  function initFilters() {
    const disciplineFilter = document.getElementById('disciplineFilter');
    if (!disciplineFilter) return;

    // Populate options
    disciplineFilter.innerHTML = `
      <option value="all">All Disciplines</option>
      ${surveyData.demographics.byDiscipline.map(d => `
        <option value="${d.key}">${d.label}</option>
      `).join('')}
    `;

    disciplineFilter.addEventListener('change', (e) => {
      const value = e.target.value;
      filterByDiscipline(value);
    });
  }

  /**
   * Filter content by discipline
   */
  function filterByDiscipline(discipline) {
    // This would filter various tables and charts
    // For now, just update charts if they support filtering
    console.log('Filtering by discipline:', discipline);
  }

  // ============================================
  // Helper Functions
  // ============================================

  /**
   * Populate a data table
   */
  function populateTable(tableId, data, columns) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // Create header if not exists
    if (!thead.innerHTML) {
      thead.innerHTML = `
        <tr>
          ${columns.map(c => `<th class="${c.class || ''}">${c.header}</th>`).join('')}
        </tr>
      `;
    }

    // Populate body
    tbody.innerHTML = data.map(row => `
      <tr>
        ${columns.map(c => {
          let value = row[c.key];
          if (c.format) value = c.format(value);
          return `<td class="${c.class || ''}">${value}</td>`;
        }).join('')}
      </tr>
    `).join('');
  }

  /**
   * Set metric value in element
   */
  function setMetricValue(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = value;
  }

  /**
   * Format score with color
   */
  function formatScore(score) {
    const formatted = (score >= 0 ? '+' : '') + score.toFixed(2);
    return formatted;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }

  // Export for testing
  if (typeof window !== 'undefined') {
    window.dashboardApp = {
      initDashboard,
      filterByDiscipline
    };
  }
})();
