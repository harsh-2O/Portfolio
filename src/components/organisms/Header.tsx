import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useScroll } from '../../lib/motion';
import ThemeToggle from '../atoms/ThemeToggle';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { navIndicator } from '../../motion/variants';
import { lockScroll, scrollToSection, unlockScroll } from '../../lib/scroll';
import { NAV_ITEMS } from '../../data/navigation';
import type { NavSection } from '../../types';

interface HeaderProps {
  activeSection: NavSection;
  isMenuOpen: boolean;
  onMenuToggle: (open: boolean) => void;
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.userAgent);

/* ── Bar ─────────────────────────────────────────────────────────── */

const Bar = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  padding-top: env(safe-area-inset-top, 0px);
  padding-left: max(var(--section-padding-x), env(safe-area-inset-left, 0px));
  padding-right: max(var(--section-padding-x), env(safe-area-inset-right, 0px));
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background: ${({ $scrolled }) => ($scrolled ? 'var(--header-bg)' : 'transparent')};
  border-bottom: 1px solid ${({ $scrolled }) => ($scrolled ? 'var(--border)' : 'transparent')};
  transition: background-color var(--transition), border-color var(--transition);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr auto;
    background: var(--header-bg);
    border-bottom-color: var(--border);
  }
`;

const Progress = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform-origin: 0 50%;
`;

/* ── Logo ────────────────────────────────────────────────────────── */

const Logo = styled.button`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  min-height: 44px;
  max-width: 55vw;
  white-space: nowrap;
`;

const LogoName = styled.span`
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
`;

const LogoTag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-text);
  padding: 0.18rem 0.4rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--accent-line);

  @media (max-width: 480px) {
    display: none;
  }
`;

/* ── Pill nav ────────────────────────────────────────────────────── */

const Nav = styled.nav`
  justify-self: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
  padding: 3px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface);
`;

const NavButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  height: 34px;
  padding: 0 0.9rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  transition: color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
    }
  }
`;

const NavLabel = styled.span`
  position: relative;
  z-index: 1;
`;

const ActivePill = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: var(--radius-pill);
  background: var(--accent-subtle);
  border: 1px solid var(--accent-line);
`;

const Index = styled.span<{ $active: boolean }>`
  position: relative;
  z-index: 1;
  font-size: 0.6rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ $active }) => ($active ? 'var(--accent-text)' : 'var(--text-faint)')};
  transition: color var(--transition-fast);
`;

/* ── Right slot ──────────────────────────────────────────────────── */

const Right = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PaletteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  height: 40px;
  min-width: 40px;
  padding: 0 0.6rem;

  @media (max-width: 1024px) {
    width: 44px;
    height: 44px;
    padding: 0;
  }
  border-radius: var(--radius-pill);
  color: var(--text-muted);
  transition: color var(--transition-fast), background-color var(--transition-fast);

  svg {
    width: 15px;
    height: 15px;
    stroke: currentColor;
    stroke-width: 1.5;
    fill: none;
    stroke-linecap: round;
  }

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
      background: var(--surface-sunken);
    }
  }
`;

const Kbd = styled.kbd`
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  line-height: 1;
  padding: 0.28rem 0.4rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  letter-spacing: 0.04em;

  @media (max-width: 480px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  color: var(--text-primary);

  @media (max-width: 1024px) {
    display: inline-flex;
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    stroke-width: 1.5;
    fill: none;
    stroke-linecap: round;
  }
`;

/* ── Mobile drawer ───────────────────────────────────────────────── */

const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 98;
    background: var(--overlay);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity var(--transition), visibility var(--transition);
  }
`;

const MobileNav = styled.nav<{ $open: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    width: min(320px, 88vw);
    padding: calc(var(--header-height) + 1.5rem) var(--section-padding-x)
      max(2rem, env(safe-area-inset-bottom, 0px));
    background: var(--background);
    border-left: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    transition: transform var(--dur-slow) var(--ease-out), visibility var(--dur-slow);
    overflow-y: auto;
  }
`;

const MobileLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.5rem;
`;

const MobileLink = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 0;
  text-align: left;
  font-size: clamp(1.25rem, 5vw, 1.5rem);
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  letter-spacing: -0.02em;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  border-bottom: 1px solid var(--border);
`;

/* ── Component ───────────────────────────────────────────────────── */

export default function Header({ activeSection, isMenuOpen, onMenuToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const { open: openPalette } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMenuToggle(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen, onMenuToggle]);

  const navigate = (targetId: string) => {
    onMenuToggle(false);
    scrollToSection(targetId);
  };

  return (
    <>
      <Bar $scrolled={scrolled}>
        <Progress style={{ scaleX: scrollYProgress }} aria-hidden="true" />

        <Logo
          type="button"
          onClick={() => navigate('main-section')}
          aria-label="Harsh Mehta, back to top"
          data-cursor="Top"
        >
          <LogoName>Harsh Mehta</LogoName>
          <LogoTag aria-hidden="true">Dev</LogoTag>
        </Logo>

        <Nav aria-label="Primary">
          <List>
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.section;
              return (
                <li key={item.section}>
                  <NavButton
                    type="button"
                    $active={active}
                    aria-current={active ? 'true' : undefined}
                    onClick={() => navigate(item.targetId)}
                  >
                    {active && <ActivePill layoutId="nav-active-pill" transition={navIndicator} />}
                    <Index $active={active}>
                      {item.index}
                    </Index>
                    <NavLabel>{item.label}</NavLabel>
                  </NavButton>
                </li>
              );
            })}
          </List>
        </Nav>

        <Right>
          <PaletteButton
            type="button"
            onClick={openPalette}
            aria-keyshortcuts="Meta+K Control+K"
            data-cursor="Search"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <span className="sr-only">Search</span>
            <Kbd aria-hidden="true">{isMac ? '⌘K' : 'Ctrl K'}</Kbd>
          </PaletteButton>
          <ThemeToggle />
          <MenuButton
            type="button"
            onClick={() => onMenuToggle(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </MenuButton>
        </Right>
      </Bar>

      <MobileOverlay $open={isMenuOpen} onClick={() => onMenuToggle(false)} aria-hidden="true" />

      <MobileNav
        id="mobile-nav"
        $open={isMenuOpen}
        aria-label="Mobile"
        inert={!isMenuOpen}
        data-lenis-prevent
      >
        <MobileLabel>Navigation</MobileLabel>
        {NAV_ITEMS.map((item) => {
          const active = activeSection === item.section;
          return (
            <MobileLink
              key={item.section}
              type="button"
              $active={active}
              aria-current={active ? 'true' : undefined}
              onClick={() => navigate(item.targetId)}
            >
              <Index $active={active}>{item.index}</Index>
              {item.label}
            </MobileLink>
          );
        })}
      </MobileNav>
    </>
  );
}
