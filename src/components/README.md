# Components — Atomic Design

This folder follows [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) to keep UI layers predictable and composable.

```
components/
├── atoms/        # Smallest UI units — buttons, placeholders
├── molecules/    # Simple combinations of atoms
├── organisms/    # Complex, self-contained UI blocks
└── templates/    # Page layout shells and section ordering
```

Pages live in `src/pages/` and wire templates + organisms together.

## Atoms

| Component | Role |
|-----------|------|
| `ThemeToggle` | Light/dark mode switch (system default, persisted) |
| `SectionFallback` | Suspense height placeholder |
| `MagneticButton` | Solid/ghost CTA that leans toward the pointer (fine pointers only) |
| `DownloadResumeButton` | Magnetic PDF link, animated arrow, shows file size |
| `CopyChip` | Copy-to-clipboard chip with icon morph + inline "Copied" |
| `ErrorBoundary` | Fallback wrapper for optional enhancements (WebGL) |
| `GrainOverlay` | Fixed feTurbulence grain at ≤5% opacity |
| `CustomCursor` | Dot + lagging ring, labels via `data-cursor` (lazy, fine pointers only) |

## Molecules

| Component | Role |
|-----------|------|
| `SectionHeader` | Label + title + subtitle block |
| `LazyWhenVisible` | IntersectionObserver lazy-mount gate (also mounts on `mount-all`) |
| `ResumeRail` | Sticky 01/02/03 rail → sticky horizontal tabs below 1024px |
| `TimelineEntry` | Role, company, mono dates, two bullets + animated "+N more" |
| `FilterPills` | Segmented filter row with one `layoutId` indicator that morphs between options |
| `SkillBars` | Grouped proficiency bars with a demand tick and a context panel |
| `ProjectCard` | Bento tile: parallax preview, title lift, tags on hover, shared `layoutId` |
| `BlogRow` | Editorial row: mono meta, serif title, dek, arrow on hover |
| `ContactForm` | Floating labels, animated focus underline, live validation, success morph |
| `CodeBlock` | Dark code block: line numbers, language tag, copy button |
| `StatusChip` | Pulsing dot + "Currently: now → next" from one constant |
| `MarketCanvas` / `MarketScene` | Lazy R3F market-data backdrop: grid, ticks, sparkline, order-book ladder; 30 fps, pauses off-screen |

## Organisms

| Component | Role |
|-----------|------|
| `Header` | Pill nav with `layoutId` indicator, scroll-progress line, ⌘K trigger, mobile drawer |
| `IntroSequence` | ≤1.2 s clip-mask name reveal, skippable, once per session |
| `CommandPalette` | ⌘K / Ctrl+K fuzzy palette over sections, posts, projects, actions (lazy) |
| `HeroSection` | Above-fold hero |
| `Timeline` | Sub-section timeline with scroll-drawn progress line and lit nodes |
| `CertificationsSection` | 3D tilt cards (max 6°) with pointer specular and verified badge |
| `ResumeSection` | Sticky rail + three timelines + magnetic download (file size from HEAD) |
| `CertificationsSection` | Certification card grid |
| `SkillsSection` | Interactive skill pills |
| `ProjectsSection` | Project card grid |
| `ProjectModal` | Project detail overlay |
| `BlogSection` | Blog preview cards |
| `BlogModal` | Full blog post overlay |
| `MarqueeBanner` | Scrolling skills strip |
| `TestimonialsSection` | Recommendation carousel |
| `ContactSection` | Hover-lift headline, copy chips, socials and the form |
| `FooterSection` | Live Gurugram clock, year, build credits, back to top |

## Templates

| Component | Role |
|-----------|------|
| `BelowFold` | Lazy-load orchestrator for all below-fold organisms |

## Import examples

```tsx
import { SectionHeader } from '../components/molecules';
import { HeroSection, ProjectsSection } from '../components/organisms';
import { BelowFold } from '../components/templates';
```

## Cross-cutting modules

| Module | Role |
|--------|------|
| `src/theme/tokens.ts` | Design tokens (palettes, type, motion, spacing, radii) → CSS variables via `GlobalStyles` |
| `src/motion/variants.ts` | Every framer-motion variant/transition; references tokens only |
| `src/lib/scroll.ts` | Lenis singleton, `scrollToSection`, reference-counted `lockScroll` |
| `src/lib/events.ts` | Typed event bus (palette → modals, nav → lazy content) |
| `src/hooks/useActiveSection.ts` | IntersectionObserver scroll-spy driving the nav |
| `src/context/*` | Theme (system default), Intro (once per session), CommandPalette (⌘K) |

## Content gaps (TODO_CONTENT)

| Where | What is missing |
|-------|-----------------|
| `data/projects.ts` | Optional `caseStudy` (problem / approach / impact prose) and `liveUrl`. The modal falls back to description, bullets and highlight metrics. |
| `data/blog.ts` | Stored `content` runs ~800 words per post while the authored `readTime` claims 12–15 min. Read time is computed from the stored text; add the full articles to close the gap. |
| `data/skills.ts` | No per-skill start year, so the skill panel shows context rather than years. |
| Contact form | No backend. Submitting composes a `mailto:` draft; swap `submit` for a real endpoint. |
