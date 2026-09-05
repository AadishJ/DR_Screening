export type DRGrade = 0 | 1 | 2 | 3 | 4;

export interface LesionFinding {
  type: string;
  count: number | string;
  severity: "none" | "mild" | "moderate" | "severe";
  location: string;
  clinicalSignificance: string;
  icon: string;
}

export interface StructuralFinding {
  structure: string;
  status: string;
  measurement?: string;
  note: string;
}

export interface MockReport {
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  diabetesDuration: string;
  referringCentre: string;
  analysisDate: string;
  analysisTime: string;
  eye: "Right Eye (OD)" | "Left Eye (OS)";
  imageQuality: {
    score: number;
    grade: "Excellent" | "Good" | "Adequate" | "Poor";
    focusScore: number;
    illuminationScore: number;
    fieldOfViewScore: number;
    gradeable: boolean;
  };
  drGrade: DRGrade;
  drGradeLabel: string;
  referable: boolean;
  confidence: number;
  sensitivity: number;
  specificity: number;
  lesionFindings: LesionFinding[];
  structuralFindings: StructuralFinding[];
  clinicalRecommendation: string;
  followUpTimeline: string;
  gradCamRegions: {
    label: string;
    intensity: number;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
  }[];
  processingTime: number;
  modelVersion: string;
  validationDataset: string;
  auc: number;
  notes: string;
}

