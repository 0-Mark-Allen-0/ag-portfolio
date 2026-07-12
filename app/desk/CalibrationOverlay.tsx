"use client";

// ============================================================
//  CALIBRATION LEGEND  (dev-only)
// ============================================================
//  The per-item outlines + coordinate labels are drawn by each
//  InteractiveAsset. This component only renders the corner hint.
//  Enable calibrate mode via ?calibrate in the URL or the "c" key.
// ============================================================

export default function CalibrationOverlay() {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-[999] rounded bg-black/80 px-2 py-1 text-[11px] font-medium text-white">
      CALIBRATE MODE — press &ldquo;c&rdquo; to toggle
    </div>
  );
}
