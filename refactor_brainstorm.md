# Portfolio Refactoring Brainstorm

## Current State Diagnosis

Before answering the questions, here is what the codebase is doing right now:

| Problem | Where it lives |
|---|---|
| Notebook page effect split across two separate CSS classes (`.notebook-page` + `.split-paper`) with duplicated `radial-gradient` background | `globals.css` L99–L215 |
| Layout math hard-coded as arbitrary Tailwind values (`pt-[var(--browser-inset-top)]`, `calc(var(--margin-line-pos)+1.5rem)`) | `page.tsx`, `SplitLayout.tsx`, `MindStateSection.tsx`, `LegacyContinuation.tsx` |
| `SmartDateHeader` uses 7 inline `style={{}}` blocks with raw font/size/color values | `SmartDateHeader.tsx` |
| Two different component generations co-exist (`components/` vs `old_components/`) with no shared style contract | everywhere |
| `ThoughtBlock.tsx` uses `var(--grid-unit)` that is never defined in `globals.css` | `ThoughtBlock.tsx` L47, L54–L55, L72, L93, L105 |
| `LegacyContinuation` is doing layout, navigation, scroll detection, AND content — a four-concern component | `LegacyContinuation.tsx` |
| Font family strings are repeated as raw strings everywhere: `font-['Architects_Daughter']`, `font-['Patrick_Hand']` | 6+ files |

---

## Question 1 — Can we refactor all CSS to consistent Tailwind utility classes?

**Yes, absolutely — and this project is a great candidate.** You are already on **Tailwind v4** (confirmed by `tailwindcss: ^4` + `@tailwindcss/postcss: ^4` in `package.json`), which makes this even cleaner than it would have been before.

### Tailwind v4 is the right version for this

Tailwind v4 ships with **CSS-first configuration** via `@theme {}`. This means your design tokens (currently spread across `:root {}` in `globals.css`) move into a Tailwind-native block and automatically become utility classes:

```css
/* globals.css — after refactor */
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-display: "Architects Daughter", cursive;
  --font-body:    "Patrick Hand", cursive;

  /* Notebook palette */
  --color-body-bg:     #e5e5e5;
  --color-page:        #ffffff;
  --color-ink:         #0d094c;
  --color-dot:         rgba(0, 0, 0, 0.15);
  --color-margin:      rgba(240, 160, 160, 0.6);

  /* Spacing tokens */
  --spacing-margin-line:   6rem;
  --spacing-header-space:  8rem;
  --spacing-ruling:        2rem;
}
```

After this, your components can use real Tailwind utilities:

```tsx
// Before (today)
<div style={{ left: "var(--margin-line-pos)" }} />

// After (Tailwind v4 arbitrary with token)
<div className="left-[--spacing-margin-line]" />

// Or better — you define a custom utility class in @layer utilities
```

### What stays in globals.css (and why)

Some things legitimately cannot be Tailwind utilities:
- The **dotted grid `radial-gradient`** — too complex for a single utility, belongs in a `@layer components` class.
- **Responsive variable overrides** — these can be removed entirely once tokens are in `@theme`, since you can use `md:` and `lg:` Tailwind prefixes directly in components.
- The **scrollbar styling** — browser pseudo-selectors, must stay in global CSS.
- The **`tab-noise` texture** — the base64 PNG background belongs in a CSS class.

### Verdict
- **~80% of `globals.css` can be eliminated** and replaced with Tailwind v4 `@theme` tokens + component-level utility classes.
- The `inline style={{}}` blocks in `SmartDateHeader.tsx` (7 instances) and `ThoughtBlock.tsx` (4 instances using undefined `--grid-unit`) can all be replaced with Tailwind classes.
- Repeated raw font strings `font-['Architects_Daughter']` become `font-display` after the token is registered.

---

## Question 2 — Can the "notebook-page" effect be condensed into a NotebookPage.tsx component?

**Yes. This is the most impactful single change you can make.**

### The core problem

Right now, the notebook visual is:
1. `globals.css` → `.notebook-page` (dot grid, the outer wrapper)
2. `globals.css` → `.split-paper` (the floating inner panel — a *second* notebook page)
3. `globals.css` → `.notebook-header-space`, `.margin-line-page` (decorative elements)
4. `SmartDateHeader.tsx` → renders the header band with inline CSS
5. `page.tsx` → wires all of the above together with manual `calc()` math inside a one-off `className` string

These five concerns exist in five different places. The notebook is not a "thing" — it's a coincidence.

### What NotebookPage.tsx should be

