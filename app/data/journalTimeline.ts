/**
 * journalTimeline.ts — single source of truth for the /journal life story.
 *
 * The story is modelled as an ordered list of Eras.  Each Era carries the
 * header content (stage badge, subtitle, italic description) plus an ordered
 * list of Rows.
 *
 * A Row is a flexible unit rendered by TimelineRow.tsx:
 *   • text only            → a left-aligned, handwritten-style paragraph
 *   • text + one note      → a two-column split (side alternates dynamically)
 *   • note(s) only         → a centered grid of StickyNotes
 *
 * A Note is either an "image" (its own asset + caption) or a "project"
 * (references a PROJECTS id and links to /projects/[id]).  Project notes pull
 * their title / image from projectsData.ts at render time so they stay in sync.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Note =
  | { kind: "image"; title: string; caption?: string; mediaSrc: string }
  | { kind: "project"; projectId: string; caption?: string };

export interface Row {
  /** Narrative paragraph. Rendered handwritten + left-aligned. */
  text?: string;
  /** Zero or more sticky notes attached to this row. */
  notes?: Note[];
}

export interface Era {
  /** Also used as the scroll-spy anchor id — must match SECTIONS in TimelineSection. */
  id: string;
  /** Nav label (left sidebar / mobile bar). */
  navLabel: string;
  /** Small badge above the era title. */
  stage: string;
  /** Era title. */
  subtitle: string;
  /** Italic one-liner under the title. */
  description: string;
  /** Single-word growth marker shown in the decorative side rail. */
  stateLabel: string;
  /** Italic tone line shown in the decorative side rail. */
  tone: string;
  rows: Row[];
}

