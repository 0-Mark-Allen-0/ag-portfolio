"use client"
import React from "react";
import { cn } from "../lib/cn";
import SmartDateHeader from "./SmartDateHeader";

interface NotebookPageProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  dayName: string;
  dayNum: number;
  month: string;
}

export default function NotebookPage({
  children,
  className = "",
  title,
  dayName,
  dayNum,
  month,
}: NotebookPageProps) {
  return (
    <div className={cn("notebook-page w-full h-full", className)}>
      <div className="notebook-header-space">
        <SmartDateHeader
          title={title}
          dayName={dayName}
          dayNum={dayNum}
          month={month}
        />
      </div>

      <div className="margin-line-page" aria-hidden="true" />

      {children}
    </div>
  );
}
