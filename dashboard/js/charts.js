/**
 * Bailey Partnership Software Survey - Chart Rendering
 * Uses Chart.js for all visualizations
 */

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
        font: {
          family: "'Inter', sans-serif",
          size: 11
        }
      }
    },
    title: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(20, 54, 68, 0.95)',
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

// Set Chart.js defaults
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#666666';

/**
 * Create discipline distribution pie chart
 */
function createDisciplineChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const data = surveyData.demographics.byDiscipline;

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        data: data.map(d => d.count),
        backgroundColor: chartColors.palette,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      ...chartDefaults,
      cutout: '50%',
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          position: 'right',
          labels: {
            padding: 15,
            usePointStyle: true,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/**
 * Create role level bar chart
 */
function createRoleLevelChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const data = surveyData.demographics.byRoleLevel;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.label.split(' ')[0]),
      datasets: [{
        label: 'Respondents',
        data: data.map(d => d.count),
        backgroundColor: chartColors.primary,
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { display: false },
          ticks: { stepSize: 10 }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * Create office distribution bar chart
 */
function createOfficeChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const data = surveyData.demographics.byOffice;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.label),
      datasets: [{
        label: 'Respondents',
        data: data.map(d => d.count),
        backgroundColor: chartColors.secondary,
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: '#e5e5e5' }
        }
      }
    }
  });
}

/**
 * Create top software usage horizontal bar chart
 */
function createTopSoftwareChart(canvasId, limit = 15) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const data = surveyData.softwareUsage.currentlyUsing
    .slice(0, limit)
    .reverse();

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => truncateLabel(d.softwareName, 30)),
      datasets: [{
        label: 'Users',
        data: data.map(d => d.userCount),
        backgroundColor: data.map(d => d.isOther ? chartColors.accent : chartColors.primary),
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            title: (items) => {
              const idx = data.length - 1 - items[0].dataIndex;
              return surveyData.softwareUsage.currentlyUsing[idx].softwareName;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: '#e5e5e5' },
          title: {
            display: true,
            text: 'Number of Users'
          }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * Create satisfaction distribution chart
 */
function createSatisfactionDistributionChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const dist = surveyData.generalFeedback.overallSatisfaction.distribution;
  const labels = ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'];
  const colors = [chartColors.danger, '#f97316', chartColors.warning, '#84cc16', chartColors.success];

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Responses',
        data: [dist[1] || 0, dist[2] || 0, dist[3] || 0, dist[4] || 0, dist[5] || 0],
        backgroundColor: colors,
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          grid: { color: '#e5e5e5' },
          title: {
            display: true,
            text: 'Number of Responses'
          }
        }
      }
    }
  });
}

/**
 * Create software satisfaction scatter plot
 */
function createSatisfactionScatterChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const data = surveyData.softwareUsage.currentlyUsing
    .filter(d => d.userCount >= 3)
    .map(d => ({
      x: d.avgFrequency,
      y: d.avgSatisfaction,
      name: d.softwareName,
      users: d.userCount
    }));

  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Software',
        data: data,
        backgroundColor: data.map(d => {
          if (d.y < 3) return chartColors.danger;
          if (d.y < 4) return chartColors.warning;
          return chartColors.success;
        }),
        pointRadius: data.map(d => Math.max(5, Math.min(15, d.users / 3))),
        pointHoverRadius: data.map(d => Math.max(7, Math.min(18, d.users / 3 + 2)))
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const point = data[context.dataIndex];
              return [
                point.name,
                `Satisfaction: ${point.y.toFixed(2)}`,
                `Frequency: ${point.x.toFixed(2)}`,
                `Users: ${point.users}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          min: 1,
          max: 5,
          title: {
            display: true,
            text: 'Usage Frequency (1=Rare, 5=Daily)'
          },
          grid: { color: '#e5e5e5' }
        },
        y: {
          min: 1,
          max: 5,
          title: {
            display: true,
            text: 'Satisfaction (1-5)'
          },
          grid: { color: '#e5e5e5' }
        }
      }
    }
  });
}

/**
 * Create training needs bar chart
 */
function createTrainingNeedsChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const data = surveyData.softwareUsage.currentlyUsing
    .filter(d => d.trainingNeedScore > 0)
    .sort((a, b) => b.trainingNeedScore - a.trainingNeedScore)
    .slice(0, 10)
    .reverse();

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => truncateLabel(d.softwareName, 25)),
      datasets: [{
        label: 'Training Need Score',
        data: data.map(d => d.trainingNeedScore),
        backgroundColor: data.map(d => {
          const score = d.trainingNeedScore;
          if (score >= 10) return chartColors.danger;
          if (score >= 5) return chartColors.warning;
          return chartColors.primary;
        }),
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: '#e5e5e5' },
          title: {
            display: true,
            text: 'Training Need Score'
          }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * Create general feedback stacked bar chart
 */
function createFeedbackStackedChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const categories = ['Training Resources', 'IT Support', 'Software Integration'];
  const distributions = [
    surveyData.generalFeedback.trainingResources.distribution,
    surveyData.generalFeedback.itSupport.distribution,
    surveyData.generalFeedback.softwareIntegration.distribution
  ];

  const getPercentage = (dist, key) => {
    const total = Object.values(dist).reduce((a, b) => a + b, 0);
    return ((dist[key] || 0) / total * 100).toFixed(1);
  };

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Strongly Disagree',
          data: distributions.map(d => getPercentage(d, 'Strongly Disagree')),
          backgroundColor: chartColors.danger
        },
        {
          label: 'Disagree',
          data: distributions.map(d => getPercentage(d, 'Disagree')),
          backgroundColor: '#f97316'
        },
        {
          label: 'Neutral',
          data: distributions.map(d => getPercentage(d, 'Neutral')),
          backgroundColor: chartColors.neutral
        },
        {
          label: 'Agree',
          data: distributions.map(d => getPercentage(d, 'Agree')),
          backgroundColor: '#84cc16'
        },
        {
          label: 'Strongly Agree',
          data: distributions.map(d => getPercentage(d, 'Strongly Agree')),
          backgroundColor: chartColors.success
        }
      ]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.raw}%`
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          max: 100,
          grid: { display: false },
          ticks: {
            callback: (value) => value + '%'
          }
        },
        y: {
          stacked: true,
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * Create software demand chart
 */
function createDemandChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const data = surveyData.softwareUsage.wouldLikeToUse
    .slice(0, 12)
    .reverse();

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => truncateLabel(d.softwareName, 25)),
      datasets: [{
        label: 'Requests',
        data: data.map(d => d.count),
        backgroundColor: chartColors.accent,
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: '#e5e5e5' },
          title: {
            display: true,
            text: 'Number of Requests'
          }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * Create previously used reasons chart
 */
function createStoppedReasonsChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  // Aggregate reasons across all previously used software
  const reasons = {};
  surveyData.softwareUsage.previouslyUsed.forEach(sw => {
    Object.entries(sw.stoppedReasons).forEach(([reason, count]) => {
      reasons[reason] = (reasons[reason] || 0) + count;
    });
  });

  const labels = {
    'not-required': 'Not Required for Role',
    'superseded': 'Superseded by Better Software',
    'company-decision': 'Company Decision',
    'personal-preference': 'Personal Preference',
    'other': 'Other',
    'discontinued': 'Software Discontinued'
  };

  const sortedReasons = Object.entries(reasons)
    .sort((a, b) => b[1] - a[1]);

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sortedReasons.map(([key]) => labels[key] || key),
      datasets: [{
        data: sortedReasons.map(([, value]) => value),
        backgroundColor: chartColors.palette,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      ...chartDefaults,
      cutout: '40%',
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          position: 'right',
          labels: { padding: 15, font: { size: 11 } }
        }
      }
    }
  });
}

/**
 * Create discipline satisfaction comparison
 */
function createDisciplineSatisfactionChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const disciplines = Object.entries(surveyData.byDiscipline)
    .map(([key, value]) => ({
      label: value.label,
      satisfaction: value.avgSatisfaction,
      count: value.responseCount
    }))
    .filter(d => d.count > 0)
    .sort((a, b) => b.satisfaction - a.satisfaction);

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: disciplines.map(d => truncateLabel(d.label, 20)),
      datasets: [{
        label: 'Avg Satisfaction',
        data: disciplines.map(d => d.satisfaction),
        backgroundColor: disciplines.map(d => {
          if (d.satisfaction >= 4.2) return chartColors.success;
          if (d.satisfaction >= 3.8) return chartColors.primary;
          return chartColors.warning;
        }),
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxRotation: 45, minRotation: 45 }
        },
        y: {
          min: 3,
          max: 5,
          grid: { color: '#e5e5e5' },
          title: {
            display: true,
            text: 'Avg Satisfaction (1-5)'
          }
        }
      }
    }
  });
}

// Utility function to truncate long labels
function truncateLabel(label, maxLength) {
  if (label.length <= maxLength) return label;
  return label.substring(0, maxLength - 3) + '...';
}

/**
 * Initialize all charts on page load
 */
function initializeCharts() {
  // Demographics charts
  createDisciplineChart('disciplineChart');
  createRoleLevelChart('roleLevelChart');
  createOfficeChart('officeChart');

  // Software usage charts
  createTopSoftwareChart('topSoftwareChart');
  createSatisfactionDistributionChart('satisfactionDistChart');
  createSatisfactionScatterChart('satisfactionScatterChart');
  createTrainingNeedsChart('trainingNeedsChart');

  // Feedback charts
  createFeedbackStackedChart('feedbackStackedChart');

  // Demand and churn charts
  createDemandChart('demandChart');
  createStoppedReasonsChart('stoppedReasonsChart');

  // Discipline comparison
  createDisciplineSatisfactionChart('disciplineSatisfactionChart');
}

// Export for use
if (typeof window !== 'undefined') {
  window.initializeCharts = initializeCharts;
  window.chartColors = chartColors;
}