export const MOCK_REPORTS: MockReport[] = [
  {
    // Grade 2 - Moderate NPDR (referable)
    patientId: "AIIMS-DR-20240905-001",
    patientName: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    diabetesDuration: "8 years",
    referringCentre: "PHC Chhatarpur, Madhya Pradesh",
    analysisDate: "05 Sep 2026",
    analysisTime: "14:32:18",
    eye: "Right Eye (OD)",
    imageQuality: {
      score: 87,
      grade: "Good",
      focusScore: 91,
      illuminationScore: 83,
      fieldOfViewScore: 88,
      gradeable: true,
    },
    drGrade: 2,
    drGradeLabel: "Moderate Non-Proliferative DR",
    referable: true,
    confidence: 94.2,
    sensitivity: 92.1,
    specificity: 87.3,
    lesionFindings: [
      {
        type: "Microaneurysms",
        count: 14,
        severity: "moderate",
        location: "Temporal quadrant, peri-foveal",
        clinicalSignificance: "Earliest vascular change; ≥5 indicates moderate DR",
        icon: "●",
      },
      {
        type: "Hard Exudates",
        count: 7,
        severity: "moderate",
        location: "Inferior temporal arcade",
        clinicalSignificance: "Lipid deposition from leaking vessels; risk of macular involvement",
        icon: "◆",
      },
      {
        type: "Dot/Blot Hemorrhages",
        count: 6,
        severity: "mild",
        location: "Superior & inferior quadrants",
        clinicalSignificance: "Intraretinal hemorrhages indicating ischemia",
        icon: "◉",
      },
      {
        type: "Cotton Wool Spots",
        count: 2,
        severity: "mild",
        location: "Superior arcade",
        clinicalSignificance: "Nerve fiber layer infarcts; marker of ischemia",
        icon: "☁",
      },
      {
        type: "Neovascularization (NVD/NVE)",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "Absence confirms non-proliferative status",
        icon: "⌀",
      },
      {
        type: "Vitreous Hemorrhage",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "No proliferative complications",
        icon: "⌀",
      },
    ],
    structuralFindings: [
      {
        structure: "Optic Disc",
        status: "Normal",
        measurement: "C/D ratio: 0.4",
        note: "Clear margin, no disc edema or pallor",
      },
      {
        structure: "Macula / Fovea",
        status: "At Risk",
        measurement: "Distance to nearest exudate: ~0.8 DD",
        note: "Hard exudates approaching foveal zone — monitor for CSME",
      },
      {
        structure: "Retinal Vasculature",
        status: "Abnormal",
        measurement: "A:V ratio: 2:3",
        note: "Mild AV nicking; venous tortuosity noted",
      },
      {
        structure: "Peripheral Retina",
        status: "Normal",
        measurement: "—",
        note: "No peripheral NVE or traction detected",
      },
    ],
    clinicalRecommendation:
      "REFER to ophthalmologist within 3 months. Moderate NPDR with hard exudates approaching macula. Risk of Clinically Significant Macular Edema (CSME). Optimize glycemic control (HbA1c target <7%), blood pressure (<130/80 mmHg), and lipid profile. Fundus fluorescein angiography (FFA) recommended.",
    followUpTimeline: "3 months",
    gradCamRegions: [
      { label: "Microaneurysms", intensity: 0.92, x: 52, y: 48, w: 16, h: 14, color: "#ff4444" },
      { label: "Hard Exudates", intensity: 0.78, x: 60, y: 62, w: 14, h: 10, color: "#ff8800" },
      { label: "Hemorrhages", intensity: 0.65, x: 38, y: 55, w: 12, h: 10, color: "#ffcc00" },
      { label: "Cotton Wool", intensity: 0.55, x: 45, y: 35, w: 10, h: 8, color: "#44aaff" },
    ],
    processingTime: 4.3,
    modelVersion: "RetinalNet-v3.2.1",
    validationDataset: "EyePACS + APTOS 2019",
    auc: 0.967,
    notes:
      "Image acquired with Remidio FOP NM portable fundus camera. CLAHE enhancement applied (clip limit 2.0, tile 8×8). Pipeline validated against AIIMS Delhi ophthalmology department.",
  },
  {
    // Grade 0 - No DR
    patientId: "AIIMS-DR-20240905-002",
    patientName: "Sunita Devi",
    age: 47,
    gender: "Female",
    diabetesDuration: "3 years",
    referringCentre: "PHC Chhatarpur, Madhya Pradesh",
    analysisDate: "05 Sep 2026",
    analysisTime: "14:35:44",
    eye: "Left Eye (OS)",
    imageQuality: {
      score: 93,
      grade: "Excellent",
      focusScore: 95,
      illuminationScore: 91,
      fieldOfViewScore: 94,
      gradeable: true,
    },
    drGrade: 0,
    drGradeLabel: "No Diabetic Retinopathy",
    referable: false,
    confidence: 97.8,
    sensitivity: 92.1,
    specificity: 87.3,
    lesionFindings: [
      {
        type: "Microaneurysms",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "No vascular micro-damage observed",
        icon: "●",
      },
      {
        type: "Hard Exudates",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "No lipid deposition",
        icon: "◆",
      },
      {
        type: "Dot/Blot Hemorrhages",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "No intraretinal hemorrhages",
        icon: "◉",
      },
      {
        type: "Cotton Wool Spots",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "No nerve fiber layer infarcts",
        icon: "☁",
      },
      {
        type: "Neovascularization (NVD/NVE)",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "No proliferative changes",
        icon: "⌀",
      },
      {
        type: "Vitreous Hemorrhage",
        count: "None detected",
        severity: "none",
        location: "N/A",
        clinicalSignificance: "No proliferative complications",
        icon: "⌀",
      },
    ],
    structuralFindings: [
      {
        structure: "Optic Disc",
        status: "Normal",
        measurement: "C/D ratio: 0.35",
        note: "Sharp margin, healthy pink color",
      },
      {
        structure: "Macula / Fovea",
        status: "Normal",
        measurement: "Foveal reflex present",
        note: "No edema, no hard exudates in foveal zone",
      },
      {
        structure: "Retinal Vasculature",
        status: "Normal",
        measurement: "A:V ratio: 2:3",
        note: "Regular caliber, no AV nicking",
      },
      {
        structure: "Peripheral Retina",
        status: "Normal",
        measurement: "—",
        note: "No peripheral changes detected",
      },
    ],
    clinicalRecommendation:
      "NO REFERRAL REQUIRED. No signs of diabetic retinopathy detected. Annual screening recommended. Continue diabetes management with HbA1c monitoring every 3 months.",
    followUpTimeline: "12 months",
    gradCamRegions: [],
    processingTime: 3.8,
    modelVersion: "RetinalNet-v3.2.1",
    validationDataset: "EyePACS + APTOS 2019",
    auc: 0.967,
    notes: "High quality image. No enhancement required. Baseline record established.",
  },
  {
    // Grade 4 - Proliferative DR (severe)
    patientId: "AIIMS-DR-20240905-003",
    patientName: "Mohan Lal Sharma",
    age: 63,
    gender: "Male",
    diabetesDuration: "17 years",
    referringCentre: "Sub-District Hospital Panna, MP",
    analysisDate: "05 Sep 2026",
    analysisTime: "14:41:02",
    eye: "Right Eye (OD)",
    imageQuality: {
      score: 79,
      grade: "Adequate",
      focusScore: 76,
      illuminationScore: 81,
      fieldOfViewScore: 80,
      gradeable: true,
    },
    drGrade: 4,
    drGradeLabel: "Proliferative Diabetic Retinopathy",
    referable: true,
    confidence: 96.7,
    sensitivity: 92.1,
    specificity: 87.3,
    lesionFindings: [
      {
        type: "Microaneurysms",
        count: "30+",
        severity: "severe",
        location: "All quadrants",
        clinicalSignificance: "Widespread vascular damage, advanced stage",
        icon: "●",
      },
      {
        type: "Hard Exudates",
        count: "20+",
        severity: "severe",
        location: "Circinate pattern near fovea",
        clinicalSignificance: "Macular involvement confirmed — CSME present",
        icon: "◆",
      },
      {
        type: "Dot/Blot Hemorrhages",
        count: "25+",
        severity: "severe",
        location: "All 4 quadrants",
        clinicalSignificance: "Extensive intraretinal hemorrhages",
        icon: "◉",
      },
      {
        type: "Cotton Wool Spots",
        count: 8,
        severity: "severe",
        location: "Multiple quadrants",
        clinicalSignificance: "Significant retinal ischemia",
        icon: "☁",
      },
      {
        type: "Neovascularization (NVD/NVE)",
        count: "Confirmed — NVD + NVE",
        severity: "severe",
        location: "Disc margin + temporal periphery",
        clinicalSignificance: "HALLMARK of PDR — immediate intervention required",
        icon: "⚠",
      },
      {
        type: "Vitreous Hemorrhage",
        count: "Suspected — image haze",
        severity: "severe",
        location: "Pre-retinal region",
        clinicalSignificance: "May indicate ruptured neovascular vessel — URGENT",
        icon: "⚠",
      },
    ],
    structuralFindings: [
      {
        structure: "Optic Disc",
        status: "Critical",
        measurement: "NVD confirmed",
        note: "Neovascularization at disc — hallmark of proliferative DR",
      },
      {
        structure: "Macula / Fovea",
        status: "Critical",
        measurement: "CSME present",
        note: "Hard exudate ring encircling fovea; significant vision threat",
      },
      {
        structure: "Retinal Vasculature",
        status: "Critical",
        measurement: "IRMA visible",
        note: "Intraretinal microvascular abnormalities and venous beading",
      },
      {
        structure: "Peripheral Retina",
        status: "Abnormal",
        measurement: "NVE detected",
        note: "Peripheral neovascularization with fibrovascular proliferation",
      },
    ],
    clinicalRecommendation:
      "URGENT REFERRAL — within 1 week. Proliferative DR with CSME. Risk of tractional retinal detachment and permanent vision loss. Pan-retinal photocoagulation (PRP) and/or anti-VEGF intravitreal injection indicated. Immediate HbA1c optimization critical. Emergency ophthalmology consultation required.",
    followUpTimeline: "URGENT — 1 week",
    gradCamRegions: [
      { label: "NVD (Disc)", intensity: 0.98, x: 47, y: 45, w: 14, h: 14, color: "#ff0000" },
      { label: "NVE (Temporal)", intensity: 0.91, x: 68, y: 55, w: 16, h: 12, color: "#ff2200" },
      { label: "CSME / Exudates", intensity: 0.88, x: 50, y: 58, w: 18, h: 12, color: "#ff5500" },
      { label: "Hemorrhages", intensity: 0.82, x: 35, y: 40, w: 14, h: 12, color: "#ff8800" },
      { label: "IRMA", intensity: 0.74, x: 30, y: 60, w: 12, h: 10, color: "#ffaa00" },
      { label: "Cotton Wool", intensity: 0.68, x: 55, y: 30, w: 12, h: 10, color: "#ffcc00" },
    ],
    processingTime: 5.1,
    modelVersion: "RetinalNet-v3.2.1",
    validationDataset: "EyePACS + APTOS 2019",
    auc: 0.967,
    notes:
      "CLAHE applied with enhanced denoising due to moderate image quality. Pre-retinal haze in superior quadrant — possible vitreous hemorrhage; B-scan ultrasound recommended. Pipeline flagged for immediate human review.",
  },
];

export function getRandomReport(): MockReport {
  return MOCK_REPORTS[Math.floor(Math.random() * MOCK_REPORTS.length)];
}

export const DR_GRADE_CONFIG: Record<
  DRGrade,
  { label: string; color: string; bg: string; border: string; urgency: string; icon: string }
> = {
  0: {
    label: "No DR",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.3)",
    urgency: "Annual Screening",
    icon: "✓",
  },
  1: {
    label: "Mild NPDR",
    color: "#84cc16",
    bg: "rgba(132,204,22,0.1)",
    border: "rgba(132,204,22,0.3)",
    urgency: "6-Month Follow-up",
    icon: "◎",
  },
  2: {
    label: "Moderate NPDR",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
    urgency: "3-Month Referral",
    icon: "⚠",
  },
  3: {
    label: "Severe NPDR",
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.3)",
    urgency: "Urgent Referral",
    icon: "⚠",
  },
  4: {
    label: "Proliferative DR",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.4)",
    urgency: "URGENT — 1 Week",
    icon: "🚨",
  },
};
