"use client";

/**
 * TimelineRow — renders a single Row from journalTimeline.ts.
 *
 * Layout rules:
 *   • text + exactly one note → two-column split. The note/text sides swap
 *     each split row (the `flip` prop), so the timeline zig-zags down the page.
 *   • text + multiple notes    → text (left-aligned) above a centered notes grid.
 *   • text only                → a left-aligned, handwritten-style paragraph.
 *   • note(s) only             → a centered grid of StickyNotes.
 *
 * Project notes are resolved against PROJECTS so their title / image / link
 * stay in sync with projectsData.ts.
 */

import React from "react";
import { StickyNote } from "./StickyNote";
import type { Note, Row } from "../../data/journalTimeline";
import { PROJECTS } from "../projectsData";

type StickyColor = "yellow" | "blue" | "pink" | "green";
const COLORS: StickyColor[] = ["yellow", "blue", "pink", "green"];

/** Deterministic, stable colour from a note's title. */
function colorFor(seed: string): StickyColor {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return COLORS[Math.abs(hash) % COLORS.length];
}

interface ResolvedNote {
  title: string;
  description?: string;
  mediaSrc: string;
  color: StickyColor;
  href?: string;
}

/** Turn a data Note into props the StickyNote can render. Returns null if a project id is unknown. */
function resolveNote(note: Note): ResolvedNote | null {
  if (note.kind === "image") {
    return {
      title: note.title,
      mediaSrc: note.mediaSrc,
      color: colorFor(note.title),
    };
  }

  const project = PROJECTS.find((p) => p.id === note.projectId);
  if (!project) return null;

  return {
    title: project.title,
    mediaSrc: project.imageUrl,
    color: colorFor(project.title),
    href: `/projects/${project.id}`,
  };
}

function NotesGrid({ notes }: { notes: ResolvedNote[] }) {
  const cols =
    notes.length === 1
      ? "max-w-md mx-auto"
      : notes.length === 2
      ? "grid gap-8 md:gap-10 sm:grid-cols-2 max-w-3xl mx-auto"
      : "grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto";

  return (
    <div className={cols}>
      {notes.map((n, i) => (
        <StickyNote key={`${n.title}-${i}`} {...n} />
      ))}
    </div>
  );
}

/** Handwritten narrative paragraph. */
function Paragraph({ text }: { text: string }) {
  return (
    <p className="text-xl md:text-2xl text-gray-800 font-patrick leading-relaxed text-left max-w-2xl">
      {text}
    </p>
  );
}

interface TimelineRowProps {
  row: Row;
  /** Alternates the note/text sides on split rows. */
  flip: boolean;
}

export default function TimelineRow({ row, flip }: TimelineRowProps) {
  const resolved = (row.notes ?? [])
    .map(resolveNote)
    .filter((n): n is ResolvedNote => n !== null);

  const hasText = Boolean(row.text);
  const hasNotes = resolved.length > 0;

  /* ── text only ── */
  if (hasText && !hasNotes) {
    return <Paragraph text={row.text!} />;
  }

  /* ── notes only ── */
  if (!hasText && hasNotes) {
    return <NotesGrid notes={resolved} />;
  }

  /* ── text + exactly one note → alternating two-column split ── */
  if (hasText && resolved.length === 1) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className={flip ? "lg:order-2" : "lg:order-1"}>
          <div className="max-w-md mx-auto lg:mx-0">
            <StickyNote {...resolved[0]} />
          </div>
        </div>
        <div className={flip ? "lg:order-1" : "lg:order-2"}>
          <Paragraph text={row.text!} />
        </div>
      </div>
    );
  }

  /* ── text + multiple notes → notes grid above the paragraph ── */
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <NotesGrid notes={resolved} />
      <div className="max-w-2xl mx-auto">
        <Paragraph text={row.text!} />
      </div>
    </div>
  );
}

/** Whether a row renders as an alternating two-column split (needs a flip index). */
export function isSplitRow(row: Row): boolean {
  const noteCount = (row.notes ?? []).length;
  return Boolean(row.text) && noteCount === 1;
}
