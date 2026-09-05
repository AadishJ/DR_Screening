"use client";
import { useEffect, useState } from "react";
import styles from "./AnalysisLoader.module.css";

interface AnalysisLoaderProps {
  imagePreview: string;
  onComplete: () => void;
}

const STEPS = [
  { label: "Image Quality Assessment", detail: "Evaluating focus, illumination & field of view", duration: 600 },
  { label: "CLAHE Enhancement", detail: "Adaptive histogram equalization & noise reduction", duration: 700 },
  { label: "Vessel Segmentation", detail: "Extracting retinal vascular architecture", duration: 800 },
  { label: "Optic Disc Localization", detail: "Detecting disc boundary & C/D ratio", duration: 500 },
  { label: "Lesion Detection", detail: "Microaneurysms, hemorrhages, exudates, CWS", duration: 900 },
  { label: "DR Severity Grading", detail: "RetinalNet-v3.2.1 classification (ICDR scale)", duration: 700 },
  { label: "Grad-CAM Generation", detail: "Computing attention maps for explainability", duration: 600 },
  { label: "Report Synthesis", detail: "Compiling clinical findings & recommendations", duration: 500 },
];

export default function AnalysisLoader({ imagePreview, onComplete }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    const totalDuration = STEPS.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    const runStep = () => {
      if (stepIndex >= STEPS.length) {
        setOverallProgress(100);
        setTimeout(onComplete, 500);
        return;
      }
      setCurrentStep(stepIndex);
      const step = STEPS[stepIndex];
      const startElapsed = elapsed;

      const progressInterval = setInterval(() => {
        elapsed += 30;
        const progress = Math.min(((elapsed) / totalDuration) * 100, ((startElapsed + step.duration) / totalDuration) * 100);
        setOverallProgress(Math.round(progress));
      }, 30);

      setTimeout(() => {
        clearInterval(progressInterval);
        elapsed = startElapsed + step.duration;
        setCompletedSteps((prev) => [...prev, stepIndex]);
        stepIndex++;
        setTimeout(runStep, 80);
      }, step.duration);
    };

    const timer = setTimeout(runStep, 300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.container}>
      {/* Scan overlay on image */}
      <div className={styles.imageSection}>
        <div className={styles.imageFrame}>
          <img src={imagePreview} alt="Analyzing" className={styles.image} />
          <div className={styles.scanLine} />
          <div className={styles.gridOverlay} />
          <div className={styles.cornerBracketTL} />
          <div className={styles.cornerBracketTR} />
          <div className={styles.cornerBracketBL} />
          <div className={styles.cornerBracketBR} />
          {/* Fake detection boxes appearing */}
          {completedSteps.includes(4) && (
            <>
              <div className={`${styles.detectionBox} ${styles.box1}`}>
                <span className={styles.detectionLabel}>MA ×7</span>
              </div>
              <div className={`${styles.detectionBox} ${styles.box2}`}>
                <span className={styles.detectionLabel}>HE ×4</span>
              </div>
            </>
          )}
        </div>

        {/* Status badge */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>AI Analysis Running</span>
        </div>
      </div>

      {/* Steps */}
      <div className={styles.stepsSection}>
        <div className={styles.stepsHeader}>
          <div>
            <h3 className={styles.stepsTitle}>Processing Pipeline</h3>
            <p className={styles.stepsSubtitle}>RetinalNet-v3.2.1 • 8-stage analysis</p>
          </div>
          <div className={styles.progressCircle}>
            <svg viewBox="0 0 36 36" className={styles.progressSvg}>
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(59,130,246,0.15)"
                strokeWidth="2.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#cpg)"
                strokeWidth="2.5"
                strokeDasharray={`${overallProgress}, 100`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="cpg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.progressText}>{overallProgress}%</span>
          </div>
        </div>

        <div className={styles.stepsList}>
          {STEPS.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isActive = currentStep === i && !isCompleted;
            return (
              <div
                key={i}
                className={`${styles.step} ${isCompleted ? styles.stepDone : ""} ${isActive ? styles.stepActive : ""}`}
              >
                <div className={styles.stepIcon}>
                  {isCompleted ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  ) : isActive ? (
                    <div className={styles.stepSpinner} />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepLabel}>{step.label}</div>
                  {(isActive || isCompleted) && (
                    <div className={styles.stepDetail}>{step.detail}</div>
                  )}
                </div>
                {isActive && (
                  <div className={styles.stepProgress}>
                    <div className={styles.stepProgressBar} style={{ animationDuration: `${step.duration}ms` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
