/**
 * NotebookContext — single source of truth for notebook layout values
 * in React-land.
 *
 * Why a context instead of just using CSS variables everywhere?
 *
 *   1. Variant awareness: children can know whether they live inside
 *      a "full" outer sheet or an "inset" floating panel, and adjust
 *      their behaviour (e.g. a component might suppress its own
 *      margin-line if it's already inside an inset sheet).
 *
 *   2. Named constants: instead of every component repeating the
 *      magic string "var(--margin-line-pos)", they import NOTEBOOK_CSS
 *      and get type-checked names.  If the CSS variable is ever
 *      renamed, there is ONE place to update it.
 *
 *   3. Future proofing: the context is the natural extension point if
 *      we later want to read computed pixel values (e.g. via a ResizeObserver)
 *      and inject them as JS values for animation libraries.
 */

import { createContext, useContext } from "react";

/* ------------------------------------------------------------------ */
/* CSS variable references                                             */
/* ------------------------------------------------------------------ */

/**
 * Named references to the CSS custom properties declared in globals.css.
 * Use these in style={{ }} props and calc() strings instead of raw
 * magic strings.
 *
 * @example
 * // Before (scattered magic string):
 * style={{ left: "var(--margin-line-pos)" }}
 *
 * // After (named constant):
 * style={{ left: NOTEBOOK_CSS.marginLine }}
 */
export const NOTEBOOK_CSS = {
  marginLine:  "var(--margin-line-pos)",
  headerSpace: "var(--header-space)",
  rulingSpace: "var(--ruling-spacing)",
  pageInsetX:  "var(--page-inset-x)",
} as const;

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export type NotebookVariant = "full" | "inset";

export interface NotebookContextValue {
  /** Whether this notebook sheet is the outermost page or a floating inset. */
  variant: NotebookVariant;
}

export const NotebookContext = createContext<NotebookContextValue>({
  variant: "full",
});

/**
 * useNotebook — consume the nearest NotebookPage context.
 *
 * @example
 * const { variant } = useNotebook();
 */
export function useNotebook(): NotebookContextValue {
  return useContext(NotebookContext);
}
