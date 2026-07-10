"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Book, toRead, finished } from "./bookData";

function buildRows(books: Book[], perRow = 5): Book[][] {
  const rows: Book[][] = [];
  for (let i = 0; i < books.length; i += perRow) {
    rows.push(books.slice(i, i + perRow));
  }
  if (rows.length === 0) rows.push([]);
  return rows;
}

function BookshelfSection({
  label,
  books,
  onSelect,
}: {
  label: string;
  books: Book[];
  onSelect: (b: Book) => void;
}) {
  const [open, setOpen] = useState(true);
  const rows = buildRows(books);

  return (
    <section className="mb-20">
      {/* Section label — decorative carved-wood placard style */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8d6e63] to-transparent" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-4 focus:outline-none focus:ring-0"
          style={{ transition: "none" }}
          aria-expanded={open}
        >
          <h2 className="font-roboto text-2xl font-bold text-[#d7bfa8] tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {label}
          </h2>
          <ChevronDown
            className={`h-6 w-6 text-[#d7bfa8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${open ? "" : "-rotate-180"
              }`}
            style={{ transition: "none" }}
            aria-hidden="true"
          />
        </button>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8d6e63] to-transparent" />
      </div>

      {open && (
        <div className="flex flex-col gap-12">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative w-full">
              {/* Books resting on the shelf */}
              <div className="flex flex-row justify-center items-end gap-6 sm:gap-12 relative z-10 px-8 min-h-[12rem]">
                {row.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => onSelect(book)}
                    className="relative group focus:outline-none focus:ring-0"
                    style={{ transition: "none" }}
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-48 w-auto object-cover border-l-2 border-l-[#fdfcf0] drop-shadow-[4px_12px_8px_rgba(0,0,0,0.7)] group-hover:translate-y-[2px] group-hover:outline group-hover:outline-2 group-hover:outline-white group-active:translate-y-[4px]"
                      style={{ transition: "none" }}
                    />
                  </button>
                ))}
              </div>

              {/* Physical shelf */}
              <div className="relative z-0 w-full shelf-container">
                <div className="h-4 w-full bg-[#5d4037] border-t border-[#8d6e63]"></div>
                <div className="h-6 w-full bg-gradient-to-b from-[#6d4c41] to-[#3e2723] shadow-[0_12px_5px_rgba(0,0,0,0.7)]"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ReadingPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div
      className="font-roboto min-h-screen bg-[#3e2723] bg-[url('/images/assets/dark-wood.png')] bg-repeat shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pb-16"
      style={{
        backgroundImage: `url('/images/assets/dark-wood.png'), linear-gradient(90deg, #3e2723 0%, #4e342e 50%, #3e2723 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto pt-16 px-4 sm:px-8">
        {/* Title */}
        <h1 className="font-roboto text-4xl md:text-5xl font-medium text-white/90 text-center mb-16 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide">
          My Reading List
        </h1>

        {/* To-Read Bookshelf */}
        <BookshelfSection
          label="To Read"
          books={toRead}
          onSelect={setSelectedBook}
        />

        {/* Finished Reading Bookshelf */}
        <BookshelfSection
          label="Finished Reading"
          books={finished}
          onSelect={setSelectedBook}
        />
      </div>

      {/* Classic OS Modal — early-2010s macOS aesthetic */}
      {selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="font-roboto w-full max-w-sm bg-[#ececec] rounded-xl border border-black/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            style={{ transition: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title Bar */}
            <div className="relative flex items-center px-3 py-2 bg-gradient-to-b from-[#ebebeb] to-[#cfcfcf] border-b border-black/15">
              {/* Traffic-light buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] border border-black/10 shadow-inner"
                  style={{ transition: "none" }}
                  aria-label="Close"
                />
                <span
                  className="h-3.5 w-3.5 rounded-full bg-[#febc2e] border border-black/10 shadow-inner"
                  aria-hidden="true"
                />
                <span
                  className="h-3.5 w-3.5 rounded-full bg-[#28c840] border border-black/10 shadow-inner"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 flex flex-col gap-4 text-[#1d1d1f]">
              <div className="flex gap-4">
                <div className="shrink-0 rounded-md overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.25)] bg-white">
                  <img
                    src={selectedBook.coverUrl}
                    alt={selectedBook.title}
                    className="h-24 w-auto object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-roboto font-bold text-base leading-tight">
                    {selectedBook.title}
                  </h2>
                  <p className="text-sm mt-1 text-[#6e6e73]">
                    By {selectedBook.author}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white border border-black/10 p-3 text-sm leading-relaxed min-h-[5rem] shadow-inner">
                {selectedBook.summary}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
