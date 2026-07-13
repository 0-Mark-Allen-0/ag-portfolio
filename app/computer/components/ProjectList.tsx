"use client";

import { cn } from "@/app/lib/cn";
import type { ComputerProject } from "../computerData";

// ============================================================
//  PROJECT LIST — Window B contents.
// ============================================================
//  A semantic, keyboard-navigable list. Selecting an entry calls
//  onSelect; the parent lifts that into state and feeds the
//  Preview window. Entries are rendered from supplied data only.
// ============================================================

export interface ProjectListProps {
  projects: ComputerProject[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ProjectList({
  projects,
  selectedId,
  onSelect,
}: ProjectListProps) {
  return (
    <div className="w95-sunken w95-scroll h-full overflow-y-auto p-0.5">
      <ul role="listbox" aria-label="Projects" className="flex flex-col">
        {projects.map((project) => {
          const selected = project.id === selectedId;
          return (
            <li key={project.id} role="option" aria-selected={selected}>
              <button
                type="button"
                onClick={() => onSelect(project.id)}
                className={cn(
                  "block w-full px-2 py-1.5 text-left text-base focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-black",
                  selected
                    ? "bg-[#000080] text-white"
                    : "text-black hover:bg-black/5",
                )}
              >
                <span className="block truncate leading-tight">
                  {project.title}
                </span>
                {project.meta && (
                  <span
                    className={cn(
                      "block truncate text-sm leading-tight",
                      selected ? "text-white/70" : "text-black/50",
                    )}
                  >
                    {project.meta}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