A `NotebookPage` component should be a **self-contained notebook sheet** that:
- Renders its own dot grid background
- Renders its own margin line
- Renders its own header band (optionally with date)
- Exposes a clean `children` prop for content
- Accepts `variant` props for different sheet presentations

```tsx
// Proposed API — NotebookPage.tsx
<NotebookPage
  variant="full"        // full-screen anchored sheet
  showMarginLine        // toggle the red vertical line
  headerContent={       // what goes in the header band
    <SmartDateHeader ... />
  }
>
  {/* page content goes here */}
</NotebookPage>

// The floating "split-paper" inner sheet becomes:
<NotebookPage
  variant="inset"       // absolutely positioned, offset, floating
  showMarginLine={false}
>
  <SplitLayout ... />
</NotebookPage>
```

### Variants to design

| Variant | Currently | Description |
|---|---|---|
| `full` | `.notebook-page` on `<main>` | Full-width, full-height outer notebook |
| `inset` | `.split-paper` | Floating inner sheet, offset by `--split-offset-x` |
| `section` | `<MindStateSection>` padding calculation | Continuation section "page" |

### Dot grid as a composable primitive

Rather than duplicating the `radial-gradient` in both `.notebook-page` and `.split-paper`, extract it to a `DotGrid` component or a `@layer utilities` class:

```css
@layer utilities {
  .bg-dot-grid {
    background-image: radial-gradient(circle, var(--color-dot) 1.5px, transparent 1.5px);
    background-size: var(--spacing-ruling) var(--spacing-ruling);
  }
}
```

Then both `NotebookPage` variants just apply `bg-dot-grid`.

---

## Question 3 — "Interlocking blocks" component strategy

This is the right mental model. Here is a concrete strategy.

### The current problem: each component is an island

- `LegacyContinuation` knows it's inside a `.notebook-page` (uses `--margin-line-pos` directly).
- `SplitLayout` knows it goes inside a `.split-paper` (hard-codes its own padding off margin-line).
- `MindStateSection` knows it's a continuation section (calculates its own `pl-[calc(var(--margin-line-pos)+1.5rem)]`).
- None of these components *talk to each other* about the layout contract.

The result: if you ever move a component to a different context, the margins break. If you change the margin line position, you must update all four files.

### Layer 1 — Layout Primitives (one source of truth)

These are the "rails" every other component runs on. They do not render any content — they only establish positioning.

```
NotebookPage        — the sheet (dot grid, margin line, header band)
  └── MarginLine    — the red vertical rule (used by NotebookPage internally)
  └── HeaderBand    — the top clear zone

PageShell           — the browser-level wrapper with insets
```

### Layer 2 — Content Slots (aware of layout rails)

These components know their position *relative to the notebook*, not to the screen. They use context or CSS custom properties set by `NotebookPage`.

```
NotebookPage (context provider) → exposes: marginLinePos, headerHeight
  ├── SmartDateHeader   — reads headerHeight via context, renders inside HeaderBand
  ├── SplitLayout       — reads marginLinePos, renders the inset paper
  └── LegacySection     — reads marginLinePos, renders continuation content
```

**The key insight**: `NotebookPage` provides a React context with spacing values. Child components consume context instead of directly referencing CSS variables in `className` strings.

```tsx
// NotebookContext
interface NotebookContextValue {
  marginLinePos: string; // "6rem" | "3rem" (responsive)
  headerHeight: string;
}

const NotebookContext = createContext<NotebookContextValue>({...});

// Usage in child
function MindStateSection() {
  const { marginLinePos } = useNotebookContext();
  return (
    <section style={{ paddingLeft: `calc(${marginLinePos} + 1.5rem)` }}>
      ...
    </section>
  );
}
```

This way, the margin line is defined **once** in `NotebookPage` and flows down automatically.

### Layer 3 — Leaf Components (content-only, zero layout knowledge)

These know nothing about notebook geometry. They just render their visual:

```
StickyNote      — yellow/blue/pink/green card with tape
PolaroidCard    — photo card with rotation
DomainBadge     — animated underline button
ThoughtBlock    — handwritten text + media block
TabDivider      — timeline navigation tab
SectionHeader   — section title + description strip
```

These are the most portable components. They can be freely recomposed.

### Layer 4 — Page Sections (orchestrators)

These assemble leaf components into a meaningful screen region:

```
HeroSection     — wraps HeroHeader (the "How can I help you?" view)
WorkSection     — wraps ProjectGrid + DomainSelector2
TimelineSection — wraps MindStateSection + StickyNote grids (replaces LegacyContinuation)
```

`page.tsx` then becomes a clean composition:

