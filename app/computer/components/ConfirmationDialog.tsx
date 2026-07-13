"use client";

import Window, { type WindowFrame } from "./Window";

// ============================================================
//  CONFIRMATION DIALOG — presentational only.
// ============================================================
//  Renders the "go back to desk?" prompt. Both buttons expose
//  callbacks; NO navigation is hardcoded here. The desktop
//  decides what Yes / No actually do.
// ============================================================

export interface ConfirmationDialogProps {
  title?: string;
  prompt: string;
  question: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  layout?: "floating" | "stacked";
  frame?: WindowFrame;
  zIndex?: number;
}

export default function ConfirmationDialog({
  title = "Confirm",
  prompt,
  question,
  confirmLabel = "Yes",
  cancelLabel = "No",
  onConfirm,
  onCancel,
  layout = "floating",
  frame,
  zIndex,
}: ConfirmationDialogProps) {
  return (
    <Window
      title={title}
      layout={layout}
      frame={frame}
      onClose={onCancel}
      zIndex={zIndex}
      ariaLabel="Confirmation dialog"
    >
      <div className="px-5 py-5 text-center text-sm text-black">
        <p>{prompt}</p>
        <p className="mt-1 font-semibold">{question}</p>

        <div className="mt-5 flex justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="w95-btn min-w-[72px] px-4 py-1 text-sm text-black"
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w95-btn min-w-[72px] px-4 py-1 text-sm text-black"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </Window>
  );
}
