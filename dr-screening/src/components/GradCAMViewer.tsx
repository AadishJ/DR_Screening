"use client";
import { MockReport } from "@/lib/mockData";
import styles from "./GradCAMViewer.module.css";

interface GradCAMViewerProps {
  report: MockReport;
  imagePreview: string;
}

export default function GradCAMViewer({ report, imagePreview }: GradCAMViewerProps) {
  const { gradCamRegions } = report;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Grad-CAM Attention Map</h3>
          <p className={styles.subtitle}>
            Gradient-weighted Class Activation Mapping — highlights regions influencing DR classification
          </p>
        </div>
        <span className="badge badge-purple">Explainability Layer</span>
      </div>

      <div className={styles.viewerGrid}>
        {/* Original image */}
        <div className={styles.imagePanel}>
          <div className={styles.panelLabel}>Original Fundus</div>
          <div className={styles.imageFrame}>
            <img src={imagePreview} alt="Original fundus" className={styles.img} />
            <div className={styles.frameCornerTL} />
            <div className={styles.frameCornerTR} />
            <div className={styles.frameCornerBL} />
            <div className={styles.frameCornerBR} />
          </div>
        </div>

        {/* Grad-CAM overlay */}
        <div className={styles.imagePanel}>
          <div className={styles.panelLabel}>Grad-CAM Overlay</div>
          <div className={styles.imageFrame} style={{ position: "relative" }}>
            <img src={imagePreview} alt="Grad-CAM overlay" className={styles.img} style={{ filter: "brightness(0.6) saturate(0.5)" }} />
            {/* Heatmap blobs */}
            {gradCamRegions.map((region, i) => (
              <div
                key={i}
                className={styles.heatBlob}
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  width: `${region.w}%`,
                  height: `${region.h}%`,
                  background: `radial-gradient(ellipse at center, ${region.color}${Math.round(region.intensity * 180).toString(16).padStart(2,"0")} 0%, transparent 70%)`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
            {/* Hotspot markers */}
            {gradCamRegions.map((region, i) => (
              <div
                key={`marker-${i}`}
                className={styles.hotspot}
                style={{
                  left: `${region.x + region.w / 2}%`,
                  top: `${region.y + region.h / 2}%`,
                  borderColor: region.color,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <span className={styles.hotspotPulse} style={{ background: region.color }} />
              </div>
            ))}
            {gradCamRegions.length === 0 && (
              <div className={styles.noHeatmap}>
                <span>No significant activation regions detected</span>
              </div>
            )}
            <div className={styles.frameCornerTL} />
            <div className={styles.frameCornerTR} />
            <div className={styles.frameCornerBL} />
            <div className={styles.frameCornerBR} />
          </div>
        </div>
      </div>

      {/* Legend */}
      {gradCamRegions.length > 0 && (
        <div className={styles.legend}>
          <div className={styles.legendTitle}>Detected Attention Regions</div>
          <div className={styles.legendItems}>
            {gradCamRegions.map((r, i) => (
              <div key={i} className={styles.legendItem}>
                <div className={styles.legendDot} style={{ background: r.color }} />
                <span className={styles.legendLabel}>{r.label}</span>
                <span className={styles.legendIntensity}>{Math.round(r.intensity * 100)}%</span>
              </div>
            ))}
          </div>
          {/* Heatmap color scale */}
          <div className={styles.colorScale}>
            <span className={styles.scaleLabel}>Low attention</span>
            <div className={styles.scaleBar} />
            <span className={styles.scaleLabel}>High attention</span>
          </div>
        </div>
      )}

      {/* Clinical note */}
      <div className={styles.clinicalNote}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>
          Grad-CAM maps are generated from the final convolutional layer of RetinalNet-v3.2.1. 
          Activation regions correlate with clinical lesion locations and should be reviewed by a qualified ophthalmologist. 
          For human-in-the-loop validation — target review time: <strong>&lt;30 seconds</strong>.
        </p>
      </div>
    </div>
  );
}