```tsx
export default function Home() {
  return (
    <PageShell>
      <NotebookPage variant="full" header={<SmartDateHeader />}>
        <MarginLine />
        <NotebookPage variant="inset">
          <SplitLayout
            left={<HeroSection />}
            right={<WorkSection />}
          />
        </NotebookPage>
        <TimelineSection />
      </NotebookPage>
    </PageShell>
  );
}
```

Every component has a single clear responsibility. Changing the notebook margin line means touching **one file**.

---

## My Additional Recommendations

### 1. Fix the undefined `--grid-unit` variable immediately
`ThoughtBlock.tsx` references `var(--grid-unit)` in 4 places, but this variable is **never defined anywhere** in the CSS. This is a silent runtime bug. Before doing any refactoring, either define it in `globals.css` or remove `ThoughtBlock.tsx` if it's not being used.

### 2. Retire the `old_components/` folder cleanly
Rather than having a directory called "old_components", migrate the components you want to keep (`MindStateSection`, `StickyNote`, `TabDivider`, `SectionHeader`) into the main `components/` folder under a `timeline/` subdirectory. Delete what you don't use.

### 3. Use `cn()` consistently, not ad-hoc template strings
`DomainBadge.tsx` already imports `clsx` + `tailwind-merge` and uses `cn()`. This is the right pattern. Apply it everywhere — currently other components use raw template literal concatenation which breaks with Tailwind's class merging.

### 4. The LegacyContinuation split: 3 components, not 1
Split `LegacyContinuation.tsx` into:
- `TimelineNav.tsx` — the fixed left sidebar + mobile bottom bar
- `TimelineSection.tsx` — the scrollable content with `MindStateSection` blocks  
- A small `useActiveSection()` hook — the IntersectionObserver/scroll logic

### 5. Consider `next/font` instead of Google Fonts `@import`
`globals.css` L3 uses a Google Fonts `@import`. Next.js has a built-in `next/font/google` system that self-hosts fonts and eliminates the extra HTTP round-trip. `layout.tsx` already does this for Geist — apply the same pattern to Architects Daughter and Patrick Hand.

---

## Proposed File Structure After Refactor

```
app/
├── globals.css                  ← Only @theme tokens + @layer utilities
├── layout.tsx                   ← Font loading via next/font
├── page.tsx                     ← Clean 4-layer composition
├── context/
│   └── NotebookContext.tsx      ← Spacing context provider
├── components/
│   ├── layout/
│   │   ├── NotebookPage.tsx     ← THE new core primitive
│   │   ├── PageShell.tsx        ← Browser-level inset wrapper
│   │   └── SplitLayout.tsx     ← Left/right panel layout
│   ├── notebook/
│   │   ├── SmartDateHeader.tsx  ← Header band content
│   │   ├── MarginLine.tsx       ← Red vertical rule
│   │   └── DotGrid.tsx         ← Reusable dot background
│   ├── timeline/
│   │   ├── TimelineNav.tsx      ← Fixed sidebar nav
│   │   ├── TimelineSection.tsx  ← Scrollable timeline
│   │   ├── MindStateSection.tsx ← Era section wrapper
│   │   ├── SectionHeader.tsx    ← Section title strip
│   │   ├── StickyNote.tsx       ← Media card
│   │   └── TabDivider.tsx       ← Navigation tab
│   └── projects/
│       ├── DomainSelector.tsx   ← Tag filter panel (merge DS1 + DS2)
│       ├── DomainBadge.tsx      ← Individual filter tag
│       ├── ProjectGrid.tsx      ← Polaroid grid + mobile stack
│       ├── PolaroidCard.tsx     ← Single project card
│       └── ExpandedPolaroid.tsx ← Modal/expanded view
└── data/
    └── projects.ts              ← (move from components/projectsData.ts)
```

---

## Recommended Refactoring Order

Do these in sequence — each phase is independently shippable:

1. **Phase 0** — Fix `--grid-unit` bug. Delete unused `old_components` files.
2. **Phase 1** — Migrate `globals.css` to `@theme {}` tokens. Update all `var(--x)` references to Tailwind classes. Zero visual change.
3. **Phase 2** — Create `NotebookPage.tsx` + `NotebookContext`. Replace `.notebook-page` and `.split-paper` usages.
4. **Phase 3** — Split `LegacyContinuation.tsx` into 3 files. Migrate `old_components/` into `components/timeline/`.
5. **Phase 4** — Migrate fonts to `next/font`. Clean up `layout.tsx`.
6. **Phase 5** — Polish: replace all inline `style={{}}` blocks. Make `cn()` universal. Consolidate `DomainSelector.tsx` + `DomainSelector2.tsx`.
