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
| `ThemeToggle` | Light/dark mode switch |
| `SectionFallback` | Suspense height placeholder |

## Molecules

| Component | Role |
|-----------|------|
| `SectionHeader` | Label + title + subtitle block |
| `LazyWhenVisible` | IntersectionObserver lazy-mount gate |

## Organisms

| Component | Role |
|-----------|------|
| `Header` | Fixed nav + mobile menu |
| `ScrollChrome` | Scroll indicator + back-to-top |
| `HeroSection` | Above-fold hero |
| `ExperienceSection` | Education/work timeline |
| `ResumeSection` | Resume download + timeline |
| `CertificationsSection` | Certification card grid |
| `SkillsSection` | Interactive skill pills |
| `DevTerminal` | Copyable code snippet terminal |
| `ProjectsSection` | Project card grid |
| `ProjectModal` | Project detail overlay |
| `BlogSection` | Blog preview cards |
| `BlogModal` | Full blog post overlay |
| `MarqueeBanner` | Scrolling skills strip |
| `TestimonialsSection` | Recommendation carousel |
| `FooterSection` | Contact CTA + social links |

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
