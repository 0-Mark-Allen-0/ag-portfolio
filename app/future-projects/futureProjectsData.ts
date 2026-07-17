/*
  Central source of truth for "Future Projects" — ideas not yet built.
  These have no imagery, so each project is title + a structured
  description made of paragraph and bullet-list blocks.
*/

export type FutureProjectBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface FutureProject {
  id: string;
  title: string;
  blocks: FutureProjectBlock[];
}

export const FUTURE_PROJECTS: FutureProject[] = [
  {
    id: "gamified-startup-mgmt",
    title: "Gamified Start-Up Management Project",
    blocks: [
      {
        type: "paragraph",
        text: "If the Civilisation games, the Tycoon series of games, and any colony-building games have taught me anything, it is that managing resources, people and driving towards a certain goal is the most fun type of games that also allow free-will.",
      },
      {
        type: "paragraph",
        text: "My bet with this project idea is that people under 35 that are building startups in cities like B’lore with small teams and believe in innovation are the same people that have played strategy and tower-defense games. So, I am sure if the systems, routines, and processes of startup companies could be graphically visualised, gamified, and made well-integrated and all-encompassing, the effectiveness of such startups would increase multifold.",
      },
      {
        type: "paragraph",
        text: "Now with all the agentic applications available, this idea is closer to realisation than ever. Need a way to quantise all metrics, a way to ease day-to-day data entry, and a way to reduce or at least detect human error. Would take me a week to build.",
      },
    ],
  },
  {
    id: "digital-twin-campus",
    title: "AI-powered Digital Twin University Campus",
    blocks: [
      {
        type: "paragraph",
        text: "This is a project I had given enough thought to. I envision building a comprehensive digital twin platform that reimagines how students, faculty, staff, and visitors interact with a university campus. The platform combines an interactive 3D campus with an AI-powered institutional assistant capable of answering questions, guiding all users with administrative processes, and providing contextual support. A web-based version would allow prospective students, parents, recruiters, and guests to explore the campus remotely through immersive virtual tours, discover facilities and academic programs, attend virtual events, and interact with AI guides before ever visiting in person.",
      },
      {
        type: "paragraph",
        text: "Beyond enhancing the visitor experience, the platform would serve as a foundation for intelligent campus services, enabling workflow automation, digital wayfinding, personalised onboarding, and future integrations with university systems to create a connected, data-driven campus ecosystem.",
      },
    ],
  },
  {
    id: "gather-collab-app",
    title: "Gather-like Collaboration App",
    blocks: [
      {
        type: "paragraph",
        text: "This is a lightweight virtual workplace app built exclusively for the folks at our company. It would replace the team's reliance on WhatsApp, Google Meet and ad-hoc communication by making everyone feel like they're entering the same office every morning. Unlike Discord, Slack or Gather, it is not a community platform, chat application or game. It is the company's digital office with a simple core philosophy of “You enter work by entering the office.” Everything else revolves around that.",
      },
      {
        type: "paragraph",
        text: "The product should solve five problems:",
      },
      {
        type: "list",
        items: [
          "Everyone should always know where everyone else is.",
          "A well-integrated system for project, task, and time-tracking.",
          "Voice comm. should be as frictionless as talking in real offices. Moving into smaller private conversations should feel like sliding into meeting rooms.",
          "The application should be lightweight enough to leave open throughout the workday.",
          "This may already be an app that is under internal-testing.",
        ],
      },
    ],
  },
  {
    id: "high-beam",
    title: "High-beam at High-beamers",
    blocks: [
      {
        type: "paragraph",
        text: "I am not going to talk more about this until I make this. Once I am done, you’ll see it on the road, haha.",
      },
    ],
  },
  {
    id: "jarvis-productivity",
    title: "Jarvis for personal productivity",
    blocks: [
      {
        type: "paragraph",
        text: "I wanted to create this even as a 18 year-old while I was trying to juggle responsibilities as a club board member, a freelance designer, a Unity intern, and a UG student living in a house alone with two cats at a high-pressure college. A scheduler with a good notification system is all I wanted then. But looking back, I’d say it’s these:",
      },
      {
        type: "list",
        items: [
          "NL task and calendar management",
          "Suggestions for daily planning and priority",
          "Meeting notes and action item tracking",
          "Voice-based reminders and quick capture",
          "Knowledge search across documents and notes",
          "Habit and goal tracking",
          "Context-aware AI assistant for work and personal life",
        ],
      },
      {
        type: "paragraph",
        text: "I’d build it as a cross-platform app with an AI assistant at its core, connected to tools like calendar, email, notes, and cloud storage. And then I would use the LLMs for conversation and planning, a lightweight database for personal memory, and integrations with common productivity services. The assistant should then, upon further programming, proactively organize information, suggest next actions, and automate repetitive tasks while keeping the user in control.",
      },
    ],
  },
];
