export default function DeskPage() {
  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center bg-[#1a1a1a]">
      <div
        className="relative w-full max-w-[2912px]"
        style={{ aspectRatio: "2912 / 1440" }}
      >
        <img
          src="/workstation.png"
          alt="Workstation Desk"
          className="w-full h-full block"
        />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 2912 1440"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Whiteboard */}
          <a href="/">
            <polygon
              points="604,87 1132,58 1128,465 620,516 607,321"
              fill="transparent"
              className="cursor-pointer hover:fill-white/10 transition-colors"
            />
          </a>

          {/* Journal */}
          <a href="/journal">
            <polygon
              points="-3,411 113,422 113,769 0,766"
              fill="transparent"
              className="cursor-pointer hover:fill-white/10 transition-colors"
            />
          </a>
        </svg>
      </div>
    </main>
  );
}