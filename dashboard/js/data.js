/**
 * Bailey Partnership Software Survey - Processed Data
 * Generated: 2026-01-27
 * Survey Period: January 2026
 */

const surveyData = {
  metadata: {
    totalResponses: 69,
    generatedDate: '2026-01-27',
    surveyPeriod: 'January 2026',
    jobNumber: 'IIET-2026-001',
    status: 'Final'
  },

  demographics: {
    total: 69,
    byDiscipline: [
      { key: 'architecture', label: 'Architecture', count: 20, percentage: 29.0 },
      { key: 'building-surveying', label: 'Building Surveying', count: 15, percentage: 21.7 },
      { key: 'project-management', label: 'Project Management', count: 8, percentage: 11.6 },
      { key: 'structural-civil-engineering', label: 'Structural and Civil Engineering', count: 7, percentage: 10.1 },
      { key: 'building-services-engineering', label: 'Building Services Engineering', count: 5, percentage: 7.2 },
      { key: 'quantity-surveying', label: 'Quantity Surveying', count: 4, percentage: 5.8 },
      { key: 'admin-support', label: 'Admin/Support', count: 4, percentage: 5.8 },
      { key: 'fire-engineering', label: 'Fire Engineering', count: 3, percentage: 4.3 },
      { key: 'town-planning', label: 'Town Planning', count: 2, percentage: 2.9 },
      { key: 'interior-design', label: 'Interior Design', count: 1, percentage: 1.4 }
    ],
    byRoleLevel: [
      { key: 'general', label: 'General (Architect / PM / Engineer / etc.)', count: 38, percentage: 55.1 },
      { key: 'graduate-apprentice', label: 'Graduate/Apprentice', count: 14, percentage: 20.3 },
      { key: 'senior-associate', label: 'Senior Associate / Associate', count: 10, percentage: 14.5 },
      { key: 'executive-director', label: 'Executive Director / Director', count: 6, percentage: 8.7 },
      { key: 'intern-trainee', label: 'Intern/Trainees', count: 1, percentage: 1.4 }
    ],
    byOffice: [
      { key: 'plymouth', label: 'Plymouth', count: 20, percentage: 29.0 },
      { key: 'maidstone', label: 'Maidstone', count: 14, percentage: 20.3 },
      { key: 'exeter', label: 'Exeter', count: 13, percentage: 18.8 },
      { key: 'bristol', label: 'Bristol', count: 8, percentage: 11.6 },
      { key: 'chichester', label: 'Chichester', count: 5, percentage: 7.2 },
      { key: 'manchester', label: 'Manchester', count: 4, percentage: 5.8 },
      { key: 'gibraltar', label: 'Gibraltar', count: 3, percentage: 4.3 },
      { key: 'edinburgh', label: 'Edinburgh', count: 1, percentage: 1.4 },
      { key: 'bury-st-edmunds', label: 'Bury St. Edmunds', count: 1, percentage: 1.4 }
    ]
  },

  softwareUsage: {
    currentlyUsing: [
      { softwareName: 'Google Workspace (Docs, Sheets, Slides)', userCount: 68, avgSatisfaction: 4.19, avgFrequency: 4.9, trainingNeedScore: 5, trainingLevels: { 'need-more': 3, 'somewhat-confident': 37, 'require-significant': 1, 'very-confident': 27 }, byDiscipline: { 'architecture': 20, 'project-management': 8, 'fire-engineering': 3, 'building-surveying': 14, 'quantity-surveying': 4, 'building-services-engineering': 5, 'interior-design': 1, 'structural-civil-engineering': 7, 'admin-support': 4, 'town-planning': 2 }, isOther: false },
      { softwareName: 'Gemini/Notebook LM', userCount: 57, avgSatisfaction: 4.12, avgFrequency: 3.68, trainingNeedScore: 16, trainingLevels: { 'need-more': 16, 'somewhat-confident': 30, 'very-confident': 11 }, byDiscipline: { 'architecture': 17, 'project-management': 8, 'building-surveying': 12, 'quantity-surveying': 4, 'building-services-engineering': 4, 'interior-design': 1, 'structural-civil-engineering': 5, 'fire-engineering': 1, 'admin-support': 3, 'town-planning': 2 }, isOther: false },
      { softwareName: 'Autodesk Construction Cloud (ACC/BIM 360)', userCount: 40, avgSatisfaction: 3.9, avgFrequency: 4.4, trainingNeedScore: 11, trainingLevels: { 'somewhat-confident': 22, 'need-more': 11, 'very-confident': 7 }, byDiscipline: { 'project-management': 7, 'architecture': 19, 'quantity-surveying': 2, 'building-services-engineering': 5, 'structural-civil-engineering': 7 }, isOther: false },
      { softwareName: 'AutoCAD', userCount: 33, avgSatisfaction: 3.97, avgFrequency: 3.18, trainingNeedScore: 9, trainingLevels: { 'somewhat-confident': 15, 'require-significant': 2, 'very-confident': 11, 'need-more': 5 }, byDiscipline: { 'building-surveying': 12, 'architecture': 15, 'interior-design': 1, 'structural-civil-engineering': 5 }, isOther: false },
      { softwareName: 'NBS Chorus', userCount: 33, avgSatisfaction: 3.76, avgFrequency: 2.52, trainingNeedScore: 11, trainingLevels: { 'somewhat-confident': 19, 'require-significant': 2, 'need-more': 7, 'very-confident': 5 }, byDiscipline: { 'building-surveying': 8, 'quantity-surveying': 4, 'building-services-engineering': 3, 'interior-design': 1, 'architecture': 16, 'structural-civil-engineering': 1 }, isOther: false },
      { softwareName: 'Autodesk Construction Cloud (ACC)', userCount: 17, avgSatisfaction: 2.82, avgFrequency: 3.47, trainingNeedScore: 12, trainingLevels: { 'somewhat-confident': 4, 'need-more': 12, 'very-confident': 1 }, byDiscipline: { 'building-surveying': 10, 'quantity-surveying': 3, 'interior-design': 1, 'fire-engineering': 1, 'town-planning': 2 }, isOther: false },
      { softwareName: 'Autodesk Revit', userCount: 17, avgSatisfaction: 4.12, avgFrequency: 4.59, trainingNeedScore: 2, trainingLevels: { 'somewhat-confident': 10, 'need-more': 2, 'very-confident': 5 }, byDiscipline: { 'architecture': 17 }, isOther: false },
      { softwareName: 'OnlyOffice', userCount: 14, avgSatisfaction: 3.79, avgFrequency: 3.36, trainingNeedScore: 0, trainingLevels: { 'somewhat-confident': 10, 'very-confident': 4 }, byDiscipline: { 'building-surveying': 2, 'structural-civil-engineering': 4, 'architecture': 5, 'project-management': 2, 'admin-support': 1 }, isOther: false },
      { softwareName: 'DocuSign', userCount: 10, avgSatisfaction: 3.7, avgFrequency: 2.1, trainingNeedScore: 3, trainingLevels: { 'somewhat-confident': 5, 'very-confident': 3, 'need-more': 1, 'require-significant': 1 }, byDiscipline: { 'building-surveying': 6, 'quantity-surveying': 4 }, isOther: false },
      { softwareName: 'JCT Contracts (JCT On Demand)', userCount: 9, avgSatisfaction: 4.22, avgFrequency: 1.89, trainingNeedScore: 3, trainingLevels: { 'need-more': 3, 'somewhat-confident': 4, 'very-confident': 2 }, byDiscipline: { 'building-surveying': 9 }, isOther: false },
      { softwareName: 'Bluebeam Revu', userCount: 8, avgSatisfaction: 4.25, avgFrequency: 4.12, trainingNeedScore: 4, trainingLevels: { 'somewhat-confident': 3, 'require-significant': 1, 'very-confident': 2, 'need-more': 2 }, byDiscipline: { 'building-services-engineering': 2, 'fire-engineering': 2, 'structural-civil-engineering': 3, 'architecture': 1 }, isOther: false },
      { softwareName: 'pyRevit', userCount: 8, avgSatisfaction: 3.5, avgFrequency: 2.62, trainingNeedScore: 8, trainingLevels: { 'need-more': 6, 'very-confident': 1, 'require-significant': 1 }, byDiscipline: { 'interior-design': 1, 'architecture': 7 }, isOther: false },
      { softwareName: 'Affinity Suite', userCount: 7, avgSatisfaction: 2.57, avgFrequency: 2.14, trainingNeedScore: 3, trainingLevels: { 'somewhat-confident': 4, 'need-more': 3 }, byDiscipline: { 'architecture': 6, 'interior-design': 1 }, isOther: false },
      { softwareName: 'Gantter', userCount: 6, avgSatisfaction: 3.5, avgFrequency: 2.67, trainingNeedScore: 1, trainingLevels: { 'need-more': 1, 'somewhat-confident': 4, 'very-confident': 1 }, byDiscipline: { 'building-surveying': 3, 'project-management': 3 }, isOther: false },
      { softwareName: 'Enscape', userCount: 5, avgSatisfaction: 4.6, avgFrequency: 2.0, trainingNeedScore: 0, trainingLevels: { 'somewhat-confident': 5 }, byDiscipline: { 'architecture': 5 }, isOther: false },
      { softwareName: 'Twinmotion', userCount: 5, avgSatisfaction: 4.2, avgFrequency: 1.4, trainingNeedScore: 2, trainingLevels: { 'need-more': 2, 'somewhat-confident': 2, 'very-confident': 1 }, byDiscipline: { 'interior-design': 1, 'architecture': 4 }, isOther: false },
      { softwareName: 'Microsoft Project', userCount: 4, avgSatisfaction: 4.0, avgFrequency: 4.0, trainingNeedScore: 1, trainingLevels: { 'somewhat-confident': 3, 'need-more': 1 }, byDiscipline: { 'project-management': 4 }, isOther: false },
      { softwareName: 'Revit MEP', userCount: 4, avgSatisfaction: 4.0, avgFrequency: 4.5, trainingNeedScore: 2, trainingLevels: { 'somewhat-confident': 1, 'very-confident': 1, 'need-more': 2 }, byDiscipline: { 'building-services-engineering': 4 }, isOther: false },
      { softwareName: 'AutoCAD MEP', userCount: 4, avgSatisfaction: 4.0, avgFrequency: 4.75, trainingNeedScore: 0, trainingLevels: { 'somewhat-confident': 3, 'very-confident': 1 }, byDiscipline: { 'building-services-engineering': 4 }, isOther: false },
      { softwareName: 'Google Meet', userCount: 4, avgSatisfaction: 4.0, avgFrequency: 4.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 3, 'somewhat-confident': 1 }, byDiscipline: { 'admin-support': 4 }, isOther: false },
      { softwareName: 'Google Drive', userCount: 4, avgSatisfaction: 4.5, avgFrequency: 5.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 3, 'somewhat-confident': 1 }, byDiscipline: { 'admin-support': 4 }, isOther: false },
      { softwareName: 'BambooHR', userCount: 4, avgSatisfaction: 4.0, avgFrequency: 3.75, trainingNeedScore: 1, trainingLevels: { 'very-confident': 2, 'somewhat-confident': 1, 'need-more': 1 }, byDiscipline: { 'admin-support': 4 }, isOther: false },
      { softwareName: 'SketchUp Pro', userCount: 3, avgSatisfaction: 5.0, avgFrequency: 3.0, trainingNeedScore: 0, trainingLevels: { 'somewhat-confident': 2, 'very-confident': 1 }, byDiscipline: { 'architecture': 2, 'interior-design': 1 }, isOther: false },
      { softwareName: 'Kreo', userCount: 4, avgSatisfaction: 4.25, avgFrequency: 4.0, trainingNeedScore: 0, trainingLevels: { 'somewhat-confident': 3, 'very-confident': 1 }, byDiscipline: { 'quantity-surveying': 4 }, isOther: true },
      { softwareName: 'Tedds', userCount: 3, avgSatisfaction: 4.67, avgFrequency: 3.33, trainingNeedScore: 0, trainingLevels: { 'very-confident': 2, 'somewhat-confident': 1 }, byDiscipline: { 'structural-civil-engineering': 3 }, isOther: false },
      { softwareName: 'Revit Structure', userCount: 3, avgSatisfaction: 4.67, avgFrequency: 4.67, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1, 'somewhat-confident': 2 }, byDiscipline: { 'structural-civil-engineering': 3 }, isOther: false },
      { softwareName: 'Autodesk Fabrication', userCount: 2, avgSatisfaction: 2.0, avgFrequency: 1.5, trainingNeedScore: 3, trainingLevels: { 'require-significant': 1, 'need-more': 1 }, byDiscipline: { 'building-services-engineering': 2 }, isOther: false },
      { softwareName: 'Dialux (lighting)', userCount: 2, avgSatisfaction: 3.5, avgFrequency: 3.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1, 'somewhat-confident': 1 }, byDiscipline: { 'building-services-engineering': 2 }, isOther: false },
      { softwareName: 'ElectricalOM (BS 7671)', userCount: 2, avgSatisfaction: 3.5, avgFrequency: 2.0, trainingNeedScore: 3, trainingLevels: { 'require-significant': 1, 'need-more': 1 }, byDiscipline: { 'building-services-engineering': 2 }, isOther: false },
      { softwareName: 'Tekla Structural Designer', userCount: 2, avgSatisfaction: 4.5, avgFrequency: 4.5, trainingNeedScore: 0, trainingLevels: { 'very-confident': 2 }, byDiscipline: { 'structural-civil-engineering': 2 }, isOther: false },
      { softwareName: 'Copilot', userCount: 2, avgSatisfaction: 4.0, avgFrequency: 4.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1, 'somewhat-confident': 1 }, byDiscipline: { 'structural-civil-engineering': 1, 'project-management': 1 }, isOther: true },
      { softwareName: 'Viewpoint', userCount: 2, avgSatisfaction: 2.0, avgFrequency: 4.0, trainingNeedScore: 1, trainingLevels: { 'need-more': 1, 'somewhat-confident': 1 }, byDiscipline: { 'project-management': 2 }, isOther: false },
      { softwareName: '4Projects', userCount: 2, avgSatisfaction: 1.5, avgFrequency: 3.5, trainingNeedScore: 2, trainingLevels: { 'need-more': 2 }, byDiscipline: { 'project-management': 2 }, isOther: false },
      { softwareName: 'LibreOffice', userCount: 3, avgSatisfaction: 4.67, avgFrequency: 2.67, trainingNeedScore: 0, trainingLevels: { 'very-confident': 2, 'somewhat-confident': 1 }, byDiscipline: { 'architecture': 1, 'structural-civil-engineering': 1, 'building-services-engineering': 1 }, isOther: true },
      { softwareName: 'Magic Maps', userCount: 2, avgSatisfaction: 4.0, avgFrequency: 4.5, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1, 'somewhat-confident': 1 }, byDiscipline: { 'town-planning': 2 }, isOther: false },
      { softwareName: 'Rhino 3D', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 5.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1 }, byDiscipline: { 'architecture': 1 }, isOther: true },
      { softwareName: 'Grasshopper', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 3.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1 }, byDiscipline: { 'architecture': 1 }, isOther: true },
      { softwareName: 'Claude', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 5.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1 }, byDiscipline: { 'architecture': 1 }, isOther: true },
      { softwareName: 'ChatGPT', userCount: 2, avgSatisfaction: 5.0, avgFrequency: 4.5, trainingNeedScore: 0, trainingLevels: { 'very-confident': 2 }, byDiscipline: { 'structural-civil-engineering': 1, 'admin-support': 1 }, isOther: true },
      { softwareName: 'Grammarly', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 5.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1 }, byDiscipline: { 'quantity-surveying': 1 }, isOther: true },
      { softwareName: 'Appsheet', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 3.0, trainingNeedScore: 0, trainingLevels: { 'somewhat-confident': 1 }, byDiscipline: { 'building-surveying': 1 }, isOther: true },
      { softwareName: 'Adobe Suite (InDesign, Photoshop, Illustrator)', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 4.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1 }, byDiscipline: { 'admin-support': 1 }, isOther: true },
      { softwareName: 'WorkflowMax', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 5.0, trainingNeedScore: 0, trainingLevels: { 'somewhat-confident': 1 }, byDiscipline: { 'admin-support': 1 }, isOther: true },
      { softwareName: 'Midjourney', userCount: 1, avgSatisfaction: 4.0, avgFrequency: 2.0, trainingNeedScore: 1, trainingLevels: { 'need-more': 1 }, byDiscipline: { 'architecture': 1 }, isOther: true },
      { softwareName: 'Artlantis', userCount: 1, avgSatisfaction: 5.0, avgFrequency: 2.0, trainingNeedScore: 0, trainingLevels: { 'very-confident': 1 }, byDiscipline: { 'architecture': 1 }, isOther: true }
    ],
    previouslyUsed: [
      { softwareName: 'SketchUp Pro', count: 9, usedWhere: { 'bailey-partnership': 3, 'previous-employer': 4, 'personal-capacity': 5 }, stoppedReasons: { 'personal-preference': 2, 'superseded': 3, 'not-required': 6, 'other': 1 }, supersededBy: ['Revit and Rhino', 'Revit/Enscape', 'Revit'], byDiscipline: { 'architecture': 9 } },
      { softwareName: 'AutoCAD', count: 8, usedWhere: { 'bailey-partnership': 6, 'previous-employer': 4, 'personal-capacity': 1 }, stoppedReasons: { 'not-required': 5, 'superseded': 2, 'personal-preference': 1 }, supersededBy: ['Revit', 'AutoCAD replaced by Revit'], byDiscipline: { 'fire-engineering': 1, 'structural-civil-engineering': 1, 'architecture': 4, 'building-surveying': 2 } },
      { softwareName: 'Autodesk Forma', count: 8, usedWhere: { 'bailey-partnership': 8 }, stoppedReasons: { 'superseded': 1, 'other': 6, 'not-required': 2, 'personal-preference': 1 }, supersededBy: ['Found that Rhino was better for early analysis using Ladybug.'], byDiscipline: { 'architecture': 8 } },
      { softwareName: 'Bluebeam Revu', count: 7, usedWhere: { 'previous-employer': 6, 'bailey-partnership': 1 }, stoppedReasons: { 'not-required': 2, 'company-decision': 3, 'other': 2 }, supersededBy: [], byDiscipline: { 'project-management': 3, 'architecture': 3, 'building-services-engineering': 1 } },
      { softwareName: 'NBS Chorus', count: 5, usedWhere: { 'previous-employer': 2, 'bailey-partnership': 3 }, stoppedReasons: { 'company-decision': 1, 'not-required': 4 }, supersededBy: [], byDiscipline: { 'architecture': 2, 'building-surveying': 3 } },
      { softwareName: 'Gantter', count: 4, usedWhere: { 'bailey-partnership': 4 }, stoppedReasons: { 'personal-preference': 3, 'superseded': 2 }, supersededBy: ['MS Project', 'Microsoft Project'], byDiscipline: { 'project-management': 2, 'building-surveying': 2 } },
      { softwareName: 'Enscape', count: 4, usedWhere: { 'previous-employer': 2, 'personal-capacity': 1, 'bailey-partnership': 2 }, stoppedReasons: { 'other': 1, 'company-decision': 3, 'not-required': 1 }, supersededBy: [], byDiscipline: { 'interior-design': 1, 'architecture': 3 } },
      { softwareName: 'OnlyOffice', count: 4, usedWhere: { 'bailey-partnership': 3, 'previous-employer': 1 }, stoppedReasons: { 'superseded': 3, 'discontinued': 1 }, supersededBy: ['Google Workspace and LibreOffice', 'Google suite'], byDiscipline: { 'quantity-surveying': 1, 'architecture': 2, 'project-management': 1 } },
      { softwareName: 'Dynamo (Revit)', count: 3, usedWhere: { 'bailey-partnership': 2, 'personal-capacity': 1 }, stoppedReasons: { 'superseded': 1, 'personal-preference': 1, 'other': 1 }, supersededBy: ['Grasshopper'], byDiscipline: { 'architecture': 3 } },
      { softwareName: 'Microsoft Project', count: 3, usedWhere: { 'bailey-partnership': 1, 'previous-employer': 3 }, stoppedReasons: { 'not-required': 1, 'personal-preference': 1, 'other': 1, 'company-decision': 1 }, supersededBy: [], byDiscipline: { 'project-management': 3 } }
    ],
    wouldLikeToUse: [
      { softwareName: 'Twinmotion', count: 7, avgBenefitScore: 1.0, benefits: { 'unsure': 2, 'slight': 3, 'moderate': 2 }, byDiscipline: { 'architecture': 7 }, interests: ['Visualisations for clients are being requested more frequently', 'expand skill set', 'It can be quite efficient and works better for material selection', 'May offer alternative rendering methods to Artlantis'] },
      { softwareName: 'Bluebeam Revu', count: 6, avgBenefitScore: 1.33, benefits: { 'significant': 1, 'moderate': 2, 'slight': 1, 'unsure': 2 }, byDiscipline: { 'fire-engineering': 1, 'quantity-surveying': 1, 'building-services-engineering': 1, 'architecture': 1, 'admin-support': 2 }, interests: ['Easy viewing of drawings', 'efficient and well designed bit of take off software', 'improve my ability to make sketches and markups'] },
      { softwareName: 'Enscape', count: 5, avgBenefitScore: 1.8, benefits: { 'significant': 1, 'slight': 2, 'moderate': 2 }, byDiscipline: { 'interior-design': 1, 'architecture': 4 }, interests: ['Quick visualisations', 'expand skill set', 'Would be useful to communicate coordination to site teams'] },
      { softwareName: 'Snag R', count: 5, avgBenefitScore: 2.2, benefits: { 'moderate': 4, 'significant': 1 }, byDiscipline: { 'building-surveying': 5 }, interests: ['Would make site inspections quicker with notetaking digitally', 'Would allow us to link/number each snag with a photo', 'Improved tracking and record management'] },
      { softwareName: 'Autodesk Forma', count: 5, avgBenefitScore: 0.4, benefits: { 'unsure': 3, 'slight': 2 }, byDiscipline: { 'architecture': 5 }, interests: ['To see how it would benefit my workflow', 'Early site formations/massing and site assessments', 'time-saving implications for early stage design'] },
      { softwareName: 'BuildDesk U (U-Value/Thermal)', count: 5, avgBenefitScore: 2.0, benefits: { 'significant': 2, 'moderate': 1, 'slight': 2 }, byDiscipline: { 'architecture': 5 }, interests: ['To be able to make technical thermal decisions independently', 'streamlines workflow by showing instantly how different material choices affect wall depth', 'early stage u-value analysis'] },
      { softwareName: 'Leica Cyclone', count: 4, avgBenefitScore: 0.75, benefits: { 'moderate': 1, 'unsure': 2, 'slight': 1 }, byDiscipline: { 'building-surveying': 4 }, interests: ['Would work with Recap for point cloud processing', 'I think it could be useful for building surveys'] },
      { softwareName: 'Dynamo (Revit)', count: 4, avgBenefitScore: 1.5, benefits: { 'slight': 2, 'moderate': 2 }, byDiscipline: { 'architecture': 4 }, interests: ['Time saving and advanced modeling benefits', 'Could improve workflows + allow for more interesting designs'] },
      { softwareName: 'DocuSign', count: 4, avgBenefitScore: 1.0, benefits: { 'unsure': 2, 'moderate': 2 }, byDiscipline: { 'admin-support': 2, 'building-surveying': 2 }, interests: ['Would make contract signing quicker and more efficient', 'To improve efficiency'] },
      { softwareName: 'Revit (Building Surveying)', count: 3, avgBenefitScore: 1.67, benefits: { 'moderate': 1, 'unsure': 1, 'significant': 1 }, byDiscipline: { 'building-surveying': 3 }, interests: ['Standard collaboration software for most big projects', 'If we dont get proficient then as a discipline we will be left behind'] },
      { softwareName: 'Autodesk ReCap', count: 3, avgBenefitScore: 1.67, benefits: { 'significant': 1, 'unsure': 1, 'moderate': 1 }, byDiscipline: { 'building-surveying': 3 }, interests: ['Could be of benefit to various projects and clients', 'May be useful if scan-to-BIM becomes more popular'] },
      { softwareName: 'MagiCAD', count: 3, avgBenefitScore: 1.0, benefits: { 'significant': 1, 'unsure': 2 }, byDiscipline: { 'building-services-engineering': 3 }, interests: ['To help with identifying clashes within BIM', 'Described as a significant benefit to BSE projects'] },
      { softwareName: 'Kykloud', count: 3, avgBenefitScore: 1.67, benefits: { 'moderate': 2, 'slight': 1 }, byDiscipline: { 'building-surveying': 3 }, interests: ['Would make site inspections simpler', 'To see if it proves quicker/more efficient than paper and pen'] },
      { softwareName: 'PyroSim (FDS interface)', count: 2, avgBenefitScore: 2.5, benefits: { 'significant': 1, 'moderate': 1 }, byDiscipline: { 'fire-engineering': 2 }, interests: ['Essential for modelling fire response', 'To aid fire growth simulation prediction'] },
      { softwareName: 'Microsoft Project', count: 2, avgBenefitScore: 2.5, benefits: { 'moderate': 1, 'significant': 1 }, byDiscipline: { 'project-management': 2 }, interests: ['Better functionality than Gantter', 'features on the software which are not present in Gantter'] },
      { softwareName: 'Adobe InDesign', count: 2, avgBenefitScore: 2.5, benefits: { 'significant': 2 }, byDiscipline: { 'architecture': 2 }, interests: ['Greater workflow to produce higher quality outputs', 'Time savings with the ability to link files/drawings into reports'] },
      { softwareName: 'Revit Structure', count: 2, avgBenefitScore: 2.5, benefits: { 'significant': 1, 'moderate': 1 }, byDiscipline: { 'structural-civil-engineering': 2 }, interests: ['Would help interface better and understand projects using Revit', 'To provide support when needed'] }
    ]
  },

  customEntries: [
    { customName: 'Kreo', count: 4, disciplines: ['quantity-surveying'], usageStatuses: { 'currently-using': 4 }, description: 'Cloud-based quantity takeoff and cost estimation tool' },
    { customName: 'LibreOffice', count: 4, disciplines: ['architecture', 'structural-civil-engineering', 'building-services-engineering'], usageStatuses: { 'used-previously': 1, 'currently-using': 3 }, description: 'Open-source office productivity suite' },
    { customName: 'ChatGPT / Chat GPT', count: 5, disciplines: ['architecture', 'admin-support', 'structural-civil-engineering', 'project-management', 'building-services-engineering'], usageStatuses: { 'currently-using': 2, 'used-previously': 3 }, description: 'OpenAI conversational AI assistant' },
    { customName: 'Copilot', count: 2, disciplines: ['project-management', 'structural-civil-engineering'], usageStatuses: { 'currently-using': 2 }, description: 'Microsoft AI assistant integrated with Office 365' },
    { customName: 'Adobe InDesign / Adobe Suite', count: 4, disciplines: ['architecture', 'admin-support'], usageStatuses: { 'would-like-to-use': 2, 'used-previously': 1, 'currently-using': 1 }, description: 'Professional design and publishing software' },
    { customName: 'Midjourney', count: 2, disciplines: ['architecture'], usageStatuses: { 'currently-using': 1, 'used-previously': 1 }, description: 'AI image generation tool' },
    { customName: 'Rhino / Rhino 3D', count: 3, disciplines: ['architecture'], usageStatuses: { 'used-previously': 1, 'would-like-to-use': 1, 'currently-using': 1 }, description: 'Advanced 3D modeling software for designers' },
    { customName: 'Grasshopper', count: 1, disciplines: ['architecture'], usageStatuses: { 'currently-using': 1 }, description: 'Visual programming language for Rhino' },
    { customName: 'Claude', count: 1, disciplines: ['architecture'], usageStatuses: { 'currently-using': 1 }, description: 'Anthropic AI assistant' },
    { customName: 'Grammarly', count: 1, disciplines: ['quantity-surveying'], usageStatuses: { 'currently-using': 1 }, description: 'AI writing assistant' },
    { customName: 'Appsheet', count: 1, disciplines: ['building-surveying'], usageStatuses: { 'currently-using': 1 }, description: 'Google no-code app development platform' },
    { customName: 'Site Audit Pro', count: 2, disciplines: ['building-surveying'], usageStatuses: { 'used-previously': 2 }, description: 'Site inspection and audit software' },
    { customName: 'MEPWorx', count: 1, disciplines: ['building-services-engineering'], usageStatuses: { 'currently-using': 1 }, description: 'MEP calculation software' },
    { customName: 'Hilti Profis', count: 1, disciplines: ['structural-civil-engineering'], usageStatuses: { 'currently-using': 1 }, description: 'Anchor design and analysis software' },
    { customName: 'IdeaStatica', count: 1, disciplines: ['structural-civil-engineering'], usageStatuses: { 'currently-using': 1 }, description: 'Structural connection design software' },
    { customName: 'WorkflowMax', count: 1, disciplines: ['admin-support'], usageStatuses: { 'currently-using': 1 }, description: 'Job management software' },
    { customName: 'Artlantis', count: 1, disciplines: ['architecture'], usageStatuses: { 'currently-using': 1 }, description: '3D rendering software' },
    { customName: 'Navisworks', count: 1, disciplines: ['architecture'], usageStatuses: { 'would-like-to-use': 1 }, description: 'BIM coordination and clash detection tool' },
    { customName: 'PDS / Site3D / FLOW', count: 3, disciplines: ['structural-civil-engineering'], usageStatuses: { 'currently-using': 3 }, description: 'Civil engineering design and drainage software' },
    { customName: 'Stable Diffusion', count: 1, disciplines: ['architecture'], usageStatuses: { 'would-like-to-use': 1 }, description: 'AI image generation tool' }
  ],

  generalFeedback: {
    overallSatisfaction: {
      avg: 4.13,
      count: 69,
      distribution: { 5: 23, 4: 33, 3: 12, 2: 1, 1: 0 }
    },
    trainingResources: {
      netScore: 0.59,
      distribution: { 'strongly-agree': 11, 'agree': 25, 'neutral': 28, 'disagree': 4, 'strongly-disagree': 1 }
    },
    itSupport: {
      netScore: 1.55,
      distribution: { 'strongly-agree': 41, 'agree': 25, 'neutral': 3, 'disagree': 0, 'strongly-disagree': 0 }
    },
    softwareIntegration: {
      netScore: 0.71,
      distribution: { 'strongly-agree': 12, 'agree': 31, 'neutral': 20, 'disagree': 6, 'strongly-disagree': 0 }
    },
    improvementSuggestions: [
      { text: 'There should be a more joined up thought behind how we use software and its implications for all disciplines.', discipline: 'Quantity Surveying', role: 'General' },
      { text: 'Moving documents between the G-drive and ACC does not flow very well, you have to download an item from one platform and then upload it to the other.', discipline: 'Quantity Surveying', role: 'General' },
      { text: 'Autocad training or mentoring is made readily available to all users. Software for site inspections and surveys is lacking.', discipline: 'Building Surveying', role: 'Senior Associate' },
      { text: 'More readily available training for WFM and ACC would be useful so that we can use the systems to their full potential.', discipline: 'Project Management', role: 'Senior Associate' },
      { text: 'I would value further Revit Training', discipline: 'Architecture', role: 'General' },
      { text: 'Would love to see the office embrace Rhino.Inside.Revit more, and also provide internal training.', discipline: 'Architecture', role: 'General' },
      { text: 'I think there is poor adoption with many people calling for additional training. We need clearer processes for consistent implementation.', discipline: 'Quantity Surveying', role: 'Executive Director' },
      { text: 'Dedicated training workshops, especially with ACC.', discipline: 'Building Surveying', role: 'Graduate/Apprentice' },
      { text: 'More training being offered and time allowed to undertake training', discipline: 'Architecture', role: 'General' },
      { text: 'While ACC is a very capable platform, it is currently used inconsistently across the business.', discipline: 'Architecture', role: 'Senior Associate' },
      { text: 'Still need practice-wide ACC training. Revit hints and tips for beginner/intermediate users lunchtime CPD would be good.', discipline: 'Architecture', role: 'General' },
      { text: 'Adobe InDesign for higher quality publication outputs. Regular Revit seminars or training to learn new skills.', discipline: 'Architecture', role: 'General' },
      { text: 'Change to Microsoft Office and move away from Google, its not intuitive and operationally longwinded.', discipline: 'Building Surveying', role: 'General' },
      { text: 'Monthly optional IT training to gradually improve IT skills across all personnel in the business.', discipline: 'Building Surveying', role: 'General' },
      { text: 'General levels of training on software is quite poor and there only appears to be an ad hoc system in place.', discipline: 'Architecture', role: 'General' }
    ],
    personalLicenses: [
      { text: 'Occasionally use Site Audit Pro', discipline: 'Building Surveying' },
      { text: 'Perplexity AI sometimes', discipline: 'Architecture' },
      { text: 'Adobe Creative Cloud for Photoshop', discipline: 'Architecture' },
      { text: 'Canva and ChatGPT', discipline: 'Admin/Support' },
      { text: 'Word/Excel/PowerPoint/Publisher - clients use Microsoft, Google distorts layouts', discipline: 'Building Surveying' },
      { text: 'AutoCAD', discipline: 'Building Surveying' }
    ]
  },

  byDiscipline: {
    'architecture': {
      label: 'Architecture',
      responseCount: 20,
      avgSatisfaction: 4.15,
      topSoftware: [
        { name: 'Google Workspace', count: 20 },
        { name: 'Autodesk Construction Cloud', count: 19 },
        { name: 'Gemini/Notebook LM', count: 17 },
        { name: 'Autodesk Revit', count: 17 },
        { name: 'NBS Chorus', count: 16 },
        { name: 'AutoCAD', count: 15 }
      ],
      trainingNeeds: [
        { name: 'Gemini/Notebook LM', count: 5 },
        { name: 'pyRevit', count: 6 },
        { name: 'ACC', count: 4 },
        { name: 'Affinity Suite', count: 3 }
      ],
      keyInsights: 'Strong adoption of core Autodesk tools. High interest in visualization software (Enscape, Twinmotion). Training gaps in pyRevit and AI tools.'
    },
    'building-surveying': {
      label: 'Building Surveying',
      responseCount: 15,
      avgSatisfaction: 4.07,
      topSoftware: [
        { name: 'Google Workspace', count: 14 },
        { name: 'Gemini/Notebook LM', count: 12 },
        { name: 'AutoCAD', count: 12 },
        { name: 'ACC', count: 10 },
        { name: 'NBS Chorus', count: 8 },
        { name: 'JCT Contracts', count: 9 }
      ],
      trainingNeeds: [
        { name: 'ACC', count: 12 },
        { name: 'Gemini/Notebook LM', count: 4 },
        { name: 'JCT Contracts', count: 3 }
      ],
      keyInsights: 'High demand for site inspection tools (Snag R, Kykloud). Significant training gaps in ACC. Interest in Microsoft Project over Gantter.'
    },
    'project-management': {
      label: 'Project Management',
      responseCount: 8,
      avgSatisfaction: 4.0,
      topSoftware: [
        { name: 'Google Workspace', count: 8 },
        { name: 'Gemini/Notebook LM', count: 8 },
        { name: 'ACC', count: 7 },
        { name: 'Microsoft Project', count: 4 },
        { name: 'Gantter', count: 3 }
      ],
      trainingNeeds: [
        { name: 'ACC', count: 3 },
        { name: 'Microsoft Project', count: 1 }
      ],
      keyInsights: 'Mixed preferences between MS Project and Gantter. Good adoption of collaboration tools. Interest in Monday.com for task management.'
    },
    'structural-civil-engineering': {
      label: 'Structural and Civil Engineering',
      responseCount: 7,
      avgSatisfaction: 4.29,
      topSoftware: [
        { name: 'Google Workspace', count: 7 },
        { name: 'ACC', count: 7 },
        { name: 'Gemini/Notebook LM', count: 5 },
        { name: 'AutoCAD', count: 5 },
        { name: 'OnlyOffice', count: 4 },
        { name: 'Tedds', count: 3 },
        { name: 'Revit Structure', count: 3 }
      ],
      trainingNeeds: [],
      keyInsights: 'High confidence in specialist tools. Using various specialist civil tools (PDS, Site3D, FLOW). Interest in Revit Structure training.'
    },
    'building-services-engineering': {
      label: 'Building Services Engineering',
      responseCount: 5,
      avgSatisfaction: 3.8,
      topSoftware: [
        { name: 'Google Workspace', count: 5 },
        { name: 'ACC', count: 5 },
        { name: 'Gemini/Notebook LM', count: 4 },
        { name: 'Revit MEP', count: 4 },
        { name: 'AutoCAD MEP', count: 4 }
      ],
      trainingNeeds: [
        { name: 'Revit MEP', count: 2 },
        { name: 'MagiCAD', count: 1 },
        { name: 'Autodesk Fabrication', count: 2 }
      ],
      keyInsights: 'Need for more Revit and MagiCAD training. Interest in IES VE for thermal analysis. Using MEPWorx for calculations.'
    },
    'quantity-surveying': {
      label: 'Quantity Surveying',
      responseCount: 4,
      avgSatisfaction: 4.25,
      topSoftware: [
        { name: 'Google Workspace', count: 4 },
        { name: 'Gemini/Notebook LM', count: 4 },
        { name: 'Kreo', count: 4 },
        { name: 'NBS Chorus', count: 4 },
        { name: 'DocuSign', count: 4 }
      ],
      trainingNeeds: [],
      keyInsights: 'Strong adoption of Kreo for takeoff. Interest in ACC Takeoff module. Concerns about software integration with ACC and G-Drive.'
    },
    'fire-engineering': {
      label: 'Fire Engineering',
      responseCount: 3,
      avgSatisfaction: 3.67,
      topSoftware: [
        { name: 'Google Workspace', count: 3 },
        { name: 'Bluebeam Revu', count: 2 }
      ],
      trainingNeeds: [
        { name: 'Google Workspace', count: 1 }
      ],
      keyInsights: 'Strong demand for PyroSim and Pathfinder for fire simulation. Limited software currently in use.'
    },
    'admin-support': {
      label: 'Admin/Support',
      responseCount: 4,
      avgSatisfaction: 4.5,
      topSoftware: [
        { name: 'Google Workspace', count: 4 },
        { name: 'Google Meet', count: 4 },
        { name: 'Google Drive', count: 4 },
        { name: 'BambooHR', count: 4 },
        { name: 'Gemini/Notebook LM', count: 3 }
      ],
      trainingNeeds: [],
      keyInsights: 'High satisfaction with current tools. Using Adobe Suite, WorkflowMax for specialized tasks. Some paying for Canva/ChatGPT personally.'
    },
    'town-planning': {
      label: 'Town Planning',
      responseCount: 2,
      avgSatisfaction: 4.0,
      topSoftware: [
        { name: 'Google Workspace', count: 2 },
        { name: 'Gemini/Notebook LM', count: 2 },
        { name: 'Magic Maps', count: 2 },
        { name: 'ACC', count: 2 }
      ],
      trainingNeeds: [],
      keyInsights: 'Using Magic Maps for GIS. Need more training resources and videos.'
    },
    'interior-design': {
      label: 'Interior Design',
      responseCount: 1,
      avgSatisfaction: 4.0,
      topSoftware: [
        { name: 'Google Workspace', count: 1 },
        { name: 'Revit', count: 1 },
        { name: 'SketchUp Pro', count: 1 },
        { name: 'Twinmotion', count: 1 },
        { name: 'pyRevit', count: 1 }
      ],
      trainingNeeds: [
        { name: 'Revit', count: 1 }
      ],
      keyInsights: 'Interest in Enscape for quick visualizations. Using core Architecture tools.'
    }
  },

  insights: {
    redFlags: [
      { software: 'Autodesk Construction Cloud (ACC)', issue: 'Satisfaction of 2.82 for 17 users. Training need score of 12 (70% need more training).', priority: 'Critical' },
      { software: 'Affinity Suite', issue: 'Satisfaction of 2.57. Multiple requests for Adobe alternatives.', priority: 'High' },
      { software: '4Projects', issue: 'Satisfaction of 1.5. Being used but clearly disliked.', priority: 'High' },
      { software: 'Viewpoint', issue: 'Satisfaction of 2.0. High frequency use with low satisfaction.', priority: 'High' },
      { software: 'Autodesk Fabrication', issue: 'Satisfaction of 2.0. Significant training gaps.', priority: 'Medium' },
      { software: 'Gantter', issue: 'Multiple requests to replace with Microsoft Project. Stopped by several users.', priority: 'Medium' },
      { software: 'pyRevit', issue: '75% need more or significant training despite being a key tool.', priority: 'Medium' }
    ],
    successStories: [
      { software: 'Google Workspace', metric: '98.5% adoption, 4.19 satisfaction, 93% somewhat or very confident', insight: 'Core productivity tool working well.' },
      { software: 'Enscape', metric: '4.6 satisfaction, 100% somewhat confident', insight: 'High satisfaction visualization tool.' },
      { software: 'SketchUp Pro', metric: '5.0 satisfaction from active users', insight: 'Valued for concept design.' },
      { software: 'Tedds', metric: '4.67 satisfaction, 66% very confident', insight: 'Structural tool with strong user confidence.' },
      { software: 'Revit Structure', metric: '4.67 satisfaction', insight: 'Working well for structural team.' },
      { software: 'IT Support', metric: 'Net score +1.55, 95% agree or strongly agree', insight: 'Excellent IT support perception.' },
      { software: 'Kreo', metric: '4.25 satisfaction from QS team', insight: 'Well-received takeoff tool.' }
    ],
    recommendations: {
      immediate: [
        { action: 'Implement ACC training program', detail: 'Address 70% training gap in ACC. Create standardized company-wide protocol.', priority: 'Critical' },
        { action: 'Evaluate Gantter vs Microsoft Project', detail: 'Multiple users requesting MS Project. Consider providing floating licenses.', priority: 'High' },
        { action: 'Address Affinity Suite complaints', detail: 'Consider floating Adobe license for occasional Photoshop needs.', priority: 'High' },
        { action: 'pyRevit training initiative', detail: '75% need training. Schedule workshops for Architecture team.', priority: 'High' },
        { action: 'Gemini/AI training sessions', detail: '28% need more training on AI tools. Create workflow integration guides.', priority: 'Medium' }
      ],
      shortTerm: [
        { action: 'Evaluate site inspection tools', detail: 'Building Surveying requesting Snag R and Kykloud. High potential ROI.', priority: 'High' },
        { action: 'Fire Engineering software procurement', detail: 'PyroSim and Pathfinder essential for fire simulation work.', priority: 'High' },
        { action: 'BuildDesk U access for Architecture', detail: '5 users requesting for thermal calculations. Enables independent decisions.', priority: 'Medium' },
        { action: 'Investigate Kreo/ACC Takeoff integration', detail: 'QS team interested in streamlining takeoff workflow.', priority: 'Medium' },
        { action: 'Revit training program', detail: 'Create structured training path for beginners through intermediate.', priority: 'Medium' },
        { action: 'Create software training tracker', detail: 'ISO 19650 compliance. Track specializations across company.', priority: 'Medium' }
      ],
      longTerm: [
        { action: 'Standardize CDE usage', detail: 'Inconsistent ACC usage across business. Create clear protocols.', priority: 'High' },
        { action: 'Evaluate Rhino.Inside.Revit', detail: 'Staff already using Rhino/Grasshopper. Consider official support.', priority: 'Medium' },
        { action: 'Microsoft Office vs Google decision', detail: 'Some staff struggling with client compatibility. Review strategy.', priority: 'Medium' },
        { action: 'AI tools standardization', detail: 'Multiple AI tools in use (Gemini, ChatGPT, Claude, Copilot). Consider approved list.', priority: 'Low' }
      ]
    }
  },

  executiveSummary: {
    keyMetrics: {
      totalResponses: 69,
      overallSatisfaction: 4.13,
      itSupportScore: 1.55,
      trainingResourcesScore: 0.59,
      softwareIntegrationScore: 0.71
    },
    highlights: [
      'High overall satisfaction (4.13/5) with Bailey Partnership software provision',
      'Excellent IT support perception (95% agree/strongly agree effective)',
      'Google Workspace near-universal adoption (98.5%) with high satisfaction',
      'Strong uptake of Gemini/Notebook LM (83% of respondents)',
      'ACC widely adopted but needs standardization and training'
    ],
    concerns: [
      'ACC training gap - 70% of users need more training',
      'Affinity Suite dissatisfaction (2.57/5) - Adobe alternatives requested',
      'Inconsistent software usage across disciplines and offices',
      'Building Surveying lacking dedicated site inspection tools',
      'Fire Engineering needs simulation software (PyroSim, Pathfinder)',
      'Training resources rated neutral by 40% of respondents'
    ],
    topPriorities: [
      'Implement comprehensive ACC training program',
      'Evaluate site inspection software for Building Surveying',
      'Address Adobe/Affinity Suite concerns with floating licenses',
      'Procure fire simulation software for Fire Engineering',
      'Create structured Revit and pyRevit training programs'
    ]
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = surveyData;
}
