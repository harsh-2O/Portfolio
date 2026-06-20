import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ThemeToggle from '../atoms/ThemeToggle';
import type { NavSection } from '../../types';

interface HeaderProps {
  activeSection: NavSection;
  isMenuOpen: boolean;
  onMenuToggle: (open: boolean) => void;
}

const MONO = "'IBM Plex Mono', 'SF Mono', monospace";

const NAV_ITEMS: { section: NavSection; label: string; targetId?: string }[] = [
  { section: 'home', label: 'Home' },
  { section: 'resume', label: 'Resume', targetId: 'resume-section' },
  { section: 'projects', label: 'Work', targetId: 'projects-section' },
  { section: 'blog', label: 'Blog', targetId: 'blog-section' },
  { section: 'contact', label: 'Contact', targetId: 'footer-section' },
];

const HeaderContainer = styled.header<{ $scrolled: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 max(clamp(1rem, 4vw, 2.5rem), env(safe-area-inset-right, 0px))
    0 max(clamp(1rem, 4vw, 2.5rem), env(safe-area-inset-left, 0px));
  padding-top: env(safe-area-inset-top, 0px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  min-height: 48px;
  background: ${({ $scrolled }) => ($scrolled ? 'var(--header-bg)' : 'transparent')};
  border-bottom: 1px solid
    ${({ $scrolled }) => ($scrolled ? 'var(--card-border)' : 'transparent')};
  transition: background 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(180%) blur(20px)' : 'none')};
    -webkit-backdrop-filter: ${({ $scrolled }) =>
      $scrolled ? 'saturate(180%) blur(20px)' : 'none'};
    transition: backdrop-filter 0.35s ease;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr auto;
    background: var(--header-bg);
    border-bottom: 1px solid var(--card-border);

    &::before {
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
    }
  }
`;

const Logo = styled.button`
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  max-width: 55vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover span:first-of-type {
    opacity: 1;
  }
`;

const LogoName = styled.span`
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  opacity: 0.9;
  transition: opacity var(--transition);
`;

const LogoTag = styled.span`
  font-family: ${MONO};
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  border: 1px solid var(--accent-line);
  background: var(--accent-subtle);
  opacity: 0.8;

  @media (max-width: 480px) {
    display: none;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  justify-self: center;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 1px solid var(--card-border);
  background: var(--surface);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.button<{ $active?: boolean; $mobile?: boolean }>`
  font-family: ${({ $mobile }) => ($mobile ? 'var(--font-primary)' : MONO)};
  font-size: ${({ $mobile }) => ($mobile ? 'clamp(1.25rem, 5vw, 1.5rem)' : '0.72rem')};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  letter-spacing: ${({ $mobile }) => ($mobile ? '-0.02em' : '0.02em')};
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  background: ${({ $active, $mobile }) => {
    if ($mobile) return 'none';
    return $active ? 'var(--accent-subtle)' : 'transparent';
  }};
  border: ${({ $active, $mobile }) => {
    if ($mobile) return 'none';
    return $active ? '1px solid var(--accent-line)' : '1px solid transparent';
  }};
  border-radius: 0.35rem;
  cursor: pointer;
  padding: ${({ $mobile }) => ($mobile ? '0.75rem 0' : '0.35rem 0.65rem')};
  min-height: ${({ $mobile }) => ($mobile ? '48px' : 'auto')};
  width: ${({ $mobile }) => ($mobile ? '100%' : 'auto')};
  text-align: ${({ $mobile }) => ($mobile ? 'left' : 'center')};
  display: flex;
  align-items: center;
  transition: all var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
      background: ${({ $mobile }) => ($mobile ? 'transparent' : 'var(--tech-item-bg)')};
    }
  }
`;

const NavIndex = styled.span<{ $active?: boolean }>`
  font-size: 0.55rem;
  font-weight: 700;
  color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--text-muted)')};
  margin-right: 0.35rem;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  font-variant-numeric: tabular-nums;
  font-family: ${MONO};
  transition: color var(--transition-fast), opacity var(--transition-fast);
`;

const RightSlot = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);

  @media (max-width: 480px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border: 1px solid var(--card-border);
  border-radius: 0.4rem;
  cursor: pointer;
  color: var(--text-primary);
  transition: all var(--transition-fast);

  @media (max-width: 1024px) {
    display: flex;
  }

  @media (hover: hover) {
    &:hover {
      border-color: var(--accent-line);
      background: var(--accent-subtle);
    }
  }

  svg { width: 16px; height: 16px; }
`;

const MobileNavOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 98;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    transition: opacity 0.35s ease, visibility 0.35s ease;
  }
`;

const MobileNav = styled.nav<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 88vw);
    padding: calc(var(--header-height) + 1.5rem) var(--section-padding-x)
      max(2rem, env(safe-area-inset-bottom, 0px));
    background: var(--header-bg);
    backdrop-filter: saturate(180%) blur(24px);
    -webkit-backdrop-filter: saturate(180%) blur(24px);
    border-left: 1px solid var(--card-border);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
    z-index: 99;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
      visibility 0.4s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const MobileNavLabel = styled.span`
  font-family: ${MONO};
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.5;
  padding: 0 0 0.75rem;
  border-bottom: 1px solid var(--card-border);
  width: 100%;
  margin-bottom: 0.5rem;
`;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Header({ activeSection, isMenuOpen, onMenuToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onMenuToggle(false);
        document.body.style.overflow = 'auto';
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen, onMenuToggle]);

  const navigate = (targetId?: string) => {
    onMenuToggle(false);
    document.body.style.overflow = 'auto';
    if (targetId) scrollToSection(targetId);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    const next = !isMenuOpen;
    document.body.style.overflow = next ? 'hidden' : 'auto';
    onMenuToggle(next);
  };

  const closeMenu = () => {
    onMenuToggle(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <HeaderContainer $scrolled={scrolled}>
        <a href="#main-section" className="skip-link">Skip to content</a>

        <Logo onClick={() => navigate()} aria-label="Scroll to top">
          <LogoName>Harsh Mehta</LogoName>
          <LogoTag>DEV</LogoTag>
        </Logo>

        <DesktopNav aria-label="Main navigation">
          {NAV_ITEMS.map(({ section, label, targetId }, i) => (
            <NavLink
              key={section}
              $active={activeSection === section}
              onClick={() => navigate(targetId)}
            >
              <NavIndex $active={activeSection === section}>
                {String(i + 1).padStart(2, '0')}
              </NavIndex>
              {label}
            </NavLink>
          ))}
        </DesktopNav>

        <RightSlot>
          <StatusDot title="Online" />
          <ThemeToggle />
          <MenuButton
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </MenuButton>
        </RightSlot>
      </HeaderContainer>

      <MobileNavOverlay $isOpen={isMenuOpen} onClick={closeMenu} aria-hidden="true" />

      {/* @ts-expect-error inert is a valid HTML attribute */}
      <MobileNav $isOpen={isMenuOpen} aria-label="Mobile navigation" inert={!isMenuOpen ? '' : undefined}>
        <MobileNavLabel>Navigation</MobileNavLabel>
        {NAV_ITEMS.map(({ section, label, targetId }, i) => (
          <NavLink
            key={section}
            $active={activeSection === section}
            $mobile
            onClick={() => navigate(targetId)}
          >
            <NavIndex $active={activeSection === section}>
              {String(i + 1).padStart(2, '0')}
            </NavIndex>
            {label}
          </NavLink>
        ))}
      </MobileNav>
    </>
  );
}
