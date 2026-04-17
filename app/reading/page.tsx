"use client";

import React, { useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  summary: string;
};

const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600",
    summary:
      "A primer on how and why some products satisfy customers while others only frustrate them. Explores the psychology of design.",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    coverUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=600",
    summary:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. A classic on software craftsmanship.",
  },
  {
    id: "3",
    title: "Snow Crash",
    author: "Neal Stephenson",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600",
    summary:
      "In reality, Hiro Protagonist delivers pizza for Uncle Enzo's CosoNostra Pizza Inc., but in the Metaverse he's a warrior prince. A cyberpunk classic.",
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    coverUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400&h=600",
    summary:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
  },
  {
    id: "5",
    title: "Neuromancer",
    author: "William Gibson",
    coverUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400&h=600",
    summary:
      "Henry Dorsett Case is a low-level hustler in the dystopian underworld of Chiba City, Japan. Once a talented computer hacker, Case was caught stealing from his employer and punished...",
  },
];

export default function ReadingPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Split books into rows of 3 to mock shelves
  const rows = [];
  for (let i = 0; i < MOCK_BOOKS.length; i += 3) {
    rows.push(MOCK_BOOKS.slice(i, i + 3));
  }

  // Ensure there are at least a few empty shelves to fill the screen
  while (rows.length < 3) {
    rows.push([]);
  }

  return (
    <div
      className="min-h-screen bg-[#3e2723] bg-[url('/images/assets/dark-wood.png')] bg-repeat shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pb-16"
      style={{
        // Fallback wood grain pattern using CSS if the image is missing
        backgroundImage: `url('/images/assets/dark-wood.png'), linear-gradient(90deg, #3e2723 0%, #4e342e 50%, #3e2723 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto pt-16 px-4 sm:px-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif text-white/90 text-center mb-16 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide">
          My Reading List
        </h1>

        {/* Bookshelves */}
        <div className="flex flex-col gap-12 mt-12">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative w-full">
              {/* The Books (resting on the shelf) */}
              <div className="flex flex-row justify-center items-end gap-6 sm:gap-12 relative z-10 px-8 min-h-[12rem]">
                {row.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    className="relative group focus:outline-none focus:ring-0"
                    // Absolute removal of any transitions
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

              {/* The Physical Shelf */}
              <div className="relative z-0 w-full shelf-container">
                {/* Top Surface of Shelf (Depth) */}
                <div className="h-4 w-full bg-[#5d4037] border-t border-[#8d6e63]"></div>
                {/* Front Face of Shelf (Gradient) */}
                <div className="h-6 w-full bg-gradient-to-b from-[#6d4c41] to-[#3e2723] shadow-[0_12px_5px_rgba(0,0,0,0.7)]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classic OS Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928GBgYGBkQAIIAAM9wDxC/2H4wAAAABJRU5ErkJggg==')] bg-repeat">
          {/* Windows 95 Style Dialog Component */}
          <div
            className="w-full max-w-sm bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#404040] flex flex-col drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
            style={{ transition: "none" }}
          >
            {/* Title Bar */}
            <div className="bg-[#000080] flex justify-between items-center p-1 border-b border-[#000080]">
              <div className="text-white font-bold text-sm select-none break-words line-clamp-1 px-1 font-['MS_Sans_Serif',Tahoma,Arial,sans-serif]">
                {selectedBook.title}
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="bg-[#c0c0c0] text-black font-bold h-5 w-5 flex items-center justify-center border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#404040] hover:active:border-t-[#404040] hover:active:border-l-[#404040] hover:active:border-b-[#ffffff] hover:active:border-r-[#ffffff] hover:active:pt-[2px] hover:active:pl-[2px] ml-2 shrink-0 aspect-square text-xs"
                style={{ transition: "none" }}
                aria-label="Close"
              >
                X
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 flex flex-col gap-4 font-['MS_Sans_Serif',Tahoma,Arial,sans-serif] text-black">
              <div className="flex gap-4">
                {/* Thumbnail next to content */}
                <div className="shrink-0 border-t-2 border-l-2 border-[#404040] border-b-2 border-r-2 border-[#ffffff] bg-[#ffffff] p-1">
                  <img
                    src={selectedBook.coverUrl}
                    alt={selectedBook.title}
                    className="h-24 w-auto object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-bold text-base leading-tight">
                    {selectedBook.title}
                  </h2>
                  <p className="text-sm mt-1 text-gray-800">
                    By {selectedBook.author}
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-l-2 border-[#404040] border-b-2 border-r-2 border-[#ffffff] bg-white p-3 text-sm leading-relaxed min-h-[5rem]">
                {selectedBook.summary}
              </div>

              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="bg-[#c0c0c0] border-t-2 border-l-2 border-[#ffffff] border-b-4 border-r-4 border-[#404040] active:border-t-4 active:border-l-4 active:border-[#404040] active:border-b-2 active:border-r-2 active:border-r-[#ffffff] active:border-b-[#ffffff] px-6 py-1 font-bold shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#fff]"
                  style={{ transition: "none" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