/* Placeholder image assets. Real files can be dropped in later. */
const IMG = (name: string) => `/images/journal/${name}`;

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export const ERAS: Era[] = [
  /* ============================================================= */
  {
    id: "before-2019",
    navLabel: "< 2019",
    stage: "Chapter 1",
    subtitle: "Before 2019",
    description: "More doodles than notes — learning by obsession.",
    stateLabel: "curious",
    tone: "Everything is interesting.",
    rows: [
      {
        text: "I spent more time doodling in notebooks than just taking notes, yet somehow couldn't draw a decent science diagram.",
      },
      {
        text: "By the end of school, I tried building a ticket-booking program with only file handling and pattern recognition, genuinely believing I understood programming.",
      },
      {
        text: "In college, joining CodeChef and the Art Club quickly showed me how much I still had to learn - and gave me communities obsessed with the same things I was.",
      },
      {
        text: "After exchanging hard-disks full of games throughout a semester, my friends and I decided to build our dream game, so I picked up Unity with far more enthusiasm than experience.",
      },
      {
        text: "Spent a summer juggling a graphic design internship, data science, and Unity while the game team slowly dissolved until I was the only one left.",
        notes: [
          {
            kind: "image",
            title: "Working in hostel",
            caption: "Summer, one laptop, three jobs.",
            mediaSrc: IMG("working-in-hostel.jpg"),
          },
        ],
      },
      {
        text: "As soon as we got back to college, a club-senior misheard me and listed my name to host a 3D-modelling workshop. Since I did not want to let him down, I naturally learned enough in two weeks to teach 100 students, which permanently changed my confidence in learning and teaching new skills.",
        notes: [
          {
            kind: "image",
            title: "3D-modelling workshop",
            caption: "Two weeks to learn it, one day to teach 100.",
            mediaSrc: IMG("workshop-3d-modelling.jpg"),
          },
        ],
      },
      {
        text: "With this newly-gained confidence, I resumed my game dev. journey by watching Tim Ruswick's videos. And inspired by his perspectives on game ideas, management, and scope, I started working on Black-out, an adventure Quest game. After months of development, a hard drive crash erased everything.",
        notes: [{ kind: "project", projectId: "blackout" }],
      },
    ],
  },

  /* ============================================================= */
  {
    id: "2019-2020",
    navLabel: "2019–20",
    stage: "Chapter 2",
    subtitle: "2019–2020",
    description: "Out of the comfort zone, into the work.",
    stateLabel: "driven",
    tone: "Decisions emerge from noise.",
    rows: [
      {
        text: "Seeing how I felt like I'd contributed and learned as much I could from the clubs, I left both of them and moved off campus to push myself out of my comfort zone.",
      },
      {
        text: "Took on freelance design and content work throughout the summer.",
      },
      {
        text: "Completed a simple infinite-runner game and shared it with all my friends. A review I remember - “This is the exact type of game I’d want to sit and play throughout boring classes”. So proud I had made slop even before it was a thing.",
      },
      {
        text: "Returned to CodeChef as the speaker for a 16-hour game development workshop for nearly 200 students.",
        notes: [
          {
            kind: "image",
            title: "Game dev workshop",
            caption: "16 hours, ~200 students.",
            mediaSrc: IMG("codechef-workshop.jpg"),
          },
        ],
      },
      {
        text: "I was approached to help out with the logo for a Board Gamers Club (BGC) that was just getting formed. Later I led its design efforts while mentoring a team of new designers.",
        notes: [
          {
            kind: "image",
            title: "BGC — logo & designs",
            caption: "From one logo to a whole identity.",
            mediaSrc: IMG("bgc-logo-designs.jpg"),
          },
        ],
      },
      {
        notes: [
          { kind: "project", projectId: "chess-promo", caption: "BGC Chess Engine promo" },
          { kind: "project", projectId: "bgc", caption: "BGC promo" },
        ],
      },
      {
        text: "A few friends entrusted me to lead branding and design for a cybersecurity and digital forensics conference.",
        notes: [
          {
            kind: "image",
            title: "Conference brochure",
            caption: "Branding a forensics conference.",
            mediaSrc: IMG("conference-brochure.jpg"),
          },
        ],
      },
      {
        text: "Joined a Bangalore startup to develop browser-based puzzle games, diving deep into game design psychology through GMTK and academic research where I was mind-blown about human psychology and product design.",
      },
      {
        text: "At the end of 2019, getting an internship at Alfaleus introduced me to VR and emerging technologies, making cutting-edge hardware feel practical instead of futuristic. I was even sent to Aravind Eye Hospital in Pondicherry for a week to work on a stereo-recording experiment for surgeons.",
        notes: [
          {
            kind: "image",
            title: "Alfaleus",
            caption: "First taste of VR and emerging hardware.",
            mediaSrc: IMG("alfaleus.jpg"),
          },
          { kind: "project", projectId: "alfaleus" },
        ],
      },
    ],
  },

  /* ============================================================= */
  {
    id: "2020-2022",
    navLabel: "2020-22",
    stage: "Chapter 3",
    subtitle: "2020–2022",
    description: "What the lockdown did.",
    stateLabel: "resilient",
    tone: "Constraints turned into fuel.",
    rows: [
      {
        text: "After the whole world shut down unexpectedly, a lot of the opportunities our batch had disappeared along with it.",
      },
      {
        text: "I used Instagram's interfaces to create Chronos, a choose-your-own-adventure style game, which was the result of my obsession with the Goosebumps books (RL Stine's).",
      },
      {
        text: "A tiny part of the story was put out everyday ending with a choice to be made by the viewers. With a Black Mirror-esque narrative of hours of the day literally being robbed away by Big-Tech, I was able to keep around 100 people engaged every day for two weeks.",
        notes: [
          {
            kind: "image",
            title: "Chronos",
            caption: "A daily choose-your-own-adventure on Instagram.",
            mediaSrc: IMG("chronos.jpg"),
          },
        ],
      },
      {
        text: "To battle the imposter syndrome I'd gotten after seeing the enormous talent at the Art Club, I took up the 100 Days of Art challenge and completed it, using it as much for self-reflection as for improving my art.",
        notes: [
          {
            kind: "image",
            title: "100 Days of Art",
            caption: "As much self-reflection as practice.",
            mediaSrc: IMG("100-days-of-art.jpg"),
          },
        ],
      },
      {
        text: "In the second half of the lockdown, I was back on Alfaleus' team to build a VR vision-screening product in just three months. Looking back, that's where I think I first got infected by the Bengaluru strain of the startup fever.",
        notes: [
          {
            kind: "image",
            title: "Product testing & Bengaluru",
            caption: "A VR vision-screening product in three months.",
            mediaSrc: IMG("product-testing-blore.jpg"),
          },
        ],
      },
      {
        text: "Immediately after Alfaleus, I joined HitWicket as a Technical Artist, working with the engineering, product, and QA teams, and the co-founders while bridging creative and technical teams.",
        notes: [
          {
            kind: "image",
            title: "HitWicket",
            caption: "Bridging creative and technical teams.",
            mediaSrc: IMG("hitwicket.jpg"),
          },
        ],
      },
      {
        text: "The second lockdown became months of planning, all paths inevitably passing through the need to create social change while embracing technology. This eventually shaped the idea for Vifr Tech as a team built around learning quickly and building ambitious technology.",
      },
    ],
  },

  /* ============================================================= */
  {
    id: "2022-2025",
    navLabel: "2022–25",
    stage: "Chapter 4",
    subtitle: "2022–2025",
    description: "After the dive.",
    stateLabel: "building",
    tone: "This is how I work.",
    rows: [
      {
        text: "Secured the NIDHI-PRAYAS grant in Feb 2022, opened Vifr's first office inside VIT's incubator, and built a team around rapid experimentation.",
        notes: [
          {
            kind: "image",
            title: "Vifr's first office",
            caption: "Inside VIT's incubator.",
            mediaSrc: IMG("vifr-office.jpg"),
          },
        ],
      },
      {
        text: "The initial rush of great talent that was impatiently waiting to get back to the college from the lockdowns led our hardware and software experiments while we were developing our first product, Halara.",
      },
      {
        notes: [
          { kind: "project", projectId: "virtual-production" },
          { kind: "project", projectId: "halara" },
        ],
      },
      {
        text: "Took on many freelance projects to support and acknowledge the interns' efforts.",
      },
      {
        notes: [
          { kind: "project", projectId: "warehouse", caption: "Accio warehouse" },
          { kind: "project", projectId: "physics", caption: "Physics simulation" },
          { kind: "project", projectId: "spell-fast" },
          { kind: "project", projectId: "heka-ux" },
          { kind: "project", projectId: "bharatanatyam" },
        ],
      },
      {
        text: "Became a part-time corporate Unity trainer in mid-2023, spending evenings teaching professionals while building products during the day and at night.",
        notes: [
          {
            kind: "image",
            title: "Corporate Unity training",
            caption: "Evenings teaching, days building.",
            mediaSrc: IMG("unity-training.jpg"),
          },
        ],
      },
      {
        text: "By the second half of 2023, I co-founded Cogniverse Tech in the UK to develop healthcare technology after finding strong alignment with a fellow VIT-ian and Nidhi Prayas awardee.",
        notes: [{ kind: "project", projectId: "virtual-ot", caption: "VOT" }],
      },
      {
        text: "Joined a Digital Twin Lab as a Unity Developer and later AI Research Engineer in a Punjab institution, deliberately slowing down after years of startup pace. While the research work involved DNN and web-apps, we still experimented with digital twin ideas.",
      },
      {
        notes: [
          { kind: "project", projectId: "transport", caption: "Digital Twin pitch" },
          { kind: "project", projectId: "ttt-othello", caption: "Othello & TTT AI" },
        ],
      },
      {
        text: "By the project's end in the second half of 2025, research taught me something startups rarely do: disciplined experimentation, meticulous attention to detail, and respect for rigorous documentation.",
      },
    ],
  },

  /* ============================================================= */
  {
    id: "2026",
    navLabel: "2026 <",
    stage: "Chapter 5",
    subtitle: "2026 onwards",
    description: "A clearer head, a smaller town.",
    stateLabel: "grounded",
    tone: "Building, deliberately.",
    rows: [
      {
        text: "With a new respect for processes and a clearer head after all the experiences, I have now moved back to a small town to build technology products.",
      },
    ],
  },
];
